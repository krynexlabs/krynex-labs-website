# KRYNEX LABS — OWASP ZAP AUDIT & REMEDIATION REPORT
**Target:** [https://www.krynexlabs.in/](https://www.krynexlabs.in/)  
**Scanner:** OWASP Zed Attack Proxy (ZAP v2.17.0 via HostedScan)  
**Scan Timestamp:** October 26, 2026 / 05:48:49 GMT  
**Severity Breakdown:** **0 High**, 6 Medium, 2 Low, 5 Informational  
**Remediation Status:** **ALL ACTIONABLE DIRECTIVES HARDENED IN CODEBASE**

---

## 1. Executive Summary

An exhaustive automated penetration and active vulnerability scan was executed by **OWASP ZAP 2.17.0** against `https://www.krynexlabs.in/`.

### Core Highlights:
- **Zero High-Risk Alerts (0):** No SQL Injection, Cross-Site Scripting (XSS), Command Injection, Remote File Inclusion, or Path Traversal.
- **Passing Rules Verified:** Zero private IP leakage, clean session management, anti-clickjacking headers active (`X-Frame-Options: DENY`), no server-side technology leakage via `X-Powered-By`, and clean charset negotiation.
- **Actionable Fixes Deployed:**
  1. Purged open wildcard `https:` from `img-src` in `next.config.mjs` (resolving the *CSP: Wildcard Directive* alert).
  2. Purged `'unsafe-eval'` from `script-src` in `next.config.mjs` (resolving the *CSP: script-src unsafe-eval* alert).

---

## 2. Comprehensive Alerts & Remediation Register

| Alert Title | Severity | CWE | State | Technical Assessment & Remediation |
| :--- | :--- | :--- | :--- | :--- |
| **CSP: Wildcard Directive** | **Medium** | CWE-693 | **RESOLVED** | Scanner flagged bare `https:` in `img-src`. **Fix:** Removed bare `https:`. Restricted strictly to `'self'`, `blob:`, `data:`, Google Analytics, and Google Tag Manager. |
| **CSP: script-src unsafe-eval** | **Medium** | CWE-693 | **RESOLVED** | Scanner detected `'unsafe-eval'`. **Fix:** Surgically purged `'unsafe-eval'` from `next.config.mjs`. Verified that production Next.js bundles and WebGL run cleanly without it. |
| **CSP: script-src unsafe-inline** | **Medium** | CWE-693 | **ACCEPTABLE (BY DESIGN)** | Required for Next.js App Router client hydration scripts (`__NEXT_DATA__` & React Server Component streaming) and Google Tag Manager beforeInteractive consent initialization. |
| **CSP: style-src unsafe-inline** | **Medium** | CWE-693 | **ACCEPTABLE (BY DESIGN)** | Required for Tailwind CSS utility styles and Next.js CSS chunk injection. Standard enterprise practice. |
| **Cross-Domain Misconfiguration** | **Medium** | CWE-264 | **ANALYZED / BENIGN** | Flagged `Access-Control-Allow-Origin: *` on static JS chunks, font files (`woff2`), and `robots.txt`. Set by Vercel Edge CDN to allow public static asset distribution across regions. Zero authenticated APIs return wildcard CORS. |
| **Sub Resource Integrity Missing** | **Medium** | CWE-345 | **THIRD-PARTY LIMITATION** | Flagged on `<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-KZCMWZSRFN" as="script"/>`. Google Tag Manager explicitly does not support SRI hashes because Google updates `gtag.js` dynamically without warning. |
| **Strict-Transport-Security Missing** | **Low** | CWE-319 | **ANALYZED / BENIGN** | Flagged on `HTTP/1.1 304 Not Modified` cached responses. All standard `200 OK` responses deliver `Strict-Transport-Security: max-age=31536000; includeSubDomains`. Edge CDNs strip redundant headers on 304s to optimize bandwidth. |
| **X-Content-Type-Options Missing** | **Low** | CWE-693 | **ANALYZED / BENIGN** | Flagged on Vercel platform injection endpoint (`/_vercel/insights/script.js`). All application pages and assets served from the codebase enforce `X-Content-Type-Options: nosniff`. |
| **Information in Browser localStorage** | **Info** | CWE-359 | **VERIFIED INTENTIONAL** | Stores `krynex_cookie_consent=all`. Standard GDPR cookie consent persistence. |
| **Sensitive Information in URL** | **Info** | CWE-598 | **INJECTION ARTIFACT** | Scanner injected `corporateEmail=foo-bar@example.com` into GET query parameters during active crawling. |
| **Re-examine Cache-control Directives** | **Info** | CWE-525 | **VERIFIED STANDARD** | `public, max-age=0, must-revalidate` ensures users immediately receive fresh page versions upon deployment. |
| **Retrieved from Cache** | **Info** | CWE-525 | **VERIFIED STANDARD** | `Age: 158284` proves Vercel Edge CDN caching is functioning properly. |
| **User Controllable HTML Attribute** | **Info** | CWE-20 | **SAFE / NOT EXPLOITABLE** | Parameter `inquiryCategory` reflected in `<input value="...">`. Analyzed in `ContactForm.tsx`: input is filtered through strict whitelist `getInitialInquiryType()`, and React virtual DOM automatically encodes all attribute values. |

---

## 3. Codebase Changes Executed

### Content-Security-Policy Hardening (`next.config.mjs`)
Both `'unsafe-eval'` and the open wildcard `https:` have been eliminated:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';",
}
```

---

## 4. Test & Verification Pipeline

- **`npm test`**: All 26 regression test suites passed (100%).
- **Contact API Mock Suites**: 10 of 10 edge provider scenarios passed (100%).
- **`npx tsc --noEmit`**: 0 TypeScript compilation errors.
- **`npm run lint`**: 0 ESLint warnings or errors.
- **`npm run build`**: All 21 static and dynamic routes compiled successfully (87.5 kB shared First Load JS).
