import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { PRODUCTS_DATA } from "@/data/products-data";
import ProductsDirectory from "@/components/ProductsDirectory";
import {
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Software Products Directory | Problem-Driven SaaS",
  description:
    "Explore Krynex Labs' verified software products: Krynex Lexis (Regional AI Legal Drafting SaaS), Krynex Flow (Enterprise Workflow Orchestrator), and Krynex Vision (Edge Industrial QC).",
  alternates: {
    canonical: "https://www.krynexlabs.in/products",
  },
  openGraph: {
    title: "Software Products Directory | Krynex Labs",
    description:
      "Explore Krynex Labs verified software products: Krynex Lexis, Krynex Flow, and Krynex Vision with transparent subscription pricing.",
    url: "https://www.krynexlabs.in/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Products Directory | Krynex Labs",
    description:
      "Explore Krynex Labs verified software products: Krynex Lexis, Krynex Flow, and Krynex Vision.",
  },
};

export default function ProductsPage() {
  const productsList = Object.values(PRODUCTS_DATA);

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
        name: "Products",
        item: "https://www.krynexlabs.in/products",
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
                <span>Guided Sandbox &amp; Cloud Onboarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Continuous Software Evolution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero-Retention Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Directory Grid with Currency Switcher */}
      <section className="py-24 bg-[#030303] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsDirectory products={productsList} />
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
              <div className="text-white font-bold text-sm mb-1">Target Compilation Speed</div>
              <p className="text-xs text-zinc-400">
                Modeled for rapid bilingual deed generation and low-latency edge computer vision inspection.
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
