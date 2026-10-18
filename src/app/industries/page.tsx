import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { INDUSTRIES_DATA } from "@/data/industries-data";
import {
  Factory,
  Landmark,
  Truck,
  Scale,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Target Industries & Enterprise Dossiers | Krynex Labs",
  description:
    "Explore how Krynex Labs solves mission-critical operational bottlenecks across Manufacturing, FinTech, Logistics, Legal, and Healthcare sectors.",
  alternates: {
    canonical: "https://www.krynexlabs.in/industries",
  },
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    manufacturing: <Factory className="w-6 h-6 text-white" />,
    fintech: <Landmark className="w-6 h-6 text-white" />,
    logistics: <Truck className="w-6 h-6 text-white" />,
    legal: <Scale className="w-6 h-6 text-white" />,
    healthcare: <Activity className="w-6 h-6 text-white" />,
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>VERTICAL SPECIALIZATION // INDUSTRIAL DOSSIERS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Targeted Neural &amp; Software Solutions by Sector.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              Generic software fails when exposed to the harsh, nuanced realities of specialized
              industries. At Krynex Labs, we engineer purpose-built systems that respect the exact
              statutory laws, physical equipment constraints, and latency thresholds of your operational domain.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Domain-Adapted Architectures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Deterministic Safety Guardrails</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero-Trust Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Dossiers List */}
      <section className="py-24 bg-[#030303] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {INDUSTRIES_DATA.map((ind, idx) => (
            <div
              key={ind.slug}
              id={ind.slug}
              className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {iconMap[ind.slug]}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {ind.name}
                    </h2>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {ind.badge}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  DOSSIER #{String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              <p className="text-base font-mono text-zinc-300 mb-4">{ind.tagline}</p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
                {ind.overview}
              </p>

              {/* Bottlenecks vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Industry Pain Points</span>
                  </div>
                  <ul className="space-y-2.5">
                    {ind.bottlenecks.map((btnk, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                        <span>{btnk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-white" />
                    <span>The Krynex Engineering Response</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                    {ind.krynexSolution}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                    {ind.architectureDetails.map((detail, dIdx) => (
                      <div key={dIdx} className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-white shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantified Metrics Ribbon */}
              <div className="p-6 rounded-2xl bg-black border border-white/[0.08] mb-8">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-4">
                  EMPIRICAL TARGET TELEMETRY:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {ind.quantifiedImpact.map((imp, iIdx) => (
                    <div key={iIdx}>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                        {imp.metric}
                      </div>
                      <div className="text-xs font-medium text-zinc-300 mt-1">{imp.label}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{imp.sublabel}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-zinc-400">
                  Representative Archetype:{" "}
                  <span className="text-white font-medium">{ind.caseDossier.clientType}</span>
                </div>
                <Link
                  href={`/contact?sector=${ind.slug}`}
                  className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2 rounded-xl transition-all text-xs tracking-wide flex items-center gap-1.5"
                >
                  <span>Request Sector Architecture Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
