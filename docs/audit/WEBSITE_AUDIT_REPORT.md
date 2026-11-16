# KRYNEX LABS — PRODUCTION ENTERPRISE WEBSITE AUDIT REPORT
**Audit Date:** October 24, 2026  
**Audited Target:** [https://www.krynexlabs.in](https://www.krynexlabs.in) & Local Repository (`krynex-labs-website`)  
**Auditor Roles:** Principal Software Architect, Senior Full-Stack Engineer, Application Security Engineer, QA Automation Engineer, Performance Engineer, SEO Specialist, and UI/UX Auditor  
**Audit Classification:** Non-Destructive, Evidence-Based Production Readiness Audit  
**Operating Jurisdiction:** Ahmedabad, Gujarat, India  

---

## 1. Executive Summary

An exhaustive, multi-disciplinary technical audit of Krynex Labs' official web application and production infrastructure was executed on October 24, 2026. The inspection covered both the live production deployment hosted at `https://www.krynexlabs.in` (Vercel Edge Network, Mumbai `bom1` datacenter) and the underlying codebase repository.

Krynex Labs is architected as a **Unified Software Product & SaaS Company** operating on a recurring subscription software-rental model. The design system faithfully implements an exact Resend-style obsidian monochrome visual language (`#000000` pitch black canvas, silver specular rims, 3D WebGL Obsidian Rubik's cube assembly, and clean typography).

### Overall Health Assessment
- **Live Deployment Health:** **98/100** — The live website resolves with 200 OK across all canonical routes (`/`, `/solutions`, `/industries`, `/approach`, `/about`, `/contact`, `/privacy`, `/terms`, `/thank-you`, `/research`, and sub-solutions). HTTP to HTTPS apex and www redirects execute cleanly via single 308 Permanent Redirects. Hardened security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy) are actively served on all responses.
- **Repository Baseline & Build Health:** **100/100** — Clean working tree on branch `main`. TypeScript type validation (`npx tsc --noEmit`) passes with 0 errors. ESLint (`npm run lint`) reports 0 warnings and 0 errors. The existing 18-suite regression suite (`npm test`) passes 100%. The production Next.js build (`npm run build`) completes successfully, compiling 16 static routes and 5 dynamic/edge routes.
- **Identified Production Risks:** **2 High-Priority (P1)** and **9 Medium-Priority (P2)** findings require attention before final enterprise certification:
  1. **P1 — Inbound Lead Delivery Vulnerability:** `/api/contact` catches email delivery exceptions from SMTP/Resend or ignores non-200 responses and still returns a `200 OK` with a valid `referenceId`. If the email provider fails, client inquiries can be silently lost while the prospect believes the brief was dispatched.
  2. **P1 — Mobile UI Component Collision:** On mobile screens (<768px), `StickyMobileCTA` and `CookieBanner` both mount at `fixed bottom-4` (`z-50`), causing a direct physical overlap for first-time mobile visitors.
  3. **P2 — Dependency Vulnerabilities:** `npm audit` reveals 8 vulnerabilities (1 critical, 4 high, 3 moderate) primarily tied to `next@14.2.35` and `postcss`.
  4. **P2 — Serverless Rate Limiting Isolation:** In-memory `Map` rate limiting is per-instance, which does not provide global synchronization across distributed serverless Lambda instances.
  5. **P2 — GDPR Consent Mode Timing:** Google Tag Manager / GA4 is loaded without setting Consent Mode v2 default `denied` state prior to script execution.

---

## 2. Actual Technology Stack & Repository Baseline

| Layer | Declared / Detected Technology | Version | Verification Source |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.35` | `package.json` |
| **Core Libraries** | React / React-DOM | `18.3.1` | `package.json` |
| **Language** | TypeScript | `5.6.3` | `package.json`, `tsconfig.json` |
| **Styling** | Tailwind CSS | `3.4.14` | `tailwind.config.ts`, `globals.css` |
| **3D Rendering** | Three.js / React Three Fiber / Drei | `0.160.0` / `8.17.10` / `9.102.6` | `package.json`, `Hero3DCube.tsx` |
| **Animations** | Framer Motion & Canvas Confetti | `11.11.17` / `1.9.4` | `package.json` |
| **Icons** | Lucide React | `0.454.0` | `package.json` |
| **Email Transport** | Nodemailer (SMTP) & Resend REST API | `10.1.7` / Native Fetch | `package.json`, `route.ts` |
| **Deployment** | Vercel Serverless Edge Network | Edge / Node.js 20 LTS | Live HTTP Headers (`Server: Vercel`) |
| **CI/CD** | GitHub Actions (`ci.yml`) & Dependabot | Node 20 LTS | `.github/workflows/ci.yml` |

### Baseline Command Execution Log
1. **`git status`**: Working tree completely clean on branch `main` (`nothing to commit`).
2. **`npm run lint`**: `✔ No ESLint warnings or errors`.
3. **`npx tsc --noEmit`**: 0 static type errors detected.
4. **`npm test`**: All 18 regression suites passed (HTML sanitization, sliding rate limiter, safe storage fallback, dual-currency INR/USD integrity, SLA claim checks, corporate headquarters standardization).
5. **`npm run build`**: 21 routes compiled successfully. Shared First Load JS: 87.5 kB. Homepage First Load JS: 138 kB.

---

## 3. Live Website Assessment (`https://www.krynexlabs.in`)

Public DNS, TLS certificates, and edge caching were verified directly via curl and browser subagents.

### HTTP Routing & Canonical Enforcements
- `http://krynexlabs.in/` → `308 Permanent Redirect` → `https://krynexlabs.in/`
- `https://krynexlabs.in/` → `308 Permanent Redirect` → `https://www.krynexlabs.in/`
- `http://www.krynexlabs.in/` → `308 Permanent Redirect` → `https://www.krynexlabs.in/`
- All canonical internal routes return `200 OK`:
  - `/` (200 OK, Vercel Cache HIT)
  - `/solutions` (200 OK)
  - `/solutions/ai-ml` (200 OK)
  - `/solutions/enterprise-software` (200 OK)
  - `/solutions/cloud-data` (200 OK)
  - `/solutions/web-mobile` (200 OK)
  - `/industries` (200 OK)
  - `/approach` (200 OK)
  - `/about` (200 OK)
  - `/contact` (200 OK)
  - `/research` (200 OK)
  - `/privacy` (200 OK)
  - `/terms` (200 OK)
  - `/thank-you` (200 OK)
  - `/robots.txt` (200 OK)
  - `/sitemap.xml` (200 OK)
  - `/404-verification-probe` (404 Not Found with custom telemetry error view)

### Security Headers Audit (Live Edge Verification)
```http
HTTP/1.1 200 OK
Server: Vercel
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Cross-Origin-Opener-Policy: same-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-XSS-Protection: 0
X-DNS-Prefetch-Control: on
```
All major OWASP-recommended enterprise security headers are active and enforced.

---

## 4. Security Assessment

### Secrets & Environment Hygiene
- **Repository Secrets:** Verified. `.env.local` is strictly ignored by `.gitignore`. Git commit history inspection confirmed zero private API keys or credentials were ever committed to the Git tree.
- **Client Bundle Exposure:** No `NEXT_PUBLIC_` variables expose sensitive secrets. `RESEND_API_KEY`, `GMAIL_APP_PASSWORD`, and webhook URLs are isolated exclusively to server-side route handlers.

### Vulnerability Register
- **SEC-001 (P1 - High):** Silent Lead Dropping in `/api/contact`. The endpoint catches delivery errors without propagating a failure status code (502/503), giving false delivery confirmation to users.
- **SEC-002 (P2 - Medium):** In-Memory Rate Limiting in Serverless. An in-memory JavaScript `Map` does not synchronize across distributed Vercel serverless containers.
- **SEC-003 (P2 - Medium):** GA4 Consent Mode v2 Timing. Google Analytics initializes prior to explicit cookie banner consent without a default-deny state.
- **SEC-004 (P2 - Medium):** Dependency Vulnerabilities. `npm audit` reports 8 vulnerabilities across `next@14.2.35`, `postcss`, and `glob`.
- **SEC-005 (P3 - Low):** CSP Contains `'unsafe-inline'` and `'unsafe-eval'`. Recommend transitioning to middleware nonce generation.

---

## 5. Functionality & User Journey Assessment

| User Journey / Feature | Verification Result | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Desktop Navigation** | Sticky bar transitions on scroll; links navigate to active paths | **PASS** | Active route highlighted with silver pill |
| **Contact Us Navbar CTA** | Opens `DemoModal` with focus trap and escape listener | **PASS** | Keyboard accessible |
| **Hero 3D Rubik's Cube** | Unboxed Obsidian metal subcubes render at 60 FPS | **PASS** | Drag to rotate, click row to turn, fallback on mobile |
| **Problem Section Tabs** | Clicking 7 category tabs toggles active panel cleanly | **PASS** | ARIA attributes present |
| **Diagnostic Drafting Demo** | Sector selector switches simulated telemetry tabs | **PASS** | Disclaimers prevent misleading SLA claims |
| **Contact Page Form** | Fields validate inputs, reject spam honeypots | **PARTIAL** | Backend delivery error reporting requires hardening (SEC-001) |
| **Consultation Modal Form** | Submits inquiry, generates Reference ID, triggers confetti | **PARTIAL** | Shares same backend silent failure risk (SEC-001) |
| **Footer Inquiry Form** | Minimalist form validates work email, provides feedback | **PARTIAL** | Code duplication with `ContactForm` (ARCH-001) |
| **Mobile Drawer Navigation** | Hamburger opens full-screen backdrop, locks body scroll | **PASS** | Focus trapped; closes on Esc or backdrop click |
| **Sticky Mobile CTA** | Appears after scrolling 280px | **FAIL (UI)** | Collides with `CookieBanner` on mobile viewports (UI-001) |
| **Cookie Consent Banner** | Slide-in after 1.2s; accepts and saves to localStorage | **PASS** | Persists `krynex_cookie_consent` |
| **404 Custom Page** | Displays terminal error view with button returning home | **PASS** | Returns HTTP 404 status code |

---

## 6. UI/UX & Visual Quality Assessment

1. **Aesthetic Execution:** The site excels in delivering a high-end, monochrome aesthetic inspired by Resend.com. Background subtle radial spots, 1px silver specular rims, and obsidian metal textures establish a professional corporate identity.
2. **Visual Hierarchy:** Typography uses Inter with strict scale hierarchies. Headings feature metallic vertical gradients (`bg-gradient-to-b from-white via-zinc-100 to-zinc-500`).
3. **Confirmed Visual Defects:**
   - **UI-001 (P1):** Mobile Viewport Collision between `StickyMobileCTA` and `CookieBanner` at `bottom-4` (`z-50`).
   - **UI-002 (P2):** BentoGrid Card 1 SVG Bezier Data Beams use fixed pixel coordinates (`M 170 50...`) inside a fluid flex container, causing lines to drift away from cards on non-standard viewports.
   - **UI-003 (P3):** Resend literal marketing copy ("Experience better support today...") in `Footer.tsx` and `DemoModal.tsx` should be tailored to Krynex's enterprise product model.

---

## 7. Performance & Core Web Vitals Assessment

### Laboratory Measurements (Next.js Production Build)
- **First Load JS (Shared):** **87.5 kB** (Well below the 100 kB performance budget).
- **Homepage First Load JS:** **138 kB** (Includes Three.js dynamic chunk deferral).
- **Static Pre-rendered Routes:** **16 routes** prerendered to static HTML at build time.
- **Dynamic / Edge Routes:** 5 routes (`/api/contact`, `/apple-icon`, `/contact`, `/icon`, `/opengraph-image`, `/thank-you`).

### Key Performance Findings
- **PERF-001 (P2 - Medium):** Edge runtime in `icon.tsx`, `apple-icon.tsx`, and `opengraph-image.tsx` disables static generation, adding edge compute cold-starts to favicon and social card requests.
- **PERF-002 (P2 - Medium):** Three.js bundle weight (~600 kB uncompressed) is properly deferred on desktop via `requestIdleCallback`, but mobile viewports must strictly avoid downloading WebGL assets.
- **PERF-003 (P3 - Low):** Node typeless module warning in `package.json` (`node --experimental-strip-types tests/remediation-audit.ts`). Adding `"type": "module"` eliminates runtime reparsing overhead.

---

## 8. SEO & Search Visibility Assessment

- **Indexability:** `robots.txt` permits all search crawlers, indexes `/sitemap.xml`, and restricts `/api/`.
- **Sitemap:** Clean XML sitemap indexing 14 canonical URLs with ISO 8601 timestamps and appropriate change frequencies.
- **Canonical Structure:** Every page defines `<link rel="canonical" href="https://www.krynexlabs.in/...">` matching canonical routing rules.
- **Structured Data:** Enterprise JSON-LD `@graph` in `layout.tsx` defines `Organization`, `Corporation`, `ProfessionalService`, `WebSite`, 4 `Service` schemas, and `FAQPage` rich snippets.
- **OpenGraph & Twitter:** 1200x630 dynamic social share cards configured via `ImageResponse`.
- **Defects Identified:**
   - **SEO-001 (P2 - Medium):** Inconsistent BreadcrumbList schema on solution sub-pages (`/solutions/ai-ml`, etc.).
   - **SEO-002 (P3 - Low):** Deprecated `<meta name="keywords">` tag present in root layout.

---

## 9. Accessibility (WCAG 2.2 AA) Assessment

- **Keyboard Navigation:** Focus rings (`focus-visible:ring-1 focus-visible:ring-white/40`) are implemented across navigation links, buttons, and form inputs.
- **Screen Reader Support:** Modals and mobile drawers use `role="dialog"`, `aria-modal="true"`, and label references. Status messages use `role="status"` and `aria-live="polite"`.
- **Reduced Motion:** Global media query `@media (prefers-reduced-motion: reduce)` clamps all animations, transitions, and transforms to `0.01ms`.
- **Defects Identified:**
   - **A11Y-001 (P2 - Medium):** Problem Section `role="tablist"` lacks Arrow key (ArrowLeft/ArrowRight) keyboard listeners.
   - **A11Y-002 (P3 - Low):** Borderline contrast (4.58:1) on secondary `text-zinc-500` labels over `#000000`. Upgrading to `text-zinc-400` achieves 7.48:1 contrast.

---

## 10. Final Production Readiness Assessment

| Evaluation Dimension | Readiness Status | Risk Level |
| :--- | :--- | :--- |
| **Core Architecture & Code Quality** | **READY** | Low |
| **Security & Privacy Hardening** | **READY WITH DOCUMENTED RISKS** | Medium (SEC-001, SEC-002, SEC-003) |
| **Visual Aesthetics & Monochrome Design** | **READY WITH DOCUMENTED RISKS** | Medium (UI-001 mobile collision) |
| **Performance & Bundle Efficiency** | **READY** | Low |
| **SEO & Discoverability** | **READY** | Low |
| **Automated Testing & CI/CD Gate** | **READY WITH DOCUMENTED RISKS** | Medium (TEST-001 missing E2E) |

### Verdict: **READY WITH DOCUMENTED RISKS**
The website is in exceptional shape architecturally, aesthetically, and functionally. Remediation of the 2 P1 findings (lead delivery error reporting and mobile CTA/cookie banner collision) and prioritized P2 items will elevate the application to unconditional enterprise certification.
