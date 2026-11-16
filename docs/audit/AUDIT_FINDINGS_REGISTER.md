# KRYNEX LABS — AUDIT FINDINGS REGISTER
**Version:** 1.0.0 (Master Audit)  
**Date:** October 24, 2026  
**Status:** Active  

This register contains the deduplicated, evidence-based defect and risk inventory compiled during the complete enterprise audit of Krynex Labs.

---

## Findings Index by Priority

| ID | Priority | Category | Short Title | Affected File / Route | Confidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-001** | **P1 (High)** | Security / Reliability | Silent Lead Dropping on Email Delivery Failure | `src/app/api/contact/route.ts` | Confirmed Defect |
| **UI-001** | **P1 (High)** | UI/UX | Mobile Viewport Collision (Sticky CTA vs Cookie Banner) | `src/components/StickyMobileCTA.tsx`, `CookieBanner.tsx` | Confirmed Defect |
| **SEC-002** | **P2 (Med)** | Security / Abuse | Serverless In-Memory Rate Limiting Instance Isolation | `src/lib/rate-limiter.ts`, `/api/contact` | Confirmed Risk |
| **SEC-003** | **P2 (Med)** | Security / Privacy | GA4 Consent Mode v2 Default State Missing Prior to Init | `src/app/layout.tsx`, `CookieBanner.tsx` | Confirmed Defect |
| **SEC-004** | **P2 (Med)** | Supply Chain | High & Critical Dependency Vulnerabilities via npm audit | `package.json`, `package-lock.json` | Confirmed Risk |
| **UI-002** | **P2 (Med)** | UI/UX | Static SVG Bezier Coordinates Disconnecting on Wide Displays | `src/components/BentoGrid.tsx` | Confirmed Defect |
| **PERF-001** | **P2 (Med)** | Performance | Edge Runtime Disabling Static Prerendering of Dynamic Icons | `src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx` | Confirmed Defect |
| **PERF-002** | **P2 (Med)** | Performance | 3D WebGL Canvas Asset Weight on Low-Bandwidth Devices | `src/components/Hero3DCube.tsx`, `HeroSection.tsx` | Confirmed Risk |
| **SEO-001** | **P2 (Med)** | SEO | Missing Reciprocal BreadcrumbList JSON-LD on Solution Pages | `src/app/solutions/[slug]/page.tsx` | Confirmed Defect |
| **A11Y-001** | **P2 (Med)** | Accessibility | Problem Section Tablist Arrow Key Keyboard Navigation Gap | `src/components/ProblemSection.tsx` | Confirmed Defect |
| **ARCH-001** | **P2 (Med)** | Architecture | Duplicated Form Validation & Submission State Across 3 Views | `ContactForm.tsx`, `Footer.tsx`, `DemoModal.tsx` | Confirmed Defect |
| **TEST-001** | **P2 (Med)** | Testing | Absence of Automated End-to-End (E2E) Browser Tests in CI | `.github/workflows/ci.yml` | Confirmed Gap |
| **DEPLOY-001**| **P2 (Med)** | Deployment | Absence of vercel.json Serverless MaxDuration & Region Pinning | Project Root (`vercel.json`) | Confirmed Gap |
| **SEC-005** | **P3 (Low)** | Security | CSP Contains 'unsafe-inline' and 'unsafe-eval' Directives | `next.config.mjs` | Potential Risk |
| **FUNC-001** | **P3 (Low)** | Maintainability | WhatsAppButton Dead Stub Component Returning null | `src/components/WhatsAppButton.tsx` | Confirmed Defect |
| **FUNC-002** | **P3 (Low)** | SEO / UX | Obsolete Product Slugs Coalesced into Generic /solutions | `next.config.mjs` | Improvement Rec |
| **UI-003** | **P3 (Low)** | Branding / Copy | Resend.com Literal Copy in Footer and Modal Headlines | `Footer.tsx`, `DemoModal.tsx`, `contact/page.tsx` | Improvement Rec |
| **PERF-003** | **P3 (Low)** | Performance | Typeless Module Package.json Reparsing Overhead in Tests | `package.json` | Confirmed Defect |
| **SEO-002** | **P3 (Low)** | SEO | Redundant Meta Keywords Header in Root Layout | `src/app/layout.tsx` | Improvement Rec |
| **A11Y-002** | **P3 (Low)** | Accessibility | Low Visual Contrast on Secondary Muted Telemetry Labels | `src/components/Footer.tsx`, `DraftingDemo.tsx` | Potential Risk |
| **ARCH-002** | **P4 (Info)**| Architecture | Legacy Product Directory Components Left in src/components | `ProductsDirectory.tsx`, `ProductDetailView.tsx` | Improvement Rec |

---

## Detailed Findings Register

### SEC-001: Silent Lead Dropping on Email Delivery Failure
- **Priority:** **P1 (High)**
- **Category:** Application Security & Reliability
- **Affected Route / File:** `src/app/api/contact/route.ts#L183-L228`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  In `route.ts`, lines 185–228:
  ```ts
  if (gmailUser && gmailPass) {
    try {
      await transporter.sendMail({ ... });
    } catch (smtpErr) {
      console.error("[KRYNEX NOTIFICATION ERROR] SMTP delivery exception:", ...);
    }
  } else if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", { ... });
    } catch (resendErr) {
      console.error("[KRYNEX NOTIFICATION ERROR] Resend exception:", ...);
    }
  }
  return NextResponse.json({ ok: true, success: true, referenceId, ... }, { status: 200 });
  ```
  1. `fetch("https://api.resend.com/emails")` does NOT check `if (!resendResponse.ok)`. Resend returning 401, 403, 422, or 429 does not throw, so it proceeds silently.
  2. If network failures throw, the `catch` blocks swallow the exception and proceed to return `status: 200`.
  3. If neither SMTP nor Resend are configured, it still returns `status: 200`.
- **User Impact:** High-value enterprise prospects fill out an inquiry docket, receive a valid "Inquiry Dispatched" confirmation and Reference ID, but the message is never transmitted to Krynex Labs engineers.
- **Root Cause:** Error suppression intended to prevent leaking stack traces inadvertently suppressed delivery failure status codes.
- **Recommended Fix:** Inspect provider responses (`if (!resendResponse.ok)` / check SMTP error). If all delivery transports fail, respond with `status: 502/503` and a message directing the client to email `support@krynexlabs.in` directly.
- **Dependencies:** None.

---

### UI-001: Mobile Viewport Collision between Sticky Mobile CTA and Cookie Banner
- **Priority:** **P1 (High)**
- **Category:** UI/UX & Mobile Responsiveness
- **Affected Route / File:** `src/components/StickyMobileCTA.tsx#L41`, `src/components/CookieBanner.tsx#L39`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  `StickyMobileCTA.tsx` defines:
  `className="md:hidden fixed bottom-4 inset-x-3 z-50 animate-slide-up"`
  `CookieBanner.tsx` defines:
  `className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-slide-up"`
  On viewports <768px, after scrolling past 280px without accepting cookies, both elements occupy the identical physical screen real estate (`bottom-4`, `z-50`), stacking over each other and obscuring interactive tap targets.
- **User Impact:** Degraded first-impression mobile usability; prospects cannot easily tap "Accept Telemetry" or "Contact Us" without mis-clicks.
- **Root Cause:** Independent positioning classes without a coordinated mobile layout coordinator or z-index/offset manager.
- **Recommended Fix:** Conditionally offset the Sticky CTA (`bottom-24`) while the Cookie Banner is active, or defer rendering the Sticky CTA until cookie consent is resolved.
- **Dependencies:** None.

---

### SEC-002: Serverless In-Memory Rate Limiting Instance Isolation
- **Priority:** **P2 (Medium)**
- **Category:** Abuse Prevention & Cloud Architecture
- **Affected Route / File:** `src/lib/rate-limiter.ts#L18`, `src/app/api/contact/route.ts#L13-L32`
- **Confidence:** **Confirmed Risk**
- **Evidence:**
  `ipStore = new Map<string, RateLimitRecord>()` is bound to the Node.js memory process of a single Vercel Lambda instance. Under distributed traffic or multi-region routing, different requests from the same IP can hit different serverless instances, effectively resetting the 5-request counter.
- **User Impact:** Allows automated bot swarms to submit more than 5 requests per 10-minute window by distributing calls across multiple edge nodes.
- **Root Cause:** State persistence stored in local memory instead of a shared distributed key-value store.
- **Recommended Fix:** Integrate an external edge rate limiter (e.g. `@upstash/ratelimit` with Redis or Vercel KV) for production deployments while maintaining the current memory map as a local dev fallback.
- **Dependencies:** External Redis / Upstash instance or Vercel KV provisioning.

---

### SEC-003: GA4 Consent Mode v2 Default State Missing Prior to Initialization
- **Priority:** **P2 (Medium)**
- **Category:** Application Security & Regulatory Privacy
- **Affected Route / File:** `src/app/layout.tsx#L310-L322`, `src/components/CookieBanner.tsx#L21-L32`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  `layout.tsx` loads `https://www.googletagmanager.com/gtag/js?id=G-KZCMWZSRFN` with `strategy="afterInteractive"` and runs `gtag('config', 'G-KZCMWZSRFN')` immediately. Google Consent Mode v2 default denial (`gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' })`) is never executed before the config call. GA4 sets cookies on initial load prior to visitor consent.
- **User Impact:** Potential regulatory non-compliance under EU GDPR, UK GDPR, and India DPDP guidelines for visitors who do not consent to analytics tracking.
- **Root Cause:** GA4 initialization script did not include pre-execution Consent Mode v2 configuration.
- **Recommended Fix:** Prepend an inline script before the GTM loader setting default consent to `denied`. Update consent state upon user interaction in `CookieBanner.tsx`.
- **Dependencies:** None.

---

### SEC-004: High & Critical Dependency Vulnerabilities via npm audit
- **Priority:** **P2 (Medium)**
- **Category:** Supply Chain & Dependency Security
- **Affected Route / File:** `package.json#L21`, `package-lock.json`
- **Confidence:** **Confirmed Risk**
- **Evidence:**
  Running `npm audit` reveals 8 vulnerabilities (1 critical, 4 high, 3 moderate):
  - `next@14.2.35` (Advisories for Image Optimizer DoS, React Server Component DoS, HTTP request smuggling in rewrites).
  - `postcss@8.4.47` (CSS stringify unescaped style tags).
  - `postcss-selector-parser` (Quadratic complexity CPU exhaustion).
  - `glob@10.4.5` (CLI command injection via dev dependency).
- **User Impact:** Potential denial-of-service risks under specialized attack payloads targeting Next.js image optimization or RSC parsing.
- **Root Cause:** Fast-evolving upstream Next.js and build tool security advisories.
- **Recommended Fix:** Test upgrade path to the latest patch release in the 14.x branch (`next@14.2.x` latest patched version) to remediate known CVEs without introducing breaking changes.
- **Dependencies:** Compatibility testing with `@react-three/fiber` and `@react-three/drei`.

---

### UI-002: Static SVG Bezier Coordinates Disconnecting on Wide Displays
- **Priority:** **P2 (Medium)**
- **Category:** UI/UX & Visual Consistency
- **Affected Route / File:** `src/components/BentoGrid.tsx#L103-L175`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  BentoGrid Card 1 renders 4 SVG curved bezier data beams with hardcoded coordinate paths:
  `d="M 170 50 C 260 50, 270 120, 360 120"`
  `d="M 490 120 C 580 120, 590 50, 680 50"`
  The `<svg>` element has `className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none"` and lacks a `viewBox`. On screens wider than 1200px or narrow tablet widths, flex layout pushes the DOM button cards ("Raw Industry Data", "Krynex Neural Engine") out of alignment with the static SVG pixel coordinates.
- **User Impact:** Visual polish degradation; data beams appear disconnected from the cards they are meant to connect.
- **Root Cause:** Fixed coordinate paths inside a fluid CSS flexbox layout.
- **Recommended Fix:** Wrap SVG in a calibrated `viewBox="0 0 800 240"` with relative positioning or dynamically measure node anchor positions via `getBoundingClientRect()`.
- **Dependencies:** None.

---

### PERF-001: Edge Runtime Disabling Static Prerendering of Dynamic Icons
- **Priority:** **P2 (Medium)**
- **Category:** Performance & Asset Optimization
- **Affected Route / File:** `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  `npm run build` logs:
  `⚠ Using edge runtime on a page currently disables static generation for that page`
  Routes `/icon`, `/apple-icon`, and `/opengraph-image` are flagged as dynamic (`ƒ`), requiring Edge Function compute execution on every uncached request.
- **User Impact:** Slight latency overhead on initial favicon and social share previews; unnecessary consumption of Vercel Edge compute invocations.
- **Root Cause:** Next.js dynamic image generators using `export const runtime = "edge"` cannot be pre-rendered as static files during `next build`.
- **Recommended Fix:** Pre-generate static `.png` assets in `/public` or configure aggressive HTTP cache-control headers (`s-maxage=31536000, stale-while-revalidate`).
- **Dependencies:** None.

---

### PERF-002: 3D WebGL Canvas Asset Weight on Low-Bandwidth Devices
- **Priority:** **P2 (Medium)**
- **Category:** Performance & Mobile Optimization
- **Affected Route / File:** `src/components/Hero3DCube.tsx`, `src/components/HeroSection.tsx`
- **Confidence:** **Confirmed Risk**
- **Evidence:**
  Three.js, `@react-three/fiber`, and `@react-three/drei` add ~600 kB of uncompressed JavaScript. While `HeroSection.tsx` uses `dynamic(..., { ssr: false })` and `requestIdleCallback`, on low-tier mobile devices with slow CPU/GPU or battery-saver mode, WebGL initialization can cause frame drops and long main-thread tasks.
- **User Impact:** Slower initial interaction readiness on budget mobile devices.
- **Root Cause:** Heavy client-side 3D runtime library.
- **Recommended Fix:** Guard 3D loading with a strict viewport check (`window.innerWidth >= 1024`) and hardware concurrency check, permanently serving `HeroCubeFallback` on mobile.
- **Dependencies:** None.

---

### SEO-001: Missing Reciprocal BreadcrumbList JSON-LD on Solution Pages
- **Priority:** **P2 (Medium)**
- **Category:** SEO & Structured Data
- **Affected Route / File:** `src/app/solutions/[slug]/page.tsx`, `src/components/SolutionDetailView.tsx`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  `src/app/industries/page.tsx` includes a comprehensive `BreadcrumbList` JSON-LD schema, but the individual `/solutions/*` pages only output standard Service schemas without a navigational BreadcrumbList linking `Home > Solutions > [Solution Name]`.
- **User Impact:** Google search results lack hierarchical breadcrumb navigation snippets for deep solution pages.
- **Root Cause:** Breadcrumb schema was implemented for Industries but omitted during Solutions detail view creation.
- **Recommended Fix:** Inject standard `BreadcrumbList` JSON-LD into `SolutionDetailView.tsx`.
- **Dependencies:** None.

---

### A11Y-001: Problem Section Tablist Arrow Key Keyboard Navigation Gap
- **Priority:** **P2 (Medium)**
- **Category:** Accessibility (WCAG 2.2 AA)
- **Affected Route / File:** `src/components/ProblemSection.tsx`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  The problem category tab group uses `role="tablist"` and `role="tab"`. In the WCAG APG design pattern for tabs, keyboard users should navigate between tabs using Left/Right Arrow keys with automatic or manual activation, while Tab key exits the tablist into the tabpanel. Currently, Tab key navigates between individual tabs.
- **User Impact:** Screen reader and keyboard-only users encounter non-standard tab behavior.
- **Root Cause:** Native button tab array without an `onKeyDown` roving tabIndex listener.
- **Recommended Fix:** Add standard `onKeyDown` listener checking for `ArrowRight`, `ArrowLeft`, `Home`, and `End` keys.
- **Dependencies:** None.

---

### ARCH-001: Duplicated Form Validation & Submission State Across 3 Views
- **Priority:** **P2 (Medium)**
- **Category:** Architecture & Code Maintainability
- **Affected Route / File:** `src/components/ContactForm.tsx`, `Footer.tsx`, `DemoModal.tsx`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  `ContactForm.tsx`, `Footer.tsx`, and `DemoModal.tsx` all implement identical logic independently:
  - Form validation regexes (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
  - Error state mappings (`Record<string, string>`)
  - Honeypot state tracking (`_security_honeypot`)
  - Submitting, submitted, and ticketId state hooks
  - Canvas confetti dynamic import and trigger
- **User Impact:** High risk of regression when updating inquiry workflows, analytics tracking, or field validation rules.
- **Root Cause:** Rapid iteration resulted in copy-pasted form logic instead of an abstracted hook or shared component.
- **Recommended Fix:** Create a shared `useContactInquiry` custom hook or reusable `InquiryForm` component.
- **Dependencies:** None.

---

### TEST-001: Absence of Automated End-to-End (E2E) Browser Tests in CI
- **Priority:** **P2 (Medium)**
- **Category:** Testing & Quality Assurance
- **Affected Route / File:** `.github/workflows/ci.yml`
- **Confidence:** **Confirmed Gap**
- **Evidence:**
  `.github/workflows/ci.yml` runs `npm run lint`, `npx tsc --noEmit`, `npm test` (unit test suite), and `npm run build`. There are no automated browser tests (e.g. Playwright) validating that client-side components (3D Canvas, Modal dialogs, Mobile Drawer, Form submission) actually render and function in a real browser engine.
- **User Impact:** Potential for client-side regressions (such as Drei canvas crashes or hydration errors) to bypass CI undetected.
- **Root Cause:** CI pipeline was established with unit and build checks but lacks headless browser automation.
- **Recommended Fix:** Add a Playwright smoke test job to `ci.yml` testing the 4 primary user journeys.
- **Dependencies:** Playwright installation and headless browser runner setup.

---

### DEPLOY-001: Absence of vercel.json Serverless MaxDuration & Region Pinning
- **Priority:** **P2 (Medium)**
- **Category:** Production Deployment & Infrastructure
- **Affected Route / File:** Project Root (`vercel.json`)
- **Confidence:** **Confirmed Gap**
- **Evidence:**
  The repository does not contain a `vercel.json` file. While Vercel auto-detects Next.js, serverless functions in `/api/contact` default to standard 10-second timeouts and default serverless regions (often US-East `iad1`). For an Indian enterprise platform targeting Ahmedabad (`bom1`), lack of region configuration adds cross-continental roundtrip latency to API calls.
- **User Impact:** Inbound inquiry API submissions take longer to execute due to cross-region routing.
- **Root Cause:** Missing explicit deployment manifest.
- **Recommended Fix:** Add a `vercel.json` specifying `regions: ["bom1"]` and function timeout configurations.
- **Dependencies:** None.

---

### SEC-005: CSP Contains 'unsafe-inline' and 'unsafe-eval' Directives
- **Priority:** **P3 (Low)**
- **Category:** Application Security
- **Affected Route / File:** `next.config.mjs#L16`
- **Confidence:** **Potential Risk**
- **Evidence:**
  CSP header specifies `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com`.
- **User Impact:** Winder attack surface if an XSS vulnerability were introduced elsewhere in the codebase.
- **Root Cause:** Next.js default hydration scripts and Google Tag Manager traditionally require inline script execution.
- **Recommended Fix:** Transition to Next.js middleware nonce-based CSP (`nonce-{base64}`).
- **Dependencies:** Next.js middleware implementation.

---

### FUNC-001: WhatsAppButton Dead Stub Component Returning null
- **Priority:** **P3 (Low)**
- **Category:** Code Quality & Maintainability
- **Affected Route / File:** `src/components/WhatsAppButton.tsx#L1-L6`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  File contains:
  ```tsx
  "use client";
  export default function WhatsAppButton() { return null; }
  ```
- **User Impact:** Dead code cluttering the component namespace.
- **Root Cause:** Residual file from a previous floating WhatsApp button implementation that was disabled to align with corporate B2B positioning.
- **Recommended Fix:** Delete the file or document it as permanently deprecated.
- **Dependencies:** None.

---

### FUNC-002: Obsolete Product Slugs Coalesced into Generic /solutions
- **Priority:** **P3 (Low)**
- **Category:** Routing & User Experience
- **Affected Route / File:** `next.config.mjs#L78-L86`
- **Confidence:** **Improvement Recommendation**
- **Evidence:**
  `next.config.mjs` maps `/products/:slug*` universally to `/solutions`.
- **User Impact:** A user following an external link to a specific product (e.g. `/products/legal-suite`) lands on the general `/solutions` index rather than the relevant solution `/solutions/enterprise-software`.
- **Root Cause:** Coarse wildcard redirect.
- **Recommended Fix:** Provide specific 308 redirects for known prior product slugs to their specific solution pages.
- **Dependencies:** None.

---

### UI-003: Resend.com Literal Copy in Footer and Modal Headlines
- **Priority:** **P3 (Low)**
- **Category:** Brand Positioning & Content Quality
- **Affected Route / File:** `src/components/Footer.tsx#L163-L170`, `src/components/DemoModal.tsx#L233-L239`
- **Confidence:** **Improvement Recommendation**
- **Evidence:**
  The headline "Experience better software today - Get personal, reliable support from people who know your setup and care about your success" is an exact verbatim phrase from Resend.com support marketing.
- **User Impact:** Incongruity with Krynex Labs' positioning as an enterprise software product company solving industrial bottlenecks.
- **Root Cause:** Design template placeholder text retained during visual styling.
- **Recommended Fix:** Update copy to: "Experience Problem-Driven Software Architecture // Engineered for Industrial Throughput & Reliable Subscription Access."
- **Dependencies:** None.

---

### PERF-003: Typeless Module Package.json Reparsing Overhead in Tests
- **Priority:** **P3 (Low)**
- **Category:** Performance & Developer Experience
- **Affected Route / File:** `package.json`
- **Confidence:** **Confirmed Defect**
- **Evidence:**
  Running `npm test` outputs: `[MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type ... is not specified ... Reparsing as ES module`.
- **User Impact:** Adds runtime reparsing overhead to test runs and CLI executions.
- **Root Cause:** Missing `"type": "module"` in `package.json`.
- **Recommended Fix:** Add `"type": "module"` to `package.json`.
- **Dependencies:** Verification of existing scripts for ESM compatibility.

---

### SEO-002: Redundant Meta Keywords Header in Root Layout
- **Priority:** **P3 (Low)**
- **Category:** SEO Hygiene
- **Affected Route / File:** `src/app/layout.tsx#L30-L43`
- **Confidence:** **Improvement Recommendation**
- **Evidence:**
  `layout.tsx` generates `<meta name="keywords" content="...">`.
- **User Impact:** None; modern search engines disregard the tag. Adds minor byte overhead.
- **Root Cause:** Legacy SEO habit.
- **Recommended Fix:** Remove `keywords` from `metadata` in `layout.tsx`.
- **Dependencies:** None.

---

### A11Y-002: Low Visual Contrast on Secondary Muted Telemetry Labels
- **Priority:** **P3 (Low)**
- **Category:** Accessibility (WCAG 2.2 AA)
- **Affected Route / File:** `src/components/Footer.tsx`, `DraftingDemo.tsx`
- **Confidence:** **Potential Risk**
- **Evidence:**
  `text-zinc-500` (`#71717A`) on `#000000` has a 4.58:1 contrast ratio, which is right on the edge of the 4.5:1 minimum threshold.
- **User Impact:** Readability strain for users with minor visual impairments on lower-brightness screens.
- **Root Cause:** High-contrast Resend aesthetic pushing muted elements toward dark grey.
- **Recommended Fix:** Elevate secondary labels from `text-zinc-500` to `text-zinc-400` (`#A1A1AA`, 7.48:1 contrast).
- **Dependencies:** None.

---

### ARCH-002: Legacy Product Directory Components Left in src/components
- **Priority:** **P4 (Informational)**
- **Category:** Codebase Hygiene
- **Affected Route / File:** `ProductsDirectory.tsx`, `ProductDetailView.tsx`, `ProductsShowcase.tsx`
- **Confidence:** **Improvement Recommendation**
- **Evidence:**
  Files remain in `src/components/` after the route migration from `/products` to `/solutions`.
- **User Impact:** None directly on production bundles if unimported, but increases developer cognitive load.
- **Root Cause:** Pre-migration legacy code.
- **Recommended Fix:** Archive to a dedicated `legacy/` directory or delete.
- **Dependencies:** None.
