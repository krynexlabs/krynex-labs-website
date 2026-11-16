# KRYNEX LABS — FORMS & INTERACTION AUDIT
**Classification:** Form Validation, Provider Reliability & Interaction States Audit  
**Production URL:** [https://www.krynexlabs.in](https://www.krynexlabs.in/)  
**Date:** October 24, 2026  
**Auditor:** Senior Full-Stack Engineer & QA Automation Specialist  
**Scope:** Checklist Items 12, 13, 14  

---

## 1. Form Interaction Lifecycle & State Audit

The primary contact brief interfaces ([ContactForm.tsx](file:///E:/.COM/KL_WEBSITE/src/components/ContactForm.tsx), [DemoModal.tsx](file:///E:/.COM/KL_WEBSITE/src/components/DemoModal.tsx), and [Footer.tsx](file:///E:/.COM/KL_WEBSITE/src/components/Footer.tsx)) and their backend Route Handler (`src/app/api/contact/route.ts`) were evaluated across all 7 interaction states:

| Lifecycle State | Trigger Condition | Visual / Behavioral Feedback | Actual Implementation Quality | Assessment Status |
| :--- | :--- | :--- | :--- | :---: |
| **1. Idle State** | Form rendered, awaiting input | Pristine dark card (`#080808`), clear monospace labels, placeholder text, submit CTA active | Well-structured, accessible inputs with specular silver borders | **PASS** |
| **2. Active Input State** | User types in form fields | Inputs receive focus ring `focus-visible:ring-1 ring-white/40`; active border glow | Responsive, zero layout shift, smooth focus transition | **PASS** |
| **3. Client Validation Error**| Missing required fields or malformed email submitted | Form submission intercepted; red error messages rendered under invalid inputs | Immediate inline error feedback; prevents empty network transmission | **PASS** |
| **4. Loading / Submitting**| User submits valid form | Submit button disabled (`isSubmitting = true`), displays spinner / loading text | Prevents double-submission bursts during transmission | **PASS** |
| **5. Server Validation Error**| Backend rejects field values (e.g. min length 10) | Red banner rendered displaying structured errors from `result.errors` | Server-side validation enforced independently of client JS | **PASS** |
| **6. Provider Failure State** | Upstream Resend API / SMTP rejects transmission | **DEFECT:** Route swallows error and responds 200 OK; UI fires celebratory confetti | **VULNERABLE:** Silent inquiry loss; false success confirmation | **FAIL (P1 HIGH)** |
| **7. Genuine Success State** | Email successfully accepted by provider | Form unmounts, displays checkmark, docket ID, response SLA (1-2 days), confetti fires | Clean confirmation, but currently triggered falsely on provider failure | **PARTIAL** |

---

## 2. Checklist Items Evaluation

### Item 12: Loading States
- **Requirement:** Asynchronous operations (form submissions, 3D asset downloads, dynamic route imports) must provide immediate visual loading feedback and disable duplicate submissions.
- **Relevant Components:** `src/components/ContactForm.tsx`, `HeroSection.tsx`, `HeroCubeFallback.tsx`.
- **Verification Method:** Source code inspection of state variables (`isSubmitting`, `shouldMount3D`, `dynamic() loading fallback`).
- **Expected Result:** Form submit button is disabled while pending; 3D canvas displays placeholder until loaded.
- **Actual Result:**
  - `ContactForm.tsx#L69`: `setIsSubmitting(true)` disables the button and prevents duplicate form submissions.
  - `HeroSection.tsx#L11-L14`: Dynamically imports `Hero3DCube` with `loading: () => <HeroCubeFallback />`, ensuring smooth progressive hydration.
- **Evidence:** Verified in code and browser subagent loading traces.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** Automated assertion that submit button has `disabled` attribute during network delay.

---

### Item 13: Form Error States & Delivery Reliability
- **Requirement:** Forms must gracefully handle and visually display client validation errors, server-side field rejections, network partitions, and upstream delivery provider failures without silent inquiry loss.
- **Relevant Components:** `src/components/ContactForm.tsx`, `src/app/api/contact/route.ts`.
- **Verification Method:** Form submission with empty fields; submission with invalid email; mocked Resend API HTTP 403 error response.
- **Expected Result:** Client validation catches empty inputs; provider errors result in HTTP 503 and clear fallback guidance.
- **Actual Result:**
  - Client validation properly flags empty name, invalid corporate email, empty company, and short challenge strings (<10 chars).
  - Network exceptions in fetch are caught in `catch {}` block and display general error notice.
  - **CRITICAL DEFECT (`SEC-001`):** In `route.ts#L206-L235`, if the Resend API responds with HTTP 403 (unverified domain) or HTTP 429 (rate limited), `resendResponse.ok` is never inspected. The catch block only handles network exceptions, and even when an exception occurs, it is merely logged to `console.error` while execution falls straight through to return HTTP `200 OK` with a valid reference ID. The user is told their brief was submitted, but the email is dropped!
- **Evidence:** Source code analysis of `src/app/api/contact/route.ts` lines 206–235.
- **Status:** **PARTIAL / FAIL ON DELIVERY RELIABILITY**
- **Severity:** **P1 (High / Production Blocker)**
- **Remediation:**
  1. Inspect `resendResponse.ok` in `/api/contact/route.ts`.
  2. If Resend or SMTP delivery fails, return HTTP `503 Service Unavailable`:
     ```json
     {
       "ok": false,
       "success": false,
       "referenceId": "KL-REQ-...",
       "error": "Briefing transmission could not be completed. Please email support@krynexlabs.in directly.",
       "fallbackMailto": "mailto:support@krynexlabs.in?subject=..."
     }
     ```
  3. In `ContactForm.tsx`, display an alert banner with a clickable `mailto:` link referencing their generated Docket ID whenever status 503 is received.
- **Regression Test:** Mocked route integration test simulating Resend 403 and asserting HTTP 503 response.

---

### Item 14: Thank-You Page and Accurate Submission Confirmation
- **Requirement:** Dedicated inquiry confirmation docket displaying Reference ID, confidentiality protections, response SLA window (1–2 business days), and routing node without exposing sensitive URL parameters.
- **Relevant Route:** `src/app/thank-you/page.tsx` (`/thank-you?ref=...`).
- **Verification Method:** Direct probe to `/thank-you` with valid reference (`?ref=KL-REQ-849201`), malicious payload (`?ref=<script>alert(1)</script>`), and empty parameters.
- **Expected Result:** Valid ref rendered; malicious ref safely rejected by whitelist regex; `<meta name="robots" content="noindex, nofollow">` present.
- **Actual Result:**
  - Whitelist regex `/^[A-Za-z0-9_-]{4,32}$/` strictly validates the query parameter. Malicious scripts are rejected and display the fallback `STATUS: TRANSMISSION RECEIVED`.
  - Docket details render clearly: Response Window (1-2 Business Days), Confidentiality (Privacy Protected), Routing Node (Ahmedabad DC-01).
  - Page defines `robots: { index: false, follow: false }`, preventing indexing in search engines.
- **Evidence:** Tested live edge response via curl and regex assertions in regression suite Test 7.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** `tests/remediation-audit.ts` Test 7.

---

## 3. Honeypot & Anti-Bot Automation Defense

The endpoint implements a multi-key honeypot detector:
- Inspected fields: `websiteHoneypot`, `_security_honeypot`, `honeypot`.
- Defensive behavior: When populated by automated form scrapers, the endpoint returns an immediate HTTP `200 OK` with a randomized bot tracking ID (`KL-REQ-*-BOT`) without dispatching email or webhook requests.
- Evaluation: Completely defends the inbox from automated form-spammers without alerting the bot operator that their submission was dropped.
