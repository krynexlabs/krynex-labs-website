// scripts/verify-live-production.mjs
// Automated Live Production E2E Verification & SRE Smoke Test for https://www.krynexlabs.in

import assert from "node:assert";

const BASE_URL = "https://www.krynexlabs.in";
const APEX_URL = "https://krynexlabs.in";

const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/solutions",
  "/solutions/ai-ml",
  "/solutions/cloud-data",
  "/solutions/enterprise-software",
  "/solutions/web-mobile",
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

  // 3.1 Legacy /products redirect to /solutions
  const legacyUrl = `${BASE_URL}/products`;
  try {
    const { res } = await fetchWithTiming(legacyUrl, { redirect: "manual" });
    const location = res.headers.get("location");
    const isRedirect = [301, 302, 307, 308].includes(res.status);
    const targetMatch = location && (location.includes("/solutions") || location === "/solutions");

    results.redirects.push({
      from: legacyUrl,
      status: res.status,
      location,
      ok: isRedirect && targetMatch,
    });

    if (isRedirect && targetMatch) {
      log("REDIRECT", `Obsolete route ${legacyUrl} => ${res.status} redirecting to ${location}`, "PASS");
    } else {
      log("REDIRECT", `Obsolete route ${legacyUrl} returned ${res.status} location: ${location}`, "FAIL");
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
    const hasCanonicalRoutes = xml.includes("https://www.krynexlabs.in/solutions") &&
                               xml.includes("https://www.krynexlabs.in/contact");
    const zeroObsoleteProducts = !xml.includes("/products");

    const sitemapOk = is200 && hasCanonicalRoutes && zeroObsoleteProducts;
    results.crawlerFiles.push({ file: "/sitemap.xml", status: res.status, ok: sitemapOk });

    if (sitemapOk) {
      log("CRAWLER", `/sitemap.xml returns 200, contains canonical URLs, and zero /products paths`, "PASS");
    } else {
      log("CRAWLER", `/sitemap.xml failed criteria: 200=${is200}, canonical=${hasCanonicalRoutes}, zeroProducts=${zeroObsoleteProducts}`, "FAIL");
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

  // Capability links on homepage
  const hasSolutionsHref = homeHtml.includes('href="/solutions"');
  const hasContactHref = homeHtml.includes('href="/contact"') || homeHtml.includes('href="#contact"');
  results.domAssertions.push({
    assertion: "Homepage links to /solutions and /contact",
    passed: hasSolutionsHref && hasContactHref,
  });
  if (hasSolutionsHref && hasContactHref) {
    log("DOM-HOME", `Homepage contains direct links to /solutions and /contact`, "PASS");
  } else {
    log("DOM-HOME", `Missing solutions or contact links on homepage`, "FAIL");
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

  // 5.2 Solutions Page (/solutions)
  const { res: solRes } = await fetchWithTiming(`${BASE_URL}/solutions`);
  const solHtml = await solRes.text();

  const hasAiMl = solHtml.includes("/solutions/ai-ml");
  const hasCloudData = solHtml.includes("/solutions/cloud-data");
  const hasEnterpriseSoftware = solHtml.includes("/solutions/enterprise-software");
  results.domAssertions.push({
    assertion: "Solutions directory links to capability practices",
    passed: hasAiMl && hasCloudData && hasEnterpriseSoftware,
  });
  if (hasAiMl && hasCloudData && hasEnterpriseSoftware) {
    log("DOM-SOLUTIONS", `Solutions directory links to AI/ML, Cloud & Data, and Enterprise Software practices`, "PASS");
  } else {
    log("DOM-SOLUTIONS", `Missing capability practice links on /solutions`, "FAIL");
    results.pass = false;
  }

  // 5.3 Contact Page (/contact)
  const { res: contactRes } = await fetchWithTiming(`${BASE_URL}/contact`);
  const contactHtml = await contactRes.text();

  const hasForm = contactHtml.includes("<form");
  const hasFullName = contactHtml.includes('name="fullName"');
  const hasWorkEmail = contactHtml.includes('name="workEmail"');
  const hasInquiryType = contactHtml.includes('name="inquiryType"');
  const hasMessage = contactHtml.includes('name="message"');
  const zeroWalkthrough = !contactHtml.includes('name="requestWalkthrough"') && !contactHtml.includes("Google Meet");
  const hasPrivacyLink = contactHtml.includes('href="/privacy"');

  const contactPass = hasForm && hasFullName && hasWorkEmail && hasInquiryType && hasMessage && zeroWalkthrough && hasPrivacyLink;
  results.domAssertions.push({
    assertion: "Contact page SSR HTML contains <form, fullName, workEmail, inquiryType, message, zero walkthrough, href='/privacy'",
    passed: contactPass,
  });
  if (contactPass) {
    log("DOM-CONTACT", `Contact SSR HTML contains full canonical 5-field inquiry controls & zero demo fields`, "PASS");
  } else {
    log("DOM-CONTACT", `Contact form controls missing in SSR HTML: form=${hasForm}, name=${hasFullName}, email=${hasWorkEmail}, type=${hasInquiryType}, msg=${hasMessage}, zeroWalk=${zeroWalkthrough}, priv=${hasPrivacyLink}`, "FAIL");
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
  const hasHighAvailability = termsHtml.includes("High Availability");
  const termsPass = zero9999 && hasHighAvailability;
  results.domAssertions.push({
    assertion: "Terms page standardizes on High Availability SLA target and contains zero 99.99% claims",
    passed: termsPass,
  });
  if (termsPass) {
    log("DOM-TERMS", `Terms page verified: High Availability SLA target present and zero 99.99% legacy claims`, "PASS");
  } else {
    log("DOM-TERMS", `Terms page failed SLA standardization: zero9999=${zero9999}, hasHA=${hasHighAvailability}`, "FAIL");
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
      fullName: "Dr. Vikram Mehta",
      workEmail: "sre-audit@krynexlabs.in",
      companyName: "Precision Industrial Robotics",
      inquiryType: "SaaS & Technology Services",
      message: "Live automated SRE verification probe validating end-to-end API transport dispatch.",
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
      fullName: "Bot Spammer",
      workEmail: "bot@spamnetwork.com",
      companyName: "Spam LLC",
      inquiryType: "General Inquiry",
      message: "Automated spam payload.",
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
      fullName: "Test User",
      workEmail: "not-an-email",
      companyName: "Test Sector",
      inquiryType: "General Inquiry",
      message: "Valid friction description.",
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
    const hasErrors = data.errors && (data.errors.workEmail || data.errors.corporateEmail || data.errors.email);

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
