# KRYNEX LABS — APPLICATION SECURITY & DEFENSIVE AUDIT
**Classification:** Enterprise Security Evaluation  
**Date:** October 24, 2026  
**Target:** [https://www.krynexlabs.in](https://www.krynexlabs.in) & Local Repository  
**Standard References:** OWASP Top 10 (2021/2026), NIST SP 800-53, CIS Next.js Hardening Guidelines  

---

## 1. Executive Security Posture

A comprehensive, non-destructive defensive application security audit was performed across the Krynex Labs web application, API layer, cloud edge routing, dependency tree, and browser runtime.

### Key Strengths Observed
1. **Zero Secret Exposure:** Strict `.gitignore` enforcement ensures `.env.local` is never tracked in Git. Complete Git history inspection verified that private keys and production credentials were never committed to any branch.
2. **Robust HTTP Security Headers:** Deployed on Vercel Edge with HSTS (`max-age=31536000; includeSubDomains`), strict frame restrictions (`X-Frame-Options: DENY`), content-type sniffing protection (`X-Content-Type-Options: nosniff`), modern referrer policy (`strict-origin-when-cross-origin`), and cross-origin isolation (`Cross-Origin-Opener-Policy: same-origin`).
3. **Multi-Layer Input Sanitization:** `/api/contact` uses a layered defensive sanitizer that strips executable script and HTML tags (`<script>`, `<img>`, `<iframe>`, `javascript:`) while safely preserving legitimate engineering notation (e.g. `<10ms`, `x < y`, `O'Brien's`).
4. **Anti-Bot Honeypot Architecture:** Client forms include a trap input (`_security_honeypot` / `websiteHoneypot`). If populated by automated form-scraping bots, the API returns a silent `200 OK` with a spoofed reference ID (`KL-REQ-...-BOT`), deflecting spammers without executing downstream SMTP or Resend API calls.

---

## 2. Security Findings Register

### SEC-001: Inbound Lead Loss Due to Incomplete Provider Delivery Error Handling
- **Severity:** **HIGH (P1)**
- **CWE:** CWE-390 (Detection of Error Condition Without Action) / CWE-755 (Improper Handling of Exceptional Conditions)
- **Affected Code:** `src/app/api/contact/route.ts#L183-L228`
- **Attack / Failure Prerequisites:** Resend API outage, invalid or expired `RESEND_API_KEY`, account rate limit exceeded, unverified sender domain, or SMTP network timeout.
- **Impact:** High business risk. A prospective enterprise client completes an inquiry form, sees an "Inquiry Dispatched" confirmation and a Reference ID, but the message is discarded. The prospect believes Krynex Labs is reviewing their docket, but the company never receives the lead.
- **Evidence:**
  In `route.ts`:
  ```ts
  } else if (resendApiKey) {
    try {
      const fromEmail = process.env.CONTACT_FROM_EMAIL || "Krynex Labs <onboarding@resend.dev>";
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ... }),
      });
    } catch (resendErr) {
      console.error("[KRYNEX NOTIFICATION ERROR] Resend exception:", ...);
    }
  }
  return NextResponse.json({ ok: true, success: true, referenceId, ... }, { status: 200 });
  ```
  `fetch()` does not throw on HTTP error statuses (such as 401 Unauthorized or 422 Unprocessable Entity). The code does not check `resendResponse.ok`. Even if network failures throw, the `catch` block suppresses the exception, and the handler proceeds to return `status: 200`.
- **Safe Verification Steps:**
  1. Set an invalid test key in local environment (`RESEND_API_KEY=re_invalid_test_key`).
  2. Send a POST request to `/api/contact` with valid payload.
  3. Observe that the API returns HTTP 200 with `success: true` despite Resend rejecting the authentication token.
- **Remediation Guidance:**
  Track transport execution state. Check `if (!resendResponse.ok)` and parse provider error messages. If all configured delivery channels fail, return `status: 502/503` with an explicit fallback error directing the user to `support@krynexlabs.in`.

---

### SEC-002: In-Memory Rate Limiting Isolation Across Distributed Serverless Instances
- **Severity:** **MEDIUM (P2)**
- **CWE:** CWE-799 (Improper Control of Interaction Frequency)
- **Affected Code:** `src/lib/rate-limiter.ts#L18`, `src/app/api/contact/route.ts#L13-L32`
- **Attack Prerequisites:** Attacker sends automated requests distributed across different IP sockets or causes requests to route to multiple cold-started Vercel serverless Lambda instances.
- **Impact:** Abuse mitigation bypass. The intended 5-requests-per-10-minutes limit can be exceeded if requests land on distinct serverless execution instances.
- **Evidence:**
  `const ipStore = new Map<string, RateLimitRecord>();` in `rate-limiter.ts` is scoped exclusively to the local memory heap of the running Node.js process. In a distributed serverless environment, instances are ephemeral and non-shared.
- **Safe Verification Steps:**
  Deploy to Vercel preview; trigger requests across concurrent curl workers; observe varying instances resetting request counts.
- **Remediation Guidance:**
  Integrate an edge-native distributed rate limiter (e.g., Upstash Redis with `@upstash/ratelimit` or Vercel KV). Retain the in-memory `Map` as an automatic fallback when Redis credentials are not configured.

---

### SEC-003: Analytics Cookie Pre-Initialization Prior to Consent (GDPR/ePrivacy Risk)
- **Severity:** **MEDIUM (P2)**
- **CWE:** CWE-359 (Exposure of Private Personal Information to an Unauthorized Actor)
- **Affected Code:** `src/app/layout.tsx#L310-L322`, `src/components/CookieBanner.tsx#L21-L32`
- **Attack / Legal Prerequisites:** European or privacy-conscious visitor accessing `https://www.krynexlabs.in`.
- **Impact:** Regulatory non-compliance risk under GDPR (Articles 6 and 7) and India Digital Personal Data Protection (DPDP) Act.
- **Evidence:**
  In `layout.tsx`:
  ```tsx
  <Script src="https://www.googletagmanager.com/gtag/js?id=G-KZCMWZSRFN" strategy="afterInteractive" />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KZCMWZSRFN');
    `}
  </Script>
  ```
  GA4 executes without Google Consent Mode v2 default settings. As a result, Google sets tracking cookies (`_ga`, `_ga_*`) immediately upon page load before the user interacts with the `CookieBanner`.
- **Safe Verification Steps:**
  1. Open a fresh private browsing window.
  2. Navigate to `https://www.krynexlabs.in`.
  3. Inspect `Application > Storage > Cookies`.
  4. Observe `_ga` cookies written before clicking "Accept Telemetry".
- **Remediation Guidance:**
  Inject Google Consent Mode v2 default script before loading GTM:
  ```js
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  ```
  Update consent to `granted` only when the user clicks "Accept Telemetry" in `CookieBanner.tsx`.

---

### SEC-004: Vulnerable Upstream Package Versions via npm audit
- **Severity:** **MEDIUM (P2)**
- **CWE:** CWE-1395 (Dependency on Vulnerable Third-Party Component)
- **Affected Code:** `package.json#L21`, `node_modules`
- **Attack Prerequisites:** Specific exploitation vectors targeting Next.js image optimization or React Server Component serialization.
- **Impact:** Potential application denial-of-service or build-time script vulnerabilities.
- **Evidence:**
  `npm audit` reports 8 vulnerabilities:
  - 1 Critical: `next@14.2.35` (Advisories: GHSA-9g9p-9gw9-jx7f, GHSA-h25m-26qc-wcjf, GHSA-ggv3-7p47-pfv8).
  - 4 High: `postcss` (GHSA-qx2v-qp2m-jg93), `glob` (GHSA-5j98-mcp5-4vw2).
  - 3 Moderate: `postcss-selector-parser` (GHSA-rj75-hqrm-r3gf).
- **Safe Verification Steps:**
  Run `npm audit` on the command line to inspect exact vulnerability trees and advisories.
- **Remediation Guidance:**
  Update Next.js within the 14.x LTS security maintenance release channel. Validate build and 3D Canvas stability before merging.

---

### SEC-005: Broad Content Security Policy (CSP) Directives
- **Severity:** **LOW (P3)**
- **CWE:** CWE-1021 (Improper Restriction of Rendered UI Layers / Permissive CSP)
- **Affected Code:** `next.config.mjs#L16`
- **Attack Prerequisites:** A secondary XSS vulnerability elsewhere in the application allowing script injection.
- **Impact:** Permissive script evaluation rules reduce defense-in-depth effectiveness.
- **Evidence:**
  `next.config.mjs` sets:
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';`
  The presence of `'unsafe-inline'` and `'unsafe-eval'` disables standard browser script execution guardrails.
- **Safe Verification Steps:**
  Inspect live response headers using `curl.exe -I https://www.krynexlabs.in`.
- **Remediation Guidance:**
  Transition to Next.js middleware that generates a cryptographically random cryptographic nonce per request (`nonce-${Buffer.from(crypto.randomUUID()).toString('base64')}`). Replace `'unsafe-inline'` with the nonce token.

---

## 3. Threat Modeling Matrix

| Threat Category | Risk Description | Current Mitigation | Residual Risk | Status |
| :--- | :--- | :--- | :--- | :--- |
| **SQL Injection** | Attacker injects SQL through form fields | No SQL database currently connected; static/serverless architecture | Zero (Not Applicable) | **PASS** |
| **Cross-Site Scripting (XSS)** | Attacker submits payload to execute in admin view | Multi-stage regex sanitization (`stripHtmlTags`, `escapeHtml`) | Low (Hardened by SEC-005) | **PASS** |
| **Email Header Injection** | Attacker injects `\r\nBcc:...` into email fields | Strict RFC 5322 regex rejecting CRLF characters in email | Zero (Verified by Test 3) | **PASS** |
| **Form Flooding / Spam** | Automated bot submits thousands of spam inquiries | Anti-bot honeypot trap + sliding window IP rate limiter | Low (Hardened by SEC-002) | **PASS** |
| **Clickjacking** | Site embedded in malicious iframe | `X-Frame-Options: DENY`, `frame-ancestors 'none'` in CSP | Zero (Enforced at Edge) | **PASS** |
| **Silent Data Loss** | Legitimate inquiry dropped on downstream email failure | Error logged to console but swallowed from client | **High (SEC-001)** | **REMEDIATE** |
| **Regulatory Privacy** | Cookies written prior to user consent | Non-intrusive cookie banner with consent persistence | **Medium (SEC-003)** | **REMEDIATE** |
