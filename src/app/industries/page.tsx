"use client";

import React from "react";
import Link from "next/link";
import {
  Factory,
  Landmark,
  Truck,
  Building2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IsometricDataWaveScene from "@/components/canvas/IsometricDataWaveScene";

export default function IndustriesPage() {
  const industries = [
    {
      icon: Factory,
      title: "Manufacturing & Industrial",
      problem:
        "High-speed production lines suffer from undetected micro-defects and unplanned machinery downtime.",
      solution:
        "Automated edge quality inspection, machine telemetry monitoring, and real-time production tracking without cloud latency.",
      focus: "Automated quality inspection, equipment monitoring, and real-time production tracking.",
    },
    {
      icon: Landmark,
      title: "FinTech & Financial Services",
      problem:
        "Manual client document verification slows onboarding, creates compliance bottlenecks, and increases human error.",
      solution:
        "Automated document verification, secure transaction workflows, audit-ready data pipelines, and executive dashboards.",
      focus: "Automated document verification, secure transaction workflows, and fast reporting dashboards.",
    },
    {
      icon: Truck,
      title: "Logistics & Supply Chain",
      problem:
        "Paper manifests, mismatched freight records, and delayed route updates cause delivery friction and demurrage costs.",
      solution:
        "Smart shipping document processing, connected freight telemetry, and automated delivery tracking.",
      focus: "Smart shipping document processing, fleet tracking, and route optimization.",
    },
    {
      icon: Building2,
      title: "Corporate & Enterprise Operations",
      problem:
        "Siloed departments waste thousands of manual hours re-entering data across accounting, CRM, and legacy ERP tools.",
      solution:
        "Connected internal tools, automated cross-departmental data bridges, and intelligent workflow assistants.",
      focus: "Eliminating repetitive data entry across departments with connected internal tools and AI workflows.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* ======================================================== */}
      {/* SECTION 1 — HERO (Split Layout: Text Left, 3D Right)     */}
      {/* ======================================================== */}
      <section className="relative min-h-[85vh] pt-32 sm:pt-40 pb-20 flex items-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>INDUSTRIES WE SERVE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Solving Bottlenecks Across Key Sectors.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                Every industry has unique challenges. We build focused software that improves speed, accuracy, and visibility.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
                >
                  <span>Discuss Your Sector</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right 3D Isometric Data Wave */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <IsometricDataWaveScene />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 — INDUSTRY CARDS (4 Clean Cards)               */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Target Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Targeted Solutions for Concrete Industry Challenges.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-white/20 p-8 sm:p-10 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Top Specular Rim */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/30 transition-all">
                      <Icon className="w-6 h-6 text-zinc-200" />
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {ind.title}
                    </h3>

                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.06] space-y-1.5">
                        <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider block">
                          Operational Friction
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {ind.problem}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                        <span className="text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-wider block">
                          Software Remedy
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {ind.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 group-hover:text-white transition-colors"
                    >
                      <span>Consult with our industry engineers</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3 — MINIMAL CTA BANNER                          */}
      {/* ======================================================== */}
      <section className="relative py-20 border-t border-white/[0.08] bg-[#070707] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Facing unique operational hurdles in your sector?
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Schedule an executive engineering consultation with our team in Ahmedabad.
          </p>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] group"
            >
              <span>Consult Our Engineers →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
