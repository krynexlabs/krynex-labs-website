"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductDetail } from "@/data/products-data";
import {
  FileText,
  Workflow,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProductsDirectoryProps {
  products: ProductDetail[];
}

export default function ProductsDirectory({ products }: ProductsDirectoryProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const iconMap: Record<string, React.ReactNode> = {
    "krynex-lexis": <FileText className="w-6 h-6 text-white" />,
    "krynex-flow": <Workflow className="w-6 h-6 text-white" />,
    "krynex-vision": <Eye className="w-6 h-6 text-white" />,
  };

  return (
    <div>
      {/* Top Controls: Currency Toggle & Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 border-b border-white/[0.06] pb-6 gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
            PRODUCT DIRECTORY &amp; COMMERCIAL TIERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Krynex Software Portfolio
          </h2>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">Currency:</span>
          <div className="inline-flex p-1 rounded-xl bg-[#080808] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1 rounded-lg transition-all ${
                currency === "INR"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-label="View pricing in Indian Rupees (INR)"
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded-lg transition-all ${
                currency === "USD"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-label="View pricing in US Dollars (USD)"
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Product Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const startingPriceStr =
            currency === "INR"
              ? `${product.startingPrice.inr} ${product.startingPrice.period}`
              : `${product.startingPrice.usd} ${product.startingPrice.period}`;

          return (
            <div
              key={product.slug}
              className="group p-8 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {iconMap[product.slug]}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
                    {product.status}
                  </span>
                </div>

                {/* Clickable Title */}
                <Link href={`/products/${product.slug}`} className="block group/title">
                  <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight group-hover/title:text-zinc-200 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="text-xs font-mono text-zinc-400 mb-3">{product.shortTagline}</div>

                {/* Complete self-contained summary paragraph */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                  {product.summary}
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

              {/* Card Footer: Starting Pricing & Double CTAs */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Starting Subscription</span>
                  <span className="text-white font-semibold text-sm">{startingPriceStr}</span>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] gap-1.5"
                >
                  <span>Explore Product &amp; Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/contact?product=${product.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                >
                  Request Sandbox Trial &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
