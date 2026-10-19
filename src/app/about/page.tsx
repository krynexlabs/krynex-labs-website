import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { ABOUT_DATA } from "@/data/about-data";
import {
  Shield,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Layers,
  Cpu,
  Workflow,
  Sparkles,
  RefreshCw,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Problem-First Software Product Company",
  description:
    "Learn about Krynex Labs: Software Product and SaaS Company headquartered in Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat, India. We research real operational bottlenecks and engineer software products that businesses subscribe to and use.",
  alternates: {
    canonical: "https://www.krynexlabs.in/about",
  },
};

export default function AboutPage() {
  const pillars = ABOUT_DATA.productPillars;
  const principles = ABOUT_DATA.approachPrinciples;
  const modelSteps = ABOUT_DATA.businessModel.steps;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>CORPORATE DOSSIER // KRYNEX LABS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Software Built Around Real Problems.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              {ABOUT_DATA.coreMessage} Headquartered in Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat, India, we identify the operational bottlenecks holding organizations back and build software applications that provide compounding utility.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white" />
                <span>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Software Product &amp; SaaS Company</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Rented Software Model</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="py-20 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-4 block">
            CORE OPERATING CREED
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            &ldquo;{ABOUT_DATA.philosophy.title}&rdquo;
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {ABOUT_DATA.philosophy.text}
          </p>
        </div>
      </section>

      {/* The 4 Principles of the Problem-First Approach */}
      <section className="py-24 bg-black border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
              WHY KRYNEX LABS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Product-Led Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              How our problem-first mindset shapes every software product we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((pr, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-white mb-2">
                    {`${pr.step} // ${pr.title}`}
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 mb-2">{pr.subtitle}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pr.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rented Software Business Model */}
      <section className="py-24 bg-[#050505] border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
              OUR BUSINESS MODEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Recurring Subscriptions (Rented Software)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {ABOUT_DATA.businessModel.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-12">
            {modelSteps.map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08] text-center"
              >
                <div className="text-xs font-mono font-bold text-white mb-1">
                  PHASE {st.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-black border border-white/10 text-center max-w-3xl mx-auto">
            <div className="text-sm font-mono text-zinc-300 font-semibold mb-2">
              {ABOUT_DATA.businessModel.subtitle}
            </div>
          </div>
        </div>
      </section>

      {/* Product Building Pillars */}
      <section className="py-24 bg-black border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
              PRODUCT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              The Technologies Behind Our Products
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              We select and apply the right technologies to solve each specific problem directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pil.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{pil.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance, Security & Standards */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              STANDARDS &amp; GOVERNANCE
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Zero-Trust Enterprise Baseline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_DATA.governanceAndStandards.map((std, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <Shield className="w-5 h-5 text-white mb-4" />
                  <h3 className="text-sm font-semibold text-white mb-2">{std.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{std.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md"
            >
              <span>Explore Our Services &amp; Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
