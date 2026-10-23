# KRYNEX LABS — Enterprise System Architecture & Knowledge Graph

## Corporate Identity & Positioning
- **Company:** Krynex Labs
- **Headquarters:** AHMEDABAD (IN)
- **Official Domain:** https://www.krynexlabs.in
- **Official Contact Email:** support@krynexlabs.in
- **Corporate Positioning:** Unified Software Product & SaaS Company. We identify real-world industry bottlenecks, understand operational pain points, build software products (web, mobile, AI-powered, automation), and earn recurring software revenue through subscriptions and software-rental access.
- **Core Business Model:** Rented software access via recurring subscriptions (Build → Launch → Subscribe → Maintain → Improve). Not a custom development agency or hourly contractor.

---

## Design System: Exact Resend.com Monochrome Palette
| Token / Element | Hex / Value | Implementation |
| :--- | :--- | :--- |
| **Primary Canvas** | `#000000` (Pure Pitch Black) | `bg-black`, `body { background-color: #000000; }` |
| **Card Surfaces** | `#080808` to `#0A0A0A` | `bg-[#080808]`, `bg-[#030303]` for terminal consoles |
| **Borders** | `rgba(255, 255, 255, 0.08)` | `border border-white/[0.08] hover:border-white/[0.22]` |
| **Specular Rim** | `rgba(255, 255, 255, 0.30)` | `h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent` |
| **Headings** | White to Brushed Silver | `bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent` |
| **Body Text** | `#A1A1AA` / `#71717A` | `text-zinc-400`, `text-zinc-500` (monospaced telemetry) |
| **Primary CTA** | `#FFFFFF` on `#000000` | `bg-white text-black font-semibold hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]` |
| **Secondary CTA**| `rgba(255, 255, 255, 0.04)` | `bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08]` |
| **3D Rubik Material** | Obsidian Dark Metal | 27 `RoundedBox` subcubes, 3 procedural micro-textures (smooth, ribbed, knurled dotted) |
| **Studio Lighting** | High-Contrast Monochrome | 4 `<Lightformer>` softboxes inside `<Environment>` + directional rim lights |
| **Color Prohibition** | Zero Blue / Cyan / Neon | All color classes strictly purged. |

---

## Route Architecture
- `/` (`src/app/page.tsx`): Main flagship enterprise landing page containing:
  - Sticky glassmorphic navigation (`Navbar.tsx`)
  - Full-height `min-h-[92vh]` Hero section with unboxed 3D 3x3x3 Rubik's assembly (`HeroSection.tsx`, `Hero3DCube.tsx`)
  - Corporate Thesis section (`00:01`) with live Ahmedabad DC-01 cluster telemetry
  - 1px Silver Horizon Dividers (`SectionDivider.tsx`)
  - The Krynex Engineering Matrix (`Methodology.tsx`) with animated radar, synaptic mesh, and cloud shield
  - Core Capabilities Bento Grid (`BentoGrid.tsx`) with curved SVG bezier light beams
  - Enterprise R&D Diagnostic Console (`DraftingDemo.tsx`) with interactive industry tabs
  - Target Industry Dossiers (`EnterpriseMatrix.tsx`)
  - Executive Consultation Portal & Corporate Footer (`Footer.tsx`)
  - Floating Sticky Mobile CTA (`StickyMobileCTA.tsx`)
  - Consultation Modal (`DemoModal.tsx`)
- `/privacy` (`src/app/privacy/page.tsx`): Enterprise Data Sovereignty, data isolation standards, KMS envelope encryption, and legal compliance.
- `/terms` (`src/app/terms/page.tsx`): Enterprise Terms of Service, 99.99% SLA commitment, IP ownership, and Ahmedabad jurisdiction.
- `/thank-you` (`src/app/thank-you/page.tsx`): Executive inquiry confirmation docket displaying Ticket ID, SLA response window, and routing status.
- `not-found.tsx` (`src/app/not-found.tsx`): Custom 404 terminal telemetry page with button linking to `/`.
- `/api/contact` (`src/app/api/contact/route.ts`): Production backend endpoint with input sanitization, honeypot protection, character length enforcement, and enterprise reference ID generation.

---

## SEO & Security Specifications
- `KrynexLogo.tsx`: Pure typographic wordmark (`KRYNEX` 900 bold white + `LABS` 300 light silver + optional monospace tagline `ARCHITECTING INTELLIGENCE FOR INDUSTRY.`) with zero icon.
- `icon.tsx`: Code-generated Next.js 32x32 typographic "KL" monogram favicon (`runtime = "edge"`).
- `apple-icon.tsx`: Code-generated 180x180 typographic "KL" Apple touch icon (`runtime = "edge"`).
- `opengraph-image.tsx`: Dynamic 1200x630 enterprise social share card via `ImageResponse` with typographic wordmark and metadata (`runtime = "edge"`, `www.krynexlabs.in`).
- `manifest.ts`: PWA Web App Manifest (`start_url: "/"`, theme and background `#000000`).
- `robots.ts`: Standard robots protocol indexing `/`, `/privacy`, `/terms`, `/thank-you` and disallowing `/api/`.
- `sitemap.ts`: Dynamic XML sitemap indexing all canonical routes on `https://www.krynexlabs.in`.
- `layout.tsx`: Schema.org JSON-LD `@graph` containing `Organization`, `Corporation`, and `WebSite` structured data.
- `next.config.mjs`: Hardened HTTP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Permissions-Policy`, `X-XSS-Protection`).
- Form Security: Anti-spam honeypot fields (`_security_honeypot`), strict client email validation, character length constraints, and anti-bot sanitization.
- `CookieBanner.tsx`: Non-intrusive bottom glassmorphic banner with localStorage persistence (`krynex_cookie_consent`).
- `Analytics.tsx`: Privacy-first client route logger respecting user cookie consent.
