"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Workflow,
  Eye,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products-data";

interface ProductsShowcaseProps {
  onRequestDemo?: () => void;
}

export default function ProductsShowcase({ onRequestDemo }: ProductsShowcaseProps) {
  const products = Object.values(PRODUCTS_DATA);

  const iconMap: Record<string, React.ReactNode> = {
    "krynex-lexis": <FileText className="w-5 h-5 text-white" />,
    "krynex-flow": <Workflow className="w-5 h-5 text-white" />,
    "krynex-vision": <Eye className="w-5 h-5 text-white" />,
  };

  const statusBadges: Record<string, { label: string; color: string }> = {
    "krynex-lexis": { label: "Available (GA)", color: "text-zinc-200 bg-white/[0.06] border-white/15" },
    "krynex-flow": { label: "Available (GA)", color: "text-zinc-200 bg-white/[0.06] border-white/15" },
    "krynex-vision": { label: "Early Access / Pilot", color: "text-zinc-300 bg-white/[0.04] border-white/10" },
  };

  return (
    <section id="products" className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden">
      {/* Specular Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.06] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
              <span>04 // OUR SOFTWARE PRODUCTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Software Products Built Around Real Problems.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl">
              We research business challenges, develop practical software solutions, launch them as products, and continuously improve them for the businesses that rely on them.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>View Product Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const badge = statusBadges[product.slug] || { label: product.status, color: "text-zinc-400 bg-white/[0.04] border-white/10" };

            return (
              <div
                key={product.slug}
                className="group p-8 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Specular Top Rim */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      {iconMap[product.slug]}
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <Link href={`/products/${product.slug}`} className="block group/title">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight group-hover/title:text-zinc-200 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-[11px] font-mono text-zinc-400 mb-1">{product.category}</div>
                  <div className="text-xs text-zinc-300 font-mono mb-4">{product.shortTagline}</div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {product.summary}
                  </p>

                  {/* Problem & Solution Contrast */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-white/[0.04]">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-zinc-500" />
                        <span>Problem Solved:</span>
                      </div>
                      <div className="text-xs text-zinc-300 font-medium line-clamp-2">
                        {product.theProblem.painPoints[0]}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Software Solution:</span>
                      </div>
                      <div className="text-xs text-zinc-300 font-medium line-clamp-2">
                        {product.theSolution.keyBenefits[0]}
                      </div>
                    </div>
                  </div>

                  {/* Main Verified Features */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/[0.04]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                      Verified Capabilities:
                    </div>
                    {product.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-zinc-400" />
                        <span>{feat.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Transparent Starting Pricing & Primary CTA */}
                <div className="pt-5 border-t border-white/[0.08] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Starting Tier</span>
                    <span className="text-white font-semibold">{product.startingPrice.inr} <span className="text-zinc-500 font-normal">{product.startingPrice.period}</span></span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group/btn"
                  >
                    <span>Explore Product &amp; Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
