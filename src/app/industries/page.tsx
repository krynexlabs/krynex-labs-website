import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  Layers,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries & Operational Problems | Problem-Driven Software",
  description:
    "Explore the operational bottlenecks Krynex Labs investigates across Manufacturing, LegalTech, Logistics, FinTech, and Healthcare—and the focused software products we engineer to solve them.",
  alternates: {
    canonical: "https://www.krynexlabs.in/industries",
  },
  openGraph: {
    title: "Industries & Operational Problems | Krynex Labs",
    description:
      "Explore the operational bottlenecks Krynex Labs investigates across Manufacturing, LegalTech, Logistics, FinTech, and Healthcare—and the focused software products we engineer to solve them.",
    url: "https://www.krynexlabs.in/industries",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries & Operational Problems | Krynex Labs",
    description:
      "Operational bottlenecks Krynex Labs investigates across Manufacturing, LegalTech, Logistics, FinTech, and Healthcare.",
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.krynexlabs.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: "https://www.krynexlabs.in/industries",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>PROBLEM DISCOVERY // INDUSTRY RESEARCH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Software Built Around Real Industry Bottlenecks.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              At Krynex Labs, we start with the problem, not the technology. We research real operational friction—tasks that consume excessive time, processes that generate avoidable errors, and tools that are too complex or expensive—and build focused software products that businesses subscribe to.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Validated Pain Points</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Transparent Product Status</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Recurring Software Model</span>
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
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-zinc-300">
                    {ind.statusLabel}
                  </span>
                  <div className="text-xs font-mono text-zinc-500 hidden sm:block">
                    RESEARCH VECTOR #{String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <p className="text-base font-mono text-zinc-300 mb-4">{ind.tagline}</p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
                {ind.overview}
              </p>

              {/* Workflow & Beneficiaries Header Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
                <div>
                  <span className="text-zinc-500 uppercase block mb-1">Target Business Workflow:</span>
                  <span className="text-zinc-200">{ind.targetWorkflow}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block mb-1">Who Would Benefit:</span>
                  <span className="text-zinc-200">{ind.beneficiaries}</span>
                </div>
              </div>

              {/* Bottlenecks vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-2xl bg-black border border-white/[0.08]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span>The Underlying Pain Point</span>
                  </div>
                  <ul className="space-y-2.5 mb-4">
                    {ind.bottlenecks.map((btnk, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                        <span>{btnk}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Why Existing Tools Fall Short:
                    </span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {ind.whyExistingInadequate}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black border border-white/[0.08]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-white" />
                    <span>The Krynex Software Solution</span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                    {ind.krynexSolution}
                  </p>
                  <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Technical Architecture Envelopes:
                    </span>
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
                  MODELED PERFORMANCE TARGETS:
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
                  Target Domain Archetype:{" "}
                  <span className="text-white font-medium">{ind.caseDossier.clientType}</span>
                </div>
                <div className="flex items-center gap-3">
                  {ind.slug === "manufacturing" && (
                    <Link
                      href="/solutions/ai-ml"
                      className="bg-white text-black font-medium hover:bg-zinc-200 px-4 py-2 rounded-xl transition-all text-xs tracking-wide flex items-center gap-1.5"
                    >
                      <span>Explore AI & Vision Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {ind.slug === "legal" && (
                    <Link
                      href="/solutions/enterprise-software"
                      className="bg-white text-black font-medium hover:bg-zinc-200 px-4 py-2 rounded-xl transition-all text-xs tracking-wide flex items-center gap-1.5"
                    >
                      <span>Explore Enterprise Software</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {ind.slug === "logistics" && (
                    <Link
                      href="/solutions/enterprise-software"
                      className="bg-white text-black font-medium hover:bg-zinc-200 px-4 py-2 rounded-xl transition-all text-xs tracking-wide flex items-center gap-1.5"
                    >
                      <span>Explore Middleware Systems</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  <Link
                    href={`/contact?subject=problem-${ind.slug}`}
                    className="bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 px-4 py-2 rounded-xl transition-all text-xs font-mono flex items-center gap-1.5"
                  >
                    <span>Propose Industry Problem</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
