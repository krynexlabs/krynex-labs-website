# VERCEL & GITHUB PRODUCTION DEPLOYMENT REPORT (KRYNEX LABS IDENTITY)

**Production Domain Target:** [https://www.krynexlabs.in](https://www.krynexlabs.in)  
**Apex Domain:** [https://krynexlabs.in](https://krynexlabs.in)  
**GitHub Organization / Owner:** [https://github.com/krynexlabs](https://github.com/krynexlabs)  
**GitHub Repository:** [https://github.com/krynexlabs/krynex-labs-website](https://github.com/krynexlabs/krynex-labs-website)  
**Vercel Team / Account:** `adphouse` (Project: `krynex-labs-website`)  
**Deployment Status:** `● Ready (Production)`  
**CI/CD Pipeline:** Fully Automated via GitHub `main` branch pushes  
**Date:** October 18, 2026  

---

## 1. Identity Migration Summary (From Personal ID to Krynex Labs ID)

| System | Previous Identity | New Corporate Identity | Status |
| :--- | :--- | :--- | :--- |
| **GitHub CLI & Git Author** | `poojanpatel-tech` | **`krynexlabs`** (`support@krynexlabs.in`) | **AUTHENTICATED & VERIFIED** |
| **GitHub Repo Permissions** | Read-only | `admin: true`, `push: true`, `maintain: true` | **OWNER VERIFIED** |
| **Vercel CLI & Account** | `dixitpatel0782-9759` (Personal) | **`adphouse`** (`krynex-labs-website`) | **AUTHENTICATED & LINKED** |
| **Vercel Project ID** | `prj_cJgT8PmMxhDcUsdTQJSSvmI6VDCJ` | **`prj_ilrdgRTqNJdrQHXUhSOi5t7T4FSc`** | **OFFICIAL REPO PROJECT** |

---

## 2. GitHub CI/CD & Automatic Deployment Pipeline

1. **Repository Synchronization:**
   - Soft-reset and reconciled local enterprise codebase on top of `origin/main`.
   - Committed changes as **Krynex Labs** with SHA `8be2573`:  
     `feat(corporate): upgrade flagship enterprise landing page with unboxed 3D Rubik's cube, monochrome design system, accessibility fixes and verified telemetry`
   - Pushed directly to `https://github.com/krynexlabs/krynex-labs-website.git` on branch `main`.

2. **Automated Vercel Build Trigger:**
   - The push to GitHub automatically triggered a production build in Vercel under `adphouse/krynex-labs-website`.
   - **Deployment ID:** `dpl_AorkzmQzXqN4SGCm9qjn4K4HGwB9`
   - **Production URL:** `https://krynex-labs-website-qccwmbw2k-adphouse.vercel.app`
   - **Status:** **`● Ready`** (Compiled in 28 seconds).
   - **Production Aliases Configured:**
     - `https://krynexlabs.in`
     - `https://krynex-labs-website-adphouse.vercel.app`
     - `https://krynex-labs-website-git-main-adphouse.vercel.app`

---

## 3. Tech Stack & Architecture Verification

- **Framework:** Next.js 14.2.35 App Router (Zero PHP files; 100% TypeScript + React 18).
- **3D Interactive Asset:** 3x3x3 Unboxed Obsidian Rubik's Cube with 3 procedural micro-textures, 4 `<Lightformer>` studio softboxes, and `prefers-reduced-motion` isometric freeze.
- **Design Aesthetic:** 100% Resend Monochrome (`#000000` pitch black, `#080808` obsidian cards, specular top rims, zero colors).
- **Accessibility Gate:** Programmatic form labels, keyboard-navigable methodology cards, Escape key dismissal, and Tab focus-trapping on `DemoModal.tsx`.
- **Quality Gates:** `npm run lint` &rarr; 0 errors; `npx tsc --noEmit` &rarr; 0 errors; `npm run build` &rarr; 0 errors.

---

## 4. GoDaddy DNS Configuration & Verification Docket (Completed)

All DNS configurations and security verifications have been successfully completed and propagated:

| Type | Name | Value | TTL | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | **`216.198.79.1`** | 1/2 Hour | **ACTIVE & VERIFIED (Vercel Anycast Edge)** |
| **CNAME** | `www` | **`be04de8fb962ea76.vercel-dns-017.com`** | 1 Hour | **ACTIVE & VERIFIED (Vercel CNAME DNS)** |
| **TXT** | `_vercel` | `vc-domain-verify=www.krynexlabs.in,a9e4c6d3875bc73ce4f2` | 1/2 Hour | **VERIFIED (Security Ownership Token)** |
| **MX** | `@` | `krynexlabs-in.mail.protection.outlook.com` (Priority: 0) | 1 Hour | **INTACT & PROTECTED (Microsoft 365 Exchange)** |
| **TXT** | `@` | `v=spf1 include:secureserver.net -all` | 1 Hour | **INTACT & PROTECTED (Email SPF)** |
| **TXT** | `@` | `NETORGFT21218322.onmicrosoft.com` | 1 Hour | **INTACT & PROTECTED (Microsoft Cloud Tenant)** |
| **TXT** | `@` | `google-site-verification=lboNxep...` | 1 Hour | **INTACT & PROTECTED (Google Search Console)** |

---

## 5. Live Production Verification & Telemetry

Both corporate domains are **100% LIVE**, returning **`HTTP 200 OK`**, with valid SSL/TLS certificates and hardened enterprise security headers:

- **Primary Production Domain:** 👉 **[https://www.krynexlabs.in](https://www.krynexlabs.in)** (`HTTP/1.1 200 OK`)
- **Apex Production Domain:** 👉 **[https://krynexlabs.in](https://krynexlabs.in)** (`HTTP/1.1 200 OK`)
- **HTTP &rarr; HTTPS Upgrade:** `http://krynexlabs.in` &rarr; `308 Permanent Redirect` &rarr; `https://krynexlabs.in/`
- **SSL Certificates:** Issued & active via Let's Encrypt / Vercel Edge TLS
- **Security Headers Active:**
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- **GitHub Automatic CI/CD:** Connected to `krynexlabs/krynex-labs-website` (`main`). Any future code pushes automatically trigger production builds on Vercel team `adphouse`.
- **Corporate Email Ingestion:** Microsoft 365 Exchange routing for `support@krynexlabs.in` operates with 100% continuity.

