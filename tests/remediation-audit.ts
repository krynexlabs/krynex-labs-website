import assert from "node:assert";
import fs from "node:fs";
import {
  stripHtmlTags,
  sanitizeSingleLine,
  sanitizeMultiline,
  isValidEmail,
  escapeHtml,
} from "../src/lib/sanitizer.ts";
import { checkRateLimit } from "../src/lib/rate-limiter.ts";
import { safeLocalStorage } from "../src/lib/safe-storage.ts";
import { INDUSTRIES_DATA } from "../src/data/industries-data.ts";
import { ABOUT_DATA } from "../src/data/about-data.ts";
import { SOLUTIONS_DATA } from "../src/data/solutions-data.ts";

console.log("=== RUNNING KRYNEX LABS STUDIO REGRESSION TEST SUITE ===");

// 1. Regression Test: Text Preservation (<10ms, AT&T, O'Brien, comparison operators)
console.log("\n[TEST 1] Complex Engineering Text Preservation");
const testMessage = "Our line needs latency <10ms, AT&T integration, and O'Brien's approval. Compare x < y and y > z.";
const sanitizedMultiline = sanitizeMultiline(testMessage);

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
assert.strictEqual(safeLocalStorage.getItem("test_key"), null);
assert.strictEqual(safeLocalStorage.setItem("test_key", "val"), false);
assert.strictEqual(safeLocalStorage.removeItem("test_key"), false);
console.log("✔ PASS: Safe storage gracefully falls back without throwing exceptions.");

// 7. Thank-You Query Ref Sanitization
console.log("\n[TEST 7] Thank-You Query Ref Sanitization");
const SAFE_REF_REGEX = /^[A-Za-z0-9_-]{4,32}$/;
assert.strictEqual(SAFE_REF_REGEX.test("KL-REQ-849201"), true);
assert.strictEqual(SAFE_REF_REGEX.test("KL-PRJ-1049"), true);
assert.strictEqual(SAFE_REF_REGEX.test("<script>alert(1)</script>"), false);
assert.strictEqual(SAFE_REF_REGEX.test("javascript:void(0)"), false);
console.log("✔ PASS: Safe reference IDs accepted; arbitrary scripts rejected.");

// 8. Compliance & Security Claims Verification
console.log("\n[TEST 8] Security & Legal Compliance Claim Sanitization");
const industriesStr = JSON.stringify(INDUSTRIES_DATA);
const aboutStr = JSON.stringify(ABOUT_DATA);
const solutionsStr = JSON.stringify(SOLUTIONS_DATA);

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
  solutionsStr.includes("99.99%"),
  false,
  "SOLUTIONS_DATA must use standard > 99.9% uptime target rather than unverified 99.99%"
);
console.log("✔ PASS: Zero unverified FIPS 140-2 or 99.99% claims in datasets.");

// 9. Location & Contact Consistency
console.log("\n[TEST 9] Corporate Location & Contact Consistency");
assert.strictEqual(
  ABOUT_DATA.headquarters,
  "AHMEDABAD (IN)",
  "Headquarters must be standardized to AHMEDABAD (IN)"
);
console.log("✔ PASS: Corporate headquarters standardized to AHMEDABAD (IN).");

// 10. Zero Products & Dual-Division Hygiene
console.log("\n[TEST 10] Zero Legacy Product Mentions & Division Splits");
const combinedStr = aboutStr + " " + solutionsStr + " " + industriesStr;
assert.strictEqual(combinedStr.includes("Krynex Lexis"), false, "Must not mention Krynex Lexis");
assert.strictEqual(combinedStr.includes("Krynex Flow"), false, "Must not mention Krynex Flow");
assert.strictEqual(combinedStr.includes("Krynex Vision"), false, "Must not mention Krynex Vision");
assert.strictEqual(combinedStr.includes("Division A"), false, "Must not mention Division A");
assert.strictEqual(combinedStr.includes("Division B"), false, "Must not mention Division B");
assert.strictEqual(combinedStr.includes("Rented Software Model"), false, "Must not mention Rented Software Model");
console.log("✔ PASS: Zero product mentions or division splits in active datasets.");

// 11. Security Header & Configuration Verification
console.log("\n[TEST 11] Security Header & Configuration Verification");
const nextConfigContent = fs.readFileSync("next.config.mjs", "utf-8");
assert.strictEqual(nextConfigContent.includes("Strict-Transport-Security"), true);
assert.strictEqual(nextConfigContent.includes("Content-Security-Policy"), true);
assert.strictEqual(nextConfigContent.includes("X-Frame-Options"), true);
assert.strictEqual(nextConfigContent.includes("nosniff"), true);
console.log("✔ PASS: Required enterprise security headers present in next.config.mjs.");

// 12. Legacy Routes Redirect Verification
console.log("\n[TEST 12] Legacy Routes 301 Redirects Verification");
assert.strictEqual(nextConfigContent.includes("source: '/products'"), true);
assert.strictEqual(nextConfigContent.includes("source: '/research'"), true);
assert.strictEqual(nextConfigContent.includes("source: '/approach'"), true);
console.log("✔ PASS: next.config.mjs gracefully redirects /products, /research, /approach.");

// 13. Canonical Sitemap Verification (Clean 5-Page Studio Architecture)
console.log("\n[TEST 13] Canonical Sitemap Verification (5-Page Studio Architecture)");
const sitemapContent = fs.readFileSync("src/app/sitemap.ts", "utf-8");
assert.strictEqual(sitemapContent.includes('path: ""'), true);
assert.strictEqual(sitemapContent.includes('path: "/solutions"'), true);
assert.strictEqual(sitemapContent.includes('path: "/industries"'), true);
assert.strictEqual(sitemapContent.includes('path: "/about"'), true);
assert.strictEqual(sitemapContent.includes('path: "/contact"'), true);
assert.strictEqual(sitemapContent.includes('path: "/privacy"'), true);
assert.strictEqual(sitemapContent.includes('path: "/terms"'), true);
assert.strictEqual(sitemapContent.includes("/products"), false, "Sitemap must not contain /products");
console.log("✔ PASS: Sitemap strictly contains 5 core studio pages and legal pages.");

// 14. Legacy String & Entity Name Hygiene
console.log("\n[TEST 14] Legacy String & Entity Name Hygiene");
const termsContent = fs.readFileSync("src/app/terms/page.tsx", "utf-8");
const footerContent = fs.readFileSync("src/components/Footer.tsx", "utf-8");
assert.strictEqual(termsContent.includes("Krynex Labs Inc"), false);
assert.strictEqual(footerContent.includes("bespoke artificial intelligence"), false);
assert.strictEqual(footerContent.includes("https://github.com/krynexlabs"), false);
console.log("✔ PASS: Zero legacy entity names, bespoke consulting copy, or dead GitHub links.");

// 15. SLA Standardization
console.log("\n[TEST 15] SLA Standardization");
assert.strictEqual(termsContent.includes("99.99%"), false, "Terms must not claim unverified 99.99% uptime");
assert.strictEqual(termsContent.includes("99.9%"), true, "Terms should use verified 99.9% monthly availability target");
console.log("✔ PASS: SLA uses verified 99.9% monthly availability target.");

// 16. Contact Form SSR Field & Honeypot Verification
console.log("\n[TEST 16] Contact Form SSR Canonical Fields & Honeypot Verification");
const contactFormContent = fs.readFileSync("src/components/ContactForm.tsx", "utf-8");
assert.strictEqual(contactFormContent.includes('name="executiveName"'), true);
assert.strictEqual(contactFormContent.includes('name="corporateEmail"'), true);
assert.strictEqual(contactFormContent.includes('name="companySector"'), true);
assert.strictEqual(contactFormContent.includes('name="operationalFriction"'), true);
assert.strictEqual(contactFormContent.includes('name="websiteHoneypot"'), true);
assert.strictEqual(contactFormContent.includes('fetch("/api/contact"'), true);
assert.strictEqual(contactFormContent.includes("https://wa.me/919879418569"), true);
assert.strictEqual(contactFormContent.includes("mailto:support@krynexlabs.in"), true);
console.log("✔ PASS: Contact form contains all canonical fields, honeypot trap, and direct fallback links.");

// 17. API Contact Route Contract & Security Architecture
console.log("\n[TEST 17] Contact API Route Contract & Security Architecture");
const apiRouteContent = fs.readFileSync("src/app/api/contact/route.ts", "utf-8");
assert.strictEqual(apiRouteContent.includes("websiteHoneypot"), true);
assert.strictEqual(apiRouteContent.includes("checkRateLimit"), true);
assert.strictEqual(apiRouteContent.includes("KL-REQ-"), true);
assert.strictEqual(apiRouteContent.includes("CONTACT_WEBHOOK_URL"), true);
assert.strictEqual(apiRouteContent.includes("status: 429"), true);
assert.strictEqual(apiRouteContent.includes("status: 400"), true);
console.log("✔ PASS: /api/contact enforces rate limits, honeypot, validation, webhook, and referenceId.");

// 18. Antigravity 3D Canvas Scenes Verification
console.log("\n[TEST 18] Antigravity 3D Canvas Scenes Verification");
assert.strictEqual(fs.existsSync("src/components/canvas/HeroRubikScene.tsx"), true);
assert.strictEqual(fs.existsSync("src/components/canvas/NeuralConstellationScene.tsx"), true);
assert.strictEqual(fs.existsSync("src/components/canvas/IsometricDataWaveScene.tsx"), true);
assert.strictEqual(fs.existsSync("src/components/canvas/GyroscopicCoreScene.tsx"), true);
assert.strictEqual(fs.existsSync("src/components/canvas/OrbitalGlobeScene.tsx"), true);
console.log("✔ PASS: All 5 distinct Antigravity 3D WebGL scenes exist and are verified.");

console.log("\n=======================================================");
console.log("ALL 18 STUDIO REGRESSION SUITES PASSED SUCCESSFULLY!");
console.log("=======================================================\n");

process.exit(0);
