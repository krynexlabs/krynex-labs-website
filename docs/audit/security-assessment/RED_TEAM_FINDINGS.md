# KRYNEX LABS — RED TEAM ATTACK SURFACE & THREAT REPORT
**Assessment Classification:** Authorized Red Team Attack Simulation & Threat Model  
**Target:** Krynex Labs Production Infrastructure (`https://www.krynexlabs.in`)  
**Scope:** Public Routes, API Endpoints, Client-Side Inputs, Rate Limiting, HTTP Headers, and Third-Party Webhooks  
**Date:** October 24, 2026  
**Auditor:** Senior Application Security Architect & Red Team Specialist  
**Methodology:** Passive edge profiling, source code threat modeling, and local harmless attack simulation  

---

## 1. Application Attack Surface Inventory

| Component / Route | Entry Point | Trust Boundary | Data Handled | Potential Threat | Verification Method | Result | Evidence | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **Contact API** | `POST /api/contact` | Public Internet to Serverless Backend | JSON payload: `executiveName`, `corporateEmail`, `companySector`, `operationalFriction`, `websiteHoneypot` | Lead dropping, Spam relay, Resource exhaustion | Local code analysis & HTTP mock | **Vulnerable** | `src/app/api/contact/route.ts#L206-L235`: Ignores `resendResponse.ok` | **P1 (High)** |
| **Rate Limiter** | `getClientIp(request)` in `/api/contact` | Client HTTP Headers to Serverless Memory | `X-Forwarded-For`, `X-Real-IP` | Header spoofing rate limit bypass, Bot flooding | Code analysis & unit test simulation | **Vulnerable** | `src/lib/rate-limiter.ts#L79`: Takes `forwarded.split(",")[0]` | **P2 (Med)** |
| **Analytics Engine**| Root Layout `<Script>` tags | Browser Execution to Third-Party Google CDN | Client IP, User-Agent, Page path | Telemetry transmission prior to cookie consent | Edge DOM inspection & source analysis | **Weakness** | `src/app/layout.tsx#L310-L322`: Loads `gtag.js` unconditionally | **P2 (Med)** |
| **Framework Engine**| Next.js App Router core | HTTP Request Routing to Node.js / Vercel Edge | Dynamic route resolution, Image optimization | SSRF in rewrites, DoS in Server Actions, Windows RCE | npm audit CVE reachability analysis | **Guarded / Mitigated** | No rewrites, no Server Actions, hosted on Linux. Non-reachable. | **P2 (Med)** |
| **Mobile UI Layer** | Sticky Pill & Cookie Banner | Mobile Viewport DOM to User Click Target | Touch event click coordinates | UI Click Redress / Denial of Choice | Browser subagent viewport emulation (375x812) | **Defect Confirmed**| Identical `bottom-4 z-50` coordinates causes sticky CTA to obscure banner | **P3 (Low)** |
| **Content Security**| HTTP Response Headers | Browser Security Context to External Domains | Script execution policies | Script injection if HTML injection discovered | Edge HTTP curl header probe | **Permissive** | `next.config.mjs#L16`: Allows `'unsafe-eval'` & `'unsafe-inline'` | **P3 (Low)** |
| **Thank-You Route** | `GET /thank-you?ref=...` | Query string to React DOM | Alphanumeric Reference ID | Reflected XSS via URL parameter | Code review & regex validation test | **Secure** | `src/app/thank-you/page.tsx#L14`: Whitelist `/^[A-Za-z0-9_-]{4,32}$/` | **P4 (Info)** |
| **Static Navigation**| 14 Canonical Sitemap URLs | Public HTTP GET requests | HTML/CSS/JS static bundles | Unauthorized access, Directory traversal | Edge curl probe of all sitemap URLs | **Secure** | All 14 routes return HTTP `200 OK` from Vercel Edge cache | **P4 (Info)** |

---

## 2. Threat Scenarios & Attack Path Simulations

### Scenario 1: Inquiry Blackholing via Upstream Provider Denial (`SEC-001`)
- **Attacker Goal:** Sabotage Krynex Labs' inbound client pipeline or cause silent data loss.
- **Attack Vector:** An attacker discovers that `/api/contact` does not verify provider response codes. By sending valid-looking briefs when the provider is degraded, or by triggering provider rate limits, genuine enterprise inquiries sent during that window are acknowledged as received (`HTTP 200 OK`, celebratory confetti) but never delivered.
- **Root Cause Code (`src/app/api/contact/route.ts`):**
  ```ts
  // Lines 209-224:
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { ... },
    body: JSON.stringify({ ... }),
  });
  // resendResponse.ok is NEVER checked.
  // Exceptions are logged to console but not returned to client.
  // Execution falls through directly to Line 234:
  return NextResponse.json({ ok: true, success: true, referenceId, message: "..." });
  ```
- **Exploitability:** High. Requires zero attacker privileges.
- **Business Impact:** High. Severe financial and reputational loss due to silently dropped sales and architecture briefs.

---

### Scenario 2: Rate Limit Circumvention via Header Rotation (`SEC-002`)
- **Attacker Goal:** Flood the contact endpoint with thousands of automated submissions without being blocked by the 5-request limit.
- **Attack Vector:** The application determines client identity using:
  ```ts
  // src/lib/rate-limiter.ts Line 79:
  const firstIp = forwarded.split(",")[0].trim();
  ```
  An attacker script rotates the `X-Forwarded-For` header with each HTTP POST:
  - Request 1: `X-Forwarded-For: 198.51.100.1`
  - Request 2: `X-Forwarded-For: 198.51.100.2`
  - Request 3: `X-Forwarded-For: 198.51.100.3`
  The rate limiter treats each request as originating from a new IP, bypassing the sliding window completely.
- **Exploitability:** High. Trivial to automate using curl or Python scripts.
- **Business Impact:** Medium. Causes operational inbox spamming and resource consumption.

---

### Scenario 3: Telemetry Evasion & Consent Bypass (`SEC-003`)
- **Threat:** Non-compliance with privacy regulations (GDPR / ePrivacy Directive / India DPDP Act).
- **Vulnerability:** Google Analytics (`gtag.js`) loads via `next/script` on initial page load:
  ```html
  <!-- src/app/layout.tsx Lines 310-322 -->
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
  Google Consent Mode v2 default configuration is missing. As a result, network requests to `google-analytics.com` fire before the visitor clicks "Accept Telemetry" or "Essential Only" on `CookieBanner.tsx`.
- **Exploitability:** Passive trigger upon every page load.
- **Impact:** Regulatory non-compliance and reputational damage.

---

### Scenario 4: Mobile UI Interaction Redress / Click Obstruction (`UI-001`)
- **Threat:** Mobile user interface collision blocking user consent.
- **Vulnerability:** On mobile viewports (<768px), `StickyMobileCTA.tsx` and `CookieBanner.tsx` both declare:
  - `StickyMobileCTA`: `fixed bottom-4 inset-x-3 z-50`
  - `CookieBanner`: `fixed bottom-4 left-4 right-4 z-50`
  When a visitor scrolls past 280px on a phone, the sticky "Contact Us" pill renders directly over the cookie consent banner, physically covering the "Accept Telemetry" and "Essential Only" action buttons.
- **Exploitability:** Deterministic on mobile viewports.
- **Impact:** Compromised mobile UX and blocked consent choice.

---

## 3. Input Injection & Application Logic Analysis

| Attack Class | Evaluation & Test Findings | Status |
| :--- | :--- | :---: |
| **Reflected XSS** | Tested via `/thank-you?ref=<script>alert(1)</script>`. Strict whitelist regex `/^[A-Za-z0-9_-]{4,32}$/` rejects all non-alphanumeric input. | **NOT VULNERABLE** |
| **Stored / DOM XSS**| Contact form fields are sanitized via `stripHtmlTags()` and `escapeHtml()`. Mathematical and comparison symbols (`<10ms`, `x < y`) are preserved while `<script>`, `<img>`, and `<iframe>` are stripped. | **NOT VULNERABLE** |
| **Email Header Injection (CRLF)** | Tested with `\r\nBcc:attacker@spam.com` in email and name fields. `stripHeaderInjection()` strips CR/LF/Tab and `isValidEmail()` rejects CRLF. | **NOT VULNERABLE** |
| **SQL / NoSQL Injection** | Application has zero SQL/NoSQL databases. All data is static TypeScript structures or ephemeral in-memory maps. | **NOT APPLICABLE** |
| **Command Injection (OS)** | Application never calls `child_process`, `exec()`, or shell commands in any runtime handler. | **NOT APPLICABLE** |
| **Path Traversal** | Application does not read arbitrary file paths from user inputs. | **NOT APPLICABLE** |
| **SSRF (Server-Side Request Forgery)** | `fetch()` in `/api/contact` only targets hardcoded URLs (`api.resend.com` or static webhook URL from server env). Attacker cannot control destination host. | **NOT VULNERABLE** |
| **Spam Bot Automation** | Honeypot trap (`websiteHoneypot`) silently returns HTTP 200 with fake reference ID when populated by automated bots. | **DEFENDED** |

---

## 4. Untested Attack Scenarios (Requiring Staging Environment)

To adhere strictly to authorized testing bounds and protect production availability, the following attack scenarios were **not executed against production**:
1. **Volumetric Denial of Service (DoS):** Flooding `POST /api/contact` with >1,000 req/sec to measure Vercel serverless auto-scaling and concurrency limits.
2. **Third-Party Email Provider Abuse:** Sending live email bursts using active Resend API keys to test upstream quota limits and spam reputation.
3. **Upstream Webhook Fuzzing:** Dispatching malformed payloads to `CONTACT_WEBHOOK_URL` endpoints (e.g. external Slack/CRM webhooks).
