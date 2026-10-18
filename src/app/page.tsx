"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import Methodology from "@/components/Methodology";
import ProductsShowcase from "@/components/ProductsShowcase";
import EnterpriseMatrix from "@/components/EnterpriseMatrix";
import DraftingDemo from "@/components/DraftingDemo";
import BentoGrid from "@/components/BentoGrid";
import BusinessModelSection from "@/components/BusinessModelSection";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import SectionDivider from "@/components/SectionDivider";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Generate 32 bars for the real-time telemetry matrix
  const telemetryBars = [
    35, 45, 60, 40, 75, 90, 65, 80, 55, 70, 85, 95, 60, 50, 65, 80,
    90, 75, 85, 60, 45, 70, 80, 65, 90, 85, 70, 55, 75, 85, 65, 50,
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Sticky Glassmorphic Navigation */}
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* ======================================================== */}
      {/* SECTION 1 — HERO: Unified Software Product Company */}
      {/* ======================================================== */}
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 2 — THE PROBLEM: Why Good Software Begins Here */}
      {/* ======================================================== */}
      <ProblemSection />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 3 — HOW WE BUILD: The 7-Stage Creation Process */}
      {/* ======================================================== */}
      <Methodology />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 4 — OUR SOFTWARE PRODUCTS: Verified Platforms */}
      {/* ======================================================== */}
      <ProductsShowcase onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 5 — INDUSTRIES AND PROBLEMS UNDER INVESTIGATION */}
      {/* ======================================================== */}
      <EnterpriseMatrix />

      {/* Interactive R&D Problem Diagnostic Console */}
      <DraftingDemo />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 6 — PRODUCT ENGINEERING & ARCHITECTURE */}
      {/* ======================================================== */}
      <BentoGrid />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 7 — OUR BUSINESS MODEL: Rented Software Subscriptions */}
      {/* ======================================================== */}
      <BusinessModelSection />

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 8 — WHY KRYNEX LABS: The Product-Led Philosophy */}
      {/* ======================================================== */}
      <section id="why-krynex" className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
                  <span>[ 08 // WHY KRYNEX LABS // PRODUCT-LED PHILOSOPHY ]</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
                  Software Built Around Real Problems, Not Technological Novelty.
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                  Most software products fail because they are built around technological hype rather than genuine business pain. At Krynex Labs, we start with the problem. We validate demand before overbuilding, focus exclusively on high-utility features, and continuously refine our applications based on empirical field feedback.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Headquartered at SBR, Ahmedabad, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Transparent Subscription Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3-Card Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2 tracking-tight">
                  Problem-First
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Validate Before Overbuilding
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We isolate the exact manual bottleneck or clerical latency costing businesses time and capital, verifying recurring economic demand before writing code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2 tracking-tight">
                  Compounding Value
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Continuous Evolution
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Subscribers fund continuous weekly product enhancements, statutory tax updates, and sub-second performance gains without costly consulting re-engagements.
                </p>
              </div>

              {/* Full-Width 3rd Card - Live System Reliability & Telemetry Visualizer */}
              <div className="col-span-1 sm:col-span-2 p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="tracking-wider uppercase font-semibold">
                      PRODUCT TELEMETRY &amp; BENCHMARK TARGETS // AHMEDABAD LABS
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                    HIGH-AVAILABILITY CLOUD
                  </span>
                </div>

                {/* Metric Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Lexis Deed Compilation</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      &lt; 1.2s
                    </div>
                    <div className="text-[10px] text-zinc-500">18-page bilingual deed AST synthesis</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Vision Edge Latency</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      &lt; 15ms
                    </div>
                    <div className="text-[10px] text-zinc-500">TensorRT INT8 offline line inference</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Service Availability Target</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      99.9%
                    </div>
                    <div className="text-[10px] text-zinc-500">Standard SaaS uptime SLA objective</div>
                  </div>
                </div>

                {/* Real-time Bar Matrix Waveform */}
                <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between gap-1 h-10 px-1">
                  {telemetryBars.map((height, bIdx) => (
                    <div
                      key={bIdx}
                      style={{ height: `${height}%` }}
                      className="flex-1 bg-gradient-to-t from-white/20 via-zinc-400 to-white rounded-t-sm transition-all duration-500 opacity-80 group-hover:opacity-100"
                    />
                  ))}
                </div>

                {/* Engineering Qualification Footnote */}
                <div className="mt-2 text-[9px] font-mono text-zinc-500">
                  * Operational specifications and benchmark latency targets modeled across Krynex software platforms and edge inference gateways.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ======================================================== */}
      {/* SECTION 9 — FINAL CTA: Better Software Starts With Better Questions */}
      {/* ======================================================== */}
      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Product Demo / Consultation Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Floating Sticky Mobile CTA Bar */}
      <StickyMobileCTA onRequestDemo={() => setIsDemoModalOpen(true)} />
    </main>
  );
}
