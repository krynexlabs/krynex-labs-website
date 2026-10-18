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

console.log("\n=======================================================");
console.log("ALL 7 CRITICAL REGRESSION SUITES PASSED SUCCESSFULLY!");
console.log("=======================================================\n");
