# KRYNEX LABS — Controlled Loop Engineering Protocol

**Target Domain:** https://www.krynexlabs.in  
**Framework:** Next.js 14.2.35 (App Router)  
**Hosting Platform:** Vercel  
**Design Standard:** Exact Resend.com Monochrome Palette (`#000000` pitch black, `#080808` card surfaces, brushed silver gradients)  
**Working Branch:** Dedicated feature branch (`chore/loop-engineering-pagespeed`)  

---

## 1. The 7-Stage Controlled Engineering Loop

```
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  ▼                                                             │
[PLAN] ──► [MEASURE] ──► [CHANGE] ──► [TEST] ──► [MEASURE AGAIN]──► [COMPARE]
                                                                        │
                                   ┌────────────────────────────────────┴───────────────┐
                                   ▼                                                    ▼
                       [ACCEPT (Target Reached)]                             [ITERATE (Max 5 cycles)]
```

### Stage 1: PLAN
- Define **one clearly stated hypothesis** and a measurable success criterion.
- Identify the exact files and DOM/runtime components involved.
- Verify that the proposed change is small, atomic, and strictly reversible.
- Ensure the intervention preserves corporate positioning, brand aesthetics, security headers, and SEO metadata.

### Stage 2: MEASURE (Pre-Change Baseline)
- Record local bundle footprints, test outcomes, and Lighthouse/PageSpeed lab metrics (FCP, LCP, TBT, CLS, Speed Index) under comparable conditions.
- Document measurement variability across multiple runs where feasible.

### Stage 3: CHANGE
- Execute surgical, non-breaking modifications.
- Record the exact files changed and the technical rationale for each modification.
- Strictly avoid broad refactors or premature dependency additions.

### Stage 4: TEST
- Execute the standardized verification suite:
  1. `npm test` (Unit/integration test harness, input sanitization, rate limiting, route contracts)
  2. `npm run lint` (ESLint Next.js rules)
  3. `npx tsc --noEmit` (TypeScript type integrity)
  4. `npm run build` (Production compilation and First Load JS bundle audit)
  5. Local browser smoke test on `http://localhost:3000` (Console error hygiene, visual fidelity, interactive state checks)
- If any test fails, halt immediately. Do not proceed to measurement until tests pass cleanly.

### Stage 5: MEASURE AGAIN (Post-Change)
- Repeat metrics collection under the exact same conditions as Stage 2.
- Measure bundle size deltas, TBT, FCP, LCP, CLS, and category scores (Performance, Accessibility, Best Practices, SEO).

### Stage 6: COMPARE
- Contrast pre- and post-change measurements.
- If the evidence shows measurable improvement without regressions: prepare for ACCEPT.
- If the evidence is inconclusive: report uncertainty explicitly; **never claim unverified improvements**.
- If a regression is detected: execute targeted correction or safely revert the commit.

### Stage 7: ACCEPT OR ITERATE
- If acceptance targets are satisfied: finalize documentation and submit the review docket.
- If targets are unmet and iteration count is < 5: start next iteration cycle with a refined hypothesis.
- If iteration limit (5) is reached: stop and document remaining work.

---

## 2. Hard Loop Controls & Circuit Breakers

1. **Iteration Limit:** Maximum **5 optimization iterations per task**. Never loop indefinitely.
2. **Reversibility Guarantee:** All code changes must be atomic Git commits that can be reverted cleanly via `git revert HEAD` without collateral impact.
3. **Double Failure Stop:** If the same test fails twice consecutively, stop immediately and diagnose root cause before attempting further modifications.
4. **External Dependency Failure:** If an external service, CDN, or third-party endpoint fails or throttles, halt execution and report the constraint rather than guessing scores.
5. **Brand & Design Invariance:** Zero deviations from the pitch-black Resend monochrome design. Zero color accents (no cyan, blue, purple, or neon).
6. **Zero Secret Exposure:** Never log or expose environment variable values, SMTP secrets, API keys, or webhook endpoints.

---

## 3. Deployment Safety Protocol

- **Branch Isolation:** Work strictly on the dedicated feature branch (`chore/loop-engineering-pagespeed`).
- **Production Guardrail:** Never deploy, push, merge, or modify Vercel production settings directly from the loop without explicit user authorization.
- **Security Invariance:** Never weaken CSP headers, omit rate limiters, bypass honeypots, or disable cookie consent controls to inflate synthetic scores.
- **Review Gate:** Every deployable state must be accompanied by a comprehensive Before-and-After Evidence Docket.
