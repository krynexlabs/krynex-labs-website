# PRODUCTION DEPLOYMENT & HOSTING ENVIRONMENT REPORT
**Domain Target:** [https://www.krynexlabs.in](https://www.krynexlabs.in) / [https://krynexlabs.in](https://krynexlabs.in)  
**Date:** October 18, 2026  
**Auditor:** Senior Deployment & Infrastructure Engineer  

---

## A. Application Information & Tech Stack Discovery

| Parameter | Discovered Configuration | Notes |
| :--- | :--- | :--- |
| **Active Workspace** | `E:\.COM\KL_WEBSITE` | Clean standalone project directory |
| **Framework / Platform** | **Next.js 14.2.35 (App Router)** | React 18, TypeScript, Tailwind CSS, Three.js Rubik's Cube |
| **PHP in Workspace** | **None (0 PHP application files)** | Workspace is 100% Next.js/TypeScript. Only `flatted.php` inside deep dev dependencies. |
| **Alternative PHP Project** | `C:\xampp\htdocs\SONI_PHP_WEBSITE` | Discovered on local XAMPP (`admin`, `config`, `includes`, MySQL schema) |
| **Active Hosting Account** | **Vercel** (`dixitpatel0782-9759` / `ankoliya-dixit-s-projects`) | Vercel CLI 54.6.1 authenticated and operational |
| **Vercel Project** | `krynex-labs` (`prj_cJgT8PmMxhDcUsdTQJSSvmI6VDCJ`) | Preset: Next.js, Node.js 24.x, linked to domain `krynexlabs.in` |

---

## B. Domain & DNS Architecture Status

Live DNS query executed via `Resolve-DnsName` against authoritative nameservers:

| Record Type | Host | Target / Value | Purpose & Safety Directive |
| :--- | :--- | :--- | :--- |
| **NS** | `krynexlabs.in` | `ns45.domaincontrol.com`<br>`ns46.domaincontrol.com` | **GoDaddy DNS Registrar**. **CRITICAL RULE:** Do NOT change nameservers. |
| **MX (Email)** | `krynexlabs.in` | `krynexlabs-in.mail.protection.outlook.com` (Pri: 0) | **Microsoft 365 Exchange Business Email**. **MUST BE PRESERVED**. |
| **TXT (SPF)** | `krynexlabs.in` | `v=spf1 include:secureserver.net -all` | Prevents email spoofing for `support@krynexlabs.in`. |
| **TXT (MS 365)**| `krynexlabs.in` | `NETORGFT21218322.onmicrosoft.com` | Microsoft 365 Enterprise Domain Tenant Proof. |
| **TXT (Google)** | `krynexlabs.in` | `google-site-verification=lboNxep...` | Google Search Console Domain Verification. |
| **CNAME** | `www.krynexlabs.in`| `be04de8fb962ea76.vercel-dns-017.com` | **Vercel Edge Network Routing**. |
| **A (Apex)** | `krynexlabs.in` | `15.197.225.128`, `216.198.79.1`, `3.33.251.168` | Currently pointing to AWS/GoDaddy forwarding. |

### DNS Action Required for Full Apex & WWW Resolution:
- For `krynexlabs.in` (Apex): Set GoDaddy `A` record to `76.76.21.21` (Vercel Anycast IP).
- For `www.krynexlabs.in`: CNAME is already pointing to Vercel DNS (`be04de8fb962ea76.vercel-dns-017.com`).

---

## C. Hosting Environment Evaluation

1. **Vercel Production Status:**
   - Querying `https://www.krynexlabs.in` returns HTTP `404 Not Found` with `X-Vercel-Error: DEPLOYMENT_NOT_FOUND`.
   - The domain is pointed to Vercel, but no active production deployment is currently assigned to serve traffic for `krynexlabs.in`.
   - Vercel CLI is authenticated locally under `dixitpatel0782-9759` with existing project `krynex-labs`.

2. **PHP Compatibility on Current Infrastructure:**
   - Vercel is a serverless platform designed for Next.js, Node.js, and Edge functions.
   - Traditional LAMP/cPanel PHP + MySQL architectures (like `SONI_PHP_WEBSITE` in `C:\xampp\htdocs\`) cannot run directly on Vercel without a third-party serverless PHP bridge and an external cloud MySQL provider (such as PlanetScale, Neon, or AWS RDS).
   - The workspace `E:\.COM\KL_WEBSITE` is already the modern Next.js 14 flagship corporate website designed specifically for Krynex Labs Inc.

---

## D. Live Testing Matrix

| Test Item | Target URL | Expected | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **WWW Domain HTTP** | `http://www.krynexlabs.in` | 301 / 308 to HTTPS | Handled by Vercel Edge | **READY** |
| **WWW Domain HTTPS** | `https://www.krynexlabs.in` | 200 OK Live Website | `404 Not Found (DEPLOYMENT_NOT_FOUND)` | **PENDING DEPLOY** |
| **Apex Domain** | `https://krynexlabs.in` | 308 redirect to WWW | 405 Method Not Allowed (GoDaddy parking) | **REQUIRES A RECORD** |
| **Corporate Email** | `support@krynexlabs.in` | Route to Outlook 365 | MX record healthy (`mail.protection.outlook.com`)| **SAFE & PROTECTED** |
| **Workspace Build** | `E:\.COM\KL_WEBSITE` | Exit code 0 | Next.js 14 compiles 11 routes cleanly | **PASS (100% READY)** |
| **ESLint Validation** | `npm run lint` | 0 warnings / errors | 0 warnings, 0 errors | **PASS** |
| **Type Check** | `npx tsc --noEmit` | 0 errors | 0 errors | **PASS** |

---

## E. Architectural Finding & Recommendation

- **Finding:** The prompt specifies *"DEPLOY EXISTING PHP PROJECT TO WWW.KRYNEXLABS.IN"*, but the project loaded in this workspace (`E:\.COM\KL_WEBSITE`) is the **Next.js 14 App Router** corporate website for Krynex Labs. Furthermore, the domain `www.krynexlabs.in` is already mapped in DNS directly to Vercel (`vercel-dns-017.com`) under the user's Vercel account `ankoliya-dixit-s-projects`.
- **Recommendation:** Deploy the verified, audited Next.js 14 Krynex Labs website directly to Vercel project `krynex-labs` and link `www.krynexlabs.in` and `krynexlabs.in`. If a separate PHP application from XAMPP is needed, deploy it to a dedicated PHP hosting environment or subdomain (e.g. `portal.krynexlabs.in`).
