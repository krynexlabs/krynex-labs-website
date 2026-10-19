"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Cpu, Globe2, Sparkles, Terminal } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#07090D]"
    >
      {/* Subtle Atmospheric Cyan & Blue Radial Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        {/* Electric Cyan Bloom at Top Center */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.08),transparent_70%)]" />
        {/* Subtle Blue Atmospheric Lighting */}
        <div className="absolute top-48 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(71,120,255,0.06),transparent_65%)]" />
      </div>

      {/* Atmospheric diagonal ambient glow */}
      <div className="absolute right-0 bottom-0 w-full sm:w-2/3 h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -right-20 bottom-0 w-[800px] h-[650px] bg-[linear-gradient(115deg,transparent_40%,rgba(0,229,255,0.03)_48%,rgba(71,120,255,0.05)_52%,transparent_60%)] blur-2xl opacity-75 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Headline, Subheadline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1118] border border-[#202630] hover:border-[#00E5FF]/40 transition-colors backdrop-blur-md mb-6 shadow-sm group">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[#929BAA] uppercase">
                KRYNEX LABS // ADVANCED SYSTEMS &amp; APPLIED AI
              </span>
              <span className="text-[#202630]">|</span>
              <span className="text-[10px] font-mono text-[#00E5FF] font-semibold">AHMEDABAD, INDIA</span>
            </div>

            {/* Main Headline - Space Grotesk Typography with Electric Cyan Accent */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="block text-[#F5F7FA]">KRYNEX LABS</span>
              <span className="block text-gradient-cyan">
                Building What Comes Next<span className="text-[#00E5FF]">.</span>
              </span>
            </h1>

            {/* Subheadline explaining real engineering capabilities */}
            <p className="font-sans text-base sm:text-lg text-[#929BAA] max-w-2xl leading-relaxed mb-8">
              We identify real-world industry bottlenecks and engineer custom enterprise software, Applied AI architectures, and resilient digital platforms that eliminate operational friction and scale reliably.
            </p>

            {/* Primary Action Buttons: Make an Inquiry & Explore Our Capabilities */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00E5FF] text-[#07090D] font-semibold text-sm hover:bg-[#33ebff] transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(0,229,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
              >
                <span>Make an Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#07090D] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/solutions"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D1118] border border-[#202630] hover:border-[#00E5FF]/40 text-[#F5F7FA] font-medium text-sm hover:bg-[#111722] transition-all flex items-center justify-center gap-2 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>Explore Our Capabilities</span>
              </Link>
            </div>

            {/* Cinematic Telemetry Proof Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#202630] w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-[#929BAA] font-mono uppercase mb-1">
                  <Globe2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>HQ Location</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#F5F7FA] tracking-tight font-heading">
                  Ahmedabad
                </div>
                <span className="text-[11px] text-[#929BAA]">Sindhu Bhavan Road (SBR)</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-[#929BAA] font-mono uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Reliability</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#F5F7FA] tracking-tight font-heading">
                  High Availability
                </div>
                <span className="text-[11px] text-[#929BAA]">SLA Uptime Architecture</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-[#929BAA] font-mono uppercase mb-1">
                  <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Precision</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#F5F7FA] tracking-tight font-heading">
                  Deterministic
                </div>
                <span className="text-[11px] text-[#929BAA]">Mathematical Guardrails</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-[#929BAA] font-mono uppercase mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Delivery</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#F5F7FA] tracking-tight font-heading">
                  Turnkey
                </div>
                <span className="text-[11px] text-[#929BAA]">Full IP &amp; Code Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Architectural Nexus Console */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl bg-[#0D1118] border border-[#202630] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.06)] relative overflow-hidden group hover:border-[#00E5FF]/40 transition-colors">
              {/* Top ambient specular line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none" />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#202630] mb-5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-xs font-mono font-bold text-[#F5F7FA] tracking-wider uppercase">
                    KRYNEX // ENGINEERING MATRIX
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#929BAA]">DC-01 ONLINE</span>
                </div>
              </div>

              {/* Console Body: Live Architecture Telemetry */}
              <div className="space-y-4 font-mono text-xs">
                {/* Vector 1 */}
                <div className="p-3.5 rounded-xl bg-[#111722] border border-[#202630]/80">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#929BAA]">Applied AI Engine</span>
                    <span className="text-[#00E5FF] font-semibold">Zero Hallucination</span>
                  </div>
                  <div className="text-[#F5F7FA] text-xs">
                    Deterministic AST &amp; Constrained Grammar Decoding
                  </div>
                </div>

                {/* Vector 2 */}
                <div className="p-3.5 rounded-xl bg-[#111722] border border-[#202630]/80">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#929BAA]">Distributed Data Bridge</span>
                    <span className="text-[#4778FF] font-semibold">Sub-10ms Stream</span>
                  </div>
                  <div className="text-[#F5F7FA] text-xs">
                    Event-driven async state machine &amp; Kafka pipelines
                  </div>
                </div>

                {/* Vector 3 */}
                <div className="p-3.5 rounded-xl bg-[#111722] border border-[#202630]/80">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#929BAA]">Data Sovereignty</span>
                    <span className="text-emerald-400 font-semibold">Zero-Retention</span>
                  </div>
                  <div className="text-[#F5F7FA] text-xs">
                    KMS envelope encryption • Per-tenant isolated VPC
                  </div>
                </div>
              </div>

              {/* Console Footer Status */}
              <div className="mt-5 pt-4 border-t border-[#202630] flex items-center justify-between text-[11px] font-mono text-[#929BAA]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Architecture Readiness</span>
                </div>
                <span className="text-[#F5F7FA] font-semibold">Production Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
