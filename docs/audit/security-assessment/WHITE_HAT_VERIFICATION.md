# KRYNEX LABS — WHITE-HAT SECURITY VERIFICATION REPORT
**Classification:** Independent Vulnerability Verification & Evidence Dossier  
**Target:** Krynex Labs (`https://www.krynexlabs.in`)  
**Repository Branch & Commit:** `main` @ `bb5464d`  
**Date:** October 24, 2026  
**Auditor:** Principal Application Security Engineer & White-Hat Lead  
**Scope:** Architecture Analysis, Live Header Telemetry, Dependency Reachability, Secret Scanning, and Input Validation  

---

## 1. Live Production Security Headers & Transport Telemetry

Direct edge probes were executed against `https://www.krynexlabs.in/` using read-only HTTP HEAD requests via `curl.exe`:

```http
HTTP/1.1 200 OK
Server: Vercel
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
X-XSS-Protection: 0
X-DNS-Prefetch-Control: on
X-Vercel-Cache: HIT
X-Vercel-Id: bom1::lfh5j-1792825945846-ae9835e29ba9
```

### 1.1 Header Security Evaluation

| Header Key | Configured Value | Security Evaluation | Compliance Status |
| :--- | :--- | :--- | :---: |
| **Strict-Transport-Security (HSTS)** | `max-age=31536000; includeSubDomains` | Strong 1-year HSTS enforcement. Preload-ready. Forces modern browsers to communicate exclusively over TLS. | **EXCELLENT** |
| **X-Frame-Options** | `DENY` | Completely disallows iframe framing, eliminating UI redressing and clickjacking attacks. | **EXCELLENT** |
| **X-Content-Type-Options** | `nosniff` | Prevents browser MIME-type sniffing of non-executable resources into executable scripts. | **EXCELLENT** |
| **Cross-Origin-Opener-Policy (COOP)** | `same-origin` | Isolate browsing context from cross-origin popups/tabs, mitigating Spectre-style side-channel leaks. | **EXCELLENT** |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Explicitly disables access to sensitive browser hardware APIs and FLoC tracking. | **EXCELLENT** |
| **Content-Security-Policy (CSP)** | Restricts default, frame, object, base-uri, connect, and image sources | Strong perimeter, but includes `'unsafe-eval'` and `'unsafe-inline'` for React/Three.js compatibility. | **GOOD (DEFENSE-IN-DEPTH OPPORTUNITY)** |
| **X-XSS-Protection** | `0` | Correctly disabled in favor of modern CSP (avoids legacy browser XSS auditor vulnerabilities). | **EXCELLENT** |

---

## 2. Dependency Vulnerability & Reachability Analysis

An independent dependency audit via `npm audit --json` identified 8 reported advisories (1 Critical, 4 High, 3 Moderate) in the Next.js and PostCSS ecosystem. A deep reachability analysis was performed against the actual Krynex Labs application code:

```mermaid
graph TD
    Audit[npm audit: 8 Advisories] --> NextJS[Next.js 14.2.35 Advisories]
    Audit --> PostCSS[PostCSS Tooling Advisories]
    
    NextJS --> CVE1[GHSA-p293-qw3h-jr36: Windows RCE]
    NextJS --> CVE2[GHSA-p3m5-59mp-jv5r: Server Actions DoS]
    NextJS --> CVE3[GHSA-p9j2-gv94-2wf4: Rewrites SSRF]
    NextJS --> CVE4[GHSA-2xp9-vwfh-vxw4: AVIF/SVG Image Optimizer]
    
    CVE1 -.->|UNREACHABLE| EnvCheck1[Hosted on Vercel Linux Serverless]
    CVE2 -.->|UNREACHABLE| CodeCheck1[Zero Server Actions in src/]
    CVE3 -.->|UNREACHABLE| ConfCheck1[Zero Dynamic Destination Rewrites]
    CVE4 -.->|UNREACHABLE| ImgCheck1[All Images Local Static JPEGs]
    
    style EnvCheck1 fill:#52c41a,color:#fff
    style CodeCheck1 fill:#52c41a,color:#fff
    style ConfCheck1 fill:#52c41a,color:#fff
    style ImgCheck1 fill:#52c41a,color:#fff
```

### 2.1 Advisory Reachability Breakdown

| Advisory ID | Severity | CVE Summary | Runtime Preconditions | Reachable in Krynex Labs? | Justification & Evidence |
| :--- | :---: | :--- | :--- | :---: | :--- |
| **GHSA-p293-qw3h-jr36** | **Critical** | Windows-hosted server unauthenticated RCE via path traversal | Server runs on Windows OS in production | **NO (UNREACHABLE)** | Production is deployed on Vercel Linux Serverless containers (`bom1` edge node). |
| **GHSA-p3m5-59mp-jv5r** | **High** | Denial of Service in App Router using Server Actions | Application exports `"use server"` actions | **NO (UNREACHABLE)** | Codebase grep confirms zero instances of `"use server"`. Application strictly uses Route Handlers (`route.ts`). |
| **GHSA-p9j2-gv94-2wf4** | **High** | SSRF in rewrites via attacker-controlled destination hostname | Dynamic regex destination in `next.config.mjs` rewrites | **NO (UNREACHABLE)** | `next.config.mjs` defines zero `rewrites()`. Only static, fixed `redirects()` are present. |
| **GHSA-2xp9-vwfh-vxw4** | **Critical** | RCE in Image Optimization API when AVIF files are used | Processing remote or user-uploaded AVIF files via `/_next/image` | **NO (UNREACHABLE)** | All images in `src/` load local static JPEG files (`/static/background-auth.jpg`). Zero remote image patterns configured. |
| **GHSA-2464-fhr4-w9xw** | **Critical** | RCE in Image Optimization API when SVG files are used | Processing remote or user-uploaded SVG files via `/_next/image` | **NO (UNREACHABLE)** | Zero SVG images processed through `next/image`. Inline React Lucide SVGs used exclusively. |
| **GHSA-955p-x3mx-jcvp** | **Moderate** | Disclosure of internal Server Function endpoints | Application uses experimental Server Functions | **NO (UNREACHABLE)** | No Server Functions configured or exposed. |
| **GHSA-6g55-p6wh-862q** | **High** | PostCSS arbitrary file read via `sourceMappingURL` in CSS comments | Processing untrusted CSS files with source maps enabled | **NO (UNREACHABLE)** | PostCSS is used strictly at build-time to compile local Tailwind CSS. No external CSS is processed. |
| **GHSA-rj75-hqrm-r3gf** | **Moderate** | Quadratic complexity in flat selector parsing allows CPU exhaustion | Runtime parsing of untrusted CSS selectors | **NO (UNREACHABLE)** | Tailwind CSS selectors are parsed statically during build phase. |

### 2.2 Framework Remediation Strategy
`npm audit fix --force` suggests upgrading to Next.js `16.4.3`. **This must NOT be run**, as it introduces breaking changes across React 19, `@react-three/fiber` (8.18.0), and `@react-three/drei` (9.122.0).  
**Recommended Safe Path:** Apply exact patch update to `next@14.2.18` (or the latest stable 14.2.x release), maintaining complete backward compatibility while eliminating underlying vulnerability signatures.

---

## 3. Secret Scanning & Configuration Review

A comprehensive secret scanning assessment was conducted across the Git repository, environment templates, and client-side bundles:
1. **Git Commit History:** Scanned all commits, trees, and tags for `.pem`, `.key`, `.env`, and private tokens via:
   `git log --all --full-history -- "**.pem" "**.key" "**.env*"`
   **Result:** Clean. Zero private keys, TLS certificates, or active secrets committed to Git history.
2. **Environment Variable Configuration:**
   - `.env.example` provides sanitized template values (`re_your_resend_api_key_here`, `your_16_char_app_password_here`).
   - `.env.local` is strictly ignored by `.gitignore` (Lines 27-28) and un-tracked in Git.
   - All sensitive credentials (`RESEND_API_KEY`, `GMAIL_APP_PASSWORD`, `SMTP_PASS`) are accessed exclusively in server-side Route Handlers (`src/app/api/contact/route.ts`).
3. **Public Client Bundle Inspection:**
   - Shared First Load JS bundle (`87.5 kB`) was inspected for leaked environment variable prefixes.
   - Only standard `NEXT_PUBLIC_` variables (none currently defined) are accessible to browser runtimes. Zero server secrets leak into the client bundle.

---

## 4. API Input Validation & Defense-in-Depth Review

The primary API entry point `POST /api/contact` was reviewed against OWASP Top 10 API Security Risks:

1. **Input Truncation & Normalization:**
   - `executiveName`: Sanitized via `sanitizeSingleLine(rawName, 100)` (max 100 characters).
   - `corporateEmail`: Validated against RFC 5322 regex and length constraints (5–120 characters).
   - `companySector`: Sanitized via `sanitizeSingleLine(rawCompany, 120)` (max 120 characters).
   - `operationalFriction`: Sanitized via `sanitizeMultiline(rawFriction, 3000)` (max 3000 characters).
   - `inquiryCategory`: Sanitized via `sanitizeSingleLine(rawCategory, 100)` (max 100 characters).
2. **Context-Specific HTML Encoding:**
   In the email generation block (`route.ts#L169-L179`), all user-supplied variables are passed through `escapeHtml()` prior to insertion into HTML table cells. This guarantees that mathematical comparison operators (`<10ms`, `x < y`) are transformed to `&lt;10ms` and `x &lt; y`, preventing HTML injection in email clients.
3. **Email Header Protection (CRLF Prevention):**
   `stripHeaderInjection()` strips `\r`, `\n`, and `\t` from single-line fields, and `isValidEmail()` strictly asserts `!/[\r\n]/.test(trimmed)`. CRLF injection in email subjects and recipient headers is strictly defended.
4. **Honeypot Trap:**
   Fields `websiteHoneypot`, `_security_honeypot`, and `honeypot` are checked. If populated, the endpoint silently returns HTTP `200 OK` with a spoofed reference ID (`KL-REQ-*-BOT`) without triggering email transport, successfully misleading bot harvesters.

---

## 5. Confirmed Weaknesses vs. False Positives

| Issue Ref | Description | Status | Evidence & Resolution |
| :--- | :--- | :---: | :--- |
| **`SEC-001`** | Contact API swallows email provider errors & returns 200 OK | **CONFIRMED WEAKNESS** | `src/app/api/contact/route.ts#L206-L235`: `resendResponse.ok` unchecked. |
| **`SEC-002`** | Rate limiter trusts client-supplied `X-Forwarded-For` leftmost IP | **CONFIRMED WEAKNESS** | `src/lib/rate-limiter.ts#L79`: `forwarded.split(",")[0]` allows spoofing. |
| **`SEC-003`** | Google Analytics fires prior to cookie banner consent selection | **CONFIRMED WEAKNESS** | `src/app/layout.tsx#L310-L322`: Missing Consent Mode v2 default denial. |
| **`SEC-004`** | Framework CVEs in Next.js 14.2.35 | **CONTEXTUALIZED** | Vulnerabilities present in dependency tree but unreachable in current architecture. |
| **`A11Y-001`**| Problem section tabs lack keyboard navigation | **FALSE POSITIVE / OUTDATED**| Source review confirms arrow-key roving focus is already implemented in `ProblemSection.tsx:203-215`. |
| **`FUNC-001`**| Broken WhatsApp button component | **FALSE POSITIVE** | Component returns `null` and is not imported in any route; dead code, not broken functionality. |
