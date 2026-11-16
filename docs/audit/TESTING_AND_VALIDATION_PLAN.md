# KRYNEX LABS — TESTING & VALIDATION PLAN
**Audit Version:** 1.0.0  
**Date:** October 24, 2026  
**Audited Target:** [https://www.krynexlabs.in](https://www.krynexlabs.in) & Repository  

This testing plan categorizes tests that were **actually executed** during this enterprise audit versus **recommended tests** designed for ongoing continuous integration (CI) and pre-release quality assurance.

---

## 1. Tests Actually Executed During Audit

| Test Suite / Command | Execution Command | Result | Evidence / Notes |
| :--- | :--- | :--- | :--- |
| **Git Working Tree Baseline** | `git status` | **PASS** | Clean working tree; branch `main`; 0 uncommitted changes |
| **ESLint Static Code Analysis** | `npm run lint` | **PASS** | 0 warnings, 0 errors across all TypeScript/TSX files |
| **TypeScript Static Typecheck** | `npx tsc --noEmit` | **PASS** | 0 type errors across whole codebase |
| **Remediation & Regression Suite**| `npm test` | **PASS** | 18/18 test suites passed (Sanitization, SLA checks, rate limits) |
| **Next.js Production Build** | `npm run build` | **PASS** | 21 routes compiled (16 static, 5 dynamic/edge). Shared JS: 87.5 kB |
| **Live Canonical HTTP Status** | `curl.exe -s -I https://www.krynexlabs.in/` | **PASS** | HTTP 200 OK; Vercel Cache HIT; bom1 edge |
| **Apex & WWW Canonical Redirects**| `curl.exe -s -I http(s)://krynexlabs.in/` | **PASS** | Single 308 Permanent Redirects directly to canonical URL |
| **404 Route Handling Probe** | `curl.exe -s -I https://www.krynexlabs.in/404-test` | **PASS** | HTTP 404 Not Found; custom telemetry view served |
| **All Canonical Route Codes** | Powershell batch probe across 14 routes | **PASS** | All 14 canonical routes returned HTTP 200 OK |
| **Live 3D Canvas Rendering** | Chrome Headless Browser Subagent | **PASS** | Unboxed Rubik's cube rendered; specular shaders active |
| **Modal Interaction & Focus** | Browser Subagent Click on "Contact Us" | **PASS** | Modal opened, backdrop blurred, focus trapped, Esc closed |
| **Problem Section Tabs** | Browser Subagent Click on Tab 1 & Tab 2 | **PASS** | Active tab switched; content panel updated correctly |
| **Cookie Banner Slide-in** | Browser Subagent Inspection | **PASS** | Banner slides in after 1.2s; buttons interactive |
| **Dependency Vulnerability Scan** | `npm audit` | **FAIL (8 CVEs)**| 1 Critical, 4 High, 3 Moderate CVEs documented in SEC-004 |

---

## 2. Recommended Automated CI/CD Test Cases

To eliminate regression risks and ensure full continuous testing coverage, the following automated test suites are recommended.

### 2.1 Critical User Journey Browser Tests (Playwright / Cypress)

#### Test Case UJ-01: Flagship Landing Page & Hero 3D Lifecycle
- **Objective:** Verify hero section renders, 3D WebGL context initializes on desktop, and fallback renders on mobile.
- **Steps:**
  1. Navigate to `/`.
  2. Verify `h1` contains "We Find Industry Problems. We Build the Software That Solves Them."
  3. Assert `<canvas>` element exists on viewport >= 1024px.
  4. On mobile viewport (<768px), assert `<canvas>` does NOT mount and SVG `HeroCubeFallback` renders.
  5. Assert zero unhandled console errors or WebGL context losses.
- **Acceptance Criteria:** 0 console errors, correct component mounted per viewport.

#### Test Case UJ-02: Consultation Modal Lifecycle & Keyboard Accessibility
- **Objective:** Verify navigation "Contact Us" button opens modal, traps focus, and closes on Escape.
- **Steps:**
  1. Click "Contact Us" in desktop navigation header.
  2. Assert `[role="dialog"]` is visible with `aria-modal="true"`.
  3. Press `Tab` repeatedly; verify focus never leaves the modal container.
  4. Press `Escape` key; verify modal closes and focus returns to the initiating button.
- **Acceptance Criteria:** Modal focus trap conforms to WCAG 2.2 AA.

#### Test Case UJ-03: Inbound Inquiry Form Submission & Validation
- **Objective:** Validate contact form input error handling and successful submission.
- **Steps:**
  1. Navigate to `/contact`.
  2. Click "Submit" with empty fields; verify inline error messages appear for Name, Email, Company, and Challenge.
  3. Fill with invalid email `test@invalidsite`; verify email format validation triggers.
  4. Fill with valid data (`Test Executive`, `lead@enterprise.com`, `Heavy Works Corp`, `10ms line latency challenge`).
  5. Intercept `/api/contact` mock response with `{ ok: true, success: true, referenceId: "KL-REQ-TEST-100" }`.
  6. Assert confirmation message "Inquiry Dispatched" appears with Reference ID `KL-REQ-TEST-100`.
- **Acceptance Criteria:** Form rejects invalid inputs, displays structured field errors, and transitions smoothly to success state.

#### Test Case UJ-04: Mobile Navigation Drawer
- **Objective:** Verify mobile hamburger menu opens and closes without layout shifts.
- **Steps:**
  1. Emulate viewport 375x812 (iPhone 13).
  2. Click hamburger menu button (`aria-label="Open mobile navigation menu"`).
  3. Verify drawer opens, body scroll is locked (`overflow: hidden`), and nav links are accessible.
  4. Click close button; verify drawer dismisses and body scroll is restored.
- **Acceptance Criteria:** Smooth mobile navigation with body scroll lock.

---

### 2.2 API Route Validation Suite (`/api/contact`)

```typescript
// Proposed Integration Test Suite: tests/api/contact.test.ts
import { test, expect } from "@playwright/test";

test.describe("/api/contact Contract & Resilience", () => {
  test("Rejects empty payload with 400 Bad Request", async ({ request }) => {
    const response = await request.post("/api/contact", { data: {} });
    expect(response.status()).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toBeDefined();
  });

  test("Silently rejects honeypot submission with 200 OK and BOT tag", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "Bot User",
        email: "bot@spam.com",
        company: "Bot Spammer",
        challenge: "Spam message here",
        _security_honeypot: "automated_spam_bot_fill",
      },
    });
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.referenceId).toContain("BOT");
  });

  test("Returns 503 if downstream email provider fails", async ({ request }) => {
    // Tests SEC-001 remediation: endpoint must not report success if delivery fails
  });
});
```

---

## 3. Responsive Test Matrix

| Device / Viewport | Resolution | Expected Layout Behavior |
| :--- | :--- | :--- |
| **Small Mobile** (iPhone SE) | 320 × 568 | Single-column text, SVG fallback cube, no horizontal scroll |
| **Standard Mobile** (iPhone 13/14) | 390 × 844 | Single-column text, sticky mobile CTA (offset from cookie banner) |
| **Tablet Portrait** (iPad Mini) | 768 × 1024 | 2-column problem cards, SVG fallback or throttled 3D |
| **Tablet Landscape** (iPad Pro) | 1024 × 768 | Desktop navbar appears, full 3D Rubik's cube mounts |
| **Standard Desktop** (Laptop) | 1440 × 900 | 12-column grid, full 3D interactive assembly, spotlight hover |
| **Large Display** (4K Monitor) | 1920 × 1080+ | Max-w-7xl centering, zero stretched SVG artifacts |

---

## 4. Accessibility (WCAG 2.2 AA) Verification Protocol

1. **Automated Scanner:** Run `@axe-core/playwright` across `/`, `/solutions`, `/about`, `/contact`, `/privacy`, `/terms`. Ensure 0 critical or serious WCAG AA violations.
2. **Keyboard Trap Check:** Navigate entire homepage and modal dialogs using only `Tab`, `Shift+Tab`, `Space`, `Enter`, and `Escape`.
3. **Screen Reader Verification:** Test with NVDA (Windows) or VoiceOver (macOS):
   - Confirm modal dialog announces title and purpose upon opening.
   - Confirm form validation errors are read out via `aria-describedby` or `aria-live`.
   - Confirm problem category tab selection announces tab index and selected state.

---

## 5. Rollback Considerations & Deployment Safety

Before executing remediation tasks in production:
1. **Branch Isolation:** All fixes must be implemented on dedicated feature branches (e.g. `fix/sec-001-lead-delivery`, `fix/ui-001-mobile-collision`).
2. **Automated Verification:** Pull requests must pass the CI quality gate (`npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`).
3. **Vercel Instant Rollback:** If any production anomaly occurs after deployment, use the Vercel Dashboard to trigger an Instant Rollback to the previous deployment commit hash in under 5 seconds.
