"use client";

import React from "react";
import Link from "next/link";
import { SolutionDetail } from "@/data/solutions-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionDivider from "./SectionDivider";

interface SolutionDetailViewProps {
  solution: SolutionDetail;
}

export default function SolutionDetailView({ solution }: SolutionDetailViewProps) {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Top Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>&larr; Return to Solutions Matrix</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
            <span>{solution.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            {solution.title}
          </h1>

          <p className="text-base sm:text-lg font-mono text-zinc-300 mb-8">
            {solution.tagline}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-4xl">
            {solution.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Zero-Capex Deployment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>100% IP Transfer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Ahmedabad DC-01 Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Problems Solved */}
      <section className="py-20 bg-[#050505] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              OPERATIONAL FRICTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Industrial Bottlenecks We Eliminate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solution.keyProblemsSolved.map((prob, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-colors relative"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-white shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{prob}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Technical Capabilities */}
      <section className="py-20 bg-black border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Core Engineering Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white tracking-tight">{cap.title}</h3>
                  {cap.metrics && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
                      {cap.metrics}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Architecture Highlights */}
      <section className="py-20 bg-[#050505] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Deterministic Guardrails &amp; Security Posture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {solution.architectureHighlights.map((arch, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] relative"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  {arch.title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{arch.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Enterprise Deliverables */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="mb-8">
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                PRODUCTION HANDOFF
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Enterprise Deliverables Included
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {solution.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-white font-medium">Ready to discuss your project?</div>
                <div className="text-[11px] text-zinc-400">Direct consultation with principal engineers</div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2.5 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  {solution.ctaText}
                </Link>
                <a
                  href={`https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20${encodeURIComponent(
                    solution.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
