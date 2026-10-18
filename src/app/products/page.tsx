import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { PRODUCTS_DATA } from "@/data/products-data";
import {
  FileText,
  Workflow,
  Eye,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Software Products Directory | Problem-Driven SaaS",
  description:
    "Explore Krynex Labs' verified software products: Krynex Lexis (Regional AI Legal Drafting SaaS), Krynex Flow (Enterprise Workflow Orchestrator), and Krynex Vision (Edge Industrial QC).",
  alternates: {
    canonical: "https://www.krynexlabs.in/products",
  },
};

export default function ProductsPage() {
  const iconMap: Record<string, React.ReactNode> = {
    "krynex-lexis": <FileText className="w-6 h-6 text-white" />,
    "krynex-flow": <Workflow className="w-6 h-6 text-white" />,
    "krynex-vision": <Eye className="w-6 h-6 text-white" />,
  };

  const productsList = Object.values(PRODUCTS_DATA);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>KRYNEX SOFTWARE PORTFOLIO // RECURRING ACCESS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Software Products Built Around Real Problems.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              We research business challenges, develop practical software solutions, launch them as products, and continuously improve them for the businesses that rely on them. Subscribe to software built for immediate operational utility.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Instant Cloud Onboarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Transparent Flat Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero-Retention Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Directory Grid */}
      <section className="py-24 bg-[#030303] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                PRODUCT DIRECTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Krynex Software Portfolio
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              3 ACTIVE PLATFORMS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {productsList.map((product) => {
              const lowestPlan = product.pricingTiers[0];

              return (
                <div
                  key={product.slug}
                  className="group p-8 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        {iconMap[product.slug]}
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
                        {product.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight group-hover:text-zinc-100 transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mb-3">{product.shortTagline}</div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {product.summary.substring(0, 160)}...
                    </p>

                    {/* Key Problem Solved */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Primary Bottleneck Solved:
                      </div>
                      <div className="text-xs text-zinc-300 font-medium">
                        {product.theProblem.painPoints[0]}
                      </div>
                    </div>

                    {/* Feature Bullets */}
                    <div className="space-y-2 mb-6">
                      {product.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="truncate">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Footnote & Action */}
                  <div className="pt-6 border-t border-white/[0.06]">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-zinc-400">Plans starting at</span>
                        <div className="text-xl font-bold font-mono text-white">
                          {lowestPlan.price}{" "}
                          <span className="text-xs font-normal text-zinc-400">
                            /{lowestPlan.period.replace("per ", "")}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {product.version}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full bg-white text-black font-medium hover:bg-zinc-200 py-2.5 rounded-xl transition-all text-xs tracking-wide flex items-center justify-center gap-2"
                    >
                      <span>Explore Product &amp; Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Product Philosophy */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-4">
            <span>PRODUCT ENGINEERING PRINCIPLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            &ldquo;Good software should make work simpler, not more complicated.&rdquo;
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Every product we engineer is built to solve a concrete, recurring industry headache.
            We prioritize deterministic mathematical correctness, blazing sub-second compilation speeds,
            and clean user experiences that require zero steep learning curves.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08]">
              <div className="text-white font-bold text-sm mb-1">Zero Training Lag</div>
              <p className="text-xs text-zinc-400">
                Intuitive interfaces designed for legal, plant, and operations professionals without IT assistance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08]">
              <div className="text-white font-bold text-sm mb-1">Sub-Second Execution</div>
              <p className="text-xs text-zinc-400">
                18-page statutory legal deeds compiled in 1.2s; industrial vision inspected in under 15ms.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08]">
              <div className="text-white font-bold text-sm mb-1">Air-Gapped Privacy</div>
              <p className="text-xs text-zinc-400">
                Customer files and camera streams are processed with zero-retention encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
