# KRYNEX LABS — AI & Software Engineering Studio Architecture

## Corporate Identity & Positioning
- **Company:** Krynex Labs
- **Headquarters:** AHMEDABAD (IN)
- **Official Domain:** https://www.krynexlabs.in
- **Official Contact Email:** support@krynexlabs.in
- **Official WhatsApp:** +91 9879418569 (WhatsApp Only • No Calls)
- **Corporate Positioning:** AI & Software Engineering Studio. We design custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks.
- **Core Philosophy:** Pragmatic, problem-driven software engineering tailored to how businesses actually run, with zero-trust data privacy and agile delivery.

---

## Design System: Exact Resend.com Monochrome Palette
| Token / Element | Hex / Value | Implementation |
| :--- | :--- | :--- |
| **Primary Canvas** | `#000000` (Pure Pitch Black) | `bg-black`, `body { background-color: #000000; }` |
| **Card Surfaces** | `#080808` to `#09090b` | `bg-[#09090b]`, `bg-[#080808]` |
| **Borders** | `rgba(255, 255, 255, 0.08)` | `border border-white/[0.08] hover:border-white/20` |
| **Specular Rim** | `rgba(255, 255, 255, 0.25)` | `h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent` |
| **Headings** | White to Brushed Silver | `bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent` |
| **Body Text** | `#A1A1AA` / `#71717A` | `text-zinc-400`, `text-zinc-500` |
| **Primary CTA** | `#FFFFFF` on `#000000` | `bg-white text-black font-semibold hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]` |
| **Secondary CTA**| `rgba(255, 255, 255, 0.04)` | `bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08]` |
| **3D Antigravity** | WebGL Procedural Scenes | 5 distinct Three.js scenes with zero-gravity floating physics & mouse parallax |

---

## Clean 5-Page Route Architecture
1. `/` (`src/app/page.tsx`): Home page featuring:
   - Sticky glassmorphic navigation (`Navbar.tsx`)
   - Hero split layout with Antigravity 3D Rubik / Intelligence Matrix (`HeroRubikScene.tsx`)
   - 3 Clean Core Capabilities cards (Applied AI, Custom Software, Cloud Architecture)
   - Why Krynex Labs highlights
   - Minimal CTA banner linking to `/contact`
   - Corporate footer (`Footer.tsx`)
2. `/solutions` (`src/app/solutions/page.tsx`): Solutions page featuring:
   - Hero split layout with Interactive 3D Neural Constellation (`NeuralConstellationScene.tsx`)
   - 4 Core Engineering Services (AI & Machine Learning, Web & Mobile, System & ERP Integration, Cloud Infrastructure)
   - Minimal CTA banner
3. `/industries` (`src/app/industries/page.tsx`): Target sectors page featuring:
   - Hero split layout with 3D Floating Isometric Data Wave (`IsometricDataWaveScene.tsx`)
   - 4 Industry Cards with plain-language Problem & Solution breakdown (Manufacturing, FinTech, Logistics, Enterprise)
   - Minimal CTA banner
4. `/about` (`src/app/about/page.tsx`): About page featuring:
   - Hero split layout with 3D Gyroscopic Core Precision Rings (`GyroscopicCoreScene.tsx`)
   - 4-Step Process (Understand, Engineer, Refine, Support)
   - 3 Core Principles (Pragmatic Engineering, Client Data Sovereignty, Direct Collaboration)
   - Minimal CTA banner
5. `/contact` (`src/app/contact/page.tsx`): Contact page featuring:
   - 2-Column layout with 3D Orbital Signal Globe (`OrbitalGlobeScene.tsx`) and direct contact details
   - Clean contact form (`ContactForm.tsx`) with honeypot security and rate limiting
- `/privacy` (`src/app/privacy/page.tsx`): Enterprise Data Sovereignty and legal compliance.
- `/terms` (`src/app/terms/page.tsx`): Terms of service with 99.9% monthly availability target.
- `/thank-you` (`src/app/thank-you/page.tsx`): Executive inquiry confirmation docket.
- `not-found.tsx` (`src/app/not-found.tsx`): Custom 404 terminal page.

---

## 3D "Antigravity" WebGL Scenes (`src/components/canvas/`)
- `HeroRubikScene.tsx`: Floating 3x3x3 modular cyber-cube with glowing edges, zero-gravity levitation, and cursor-expanded subcubes.
- `NeuralConstellationScene.tsx`: Levitating 3D sphere of interconnected glowing nodes and data synapses with interactive mouse parallax.
- `IsometricDataWaveScene.tsx`: Sleek grid of 3D geometric pillars moving in an isometric sine-wave motion representing industrial flow.
- `GyroscopicCoreScene.tsx`: Three concentric metallic wireframe rings rotating across three axes around a levitating crystalline core.
- `OrbitalGlobeScene.tsx`: Wireframe 3D globe with glowing signal beacon pinpointed on Ahmedabad, India emitting orbital connection arcs.
