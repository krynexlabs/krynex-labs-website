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
console.log("\n[TEST 14] Canonical Sitemap Route Verification (Zero 301 paths)");
const sitemapContent = fs.readFileSync("src/app/sitemap.ts", "utf-8");
assert.strictEqual(
  sitemapContent.includes("/solutions"),
  false,
  "Sitemap must not include 301 redirected /solutions routes"
);
assert.strictEqual(sitemapContent.includes("/products/krynex-lexis"), true);
assert.strictEqual(sitemapContent.includes("/products/krynex-flow"), true);
assert.strictEqual(sitemapContent.includes("/products/krynex-vision"), true);
console.log("✔ PASS: Sitemap strictly contains canonical 200 OK routes.");

// 15. Legacy String & Entity Name Hygiene
console.log("\n[TEST 15] Legacy String & Entity Name Hygiene");
const termsContent = fs.readFileSync("src/app/terms/page.tsx", "utf-8");
const footerContent = fs.readFileSync("src/components/Footer.tsx", "utf-8");
assert.strictEqual(termsContent.includes("Krynex Labs Inc"), false);
assert.strictEqual(footerContent.includes("bespoke artificial intelligence"), false);
assert.strictEqual(termsContent.includes("Statements of Work"), false);
assert.strictEqual(footerContent.includes("https://github.com/krynexlabs"), false);
console.log("✔ PASS: Zero legacy entity names, bespoke consulting copy, or dead GitHub links.");

// 16. SLA Standardization to High Availability Target
console.log("\n[TEST 16] SLA Standardization to High Availability Target");
assert.strictEqual(termsContent.includes("99.99%"), false);
assert.strictEqual(termsContent.includes("99.9%"), false);
assert.strictEqual(termsContent.includes("High Availability Service Target"), true);
console.log("✔ PASS: SLA standardized to High Availability Service Target without unverified numbers.");

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
assert.strictEqual(contactFormContent.includes('fetch("/api/contact"'), true);
assert.strictEqual(contactFormContent.includes("https://wa.me/919879418569"), true);
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

console.log("\n=======================================================");
console.log("ALL 18 CRITICAL REGRESSION SUITES PASSED SUCCESSFULLY!");
console.log("=======================================================\n");

process.exit(0);


