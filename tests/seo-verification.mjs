import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

console.log("=== RUNNING ADVANCED TECHNICAL SEO & INDEXABILITY VERIFICATION ===");

const routes = [
  { file: "index.html", path: "/", canonical: "https://www.krynexlabs.in" },
  { file: "about.html", path: "/about", canonical: "https://www.krynexlabs.in/about" },
  { file: "approach.html", path: "/approach", canonical: "https://www.krynexlabs.in/approach" },
  { file: "industries.html", path: "/industries", canonical: "https://www.krynexlabs.in/industries" },
  { file: "industries/solar.html", path: "/industries/solar", canonical: "https://www.krynexlabs.in/industries/solar" },
  { file: "industries/legal.html", path: "/industries/legal", canonical: "https://www.krynexlabs.in/industries/legal" },
  { file: "products.html", path: "/products", canonical: "https://www.krynexlabs.in/products" },
  { file: "products/krynex-lawos.html", path: "/products/krynex-lawos", canonical: "https://www.krynexlabs.in/products/krynex-lawos" },
  { file: "products/solarops.html", path: "/products/solarops", canonical: "https://www.krynexlabs.in/products/solarops" },
  { file: "technology.html", path: "/technology", canonical: "https://www.krynexlabs.in/technology" },
  { file: "resources.html", path: "/resources", canonical: "https://www.krynexlabs.in/resources" },
  { file: "research.html", path: "/research", canonical: "https://www.krynexlabs.in/research" },
  { file: "solutions.html", path: "/solutions", canonical: "https://www.krynexlabs.in/solutions" },
  { file: "solutions/ai-ml.html", path: "/solutions/ai-ml", canonical: "https://www.krynexlabs.in/solutions/ai-ml" },
  { file: "solutions/cloud-data.html", path: "/solutions/cloud-data", canonical: "https://www.krynexlabs.in/solutions/cloud-data" },
  { file: "solutions/enterprise-software.html", path: "/solutions/enterprise-software", canonical: "https://www.krynexlabs.in/solutions/enterprise-software" },
  { file: "solutions/web-mobile.html", path: "/solutions/web-mobile", canonical: "https://www.krynexlabs.in/solutions/web-mobile" },
  { file: "resources/optimizing-solar-plant-yield-algorithmic-soiling-detection.html", path: "/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection", canonical: "https://www.krynexlabs.in/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection" },
  { file: "resources/deterministic-statutory-conveyancing-bilingual-property-deeds.html", path: "/resources/deterministic-statutory-conveyancing-bilingual-property-deeds", canonical: "https://www.krynexlabs.in/resources/deterministic-statutory-conveyancing-bilingual-property-deeds" },
  { file: "resources/product-led-saas-architecture-problem-first-engineering.html", path: "/resources/product-led-saas-architecture-problem-first-engineering", canonical: "https://www.krynexlabs.in/resources/product-led-saas-architecture-problem-first-engineering" },
  { file: "privacy.html", path: "/privacy", canonical: "https://www.krynexlabs.in/privacy" },
  { file: "terms.html", path: "/terms", canonical: "https://www.krynexlabs.in/terms" },
];

for (const route of routes) {
  const filePath = path.join(".next/server/app", route.file);
  assert.ok(fs.existsSync(filePath), `Static HTML file for ${route.path} must exist!`);
  const html = fs.readFileSync(filePath, "utf-8");

  // 1. Canonical tag check
  assert.ok(
    html.includes(`rel="canonical" href="${route.canonical}"`),
    `Missing or incorrect canonical for ${route.path} (expected ${route.canonical})`
  );

  // 2. Title tag check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  assert.ok(titleMatch, `Missing title for ${route.path}`);
  assert.ok(titleMatch[1].includes("Krynex Labs"), `Title must contain 'Krynex Labs' for ${route.path}`);

  // 3. Meta description check
  assert.ok(
    html.includes('name="description"'),
    `Missing meta description for ${route.path}`
  );

  // 4. JSON-LD Structured Data
  assert.ok(
    html.includes('type="application/ld+json"'),
    `Missing JSON-LD structured data for ${route.path}`
  );

  // 5. OpenGraph Tags
  assert.ok(
    html.includes('property="og:title"'),
    `Missing og:title for ${route.path}`
  );
  assert.ok(
    html.includes('property="og:image"'),
    `Missing og:image for ${route.path}`
  );

  // 6. Twitter Card Tags
  assert.ok(
    html.includes('name="twitter:card"'),
    `Missing twitter:card for ${route.path}`
  );

  // 7. Exactly one H1
  const h1Matches = html.match(/<h1\b[^>]*>/gi);
  assert.strictEqual(
    h1Matches ? h1Matches.length : 0,
    1,
    `Route ${route.path} must have EXACTLY ONE <h1> tag! Found: ${h1Matches ? h1Matches.length : 0}`
  );

  console.log(`✔ PASS: ${route.path.padEnd(32)} | Title: "${titleMatch[1].slice(0, 35)}..." | Canonical OK | OG OK | H1: 1`);
}

// 8. Sitemap Verification
console.log("\n[CHECK] Sitemap.xml generation & content");
import * as sitemapMod from "../src/app/sitemap.ts";
const sitemapFn = sitemapMod.default || sitemapMod;
const sitemapEntries = sitemapFn();
assert.strictEqual(sitemapEntries.length, 23, "Sitemap must have 23 canonical indexable routes");
for (const entry of sitemapEntries) {
  assert.ok(entry.url.startsWith("https://www.krynexlabs.in"), "All sitemap entries must start with https://www.krynexlabs.in");
  assert.ok(!entry.url.includes("/thank-you"), "Thank-you page must NOT be in sitemap");
  assert.ok(!entry.url.includes("/api"), "API routes must NOT be in sitemap");
}
// Ensure core product and resource pages are explicitly present in sitemap
assert.ok(sitemapEntries.some((e) => e.url === "https://www.krynexlabs.in/products"), "/products must be in sitemap");
assert.ok(sitemapEntries.some((e) => e.url === "https://www.krynexlabs.in/products/solarops"), "/products/solarops must be in sitemap");
assert.ok(sitemapEntries.some((e) => e.url === "https://www.krynexlabs.in/products/krynex-lawos"), "/products/krynex-lawos must be in sitemap");
assert.ok(sitemapEntries.some((e) => e.url === "https://www.krynexlabs.in/resources"), "/resources must be in sitemap");
console.log(`✔ PASS: Sitemap contains all ${sitemapEntries.length} canonical indexable URLs including /products and /resources.`);

// 9. Robots.txt Verification
console.log("\n[CHECK] Robots.txt rules & directive verification");
import * as robotsMod from "../src/app/robots.ts";
const robotsFn = robotsMod.default || robotsMod;
const robotsRules = robotsFn();
assert.strictEqual(robotsRules.sitemap, "https://www.krynexlabs.in/sitemap.xml");
assert.strictEqual(robotsRules.host, "https://www.krynexlabs.in");
const rulesArr = Array.isArray(robotsRules.rules) ? robotsRules.rules : [robotsRules.rules];
const defaultRule = rulesArr.find((r) => r.userAgent === "*");
assert.ok(defaultRule, "Default userAgent * rule must exist");
assert.ok(defaultRule.disallow.includes("/api/"), "Must disallow /api/");
assert.ok(defaultRule.disallow.includes("/thank-you"), "Must disallow /thank-you");
console.log("✔ PASS: Robots.txt rules disallow /api/ & /thank-you, declare sitemap & host.");

// 10. GA4 Conversion Tracking Verification
console.log("\n[CHECK] GA4 Key Events & Consent Mode");
const layoutHtml = fs.readFileSync(".next/server/app/index.html", "utf-8");
assert.ok(layoutHtml.includes("G-KZCMWZSRFN"), "GA4 tracking ID G-KZCMWZSRFN must be loaded");
assert.ok(layoutHtml.includes("GTM-5396X9HG"), "Google tag container GTM-5396X9HG must be loaded");
assert.ok(layoutHtml.includes("send_page_view: false"), "Initial duplicate page view must be suppressed in config");

console.log("\n=======================================================");
console.log("ALL ADVANCED TECHNICAL SEO CHECKS PASSED PERFECTLY!");
console.log("=======================================================\n");
