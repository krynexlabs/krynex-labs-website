# KRYNEX LABS — Enterprise AI & IT Flagship Website

A production-ready, MNC-grade corporate and product flagship platform for **KRYNEX LABS**—an AI/ML and Information Technology company headquartered in Ahmedabad, Gujarat, engineering custom AI architectures and rent-based (SaaS) software products for high-friction regional and enterprise industries.

---

## 🎨 Visual Benchmark & Design System (Resend.com & Linear.app)

1. **Theme & Color Palette:**
   - Ultra-sleek pitch-black dark mode (`#000000` primary background, `#09090B` card surfaces).
   - 1px solid borders using `rgba(255, 255, 255, 0.08)`.
   - Dynamic mouse-tracking radial spotlight gradients (`rgba(56, 189, 248, 0.15)`) on all Bento grid cards.
   - Accents: Electric Cyan (`#00f0ff`), Sky (`#38bdf8`), and Indigo (`#818cf8`).

2. **Typography & Metallic Text:**
   - Headings: `Inter` with tight tracking (`tracking-tight`) and metallic gradients (`bg-gradient-to-b from-white via-white/90 to-zinc-500 bg-clip-text text-transparent`).
   - Technical badges, code blocks, and metrics: `JetBrains Mono` in uppercase with subtle cyan/silver glow.

3. **3D Centerpiece (`@react-three/fiber` & Three.js):**
   - Modular 3x3x3 dark-chrome and obsidian geometric cube assembly with clearcoat physical material (`MeshPhysicalMaterial`), studio rim lighting, an emissive cyan inner core, ambient sparkles, and smooth mouse-parallax rotation + orbital drag controls (`enableZoom: false`).
   - Graceful SSR handling with dynamic import and zero hydration errors.

---

## 🏗️ Architecture & Sections

1. **Sticky Glassmorphic Navigation Bar (`Navbar.tsx`):**
   - Minimalist faceted geometric logo + `KRYNEX LABS` in bold tracking.
   - Smooth anchor links to `Vision`, `AI Methodology`, `Regional Drafting SaaS`, `Enterprise Solutions`, and `Interactive Demo`.
   - Pill-shaped CTA button with rotating glowing border (`@property --border-angle`).

2. **Hero Section (`HeroSection.tsx` & `Hero3DCube.tsx`):**
   - Division Pill Badge: `[ KRYNEX LABS // AI & IT RESEARCH DIVISION ]`
   - Metallic Headline: `"Engineering Intelligence for Industry Pain Points."`
   - Subheadline highlighting industrial bottleneck discovery and rent-based SaaS delivery.
   - High-contrast white CTA `"Explore Flagship SaaS"` + glassmorphic `"Partner With Us"`.
   - Real-time industrial telemetry badges: `10x Faster Turnaround`, `99.4% Precision`, `Rent-Based Model`.

3. **The Krynex Execution Engine (`Methodology.tsx`):**
   - 3-Column Interactive Pipeline:
     - **01 / Problem Discovery:** Deep-dive industrial audits across Gujarat & Indian corridors (Sanand, Dahej, Ahmedabad).
     - **02 / AI/ML Engineering:** Custom LLM fine-tuning, Gujarati-English dual tokenizers, and 0%-hallucination statutory safeguards.
     - **03 / Rent-Based SaaS Delivery:** Zero-Capex monthly subscription models replacing expensive legacy IT vendor lock-in.
   - Live interactive terminal telemetry inspector for each pipeline phase.

4. **Flagship Product Spotlight (`BentoGrid.tsx`):**
   - **Large Main Card (Gujarat's First Regional AI Drafting System):**
     - Tag: `FLAGSHIP SAAS // RENT-BASED MODEL`
     - Interactive live animated UI preview converting prompts into structured Gujarati & English official deeds (`દસ્તાવેજ: વેચાણ કરાર અને ટાઈટલ ક્લિયરન્સ પ્રમાણપત્ર`).
   - **Card 2 (Flexible SaaS Licensing):** Interactive tier switcher (Advocate Starter ₹1,499/mo, Pro MSME ₹4,999/mo, Enterprise Custom).
   - **Card 3 (Custom Enterprise AI):** Bespoke IT & ML solutions for manufacturing, logistics, and finance.
   - **Card 4 (Security & Speed Metrics):** Real-time counters showing `<1.2s Average Latency`, `AES-256 Encryption`, and `99.99% Uptime SLA`.

5. **Interactive Live Demo Playground (`DraftingDemo.tsx`):**
   - Tabbed interactive component across 3 sample industrial pain points:
     - `Regional Legal/Revenue Drafting` (Sanand GIDC 7/12 & 8-A Title Search & Conveyance)
     - `Industrial Compliance Automation` (Dahej PCPIR GPCB Environmental Manifest)
     - `Enterprise Workflow AI` (Mundra Port APSEZ Multimodal Bill of Lading OCR)
   - Real-time simulation runner with animated compiling steps, language switcher (`Bilingual`, `ગુજરાતી`, `English`), and one-click copy/PDF export simulation.

6. **Enterprise Matrix (`EnterpriseMatrix.tsx`):**
   - Dedicated sector breakdowns for Gujarat’s high-impact industrial corridors:
     - Chemical & Petrochemicals (Dahej, Ankleshwar)
     - Maritime Ports & Logistics (Mundra, Kandla)
     - Automotive & Engineering (Sanand, Changodar)
     - Textiles, Diamonds & Ceramics (Surat, Morbi)
     - Legal & BFSI Revenue Title Searches (Pan-Gujarat)

7. **Direct Intake Console Modal (`DemoModal.tsx`):**
   - Consultation booking dialog with field validation, model delivery preference selector, and celebratory confetti upon submission.

8. **MNC-Grade Footer (`Footer.tsx`):**
   - Pre-footer banner with radial horizon glow: `"Have an Industry Problem? Let's Engineer the Solution."`
   - Corporate multi-column directory, newsletter subscription, and Ahmedabad HQ address.
   - Giant subtle background wireframe text watermark: `KRYNEX`.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.
