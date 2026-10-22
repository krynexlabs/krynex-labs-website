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

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list of IPs; first one is the client
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
