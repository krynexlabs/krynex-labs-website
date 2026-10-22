# KRYNEX LABS — PRODUCTION READINESS & DEPLOYMENT REPORT

**Author:** Senior Technical Due Diligence Advisor, Security Auditor & Production Deployment Engineer  
**Date:** October 2026  
**Target Environment:** Vercel Production (`https://www.krynexlabs.in`)  
**Framework:** Next.js 14.2.35 (App Router) | TypeScript | Tailwind CSS  
**Repository State:** Audited, Hardened, Clean Compilation, Regression-Verified  

---

## 1. Executive Summary & Production Gate Status

| Evaluation Category | Audit Finding | Gate Status |
| :--- | :--- | :---: |
| **Code Compilation & Types** | `next build` generates all 25 routes cleanly; `tsc --noEmit` reports 0 errors | ✅ **PASS** |
| **Linting & Code Quality** | `next lint` reports 0 warnings and 0 errors | ✅ **PASS** |
| **Automated Regressions** | 18 critical security & functional test suites pass with 0 failures | ✅ **PASS** |
| **Security Headers** | Hardened CSP, HSTS (relaxed preload), X-Frame-Options DENY, COOP | ✅ **PASS** |
| **Input Sanitization & Abuse** | Sliding-window IP rate limiter + honeypot + context-specific sanitizer | ✅ **PASS** |
| **Buyer Trust & Legal Claims** | Statutory disclaimers under Advocates Act 1961 + liability cap added | ✅ **PASS** |
| **Dependency Vulnerabilities** | 12 advisories in Next 14/PostCSS (requires controlled Next 15 roadmap) | ⚠️ **CONDITIONAL** |
| **Credentials & Secrets** | Production Resend API Key rotation required prior to public traffic | ⚠️ **ACTION REQUIRED** |

### **Overall Status: READY FOR PRODUCTION (Subject to Resend Key Rotation)**

---

## 2. Security First: Resend API Key Rotation Guide

> [!IMPORTANT]
> To protect email deliverability and prevent unauthorized outbound relay, rotate your Resend API credentials before going live. Follow these steps without exposing or pasting keys in chat.

### Safe Step-by-Step Rotation:
1. **Log in to Resend**: Navigate to [https://resend.com/api-keys](https://resend.com/api-keys).
2. **Generate New Production Key**:
   - Click **Create API Key**.
   - Name it: `krynex-production-website`.
   - Permission: **Sending access** (Restrict domain to `krynexlabs.in` once DNS verified, or `Full Access` if required).
   - Copy the new key (`re_...`) directly to your private clipboard.
3. **Configure in Vercel Project Settings**:
   - Open your project on the [Vercel Dashboard](https://vercel.com).
   - Go to **Settings** &rarr; **Environment Variables**.
   - Add/Update:
     - `RESEND_API_KEY` = *[Paste your new key here]*
     - Target Environments: Check **Production**, **Preview**, and **Development**.
     - Click **Save**.
4. **Update Local Development (Optional)**:
   - In your local `.env.local` file (which is git-ignored by `.gitignore`), update `RESEND_API_KEY`.
   - Never commit `.env.local` to Git.
5. **Revoke the Old Key**:
   - In the Resend dashboard, delete or revoke the previous key.

---

## 3. Comprehensive Verification of Remediated Issues

All issues from Phase 1 through Phase 4 audits have been systematically verified in the code:

### 3.1 Content, Credibility & Marketing Claims
- **Target vs Result Clarity**: Simulated metrics on [`DraftingDemo.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/DraftingDemo.tsx) are explicitly labeled `"DESIGN TARGETS / ENGINEERING OBJECTIVES"` and `"SIMULATION"`.
- **In-Development Product Status**: Krynex Flow and Krynex Vision are consistently identified as `"In Development"`. Capabilities on [`ProductsShowcase.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/ProductsShowcase.tsx) dynamically display *"Planned Capabilities"* for in-development products and *"Verified Capabilities"* for live products.
- **Problem Statement Accuracy**: Changed *"Resolved in Krynex Flow/Vision"* to *"Being built in Krynex Flow/Vision"* in [`ProblemSection.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/ProblemSection.tsx).
- **Superlative Purge**: Removed unverifiable terms like *"premier"* across [`industries-data.ts`](file:///e:/.COM/KL_WEBSITE/src/data/industries-data.ts) and [`EnterpriseMatrix.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/EnterpriseMatrix.tsx).
- **Vernacular Statutory Precision**: Fixed Gujarati conveyance deed terminology in [`products-data.ts`](file:///e:/.COM/KL_WEBSITE/src/data/products-data.ts) to the registered conveyance term **વેચાણ દસ્તાવેજ** (*Vechan Dastawej*).
- **Distributed Systems Semantics**: Changed Kafka claims from unfeasible "exactly-once delivery guarantees" to *"at-least-once delivery with deterministic idempotent deduplication"*.

### 3.2 Legal, Compliance & Information Architecture
- **Legal Practice Disclaimer**: Added Section 6 to [`terms/page.tsx`](file:///e:/.COM/KL_WEBSITE/src/app/terms/page.tsx#L145) explicitly stating Krynex Labs is a technology provider, not a law firm, and all outputs require advocate verification under the *Advocates Act, 1961*.
- **Warranty Disclaimer & Liability Cap**: Added Section 7 to [`terms/page.tsx`](file:///e:/.COM/KL_WEBSITE/src/app/terms/page.tsx) with standard warranty disclaimers and a 12-month subscription fee liability ceiling.
- **Edge Architecture Consistency**: Clarified that Krynex Vision operates 100% offline and air-gapped by default, with optional cloud synchronization activated strictly by customer configuration.
- **Privacy & DPDP Act Consent**: Added explicit consent notices linked to `/privacy` on both [`ContactForm.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/ContactForm.tsx) and [`DemoModal.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/DemoModal.tsx).
- **SLA & Response Alignment**: Standardized response window to *"1–2 business days"* across all pages and footers.
- **Footer Deduplication**: Purged duplicate `/industries` and `/research` links from [`Footer.tsx`](file:///e:/.COM/KL_WEBSITE/src/components/Footer.tsx), replacing them with `/solutions`.

---

## 4. Dependency Security & Upgrade Strategy

### 4.1 Vulnerability Analysis (`npm audit`)
Running `npm audit` identifies 12 vulnerabilities (1 critical, 9 high, 2 moderate) tied to:
1. `next@14.2.35`: Fixed upstream in Next.js 15+ (Server Actions / Image Optimizer DoS vectors).
2. `postcss` / `postcss-selector-parser`: Nested dependencies of Tailwind CSS v3 and Next.js 14.
3. `glob` / `braces`: Transitive build-time dependencies within `eslint-config-next` and `chokidar`.

### 4.2 Why `npm audit fix --force` is Prohibited
Running `npm audit fix --force` will:
- Force-upgrade Next.js to v16+ and React to v19.
- Break `@react-three/fiber@8.17.10` and `@react-three/drei@9.102.6` (which strictly peer-depend on React 18), crashing the 3D Rubik's cube canvas.
- Force-upgrade Tailwind to v4, breaking custom theme tokens, keyframes, and CSS utility mappings.
- Break Next.js App Router dynamic route parameters (`params` and `searchParams` become asynchronous Promises in Next 15+).

### 4.3 Safe Post-Launch Upgrade Plan (Within 30 Days)
Execute this upgrade in a separate feature branch (`feat/next-15-migration`):

```bash
# Step 1: Create isolated migration branch
git checkout -b feat/next-15-migration

# Step 2: Update route handlers and pages for async params
# - src/app/products/[slug]/page.tsx: await params
# - src/app/contact/page.tsx: await searchParams

# Step 3: Upgrade Next.js & React with fiber v9
npm install next@15.2.0 react@19.0.0 react-dom@19.0.0 @react-three/fiber@9.0.0-rc.3

# Step 4: Run typecheck & automated tests
npm run lint
npx tsc --noEmit
npm test
npm run build
```

**Rollback Strategy:** If any 3D rendering regressions or routing anomalies occur, immediate reversion is achieved via:
```bash
git checkout main
npm install
```

---

## 5. Functional & Quality Check Results

### 5.1 Verification Commands Run
```bash
> next lint
✔ No ESLint warnings or errors (0 errors, 0 warnings)

> npx tsc --noEmit
✔ Clean TypeScript compilation (0 errors)

> npm test
✔ 18 / 18 critical regression suites passed successfully

> next build
✔ 25 / 25 routes generated cleanly (0 compilation errors)
```

### 5.2 Complete Route Inventory (All Verified 200 OK)
- **Flagship Landing**: `/` (SSG + 3D Rubik's canvas + interactive terminal telemetry)
- **Product Directory & Detail Pages**: `/products`, `/products/krynex-lexis`, `/products/krynex-flow`, `/products/krynex-vision`
- **Solutions & Capabilities**: `/solutions`, `/solutions/ai-ml`, `/solutions/enterprise-software`, `/solutions/web-mobile`, `/solutions/cloud-data`
- **Methodology & Research**: `/approach`, `/about`, `/industries`, `/research`
- **Governance & Legal**: `/privacy`, `/terms`
- **Inquiry & Conversion**: `/contact`, `/thank-you`
- **Dynamic Edge Assets**: `/icon`, `/apple-icon`, `/opengraph-image`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`
- **API Endpoint**: `/api/contact` (Rate-limited, validated, honeypot-protected)

---

## 6. Vercel Environment Configuration Checklist

Configure the following variables in the **Vercel Project Settings &rarr; Environment Variables**:

| Variable Name | Required? | Recommended Production Value | Description |
| :--- | :---: | :--- | :--- |
| `RESEND_API_KEY` | **YES** | `re_...` (Rotated production key) | Authenticates email dispatch via Resend API |
| `CONTACT_RECEIVER_EMAIL` | **YES** | `support@krynexlabs.in` | Target inbox where customer technical briefs arrive |
| `CONTACT_FROM_EMAIL` | **YES** | `Krynex Labs Briefing <support@krynexlabs.in>` | Verified sender address (after DNS verification) |
| `CONTACT_WEBHOOK_URL` | Optional | `https://hooks.slack.com/services/...` | Real-time Slack/Discord notification channel |
| `SMTP_HOST` | Optional | `smtp.gmail.com` | Fallback SMTP server if Resend is bypassed |
| `SMTP_PORT` | Optional | `465` | Fallback SMTP SSL port |
| `GMAIL_USER` | Optional | `support@krynexlabs.in` | Fallback SMTP authentication user |
| `GMAIL_APP_PASSWORD` | Optional | *[16-character Google App Password]* | Fallback SMTP app password |

---

## 7. Step-by-Step Production Deployment Checklist

### Phase A: Pre-Deployment Verification (Local)
- [x] All 25 routes build with `npm run build`
- [x] TypeScript clean (`npx tsc --noEmit`)
- [x] ESLint clean (`npm run lint`)
- [x] 18 regression test suites pass (`npm test`)
- [x] `.env.local` confirmed git-ignored in `.gitignore`

### Phase B: Production Deployment (Vercel)
1. **Push Changes to GitHub**:
   ```bash
   git add .
   git commit -m "feat(release): complete master production readiness and due-diligence audit remediation"
   git push origin main
   ```
2. **Verify Environment Variables in Vercel**:
   - Ensure `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, and `CONTACT_FROM_EMAIL` are populated.
3. **Trigger Production Deployment**:
   - Vercel automatically deploys commits to `main`.
4. **Post-Deployment Smoke Test (Live URL)**:
   - Visit `https://www.krynexlabs.in`.
   - Submit a test inquiry via `/contact` and `/demo`.
   - Verify confirmation modal and reference ID generation.
   - Verify receipt of email at `support@krynexlabs.in`.
   - Test custom 404 by visiting `https://www.krynexlabs.in/non-existent-route`.
   - Verify cookie banner persistence (`krynex_cookie_consent`).
