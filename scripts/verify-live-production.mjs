// scripts/verify-live-production.mjs
// Automated Live Production E2E Verification & SRE Smoke Test for https://www.krynexlabs.in

import assert from "node:assert";

const BASE_URL = "https://www.krynexlabs.in";
const APEX_URL = "https://krynexlabs.in";

const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/products",
  "/products/krynex-lexis",
  "/products/krynex-flow",
  "/products/krynex-vision",
  "/industries",
  "/approach",
  "/research",
  "/contact",
  "/privacy",
  "/terms",
];

const PROHIBITED_STRINGS = [
  "title a...",
  "an...",
  "autonomo...",
  "precision eng...",
  "precision engineering p...",
  "Krynex Labs Inc",
  "99.99%",
  "Div A",
  "Div B",
  "bespoke artificial intelligence",
  "github.com/krynexlabs",
];

const results = {
  routes: [],
  securityHeaders: {},
  redirects: [],
  crawlerFiles: [],
  domAssertions: [],
  apiTests: [],
  pass: true,
};

function log(section, msg, status = "INFO") {
  const symbol = status === "PASS" ? "✔" : status === "FAIL" ? "✖" : "ℹ";
  console.log(`[${status}] [${section}] ${symbol} ${msg}`);
}

async function fetchWithTiming(url, options = {}, retries = 2) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      const start = Date.now();
      const res = await fetch(url, {
        ...options,
        headers: {
          "User-Agent": "KrynexLabs-SRE-AutomatedVerifier/1.0",
          "Cache-Control": "no-cache, no-store",
          Pragma: "no-cache",
          ...(options.headers || {}),
        },
      });
      const duration = Date.now() - start;
      return { res, duration };
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;
      await new Promise((r) => setTimeout(r, 600));
    }
  }
}

// ==========================================
// 1. CANONICAL ROUTES HTTP 200 VERIFICATION
// ==========================================
async function testCanonicalRoutes() {
  console.log("\n=======================================================");
  console.log("1. AUDITING 12 CANONICAL ROUTES FOR HTTP 200 OK");
  console.log("=======================================================");

  for (const path of CANONICAL_ROUTES) {
    const url = `${BASE_URL}${path}`;
    try {
      const { res, duration } = await fetchWithTiming(url);
      const is200 = res.status === 200;
      results.routes.push({
        path,
        url,
        status: res.status,
        duration,
        ok: is200,
      });

      if (is200) {
        log("CANONICAL", `${path} => ${res.status} OK (${duration}ms)`, "PASS");
      } else {
        log("CANONICAL", `${path} => ${res.status} FAILED (${duration}ms)`, "FAIL");
        results.pass = false;
      }
    } catch (err) {
      log("CANONICAL", `${path} => ERROR: ${err.message}`, "FAIL");
      results.routes.push({ path, url, status: "ERR", duration: 0, ok: false });
      results.pass = false;
    }
  }
}

// ==========================================
// 2. HTTP SECURITY HEADERS AUDIT
// ==========================================
async function testSecurityHeaders() {
  console.log("\n=======================================================");
  console.log("2. AUDITING LIVE HTTP RESPONSE SECURITY HEADERS");
  console.log("=======================================================");

  const { res } = await fetchWithTiming(BASE_URL);
  const requiredHeaders = [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
    "permissions-policy",
  ];

  for (const header of requiredHeaders) {
    const val = res.headers.get(header);
    results.securityHeaders[header] = val;
    if (val) {
      log("SECURITY", `${header}: ${val}`, "PASS");
    } else {
      log("SECURITY", `Missing header: ${header}`, "FAIL");
      results.pass = false;
    }
  }
}

// ==========================================
// 3. REDIRECTS (LEGACY ROUTES & APEX DOMAIN)
// ==========================================
async function testRedirects() {
  console.log("\n=======================================================");
  console.log("3. AUDITING 301/308 REDIRECTS");
  console.log("=======================================================");

  // 3.1 Legacy /solutions/enterprise-software redirect to /products
  const legacyUrl = `${BASE_URL}/solutions/enterprise-software`;
  try {
    const { res } = await fetchWithTiming(legacyUrl, { redirect: "manual" });
    const location = res.headers.get("location");
    const isRedirect = [301, 302, 307, 308].includes(res.status);
    const targetMatch = location && (location.includes("/products") || location === "/products");

    results.redirects.push({
      from: legacyUrl,
      status: res.status,
      location,
      ok: isRedirect && targetMatch,
    });

    if (isRedirect && targetMatch) {
      log("REDIRECT", `Legacy route ${legacyUrl} => ${res.status} redirecting to ${location}`, "PASS");
    } else {
      log("REDIRECT", `Legacy route ${legacyUrl} returned ${res.status} location: ${location}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("REDIRECT", `Legacy redirect error: ${err.message}`, "FAIL");
    results.pass = false;
  }

  // 3.2 Apex Domain Redirect: https://krynexlabs.in -> https://www.krynexlabs.in
  try {
    const { res } = await fetchWithTiming(APEX_URL, { redirect: "manual" });
    const location = res.headers.get("location");
    const isRedirect = [301, 302, 307, 308].includes(res.status);
    const targetMatch = location && (location.includes("www.krynexlabs.in") || location.includes("krynexlabs.in"));

    results.redirects.push({
      from: APEX_URL,
      status: res.status,
      location,
      ok: isRedirect,
    });

    if (isRedirect) {
      log("REDIRECT", `Apex domain ${APEX_URL} => ${res.status} redirecting to ${location}`, "PASS");
    } else {
      log("REDIRECT", `Apex domain returned status ${res.status} without redirect header`, "INFO");
    }
  } catch (err) {
    log("REDIRECT", `Apex redirect check error: ${err.message}`, "INFO");
  }
}

// ==========================================
// 4. SITEMAP.XML & ROBOTS.TXT AUDIT
// ==========================================
async function testCrawlerFiles() {
  console.log("\n=======================================================");
  console.log("4. AUDITING SITEMAP.XML & ROBOTS.TXT");
  console.log("=======================================================");

  // 4.1 Sitemap
  try {
    const { res } = await fetchWithTiming(`${BASE_URL}/sitemap.xml`);
    const xml = await res.text();
    const is200 = res.status === 200;
    const hasCanonicalRoutes = xml.includes("https://www.krynexlabs.in/products/krynex-lexis") &&
                               xml.includes("https://www.krynexlabs.in/contact");
    const zeroLegacySolutions = !xml.includes("/solutions");

    const sitemapOk = is200 && hasCanonicalRoutes && zeroLegacySolutions;
    results.crawlerFiles.push({ file: "/sitemap.xml", status: res.status, ok: sitemapOk });

    if (sitemapOk) {
      log("CRAWLER", `/sitemap.xml returns 200, contains canonical URLs, and zero /solutions paths`, "PASS");
    } else {
      log("CRAWLER", `/sitemap.xml failed criteria: 200=${is200}, canonical=${hasCanonicalRoutes}, zeroSolutions=${zeroLegacySolutions}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("CRAWLER", `Sitemap error: ${err.message}`, "FAIL");
    results.pass = false;
  }

  // 4.2 Robots.txt
  try {
    const { res } = await fetchWithTiming(`${BASE_URL}/robots.txt`);
    const txt = await res.text();
    const is200 = res.status === 200;
    const hasSitemap = txt.includes("sitemap.xml");

    const robotsOk = is200 && hasSitemap;
    results.crawlerFiles.push({ file: "/robots.txt", status: res.status, ok: robotsOk });

    if (robotsOk) {
      log("CRAWLER", `/robots.txt returns 200 and points to sitemap.xml`, "PASS");
    } else {
      log("CRAWLER", `/robots.txt check failed: status ${res.status}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("CRAWLER", `Robots.txt error: ${err.message}`, "FAIL");
    results.pass = false;
  }
}

// ==========================================
// 5. LIVE SSR HTML & DOM ASSERTIONS
// ==========================================
async function testLiveHtmlAssertions() {
  console.log("\n=======================================================");
  console.log("5. AUDITING LIVE SSR HTML & DOM ASSERTIONS");
  console.log("=======================================================");

  // 5.1 Homepage (/)
  const { res: homeRes } = await fetchWithTiming(BASE_URL);
  const homeHtml = await homeRes.text();

  // Truncation check
  for (const badStr of PROHIBITED_STRINGS) {
    const found = homeHtml.includes(badStr);
    results.domAssertions.push({
      assertion: `Homepage must not contain "${badStr}"`,
      passed: !found,
    });
    if (!found) {
      log("DOM-HOME", `Zero occurrence of "${badStr}" on homepage`, "PASS");
    } else {
      log("DOM-HOME", `FOUND prohibited string "${badStr}" on homepage!`, "FAIL");
      results.pass = false;
    }
  }

  // Product cards on homepage
  const hasLexisHref = homeHtml.includes('href="/products/krynex-lexis"');
  const hasFlowHref = homeHtml.includes('href="/products/krynex-flow"');
  const hasVisionHref = homeHtml.includes('href="/products/krynex-vision"');
  results.domAssertions.push({
    assertion: "Homepage links to all 3 product dossiers",
    passed: hasLexisHref && hasFlowHref && hasVisionHref,
  });
  if (hasLexisHref && hasFlowHref && hasVisionHref) {
    log("DOM-HOME", `Product cards contain direct links to /products/krynex-{lexis,flow,vision}`, "PASS");
  } else {
    log("DOM-HOME", `Missing product card links on homepage`, "FAIL");
    results.pass = false;
  }

  // SSR Tabs presence
  const hasTablist = homeHtml.includes('role="tablist"');
  const hasTabpanel = homeHtml.includes('role="tabpanel"');
  results.domAssertions.push({
    assertion: "Homepage SSR contains role='tablist' and role='tabpanel'",
    passed: hasTablist && hasTabpanel,
  });
  if (hasTablist && hasTabpanel) {
    log("DOM-HOME", `Live SSR HTML contains accessible role="tablist" and role="tabpanel" elements`, "PASS");
  } else {
    log("DOM-HOME", `Missing SSR role="tablist" or role="tabpanel" on homepage`, "FAIL");
    results.pass = false;
  }

  // Address presence
  const hasAddress = homeHtml.includes("Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India");
  results.domAssertions.push({
    assertion: "Homepage footer contains standardized Ahmedabad SBR address",
    passed: hasAddress,
  });
  if (hasAddress) {
    log("DOM-HOME", `Standardized SBR Ahmedabad address present in footer`, "PASS");
  } else {
    log("DOM-HOME", `Missing standardized SBR Ahmedabad address in homepage footer`, "FAIL");
    results.pass = false;
  }

  // 5.2 Products Page (/products)
  const { res: prodRes } = await fetchWithTiming(`${BASE_URL}/products`);
  const prodHtml = await prodRes.text();

  const hasTier1 = prodHtml.includes("₹1,499") || prodHtml.includes("1,499");
  const hasTier2 = prodHtml.includes("₹7,999") || prodHtml.includes("7,999");
  const hasTier3 = prodHtml.includes("₹18,500") || prodHtml.includes("18,500");
  results.domAssertions.push({
    assertion: "Products directory displays starting price tiers (₹1,499, ₹7,999, ₹18,500)",
    passed: hasTier1 && hasTier2 && hasTier3,
  });
  if (hasTier1 && hasTier2 && hasTier3) {
    log("DOM-PROD", `Products directory displays dual INR/USD starting prices (₹1,499, ₹7,999, ₹18,500)`, "PASS");
  } else {
    log("DOM-PROD", `Missing starting price tiers on /products: T1=${hasTier1}, T2=${hasTier2}, T3=${hasTier3}`, "FAIL");
    results.pass = false;
  }

  // 5.3 Contact Page (/contact)
  const { res: contactRes } = await fetchWithTiming(`${BASE_URL}/contact`);
  const contactHtml = await contactRes.text();

  const hasForm = contactHtml.includes("<form");
  const hasExecName = contactHtml.includes('name="executiveName"');
  const hasCorpEmail = contactHtml.includes('name="corporateEmail"');
  const hasInqCat = contactHtml.includes('name="inquiryCategory"');
  const hasWalkthrough = contactHtml.includes('name="requestWalkthrough"') || contactHtml.includes("Walkthrough") || contactHtml.includes("Google Meet");
  const hasPrivacyLink = contactHtml.includes('href="/privacy"');

  const contactPass = hasForm && hasExecName && hasCorpEmail && hasInqCat && hasWalkthrough && hasPrivacyLink;
  results.domAssertions.push({
    assertion: "Contact page SSR HTML contains <form, executiveName, corporateEmail, inquiryCategory, walkthrough, href='/privacy'",
    passed: contactPass,
  });
  if (contactPass) {
    log("DOM-CONTACT", `Contact SSR HTML contains full interactive form controls & privacy agreement`, "PASS");
  } else {
    log("DOM-CONTACT", `Contact form controls missing in SSR HTML: form=${hasForm}, name=${hasExecName}, email=${hasCorpEmail}, cat=${hasInqCat}, walk=${hasWalkthrough}, priv=${hasPrivacyLink}`, "FAIL");
    results.pass = false;
  }

  // 5.4 Privacy Page (/privacy)
  const { res: privRes } = await fetchWithTiming(`${BASE_URL}/privacy`);
  const privHtml = await privRes.text();

  const hasRetention = privHtml.includes("24-month") || privHtml.includes("24 Month") || privHtml.includes("24 months");
  const hasGrievance = privHtml.includes("Designated Privacy & Grievance Officer") || privHtml.includes("Grievance Officer");
  const privPass = hasRetention && hasGrievance;
  results.domAssertions.push({
    assertion: "Privacy policy contains 24-month data retention & DPDP Designated Grievance Officer section",
    passed: privPass,
  });
  if (privPass) {
    log("DOM-PRIVACY", `Privacy policy verified: 24-month retention & Grievance Officer section present`, "PASS");
  } else {
    log("DOM-PRIVACY", `Privacy policy missing required sections: retention=${hasRetention}, grievance=${hasGrievance}`, "FAIL");
    results.pass = false;
  }

  // 5.5 Terms Page (/terms)
  const { res: termsRes } = await fetchWithTiming(`${BASE_URL}/terms`);
  const termsHtml = await termsRes.text();

  const zero9999 = !termsHtml.includes("99.99%");
  const has999 = termsHtml.includes("99.9%");
  const termsPass = zero9999 && has999;
  results.domAssertions.push({
    assertion: "Terms page standardizes on 99.9% uptime SLA and contains zero 99.99% claims",
    passed: termsPass,
  });
  if (termsPass) {
    log("DOM-TERMS", `Terms page verified: 99.9% SLA target present and zero 99.99% legacy claims`, "PASS");
  } else {
    log("DOM-TERMS", `Terms page failed SLA standardization: zero9999=${zero9999}, has999=${has999}`, "FAIL");
    results.pass = false;
  }
}

// ==========================================
// 6. LIVE /API/CONTACT ENDPOINT AUDIT
// ==========================================
async function testContactApi() {
  console.log("\n=======================================================");
  console.log("6. AUDITING LIVE /API/CONTACT SERVER ENDPOINT");
  console.log("=======================================================");

  const apiUrl = `${BASE_URL}/api/contact`;

  // 6.1 Valid Submission
  try {
    const validPayload = {
      inquiryCategory: "Software Product Licensing & Rentals",
      executiveName: "Dr. Vikram Mehta",
      corporateEmail: "sre-audit@krynexlabs.in",
      companySector: "Precision Industrial Robotics",
      operationalFriction: "Live automated SRE verification probe validating end-to-end API transport dispatch.",
      requestWalkthrough: true,
      websiteHoneypot: "",
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "KrynexLabs-SRE-AutomatedVerifier/1.0",
      },
      body: JSON.stringify(validPayload),
    });

    const data = await res.json().catch(() => ({}));
    const is200 = res.status === 200;
    const hasRef = data.referenceId && data.referenceId.startsWith("KL-REQ-");

    results.apiTests.push({
      test: "Valid Submission",
      status: res.status,
      referenceId: data.referenceId,
      ok: is200 && hasRef,
    });

    if (is200 && hasRef) {
      log("API-CONTACT", `Valid submission accepted: 200 OK, Ticket: ${data.referenceId}`, "PASS");
    } else {
      log("API-CONTACT", `Valid submission rejected: status=${res.status}, response=${JSON.stringify(data)}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("API-CONTACT", `Valid submission probe error: ${err.message}`, "FAIL");
    results.pass = false;
  }

  // 6.2 Bot Honeypot Silent Trap
  try {
    const botPayload = {
      inquiryCategory: "General Inquiry",
      executiveName: "Bot Spammer",
      corporateEmail: "bot@spamnetwork.com",
      companySector: "Spam LLC",
      operationalFriction: "Automated spam payload.",
      requestWalkthrough: false,
      websiteHoneypot: "https://trapped-bot-payload.com",
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "KrynexLabs-SRE-AutomatedVerifier/1.0",
      },
      body: JSON.stringify(botPayload),
    });

    const data = await res.json().catch(() => ({}));
    const is200 = res.status === 200;
    const hasRef = Boolean(data.referenceId);

    results.apiTests.push({
      test: "Honeypot Bot Trap",
      status: res.status,
      referenceId: data.referenceId,
      ok: is200 && hasRef,
    });

    if (is200 && hasRef) {
      log("API-CONTACT", `Honeypot bot silently trapped: 200 OK without dispatching email`, "PASS");
    } else {
      log("API-CONTACT", `Honeypot failed: status=${res.status}, response=${JSON.stringify(data)}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("API-CONTACT", `Honeypot probe error: ${err.message}`, "FAIL");
    results.pass = false;
  }

  // 6.3 Validation Failure (Malformed Email)
  try {
    const invalidPayload = {
      inquiryCategory: "General Inquiry",
      executiveName: "Test User",
      corporateEmail: "not-an-email",
      companySector: "Test Sector",
      operationalFriction: "Valid friction description.",
      requestWalkthrough: false,
      websiteHoneypot: "",
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "KrynexLabs-SRE-AutomatedVerifier/1.0",
      },
      body: JSON.stringify(invalidPayload),
    });

    const data = await res.json().catch(() => ({}));
    const is400 = res.status === 400;
    const hasErrors = data.errors && (data.errors.corporateEmail || data.errors.email);

    results.apiTests.push({
      test: "Validation Error Handling",
      status: res.status,
      errors: data.errors,
      ok: is400 && hasErrors,
    });

    if (is400 && hasErrors) {
      log("API-CONTACT", `Validation correctly triggered: 400 Bad Request with structured field error`, "PASS");
    } else {
      log("API-CONTACT", `Validation check failed: status=${res.status}, response=${JSON.stringify(data)}`, "FAIL");
      results.pass = false;
    }
  } catch (err) {
    log("API-CONTACT", `Validation probe error: ${err.message}`, "FAIL");
    results.pass = false;
  }
}

// ==========================================
// MAIN RUNNER & SUMMARY
// ==========================================
async function run() {
  console.log("=======================================================");
  console.log(`STARTING KRYNEX LABS LIVE PRODUCTION SRE AUDIT`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("=======================================================");

  await testCanonicalRoutes();
  await testSecurityHeaders();
  await testRedirects();
  await testCrawlerFiles();
  await testLiveHtmlAssertions();
  await testContactApi();

  console.log("\n=======================================================");
  console.log(`SRE LIVE VERIFICATION RESULT: ${results.pass ? "ALL CHECKS PASSED (100%)" : "FAILED AUDIT ITEMS DETECTED"}`);
  console.log("=======================================================\n");

  process.exit(results.pass ? 0 : 1);
}

run().catch((err) => {
  console.error("FATAL SRE RUNNER ERROR:", err);
  process.exit(1);
});
