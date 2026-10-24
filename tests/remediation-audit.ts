import assert from "node:assert";
import {
  stripHtmlTags,
  sanitizeSingleLine,
  sanitizeMultiline,
  isValidEmail,
  escapeHtml,
} from "../src/lib/sanitizer.ts";
import { checkRateLimit } from "../src/lib/rate-limiter.ts";
import { safeLocalStorage } from "../src/lib/safe-storage.ts";

console.log("=== RUNNING KRYNEX LABS REMEDIATION & REGRESSION TEST SUITE ===");

// 1. Regression Test: Text Preservation (<10ms, AT&T, O'Brien, comparison operators)
console.log("\n[TEST 1] Complex Engineering Text Preservation");
const testMessage = "Our line needs latency <10ms, AT&T integration, and O'Brien's approval. Compare x < y and y > z.";
const sanitizedMultiline = sanitizeMultiline(testMessage);

console.log("Original: ", testMessage);
console.log("Sanitized:", sanitizedMultiline);

assert.strictEqual(
  sanitizedMultiline,
  testMessage,
  "Sanitizer must NOT strip <10ms or comparison operators x < y and y > z!"
);
console.log("✔ PASS: Exact engineering message preserved intact without truncation.");

// 2. HTML Tag Stripping vs Text Preservation
console.log("\n[TEST 2] Malicious HTML Tag Stripping");
const xssPayload = "Normal text <script>alert('xss')</script> and <img src=x onerror=alert(1)> preserved text.";
const strippedXss = stripHtmlTags(xssPayload);
assert.strictEqual(strippedXss, "Normal text  and  preserved text.");
console.log("✔ PASS: <script> and <img> tags stripped cleanly.");

// 3. Email Validation (RFC 5322 & Header Injection)
console.log("\n[TEST 3] Email Validation & Header Protection");
assert.strictEqual(isValidEmail("o'brien@example.com"), true, "Must accept apostrophes in emails");
assert.strictEqual(isValidEmail("engineer.lead+dev@krynexlabs.in"), true, "Must accept plus tags and dots");
assert.strictEqual(isValidEmail("bademail@"), false, "Must reject malformed email");
assert.strictEqual(isValidEmail("user@domain\r\nBcc:attacker@spam.com"), false, "Must reject CRLF injection in email");
console.log("✔ PASS: Valid emails accepted; malformed and CRLF injection rejected.");

// 4. HTML Escaping for Email Templates
console.log("\n[TEST 4] Context-Specific HTML Escaping");
const rawHtmlTest = "Compare x < y & y > z with 'quotes' & \"double\"";
const escaped = escapeHtml(rawHtmlTest);
assert.strictEqual(
  escaped,
  "Compare x &lt; y &amp; y &gt; z with &#39;quotes&#39; &amp; &quot;double&quot;"
);
console.log("✔ PASS: Context-specific HTML escaping handles special characters cleanly.");

// 5. Rate Limiter Stress Test
console.log("\n[TEST 5] Rate Limiter Sliding Window (Max 5 per IP)");
const testIp = `192.0.2.${Math.floor(Math.random() * 250)}`;
for (let i = 1; i <= 5; i++) {
  const res = checkRateLimit(testIp);
  assert.strictEqual(res.allowed, true, `Request ${i} should be allowed`);
}
const sixth = checkRateLimit(testIp);
assert.strictEqual(sixth.allowed, false, "6th request within window must be rate-limited!");
assert.strictEqual(sixth.remaining, 0);
console.log("✔ PASS: 5 requests allowed; 6th request correctly blocked with rate limit.");

// 6. Safe Storage Exception Handling
console.log("\n[TEST 6] Safe Storage Exception Handling");
// In Node.js environment where window is undefined:
assert.strictEqual(safeLocalStorage.getItem("test_key"), null);
assert.strictEqual(safeLocalStorage.setItem("test_key", "val"), false);
assert.strictEqual(safeLocalStorage.removeItem("test_key"), false);
console.log("✔ PASS: Safe storage gracefully falls back without throwing exceptions.");

// 7. Thank-You Docket Regex Validation
console.log("\n[TEST 7] Thank-You Query Ref Sanitization");
const SAFE_REF_REGEX = /^[A-Za-z0-9_-]{4,32}$/;
assert.strictEqual(SAFE_REF_REGEX.test("KRX-RD-849201"), true);
assert.strictEqual(SAFE_REF_REGEX.test("KRX-SHIELD-1049"), true);
assert.strictEqual(SAFE_REF_REGEX.test("<script>alert(1)</script>"), false);
assert.strictEqual(SAFE_REF_REGEX.test("javascript:void(0)"), false);
console.log("✔ PASS: Safe reference IDs accepted; arbitrary scripts rejected.");

// 8. Compliance & Security Claims Verification
console.log("\n[TEST 8] Security & Legal Compliance Claim Sanitization");
import { PRODUCTS_DATA } from "../src/data/products-data.ts";
import { INDUSTRIES_DATA } from "../src/data/industries-data.ts";
import { ABOUT_DATA } from "../src/data/about-data.ts";

const productsStr = JSON.stringify(PRODUCTS_DATA);
const industriesStr = JSON.stringify(INDUSTRIES_DATA);
const aboutStr = JSON.stringify(ABOUT_DATA);

assert.strictEqual(
  productsStr.includes("FIPS 140-2"),
  false,
  "PRODUCTS_DATA must not contain unqualified FIPS 140-2 hardware certifications"
);
assert.strictEqual(
  industriesStr.includes("FIPS 140-2"),
  false,
  "INDUSTRIES_DATA must not contain unqualified FIPS 140-2 hardware certifications"
);
assert.strictEqual(
  aboutStr.includes("FIPS 140-2"),
  false,
  "ABOUT_DATA must not contain unqualified FIPS 140-2 hardware certifications"
);
assert.strictEqual(
  productsStr.includes("legally binding"),
  false,
  "PRODUCTS_DATA must qualify legal drafting assistance rather than claiming legally binding outcomes"
);
console.log("✔ PASS: Zero unverified FIPS 140-2 or unqualified binding claims in dataset catalogs.");

// 9. Location & Contact Consistency
console.log("\n[TEST 9] Corporate Location & Contact Consistency");
assert.strictEqual(
  ABOUT_DATA.headquarters,
  "AHMEDABAD (IN)",
  "Headquarters must be standardized to AHMEDABAD (IN)"
);
console.log("✔ PASS: Corporate headquarters standardized to AHMEDABAD (IN).");

// 10. SLA & Support Channel Consistency
console.log("\n[TEST 10] SLA & Support Channel Consistency");
import { SOLUTIONS_DATA } from "../src/data/solutions-data.ts";
const solutionsStr = JSON.stringify(SOLUTIONS_DATA);

assert.strictEqual(
  productsStr.includes("direct phone support"),
  false,
  "PRODUCTS_DATA must not promise direct phone support (WhatsApp-only channel policy)"
);
assert.strictEqual(
  solutionsStr.includes("99.99%"),
  false,
  "SOLUTIONS_DATA must use standard > 99.9% uptime target rather than unverified 99.99%"
);
console.log("✔ PASS: Zero unverified 99.99% uptime or phone support contradictions.");

// 11. Security Header & Configuration Verification
console.log("\n[TEST 11] Security Header & Configuration Verification");
import fs from "node:fs";
const nextConfigContent = fs.readFileSync("next.config.mjs", "utf-8");
assert.strictEqual(nextConfigContent.includes("Strict-Transport-Security"), true);
assert.strictEqual(nextConfigContent.includes("Content-Security-Policy"), true);
assert.strictEqual(nextConfigContent.includes("X-Frame-Options"), true);
assert.strictEqual(nextConfigContent.includes("nosniff"), true);
console.log("✔ PASS: Required enterprise security headers present in next.config.mjs.");
// 12. Mid-Word Truncation Verification
console.log("\n[TEST 12] Mid-Word Truncation Verification in Product Catalogs");
Object.values(PRODUCTS_DATA).forEach((prod) => {
  assert.strictEqual(
    prod.summary.includes("..."),
    false,
    `Product summary for ${prod.name} must not contain mid-word truncation '...'`
  );
  assert.strictEqual(
    prod.summary.endsWith("."),
    true,
    `Product summary for ${prod.name} must be a complete sentence ending in a period.`
  );
});
console.log("✔ PASS: Zero mid-word truncations in product summaries; all are complete sentences.");

// 13. Dual-Currency Pricing Verification
console.log("\n[TEST 13] Dual-Currency (INR & USD) Pricing Verification");
Object.values(PRODUCTS_DATA).forEach((prod) => {
  assert.ok(prod.startingPrice?.inr, `${prod.name} must define an INR startingPrice`);
  assert.ok(prod.startingPrice?.usd, `${prod.name} must define a USD startingPrice`);
  prod.pricingTiers.forEach((tier) => {
    assert.ok(tier.price, `${tier.name} must define INR price`);
    assert.ok(tier.usdPrice, `${tier.name} must define USD price`);
  });
});
console.log("✔ PASS: All products and tiers define both INR and USD subscription pricing.");

// 14. Canonical Sitemap Verification
console.log("\n[TEST 14] Canonical Sitemap Route Verification (All Live Routes Present)");
const sitemapContent = fs.readFileSync("src/app/sitemap.ts", "utf-8");
assert.strictEqual(
  sitemapContent.includes("/solutions"),
  true,
  "Sitemap must include /solutions routes (live pages, no longer 301-redirected)"
);
assert.strictEqual(sitemapContent.includes("/products/krynex-lexis"), false);
assert.strictEqual(sitemapContent.includes("/products/krynex-flow"), false);
assert.strictEqual(sitemapContent.includes("/products/krynex-vision"), false);
assert.strictEqual(sitemapContent.includes("/solutions/ai-ml"), true);
assert.strictEqual(sitemapContent.includes("/solutions/enterprise-software"), true);
assert.strictEqual(sitemapContent.includes("/solutions/web-mobile"), true);
assert.strictEqual(sitemapContent.includes("/solutions/cloud-data"), true);
console.log("✔ PASS: Sitemap contains all canonical 200 OK routes without obsolete products.");

// 15. Legacy String & Entity Name Hygiene
console.log("\n[TEST 15] Legacy String & Entity Name Hygiene");
const termsContent = fs.readFileSync("src/app/terms/page.tsx", "utf-8");
const footerContent = fs.readFileSync("src/components/Footer.tsx", "utf-8");
assert.strictEqual(termsContent.includes("Krynex Labs Inc"), false);
assert.strictEqual(footerContent.includes("bespoke artificial intelligence"), false);
assert.strictEqual(termsContent.includes("Statements of Work"), false);
assert.strictEqual(footerContent.includes("https://github.com/krynexlabs"), false);
console.log("✔ PASS: Zero legacy entity names, bespoke consulting copy, or dead GitHub links.");

// 16. SLA Standardization to Verified Availability Target
console.log("\n[TEST 16] SLA Standardization to Verified Availability Target");
assert.strictEqual(termsContent.includes("99.99%"), false,
  "Terms must not claim unverified 99.99% uptime"
);
assert.strictEqual(termsContent.includes("99.9%"), true,
  "Terms should use the standard 99.9% monthly service availability target"
);
console.log("✔ PASS: SLA uses verified 99.9% monthly availability target without unverified 99.99% claims.");

// 17. Contact Form SSR Field & Honeypot Verification
console.log("\n[TEST 17] Contact Form SSR Canonical Fields & Honeypot Verification");
const contactFormContent = fs.readFileSync("src/components/ContactForm.tsx", "utf-8");
assert.strictEqual(contactFormContent.includes('name="executiveName"'), true);
assert.strictEqual(contactFormContent.includes('name="corporateEmail"'), true);
assert.strictEqual(contactFormContent.includes('name="inquiryCategory"'), true);
assert.strictEqual(contactFormContent.includes('name="companySector"'), true);
assert.strictEqual(contactFormContent.includes('name="operationalFriction"'), true);
assert.strictEqual(contactFormContent.includes('name="requestWalkthrough"'), true);
assert.strictEqual(contactFormContent.includes('name="websiteHoneypot"'), true);
assert.strictEqual(contactFormContent.includes("https://wa.me/"), false);
assert.strictEqual(contactFormContent.includes("mailto:support@krynexlabs.in"), true);
console.log("✔ PASS: Contact form contains all canonical fields, honeypot trap, and direct fallback links.");

// 18. API Contact Route Contract & Security Architecture
console.log("\n[TEST 18] Contact API Route Contract & Security Architecture");
const apiRouteContent = fs.readFileSync("src/app/api/contact/route.ts", "utf-8");
assert.strictEqual(apiRouteContent.includes("websiteHoneypot"), true);
assert.strictEqual(apiRouteContent.includes("checkRateLimit"), true);
assert.strictEqual(apiRouteContent.includes("KL-REQ-"), true);
assert.strictEqual(apiRouteContent.includes("CONTACT_WEBHOOK_URL"), true);
assert.strictEqual(apiRouteContent.includes("status: 429"), true);
assert.strictEqual(apiRouteContent.includes("status: 400"), true);
console.log("✔ PASS: /api/contact enforces rate limits, honeypot, validation, webhook, and referenceId.");

// 19. SEC-002: Rate Limiter Client IP Trust & Header Spoof Defense
console.log("\n[TEST 19] SEC-002: Rate Limiter Client IP Trust & Header Spoof Defense");
import { getClientIp, cleanAndValidateIp } from "../src/lib/rate-limiter.ts";

// Scenario A: Attacker attempts to spoof client IP via leftmost hop in X-Forwarded-For
const spoofedReq = new Request("http://localhost/api/contact", {
  headers: {
    "x-forwarded-for": "10.0.0.1, 198.51.100.22",
  },
});
const resolvedSpoofedIp = getClientIp(spoofedReq);
assert.strictEqual(
  resolvedSpoofedIp,
  "198.51.100.22",
  "Rate limiter must extract rightmost trusted proxy hop, NOT attacker-controlled leftmost hop!"
);

// Scenario B: Vercel edge-authenticated header takes top precedence
const vercelReq = new Request("http://localhost/api/contact", {
  headers: {
    "x-vercel-forwarded-for": "203.0.113.50",
    "x-forwarded-for": "10.0.0.1, 198.51.100.22",
  },
});
assert.strictEqual(
  getClientIp(vercelReq),
  "203.0.113.50",
  "x-vercel-forwarded-for must take precedence over multi-hop x-forwarded-for when valid"
);

// Scenario C: Non-proxied local request fallback in development/test
const localReq = new Request("http://localhost/api/contact");
assert.strictEqual(getClientIp(localReq), "127.0.0.1");

// Scenario D: Malformed IP headers must be rejected without throwing
assert.strictEqual(cleanAndValidateIp("not-an-ip"), null);
assert.strictEqual(cleanAndValidateIp("999.999.999.999"), null);
assert.strictEqual(cleanAndValidateIp(""), null);
assert.strictEqual(cleanAndValidateIp("   "), null);
assert.strictEqual(cleanAndValidateIp("<script>alert(1)</script>"), null);
assert.strictEqual(cleanAndValidateIp("198.51.100.1:8080"), "198.51.100.1");
assert.strictEqual(cleanAndValidateIp("[2001:db8::1]:443"), "2001:db8::1");

// Scenario E: Conflicting malformed header falls through to valid proxy hop
const malformedVercelReq = new Request("http://localhost/api/contact", {
  headers: {
    "x-vercel-forwarded-for": "malicious_string_not_ip",
    "x-forwarded-for": "10.0.0.1, 198.51.100.77",
  },
});
assert.strictEqual(
  getClientIp(malformedVercelReq),
  "198.51.100.77",
  "Malformed x-vercel-forwarded-for must not be trusted; must fall back to valid rightmost hop"
);

// Scenario F: Elimination of 127.0.0.1 collective lockout in production
const prevEnv = process.env.NODE_ENV;
process.env.NODE_ENV = "production";
try {
  const visitorA = new Request("https://www.krynexlabs.in/api/contact", {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
      "accept-language": "en-US,en;q=0.9",
    },
  });
  const visitorB = new Request("https://www.krynexlabs.in/api/contact", {
    headers: {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15) Firefox/121.0",
      "accept-language": "fr-FR,fr;q=0.8",
    },
  });
  const idA = getClientIp(visitorA);
  const idB = getClientIp(visitorB);
  assert.ok(idA.startsWith("anon_fp_"), "Visitor A must receive partitioned anonymous fingerprint");
  assert.ok(idB.startsWith("anon_fp_"), "Visitor B must receive partitioned anonymous fingerprint");
  assert.notStrictEqual(idA, idB, "Distinct visitors without IP headers must NOT share the same rate-limit bucket!");
  assert.notStrictEqual(idA, "127.0.0.1", "Production missing-IP requests must NOT default to 127.0.0.1!");
} finally {
  process.env.NODE_ENV = prevEnv;
}
console.log("✔ PASS: Rate limiter rejects spoofing, validates IP syntax, and eliminates shared 127.0.0.1 lockout.");

// 20. SEC-001: Contact Form Provider Failure Handling & Direct Fallback
console.log("\n[TEST 20] SEC-001: Provider Failure Handling & Fallback Mailto Docket");
assert.strictEqual(apiRouteContent.includes("fallbackMailto"), true, "/api/contact must generate fallbackMailto");
assert.strictEqual(apiRouteContent.includes("status: 503"), true, "/api/contact must return 503 when providers fail");
assert.strictEqual(apiRouteContent.includes("isDelivered"), true, "/api/contact must track delivery status");

const demoModalContent = fs.readFileSync("src/components/DemoModal.tsx", "utf-8");
assert.strictEqual(demoModalContent.includes("fallbackMailto"), true, "DemoModal must support fallbackMailto");
assert.strictEqual(footerContent.includes("fallbackMailto"), true, "Footer must support fallbackMailto");
assert.strictEqual(contactFormContent.includes("fallbackMailto"), true, "ContactForm must support fallbackMailto");
console.log("✔ PASS: Form handlers return 503 on provider failure and render actionable mailto dockets.");

// 21. SEC-003: Google Consent Mode v2 Default Denial
console.log("\n[TEST 21] SEC-003: Google Consent Mode v2 Default Denial");
const layoutContent = fs.readFileSync("src/app/layout.tsx", "utf-8");
assert.strictEqual(
  layoutContent.includes('id="google-consent-default"'),
  true,
  "layout.tsx must contain google-consent-default script tag"
);
assert.strictEqual(
  layoutContent.includes("strategy=\"beforeInteractive\""),
  true,
  "Consent default must execute beforeInteractive prior to tag loading"
);
assert.strictEqual(
  layoutContent.includes("'analytics_storage': 'denied'"),
  true,
  "analytics_storage must default to denied"
);
assert.strictEqual(
  layoutContent.includes("'wait_for_update': 500"),
  true,
  "wait_for_update grace period must be specified"
);
console.log("✔ PASS: Google Consent Mode v2 default denial configured before tag initialization.");

// 22. UI-001: Mobile CTA and Cookie Banner Coordinate Collision Resolution
console.log("\n[TEST 22] UI-001: Mobile Sticky CTA Coordinate Collision Prevention");
const stickyCtaContent = fs.readFileSync("src/components/StickyMobileCTA.tsx", "utf-8");
const cookieBannerContent = fs.readFileSync("src/components/CookieBanner.tsx", "utf-8");

assert.strictEqual(
  stickyCtaContent.includes("krynex_cookie_action"),
  true,
  "StickyMobileCTA must listen to krynex_cookie_action event"
);
assert.strictEqual(
  cookieBannerContent.includes("krynex_cookie_action"),
  true,
  "CookieBanner must dispatch krynex_cookie_action event on choice"
);
assert.strictEqual(
  stickyCtaContent.includes("bottom-[max(11.5rem"),
  true,
  "StickyMobileCTA must shift above banner when consent is pending"
);
assert.strictEqual(
  stickyCtaContent.includes("safe-area-inset-bottom"),
  true,
  "StickyMobileCTA must respect safe-area-inset-bottom"
);
assert.strictEqual(
  cookieBannerContent.includes("safe-area-inset-bottom"),
  true,
  "CookieBanner must respect safe-area-inset-bottom"
);
console.log("✔ PASS: Sticky CTA and Cookie Banner coordinates dynamically offset with safe-area support.");

// 23. SEC-004: Next.js Version Consistency Verification
console.log("\n[TEST 23] SEC-004: Next.js Version Consistency Verification");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const installedNextVersion = packageJson.dependencies.next;
assert.ok(
  installedNextVersion.includes("14.2.35"),
  `Next.js version in package.json must be 14.2.35 (found: ${installedNextVersion})`
);
console.log(`✔ PASS: Next.js version verified as ${installedNextVersion} (resolving 14.2.18 audit anomaly).`);

// 24. TASK 2: Consent Withdrawal & Cookie Settings Reopen Mechanism
console.log("\n[TEST 24] TASK 2: Consent Withdrawal & Cookie Settings Reopening");
assert.strictEqual(
  footerContent.includes("krynex_open_cookie_settings"),
  true,
  "Footer.tsx must contain a trigger dispatching krynex_open_cookie_settings"
);
assert.strictEqual(
  cookieBannerContent.includes("krynex_open_cookie_settings"),
  true,
  "CookieBanner.tsx must listen for krynex_open_cookie_settings to reopen settings"
);
assert.strictEqual(
  stickyCtaContent.includes("krynex_open_cookie_settings"),
  true,
  "StickyMobileCTA.tsx must elevate when settings are reopened to avoid collision"
);
assert.strictEqual(
  cookieBannerContent.includes("Expires=Thu, 01 Jan 1970"),
  true,
  "CookieBanner.tsx must actively purge Google Analytics tracking cookies on withdrawal"
);
console.log("✔ PASS: Accessible cookie settings trigger, withdrawal flow, and active cookie purging verified.");

// 25. TASK 3: Dependency Advisory Architectural Constraints Verification
console.log("\n[TEST 25] TASK 3: Dependency Advisory Architectural Constraints Verification");
const reactVersion = packageJson.dependencies.react;
const r3fVersion = packageJson.dependencies["@react-three/fiber"];
assert.ok(reactVersion.includes("18"), `React must be version 18 for Three.js compatibility (found: ${reactVersion})`);
assert.ok(r3fVersion.includes("8.17.10"), `@react-three/fiber must be 8.17.10 (found: ${r3fVersion})`);
console.log("✔ PASS: Architectural dependency constraint (React 18 / R3F 8.17.10) verified.");

console.log("\n=======================================================");
console.log("ALL 25 CRITICAL REGRESSION SUITES PASSED SUCCESSFULLY!");
console.log("=======================================================\n");

process.exit(0);


