# KRYNEX LABS — PRIVACY, ANALYTICS & LEGAL AUDIT
**Classification:** Regulatory Compliance, Analytics Lifecycle & Corporate Identity Audit  
**Production URL:** [https://www.krynexlabs.in](https://www.krynexlabs.in/)  
**Date:** October 24, 2026  
**Auditor:** Principal Privacy Engineer & Legal-Tech Auditor  
**Scope:** Checklist Items 15, 16, 17, 18, 19  

---

## 1. Compliance & Legal Architecture Overview

Krynex Labs operates as a unified software product and SaaS enterprise headquartered in Ahmedabad, India. The legal and privacy frameworks were audited against:
1. **India's Digital Personal Data Protection (DPDP) Act, 2023:** Grievance redressal, data fiduciary responsibilities, consent mechanisms, and purpose limitation.
2. **Global Telemetry Standards (ePrivacy / GDPR):** Prior consent for non-essential tracking cookies and transparency regarding infrastructure sub-processors.
3. **Enterprise SaaS Service Level Agreement (SLA):** 99.9% monthly availability target, service credit remedy, and dispute jurisdiction.

---

## 2. Checklist Items Evaluation

### Item 15: Privacy Policy
- **Requirement:** Comprehensive, transparent privacy policy detailing data sovereignty, infrastructure sub-processors, zero public model co-mingling, retention limits, and DPDP Grievance Officer contacts.
- **Relevant Route:** `src/app/privacy/page.tsx` (`https://www.krynexlabs.in/privacy`).
- **Verification Method:** Source code inspection, edge HTTP fetch, and legal text audit.
- **Expected Result:** Live accessible page, no generic boilerplate, explicit sub-processors listed, contact details matching official channels.
- **Actual Result:**
  - Explicitly states Krynex Labs' **Zero Public Model Co-Mingling Policy**: customer proprietary data is never used to train or fine-tune public foundation models.
  - Discloses all infrastructure sub-processors: Vercel Inc. (Edge CDN & Serverless Runtime), transactional email relays, and isolated tenant VPCs with KMS envelope keys.
  - Designates an official Privacy & Grievance Officer with an email link to `support@krynexlabs.in` and a 24-hour response window commitment under the DPDP Act 2023.
  - Declares an inquiry retention period of up to 24 months with explicit deletion rights upon request.
- **Evidence:** Verified live at `https://www.krynexlabs.in/privacy`.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** Static content verification in regression test suite.

---

### Item 16: Terms of Service Page
- **Requirement:** Clear enterprise terms of service governing software rental subscriptions, IP ownership, SLA availability targets, warranty disclaimers, and legal jurisdiction.
- **Relevant Route:** `src/app/terms/page.tsx` (`https://www.krynexlabs.in/terms`).
- **Verification Method:** Source code inspection, edge HTTP fetch, and legal text analysis.
- **Expected Result:** Live accessible page; clear rental SaaS terms; no unverified 99.99% claims; verified Ahmedabad jurisdiction.
- **Actual Result:**
  - Accurately frames Krynex Labs as a **SaaS product and software technology provider** (not a custom development agency or law firm).
  - Explicitly disclaims legal representation for legal-tech modules (Krynex Lexis), requiring independent advocate review under the Advocates Act, 1961.
  - Standardizes the High Availability Service Target (SLA) to a realistic, verified **99.9% monthly service availability target** with prorated service credits, eliminating previously reported unverified 99.99% claims.
  - Governed exclusively by the laws of India with exclusive dispute resolution jurisdiction assigned to competent courts in **Ahmedabad, Gujarat, India**.
- **Evidence:** Verified live at `https://www.krynexlabs.in/terms` and verified in regression suite Tests 10 & 16.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** `tests/remediation-audit.ts` Tests 10 & 16.

---

### Item 17: Cookie Consent Banner
- **Requirement:** Non-intrusive consent banner allowing visitors to accept or decline telemetry, persisting preferences in browser storage without crashing in private browsing modes.
- **Relevant Component:** `src/components/CookieBanner.tsx`.
- **Verification Method:** Browser Subagent interaction; clicking "Accept Telemetry" vs "Essential Only"; checking `localStorage` keys; testing SSR safe storage fallback.
- **Expected Result:** Banner animates smoothly after initial delay; persists preference in `krynex_cookie_consent`; respects choices across page reloads.
- **Actual Result:**
  - Banner animates into view 1200ms after load if no prior preference exists.
  - Clicking "Accept Telemetry" writes `"all"` to `localStorage`.
  - Clicking "Essential Only" writes `"essential"` to `localStorage` and dismisses the banner.
  - Utilizes `safeLocalStorage` to prevent runtime crashes in Safari Private Browsing or when storage is disabled.
- **Evidence:** Browser Subagent screenshots `cookie_banner_view_1792823893910.png` and regression suite Test 6.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** `tests/remediation-audit.ts` Test 6.

---

### Item 18: Analytics Installation and Consent Behavior
- **Requirement:** Analytics scripts (Google Analytics / GTM) must not execute or transmit user tracking beacons prior to explicit user consent.
- **Relevant Components:** `src/app/layout.tsx#L310-L322`, `src/components/Analytics.tsx`, `src/components/CookieBanner.tsx`.
- **Verification Method:** Network trace on initial page load with clean browser profile (no cookie consent key); inspection of `<Script>` loading strategy.
- **Expected Result:** Google Analytics loads with default consent denied (`analytics_storage: 'denied'`), transmitting telemetry beacons only after the user clicks "Accept".
- **Actual Result:**
  - In `layout.tsx`, Google Analytics script `gtag/js?id=G-KZCMWZSRFN` loads via `next/script` with `strategy="afterInteractive"`.
  - The script executes `gtag('config', 'G-KZCMWZSRFN')` immediately upon page load.
  - **DEFECT (`SEC-003`):** Google Consent Mode v2 default initialization is missing. While `CookieBanner.tsx#L25-L29` dispatches `gtag('consent', 'update', { analytics_storage: choice === 'all' ? 'granted' : 'denied' })` *after* a button is clicked, Google Analytics defaults to granted before the banner is clicked, sending initial page-view hits unconditionally.
- **Evidence:** Source code analysis of `src/app/layout.tsx` lines 310–322.
- **Status:** **FAIL**
- **Severity:** **P2 (Medium / Privacy Compliance Defect)**
- **Remediation:** Inject Google Consent Mode v2 default denial script into `src/app/layout.tsx` before the GTM script:
  ```tsx
  <Script id="google-consent-default" strategy="beforeInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    `}
  </Script>
  ```
- **Regression Test:** Initial page load network assertion confirming zero telemetry requests dispatched to `google-analytics.com` prior to clicking "Accept Telemetry".

---

### Item 19: Genuine, Consistent Contact Details
- **Requirement:** Uniform corporate identity, verified contact email, standardized headquarters nomenclature, and complete absence of fabricated physical street addresses.
- **Relevant Components:** Navbar, Footer, Contact Page, About Page, Terms, Privacy Policy.
- **Verification Method:** Cross-file string analysis and regex audit across all components and data files.
- **Expected Result:** Uniform email `support@krynexlabs.in`; headquarters standardized to `AHMEDABAD (IN)`; zero fabricated addresses or invalid phone links.
- **Actual Result:**
  - **Company Identity:** Standardized to "Krynex Labs" across all 14 routes.
  - **Official Contact Email:** `support@krynexlabs.in` is uniformly linked across all navigation headers, footers, forms, and legal dockets.
  - **Headquarters Location:** Consistently stated as "AHMEDABAD (IN)" / "Ahmedabad, Gujarat, India".
  - **Address Integrity:** The company responsibly omits a fabricated physical street address, identifying its legal jurisdiction as Ahmedabad, India without inventing a false office location.
  - **Support Channels:** Direct phone support and direct WhatsApp chat links have been excised in accordance with Krynex Labs' verified enterprise communication policy.
- **Evidence:** `tests/remediation-audit.ts` Tests 9, 15, and 17.
- **Status:** **PASS**
- **Severity:** N/A
- **Remediation:** None required.
- **Regression Test:** `tests/remediation-audit.ts` Tests 9 & 15.
