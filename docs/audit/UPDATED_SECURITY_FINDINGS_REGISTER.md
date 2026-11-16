# KRYNEX LABS — UPDATED SECURITY FINDINGS REGISTER
**Audit & Remediation Cycle:** Sprint 1 Post-Remediation Status  
**Date:** 2026-10-24  
**Scope:** Core Web Application, API Route Handlers, Telemetry & Consent, Mobile Breakpoint Accessibility  

---

## 1. Master Findings Status Table

| Finding ID | Severity | Status Before Sprint 1 | Status After Sprint 1 | Remediated In Files | Residual Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-001** | High | Unhandled provider rejection / False success | **CLOSED / RESOLVED** | `src/app/api/contact/route.ts`, `ContactForm.tsx`, `DemoModal.tsx`, `Footer.tsx` | Low. If provider environment keys are not configured, forms gracefully return 503 with prefilled mailto fallback. |
| **SEC-002** | Medium | Header spoofing bypassed rate limits | **CLOSED / RESOLVED** | `src/lib/rate-limiter.ts` | Low. Multi-region container instances have isolated in-memory stores; distributed multi-region rate limiting will require Upstash Redis in Phase 2. |
| **SEC-003** | Medium | Non-essential telemetry fired prior to consent | **CLOSED / RESOLVED** | `src/app/layout.tsx`, `CookieBanner.tsx` | None. Google Consent Mode v2 default denial blocks unconsented analytics storage. |
| **SEC-004** | High | Advisory anomaly & 14.2.18 downgrade risk | **CLOSED / RESOLVED** | `package.json`, `tests/remediation-audit.ts` | None. 14.2.35 retained; all CVEs evaluated as provably unreachable in Linux Vercel architecture. |
| **UI-001** | Medium | Mobile CTA and Cookie Banner coordinate collision | **CLOSED / RESOLVED** | `StickyMobileCTA.tsx`, `CookieBanner.tsx` | None. Dynamic coordinate offset with safe-area insets verified at 320px, 390px, and 768px viewports. |

---

## 2. In-Depth Finding Records

### Finding SEC-001
- **Title:** Silent Failure and False Success State in Contact & Consultation Submission Pipeline
- **Original Verification:** The contact API endpoint returned HTTP 200 regardless of whether the email transport succeeded, failed with a 4xx/5xx code, timed out, or had unconfigured credentials.
- **Root Cause:** Absence of return status evaluation for upstream provider HTTP responses and missing boolean delivery flags.
- **Remediation Details:**
  - Added strict delivery tracking (`isDelivered`).
  - Added 8-second timeout via `AbortSignal.timeout(8000)` on upstream fetch calls.
  - Returned HTTP 503 (`Service Unavailable`) with actionable message and pre-filled mailto URI when delivery fails.
  - Updated all three frontend contact forms (`ContactForm.tsx`, `DemoModal.tsx`, `Footer.tsx`) to display the direct prefilled mailto button when server reports delivery failure.
- **Rollback Considerations:** `git checkout src/app/api/contact/route.ts src/components/ContactForm.tsx src/components/DemoModal.tsx src/components/Footer.tsx`.
- **Status:** **CLOSED / VERIFIED FIXED**.

---

### Finding SEC-002
- **Title:** Client IP Spoofing in API Rate Limiter
- **Original Verification:** `getClientIp()` read `forwarded.split(",")[0]`, taking the leftmost IP supplied in the client request.
- **Root Cause:** Assuming leftmost `X-Forwarded-For` value is set by trusted proxies rather than client attackers.
- **Remediation Details:**
  - Reordered header trust precedence: `x-vercel-forwarded-for` > `x-real-ip` > rightmost entry of `x-forwarded-for` > fallback `127.0.0.1`.
- **Rollback Considerations:** `git checkout src/lib/rate-limiter.ts`.
- **Status:** **CLOSED / VERIFIED FIXED**.

---

### Finding SEC-003
- **Title:** Unconsented Telemetry Transmission via Google Analytics Tag
- **Original Verification:** `gtag.js` was initialized with `gtag('config')` without prior consent state declaration, triggering pageview beacons before cookie banner interaction.
- **Root Cause:** Missing Google Consent Mode v2 default initialization.
- **Remediation Details:**
  - Injected `beforeInteractive` script in `RootLayout` establishing default denial for `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` with `wait_for_update: 500`.
  - Added returning visitor consent restoration in `CookieBanner.tsx`.
- **Rollback Considerations:** `git checkout src/app/layout.tsx src/components/CookieBanner.tsx`.
- **Status:** **CLOSED / VERIFIED FIXED**.

---

### Finding SEC-004
- **Title:** Dependency Advisory Anomaly (Next.js 14.2.18 Downgrade vs 14.2.35 Retainment)
- **Original Verification:** Previous audit recommended downgrading Next.js to 14.2.18 while 14.2.35 was installed.
- **Root Cause:** Historical audit report artifact error. In Next 14, 14.2.35 is the highest release.
- **Remediation Details:**
  - Verified package lockfile and dependency registry. Retained `14.2.35`.
  - Evaluated CVE reachability for Windows RCE (`GHSA-p293-qw3h-jr36`), Server Actions DoS (`GHSA-p3m5-59mp-jv5r`), SSRF in rewrites (`GHSA-p9j2-gv94-2wf4`), and Image Optimization AVIF/SVG (`GHSA-2xp9-vwfh-vxw4`), confirming all attack vectors are unreachable in Krynex's Linux Vercel + Route Handlers architecture.
- **Rollback Considerations:** No dependency modifications were made; working lockfile remains untouched.
- **Status:** **CLOSED / VERIFIED RESOLVED**.

---

### Finding UI-001
- **Title:** Sticky Mobile CTA Obscuring Cookie Banner on Mobile Viewports
- **Original Verification:** At viewports 320x568 and 390x844, scrolling triggered `StickyMobileCTA` at `bottom-4 z-50`, overlapping `CookieBanner` at `bottom-4 z-50`.
- **Root Cause:** Lack of coordinate awareness and state sharing between sticky mobile elements.
- **Remediation Details:**
  - Dynamic coordinate elevation: `StickyMobileCTA` sits at `bottom-[max(11.5rem,calc(11.5rem+env(safe-area-inset-bottom)))]` when consent is undecided, hovering neatly above the banner.
  - Event integration: `CookieBanner` dispatches `krynex_cookie_action` when consent is handled, causing `StickyMobileCTA` to smoothly transition to `bottom-[max(1rem,env(safe-area-inset-bottom))]`.
- **Rollback Considerations:** `git checkout src/components/StickyMobileCTA.tsx src/components/CookieBanner.tsx`.
- **Status:** **CLOSED / VERIFIED FIXED**.
