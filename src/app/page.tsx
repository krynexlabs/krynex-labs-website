"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Methodology from "@/components/Methodology";
import BentoGrid from "@/components/BentoGrid";
import DraftingDemo from "@/components/DraftingDemo";
import EnterpriseMatrix from "@/components/EnterpriseMatrix";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import SectionDivider from "@/components/SectionDivider";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { CheckCircle2, Activity } from "lucide-react";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Generate 32 bars for the real-time telemetry matrix
  const telemetryBars = [
    35, 45, 60, 40, 75, 90, 65, 80, 55, 70, 85, 95, 60, 50, 65, 80,
    90, 75, 85, 60, 45, 70, 80, 65, 90, 85, 70, 55, 75, 85, 65, 50
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Sticky Glassmorphic Navigation */}
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Hero Section with Unboxed 3D Rubik's Assembly */}
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* ======================================================== */}
      {/* SECTION: ABOUT KRYNEX & CORPORATE THESIS */}
      {/* ======================================================== */}
      <section id="about" className="relative py-20 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
                  <span>[ ABOUT KRYNEX // CORPORATE THESIS ]</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
                  Enterprise Value Lives at the Intersection of AI &amp; Systems.
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                  Most AI initiatives fail because they treat machine learning as an isolated novelty.
                  At Krynex Labs, we operate as a full-spectrum Applied AI and Information Technology
                  engineering partner—identifying deep industrial bottlenecks and architecting resilient,
                  production-grade digital infrastructure that delivers compounding enterprise velocity.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Headquartered at SBR, Ahmedabad, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>MNC-Grade Engineering Standards</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3-Card Grid Perfectly Balanced */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <div className="text-3xl font-mono font-bold text-white mb-2 tracking-tight">
                  Zero Capex
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Agile Operational Deployment
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Eliminating bloated upfront consultant fees. We engineer turnkey, high-availability software architectures designed for rapid enterprise integration.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <div className="text-3xl font-mono font-bold text-white mb-2 tracking-tight">
                  99.99% SLA
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Mission-Critical Reliability
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Zero-trust cryptographic isolation, multi-region cloud resilience, and sub-10ms latency optimized for high-throughput enterprise execution.
                </p>
              </div>

              {/* Upgrade 2: Full-Width 3rd Card - Live System Throughput & Telemetry Visualizer */}
              <div className="col-span-1 sm:col-span-2 p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="tracking-wider uppercase font-semibold">
                      ARCHITECTURE BENCHMARK TARGETS // AHMEDABAD R&amp;D LABS
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                    DESIGN ENVELOPE // DISTRIBUTED MESH
                  </span>
                </div>

                {/* Metric Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Target Throughput</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      1.4M req/s
                    </div>
                    <div className="text-[10px] text-zinc-500">Distributed mesh ingestion capacity</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Deterministic Reliability</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      99.98%
                    </div>
                    <div className="text-[10px] text-zinc-500">Mathematical guardrails threshold</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Kernel Latency Objective</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                      &lt; 0.4ms
                    </div>
                    <div className="text-[10px] text-zinc-500">Optimized edge execution target</div>
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
                  * Architecture design specifications and theoretical throughput envelopes modeled for enterprise neural pipelines and custom zero-trust micro-services.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resend 1px Silver Horizon Divider */}
      <SectionDivider />

      {/* 01 // The Krynex Engineering Matrix (3-Column Interactive Pipeline) */}
      <Methodology />

      {/* Resend 1px Silver Horizon Divider */}
      <SectionDivider />

      {/* 02 // Core Corporate Capabilities & R&D Telemetry (Bento Grid) */}
      <BentoGrid />

      {/* Resend 1px Silver Horizon Divider */}
      <SectionDivider />

      {/* Interactive Enterprise Transformation Console */}
      <DraftingDemo />

      {/* Resend 1px Silver Horizon Divider */}
      <SectionDivider />

      {/* Target Industry Verticals */}
      <EnterpriseMatrix />

      {/* Resend 1px Silver Horizon Divider */}
      <SectionDivider />

      {/* Executive Consultation & Corporate Goodwill Section + MNC-Grade Footer */}
      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Executive Partnership Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Floating Sticky Mobile CTA Bar */}
      <StickyMobileCTA onRequestDemo={() => setIsDemoModalOpen(true)} />
    </main>
  );
}
