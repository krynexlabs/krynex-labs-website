# VERCEL PRODUCTION DEPLOYMENT REPORT
**Target Domain:** [https://www.krynexlabs.in](https://www.krynexlabs.in)  
**Apex Domain:** [https://krynexlabs.in](https://krynexlabs.in)  
**Live Production URL:** [https://krynex-labs.vercel.app](https://krynex-labs.vercel.app)  
**GitHub Repository:** [https://github.com/krynexlabs/krynex-labs-website](https://github.com/krynexlabs/krynex-labs-website)  
**Date:** October 18, 2026  
**Auditor & Deployment Specialist:** Senior DevOps & Production QA Engineer  

---

## A. Project Information & Tech Stack Audit

| Parameter | Inspected Specification | Evidence & Findings |
| :--- | :--- | :--- |
| **Repository** | `https://github.com/krynexlabs/krynex-labs-website.git` | Public repo owned by user `krynexlabs` (`ANKOLIYADIXIT80@GMAIL.COM`) |
| **Workspace Root** | `E:\.COM\KL_WEBSITE` | Clean Next.js project directory |
| **Technology Stack** | **Next.js 14.2.35 (App Router)** | React 18.3.1, TypeScript 5.6, Tailwind CSS 3.4, Three.js 0.160 |
| **PHP Runtime Audit** | **0 PHP application files** | Although the master prompt referenced PHP, deep recursive audit confirmed the codebase is 100% Next.js/TypeScript. No PHP runtime or Apache serverless bridge is required. |
| **3D & Graphics Engine** | Three.js + React Three Fiber + Drei | 3x3x3 Unboxed Obsidian Rubik's Cube with 3 procedural micro-textures, 4 `<Lightformer>` softboxes, and `prefers-reduced-motion` safety |
| **Design System** | Resend Monochrome Black & Silver | Pure pitch black `#000000`, card surfaces `#080808`, borders `border-white/[0.08]`, specular rim highlights, zero blue/cyan |
| **Build Command** | `npm run build` (`next build`) | Verified clean build across all 11 routes |
| **Production Branch** | `main` | Configured default branch |

---

## B. Deployment Configuration

| Config Item | Value / Setting | Status |
| :--- | :--- | :--- |
| **Vercel Project** | `krynex-labs` (`prj_cJgT8PmMxhDcUsdTQJSSvmI6VDCJ`) | Active under `ankoliya-dixit-s-projects` |
| **Vercel Account** | `dixitpatel0782-9759` | Authenticated and verified via Vercel CLI 54.6.1 |
| **Framework Preset** | Next.js | Auto-detected |
| **Node.js Version** | 24.x | Vercel production runtime |
| **Environment Variables** | `RESEND_API_KEY`<br>`CONTACT_EMAIL_RECIPIENT` (`support@krynexlabs.in`)<br>`CONTACT_FROM_EMAIL` | Optional for contact form email dispatch. Handled gracefully with fallback telemetry logging in `/api/contact/route.ts` if unset. |
| **Database Requirement** | None (Stateless Marketing & AI Architecture Site) | No external SQL database required. Real-time telemetry is calculated dynamically. |

---

## C. Build and Deployment Results

1. **Local Build & Quality Gates:**
   - **TypeScript Typecheck (`npx tsc --noEmit`):** `Exit Code 0` (0 errors).
   - **ESLint Gate (`npm run lint`):** `Exit Code 0` (`✔ No ESLint warnings or errors`).
   - **Local Production Build (`npm run build`):** `Exit Code 0` (All 11 static/dynamic routes compiled).
2. **Vercel Cloud Production Build:**
   - **Deployment ID:** `krynex-labs-8wj2ybp8e-ankoliya-dixit-s-projects.vercel.app`
   - **Vercel Inspect URL:** `https://vercel.com/ankoliya-dixit-s-projects/krynex-labs/BjKfsGwc5iWZmuVRhmhzedTjr76D`
   - **Cloud Status:** `● Ready` (Duration: 53s)
   - **Live Production URL:** `https://krynex-labs.vercel.app`
   - **Live HTTP Status:** `HTTP/1.1 200 OK` (Cache: HIT, Server: Vercel)

---

## D. Domain & DNS Status

Live authoritative DNS query verified via `Resolve-DnsName`:

| Record Type | Host | Current DNS Target | Required Target | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www.krynexlabs.in` | `be04de8fb962ea76.vercel-dns-017.com` | `cname.vercel-dns.com` or project CNAME | **DNS Routed to Vercel** (Waiting on Apex verification) |
| **A (Apex)** | `krynexlabs.in` | `15.197.225.128`<br>`216.198.79.1`<br>`3.33.251.168` | **`76.76.21.21`** (Vercel Anycast IP) | **ACTION REQUIRED AT GODADDY** |
| **MX (Email)** | `krynexlabs.in` | `krynexlabs-in.mail.protection.outlook.com` | **DO NOT TOUCH** | **100% PRESERVED & PROTECTED** |
| **TXT (SPF)** | `krynexlabs.in` | `v=spf1 include:secureserver.net -all` | **DO NOT TOUCH** | **100% PRESERVED & PROTECTED** |
| **TXT (MS 365)**| `krynexlabs.in` | `NETORGFT21218322.onmicrosoft.com` | **DO NOT TOUCH** | **100% PRESERVED & PROTECTED** |
| **Nameservers** | `krynexlabs.in` | `ns45.domaincontrol.com`<br>`ns46.domaincontrol.com` | **DO NOT TOUCH** | **GoDaddy Authoritative NS** |

### Critical 60-Second Action Required at GoDaddy:
Log into your **GoDaddy DNS Management Console** for `krynexlabs.in`:
1. Find the **`A` record** with Name **`@`** (pointing currently to `15.197.225.128`).
2. Edit or set it to:
   - **Type:** `A`
   - **Name:** `@`
   - **Value:** **`76.76.21.21`**
   - **TTL:** 600 seconds (or 1/2 hour)
3. **DO NOT change or delete** any `MX`, `TXT`, or nameserver records. Your Microsoft 365 corporate email (`support@krynexlabs.in`) depends strictly on them.
4. As soon as this record updates, Vercel will automatically verify `krynexlabs.in`, activate SSL for `www.krynexlabs.in`, and route all traffic to your live application!

---

## E. Production QA & Live Endpoint Verification

Tested against live deployment endpoint `https://krynex-labs.vercel.app`:

| Test Case | Method | Result | Evidence |
| :--- | :--- | :--- | :--- |
| **Homepage HTTP Status** | `curl.exe -I` | **PASS** | `HTTP/1.1 200 OK` |
| **Security Headers** | HTTP response inspection | **PASS** | `X-Frame-Options: DENY`<br>`X-Content-Type-Options: nosniff`<br>`Strict-Transport-Security: max-age=63072000`<br>`Permissions-Policy: camera=(), microphone=(), geolocation=()` |
| **3D Rubik's Canvas** | DOM & Script inspection | **PASS** | `Hero3DCube.tsx` Three.js canvas initialized with obsidian materials and lighting |
| **Methodology Console** | DOM & Script inspection | **PASS** | Interactive tab switching, live radar SVG, synaptic mesh SVG, cloud shield SVG |
| **R&D Diagnostic Tabs** | DOM & Script inspection | **PASS** | Financial Engineering, Autonomous Logistics, Healthcare Neural Models, Zero-Trust Defense tabs render |
| **Modal Accessibility** | Component inspection | **PASS** | Escape key listener, auto-focus, keyboard focus trap, backdrop dismissal active |
| **Corporate Wordmark** | DOM inspection | **PASS** | Typographic wordmark `KRYNEX` (900 bold white) + `LABS` (300 light silver) |
| **SEO Metadata** | HTML `<head>` inspection | **PASS** | Canonical domain `https://www.krynexlabs.in`, OpenGraph metadata, JSON-LD Schema.org with GeoCoordinates (`23.0415, 72.5085`) |
| **Robots & Sitemap** | Endpoint verification | **PASS** | Dynamic `/sitemap.xml` and `/robots.txt` active; `/thank-you` excluded from indexation |

---

## F. Automatic GitHub Deployment (Phase 11)

### Status & How to Connect:
The GitHub repository [krynexlabs/krynex-labs-website](https://github.com/krynexlabs/krynex-labs-website) is owned by GitHub account `krynexlabs`.

To enable automatic production deployments on every `git push`:
1. Open the Vercel Git Settings page:  
   👉 **[https://vercel.com/ankoliya-dixit-s-projects/krynex-labs/settings/git](https://vercel.com/ankoliya-dixit-s-projects/krynex-labs/settings/git)**
2. Click **"Connect Git Repository"**.
3. Choose **GitHub** &rarr; Select `krynexlabs/krynex-labs-website`.
4. Production Branch: **`main`**.
5. Save. Once connected, every push to `main` will automatically trigger an optimized Vercel production build.

---

## G. Final Status & Summary

**STATUS: DEPLOYED TO VERCEL (DOMAIN VERIFICATION PENDING AT GODADDY)**

- **Live Production URL (Working Now):**  
  🔗 **[https://krynex-labs.vercel.app](https://krynex-labs.vercel.app)**
- **Target Custom Domain:**  
  🌐 **[https://www.krynexlabs.in](https://www.krynexlabs.in)** (Will resolve immediately after setting GoDaddy `A` record to `76.76.21.21`).
- **Data & Email Safety:** 100% Verified. All existing Office 365 Exchange email and MX records remain untouched and functioning.
