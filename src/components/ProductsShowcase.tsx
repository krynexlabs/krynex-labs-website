"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Workflow,
  Eye,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
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

  return (
    <section id="products" className="relative py-24 bg-[#030303] overflow-hidden">
      {/* Specular Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.06] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
              <span>02 // DIVISION B: PROPRIETARY SAAS PRODUCTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Turnkey Software Products. Immediate Operational Velocity.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl">
              Alongside bespoke client engineering, Krynex Labs develops standardized, high-performance
              SaaS solutions for recurring industry bottlenecks with transparent flat pricing.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Explore All Products &amp; Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const lowestPlan = product.pricingTiers[0];

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
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-zinc-100 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mb-4">{product.shortTagline}</div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {product.summary.substring(0, 140)}...
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.04]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                      Problem Solved:
                    </div>
                    <div className="text-xs text-zinc-300 font-medium line-clamp-2">
                      {product.theProblem.painPoints[0]}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono">From</span>
                      <div className="text-lg font-bold font-mono text-white">
                        {lowestPlan.price}{" "}
                        <span className="text-[11px] font-normal text-zinc-400">
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
                    className="w-full bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/10 font-medium py-2 rounded-xl transition-all text-xs tracking-wide flex items-center justify-center gap-1.5"
                  >
                    <span>View Features &amp; Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
