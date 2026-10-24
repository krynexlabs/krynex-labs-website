import net from "net";
import crypto from "crypto";

/**
 * Sliding window rate limiter for API endpoints (Contact / Inquiries)
 * Protects against bot floods and repeated submissions.
 *
 * Uses lazy cleanup instead of setInterval to avoid timer leaks
 * in serverless environments (Vercel, Lambda, etc.).
 */

interface RateLimitRecord {
  timestamps: number[];
}

const windowMs = 10 * 60 * 1000; // 10 minutes
const maxRequests = 5; // Max 5 requests per 10 minutes per IP
const MAX_IP_ENTRIES = 10_000; // Safety cap to prevent unbounded memory growth
const CLEANUP_INTERVAL_MS = 2 * 60 * 1000; // Lazy cleanup at most every 2 minutes

const ipStore = new Map<string, RateLimitRecord>();
let lastCleanup = Date.now();

/**
 * Lazy cleanup: prune stale IP records on demand, throttled to avoid
 * excessive iteration on high-traffic endpoints.
 */
function lazyCleanup(now: number): void {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS && ipStore.size < MAX_IP_ENTRIES) {
    return;
  }
  lastCleanup = now;
  ipStore.forEach((record, ip) => {
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (record.timestamps.length === 0) {
      ipStore.delete(ip);
    }
  });
}

export function checkRateLimit(clientIp: string): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
} {
  const now = Date.now();

  // Run lazy cleanup (throttled)
  lazyCleanup(now);

  const record = ipStore.get(clientIp) || { timestamps: [] };

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  ipStore.set(clientIp, record);

  const resetInSeconds = Math.ceil(windowMs / 1000);
  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetInSeconds,
  };
}

/**
 * Validates and normalizes an IP candidate string (IPv4 or IPv6).
 * Strips bracketed ports (e.g. "[2001:db8::1]:443") or standard IPv4 ports ("198.51.100.1:8080").
 * Returns the normalized IP string if valid, or null if malformed or non-IP.
 */
export function cleanAndValidateIp(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  let clean = raw.trim();

  // Strip bracketed IPv6 with port: "[2001:db8::1]:443" -> "2001:db8::1"
  if (clean.startsWith("[") && clean.includes("]")) {
    const end = clean.indexOf("]");
    clean = clean.slice(1, end);
  } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(clean)) {
    // IPv4 with port: "198.51.100.1:8080" -> "198.51.100.1"
    clean = clean.split(":")[0];
  }

  return net.isIP(clean) !== 0 ? clean : null;
}

/**
 * Resolves the client rate-limiting identifier based on trusted edge proxy architecture.
 *
 * TRUST BOUNDARY DESIGN:
 * 1. Vercel Production Infrastructure: Vercel edge routers terminate TLS, strip incoming
 *    client-supplied 'x-vercel-forwarded-for' headers, and populate it with the verified TCP remote address.
 * 2. Non-Vercel / Self-Hosted / Preview Environments: 'x-vercel-forwarded-for' is NOT cryptographically
 *    signed and cannot be proven trustworthy from code alone. It must be paired with reverse-proxy
 *    rightmost-hop parsing.
 * 3. Multi-Hop X-Forwarded-For: Standard reverse proxies append the connecting IP to the end of the chain.
 *    Leftmost hops are client-controlled and easily spoofed. We inspect hops from right to left to locate
 *    the rightmost syntactically valid IP hop added by the upstream proxy.
 * 4. Missing / Malformed IP Elimination of 127.0.0.1 Lockout:
 *    If an incoming request lacks valid IP headers, assigning all visitors to "127.0.0.1" causes a critical
 *    shared Denial-of-Service (collective lockout). In non-development environments, we derive a deterministic
 *    client partition identifier from available transport headers (User-Agent, Accept-Language, Sec-CH-UA).
 *    Rate limiting is STILL strictly enforced on each partition — never failing open!
 *
 * IN-MEMORY SERVERLESS LIMITATION:
 * The 'ipStore' Map resides in local serverless instance memory. Concurrent Lambdas or multi-region instances
 * do not share memory. A distributed attacker can hit separate container instances. True enterprise distributed
 * rate limiting requires an external persistent store (such as @upstash/ratelimit with Redis).
 */
export function getClientIp(request: Request): string {
  // 1. Vercel edge-authenticated client IP header (trusted boundary on Vercel deployment)
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) {
    const candidate = vercelIp.split(",")[0].trim();
    const valid = cleanAndValidateIp(candidate);
    if (valid) return valid;
  }

  // 2. Standard single real IP header set by reverse proxy (Vercel/Nginx/Cloudflare)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    const valid = cleanAndValidateIp(realIp);
    if (valid) return valid;
  }

  // 3. Fallback to rightmost proxy IP in standard multi-hop X-Forwarded-For
  // In standard reverse proxy configurations, the proxy appends the connecting IP
  // to the rightmost end of the header. We traverse from right to left to locate
  // the rightmost syntactically valid IP hop, resisting client-spoofed leftmost prefixes.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",").map((s) => s.trim()).filter(Boolean);
    for (let i = hops.length - 1; i >= 0; i--) {
      const valid = cleanAndValidateIp(hops[i]);
      if (valid) return valid;
    }
  }

  // 4. Missing or unresolvable IP information handling:
  // In local development/test environment on localhost, use isolated local address.
  const isProd = process.env.NODE_ENV === "production";
  const urlHost = (() => {
    try {
      return new URL(request.url).hostname;
    } catch {
      return "";
    }
  })();

  if (!isProd && (urlHost === "localhost" || urlHost === "127.0.0.1" || !urlHost)) {
    return "127.0.0.1";
  }

  // In production / preview environments, missing IP headers must NOT cause all visitors
  // to share "127.0.0.1" (which causes a shared Denial of Service / collective lockout).
  // Nor must it fail open. We derive a deterministic client partition identifier from
  // request transport attributes (User-Agent, Accept-Language, Sec-CH-UA).
  const ua = request.headers.get("user-agent") || "";
  const lang = request.headers.get("accept-language") || "";
  const chUa = request.headers.get("sec-ch-ua") || "";
  const enc = request.headers.get("accept-encoding") || "";

  const rawFingerprint = `${ua}|${lang}|${chUa}|${enc}`;
  if (rawFingerprint.trim().length > 3) {
    const hash = crypto.createHash("sha256").update(rawFingerprint).digest("hex").slice(0, 16);
    return `anon_fp_${hash}`;
  }

  // If client supplies zero transport headers, place into an isolated unidentified bucket.
  // Rate limiting (max 5 per 10m) is still strictly enforced; never fails open.
  return "anon_unidentified_client";
}
