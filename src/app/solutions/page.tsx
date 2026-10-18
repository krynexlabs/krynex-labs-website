import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import {
  Cpu,
  Server,
  Smartphone,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions // Division A: Applied AI & Enterprise Engineering",
  description:
    "Explore Krynex Labs' custom engineering services: Applied AI, custom neural architectures, enterprise systems modernization, web/mobile platforms, and zero-trust cloud data pipelines.",
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions",
  },
};

export default function SolutionsPage() {
  const iconMap: Record<string, React.ReactNode> = {
    "ai-ml": <Cpu className="w-6 h-6 text-white" />,
    "enterprise-software": <Server className="w-6 h-6 text-white" />,
    "web-mobile": <Smartphone className="w-6 h-6 text-white" />,
    "cloud-data": <Cloud className="w-6 h-6 text-white" />,
  };

  const solutionsList = Object.values(SOLUTIONS_DATA);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>DIVISION A // APPLIED AI &amp; ENTERPRISE ENGINEERING</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Engineered Intelligence for Mission-Critical Operations.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              We operate as a full-spectrum Applied AI and Information Technology engineering partner.
              From bespoke neural architectures to zero-trust cloud backbones, we design, build, and deploy
              custom enterprise software that eliminates structural bottlenecks and scales predictably.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero Capex Model</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>100% IP Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>99.99% Reliability SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-[#030303] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                ENGINEERING MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Four Pillars of Enterprise Transformation
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              AHMEDABAD DC-01 LABS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionsList.map((sol) => (
              <div
                key={sol.slug}
                className="group p-8 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between shadow-lg"
              >
                {/* Specular Rim Light */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      {iconMap[sol.slug]}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 uppercase tracking-wider">
                      {sol.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">
                    {sol.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mb-4">{sol.tagline}</div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {sol.overview}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-white/[0.04]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Key Capabilities:
                    </div>
                    {sol.capabilities.slice(0, 3).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                        <div>
                          <strong className="text-white font-medium">{cap.title}:</strong>{" "}
                          <span className="text-zinc-400">{cap.description.substring(0, 95)}...</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    4 Core Disciplines
                  </span>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-zinc-200 transition-colors"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Engineering Lifecycle (Understand, Engineer, Refine, Evolve) */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              DELIVERY METHODOLOGY
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
              From Friction Discovery to Scaled Production
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3">
              We do not deliver speculative mockups. We engineer hardened, turnkey software deployed
              directly into your production VPC or bare-metal environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Friction Discovery",
                desc: "We analyze legacy code, database schemas, and operational bottlenecks to identify highest-ROI automation levers.",
              },
              {
                step: "02",
                title: "Custom Engineering",
                desc: "We write clean, typed microservices (Go, Python, Next.js) protected by deterministic mathematical guardrails.",
              },
              {
                step: "03",
                title: "Rigorous Telemetry",
                desc: "Every system undergoes high-load stress testing (85k req/s target) and rigorous error-boundary verification.",
              },
              {
                step: "04",
                title: "Full Sovereignty",
                desc: "Turnkey handoff with 100% source code, Docker/K8s manifests, zero vendor lock-in, and on-site engineer training.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] relative"
              >
                <div className="text-3xl font-mono font-bold text-white/30 mb-3">{item.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Box */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Have a Proprietary Engineering Challenge?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8">
              Consult directly with our principal software architects. We provide an initial technical
              feasibility assessment and architecture proposal within 48 business hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black font-medium hover:bg-zinc-200 px-6 py-3 rounded-full transition-all text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Schedule Technical Consultation
              </Link>
              <a
                href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20a%20custom%20engineering%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 px-6 py-3 rounded-full transition-all text-xs font-mono"
              >
                WhatsApp Direct: +91 9879418569
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
