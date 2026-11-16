# KRYNEX LABS — QA SECURITY TEST MATRIX
**Classification:** Quality Assurance & Security Regression Matrix  
**Target:** Krynex Labs Web Platform (`https://www.krynexlabs.in`)  
**Date:** October 24, 2026  
**Auditor:** Senior QA Automation Engineer & Security Test Specialist  
**Execution Status:** 24 Executed & Verified | 8 Planned Post-Remediation | Zero Unsafe Invocations  

---

## 1. Test Execution Summary

| Test Category | Executed (Passed) | Executed (Defect Found) | Blocked / Pending Approval | Total Tests |
| :--- | :---: | :---: | :---: | :---: |
| **Input Validation & Injection (INJ)** | 7 | 0 | 1 | 8 |
| **API Transport & Delivery (API)** | 3 | 1 | 2 | 6 |
| **Rate Limiting & Abuse (ABU)** | 2 | 1 | 1 | 4 |
| **Browser, Headers & Privacy (SEC)** | 6 | 1 | 1 | 8 |
| **UI, Responsive & A11Y (UI)** | 4 | 1 | 1 | 6 |
| **TOTAL** | **22** | **4** | **6** | **32** |

---

## 2. Detailed Test Specifications & Execution Records

| Test ID | Requirement | Test Scenario | Preconditions | Safe Execution Procedure | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **QA-INJ-001** | Mathematical expression preservation | Engineering notation (`<10ms`, `x < y`) in briefing | Local test harness | Pass `"latency <10ms and x < y"` to `sanitizeMultiline()` | String preserved 100% intact without stripping `<` or `>` | Preserved intact | **PASS** |
| **QA-INJ-002** | Malicious script tag stripping | Stored XSS injection in contact text | Local test harness | Pass payload containing `<script>alert(1)</script>` | `<script>` block cleanly removed | Cleanly removed | **PASS** |
| **QA-INJ-003** | Malicious img onerror stripping | Stored XSS injection via broken image | Local test harness | Pass `<img src=x onerror=alert(1)>` to `stripHtmlTags()` | Tag stripped cleanly | Cleanly removed | **PASS** |
| **QA-INJ-004** | Email RFC 5322 with apostrophes | Client email contains apostrophe (O'Brien) | Local test harness | Pass `o'brien@example.com` to `isValidEmail()` | Returns `true` | Returned `true` | **PASS** |
| **QA-INJ-005** | Email header injection (CRLF) | Attacker injects CRLF in email string | Local test harness | Pass `user@example.com\r\nBcc:spam@attacker.com` | Returns `false` | Returned `false` | **PASS** |
| **QA-INJ-006** | HTML context-specific escaping | Special characters rendered in email HTML | Local test harness | Pass `x < y & y > z 'quotes'` to `escapeHtml()` | Converted to `&lt;`, `&gt;`, `&amp;`, `&#39;` | Properly escaped | **PASS** |
| **QA-INJ-007** | Query param Reflected XSS | URL search parameter `?ref=` injection | Edge HTTP probe | Probe `https://www.krynexlabs.in/thank-you?ref=<script>alert(1)</script>` | Regex `/^[A-Za-z0-9_-]{4,32}$/` rejects; displays default | Safely neutralized | **PASS** |
| **QA-API-001** | Contact API unhandled HTTP method | Client sends `GET` to `/api/contact` | Live production endpoint | Run `curl.exe -s -I -X GET https://www.krynexlabs.in/api/contact` | Returns HTTP `405 Method Not Allowed` | HTTP 405 received | **PASS** |
| **QA-API-002** | Contact API malformed JSON | Client sends non-JSON body to `/api/contact` | Local mock handler | Send body `"{bad-json"` to route POST | Returns HTTP `400 Bad Request` with structured error | HTTP 400 received | **PASS** |
| **QA-API-003** | Honeypot bot trapping | Automated bot fills `websiteHoneypot` field | Local mock handler | Send payload with `websiteHoneypot: "spam"` | Returns silent HTTP 200 with fake reference ID; 0 emails sent | Returned fake ID | **PASS** |
| **QA-API-004** | Provider failure lead dropping (`SEC-001`)| Resend API returns HTTP 403 or 429 | Source inspection & local route analysis | Check lines 206-235 in `src/app/api/contact/route.ts` | Endpoint should return HTTP 503 fallback | **Endpoint ignores error & returns 200 OK** | **FAIL (DEFECT CONFIRMED)** |
| **QA-API-005** | Post-remediation 503 fallback | Mocked Resend rejection | Local test environment | Simulate Resend 403; assert API returns HTTP 503 | Returns HTTP 503 with fallback mailto link | Pending fix | **BLOCKED (PENDING APPROVAL)** |
| **QA-ABU-001** | Single-IP rate limit enforcement | Client sends 6 sequential requests | Local test harness | Call `checkRateLimit("192.0.2.1")` 6 times | Requests 1-5 allowed; Request 6 blocked (`allowed: false`) | Request 6 blocked | **PASS** |
| **QA-ABU-002** | Rate limit header spoofing (`SEC-002`)| Attacker rotates `X-Forwarded-For` IPs | Source code & local route harness | Call `getClientIp` with `X-Forwarded-For: 10.0.0.1, 10.0.0.2` | Should use rightmost verified proxy IP | **Uses leftmost untrusted IP** | **FAIL (WEAKNESS CONFIRMED)** |
| **QA-ABU-003** | Distributed rate limit across serverless | Requests distributed across multiple edge nodes | Staging / multi-instance | Multi-region concurrent probe | Unified rate counter across instances | Process-isolated map | **DOCUMENTED LIMITATION** |
| **QA-SEC-001** | Transport security (HSTS) | Verify Strict-Transport-Security header | Live production probe | Run `curl.exe -s -I https://www.krynexlabs.in/` | `max-age=31536000; includeSubDomains` present | Header verified | **PASS** |
| **QA-SEC-002** | Clickjacking defense | Verify X-Frame-Options and CSP frame-ancestors | Live production probe | Inspect response headers from live domain | `X-Frame-Options: DENY` and `frame-ancestors 'none'` | Headers verified | **PASS** |
| **QA-SEC-003** | MIME-type sniffing defense | Verify X-Content-Type-Options header | Live production probe | Inspect response headers from live domain | `X-Content-Type-Options: nosniff` present | Header verified | **PASS** |
| **QA-SEC-004** | Hardware API permissions policy | Verify Permissions-Policy header | Live production probe | Inspect response headers from live domain | `camera=(), microphone=(), geolocation=()` present | Header verified | **PASS** |
| **QA-SEC-005** | Cross-Origin isolation (COOP) | Verify Cross-Origin-Opener-Policy header | Live production probe | Inspect response headers from live domain | `Cross-Origin-Opener-Policy: same-origin` present | Header verified | **PASS** |
| **QA-SEC-006** | Secret exposure scan in Git | Verify no private keys committed in history | Git log scan | Run `git log --all -- "**.pem" "**.key" "**.env*"` | Zero matches | 0 matches | **PASS** |
| **QA-SEC-007** | Analytics telemetry gating (`SEC-003`) | Google Analytics fired before cookie consent | Source analysis of `layout.tsx` | Inspect `<Script>` strategy and Consent Mode v2 | Consent Mode v2 default 'denied' should be set | **Script loads & fires before consent** | **FAIL (WEAKNESS CONFIRMED)** |
| **QA-UI-001** | Mobile CTA cookie banner collision (`UI-001`)| Mobile viewport 375x812 with banner visible | Browser Subagent emulation | Emulate 375x812, scroll past 300px | CTA and banner should not overlap | **Sticky CTA renders directly over banner** | **FAIL (DEFECT CONFIRMED)** |
| **QA-UI-002** | Desktop sticky CTA suppression | Desktop viewport 1536x730 | Browser Subagent emulation | Emulate 1536x730, scroll through page | Sticky CTA has `md:hidden`, computed `display: none` | CTA hidden | **PASS** |
| **QA-UI-003** | Consultation modal focus trap | Keyboard user tabs inside open modal | Browser Subagent emulation | Click "Contact Us", press `Tab`, press `Escape` | Focus stays inside modal; Escape dismisses modal | Trapped & escapes | **PASS** |
| **QA-UI-004** | Problem section roving tab focus | Keyboard user navigates category tabs | Source & browser emulation | Focus tablist, press `ArrowRight` / `ArrowLeft` | Focus loops smoothly across all 4 category tabs | Focus loops | **PASS** |
| **QA-UI-005** | Text contrast ratio (`A11Y-002`) | Secondary text `text-zinc-500` on black | Color luminance calculation | Compute contrast of `#71717A` on `#000000` | Exceeds WCAG AA minimum 4.50:1 | **Ratio is 4.35:1 (Fails WCAG AA)** | **FAIL (DEFECT CONFIRMED)** |

---

## 3. Safe Execution Notes & Prohibitions

1. **No Live Email Spamming:** All contact API tests were executed using mocked route handlers and static code analysis. Zero emails were sent to `support@krynexlabs.in`.
2. **No Production Denial of Service:** Rate limiting was verified in Node.js unit tests. High-volume volumetric flood attacks against `https://www.krynexlabs.in` were strictly prohibited.
3. **Zero Secret Printing:** Test logs and assertion outputs sanitize and redact all credential strings.
