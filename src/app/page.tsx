"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Cloud,
  Workflow,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroRubikScene from "@/components/canvas/HeroRubikScene";

export default function Home() {
  const capabilities = [
    {
      icon: Cpu,
      title: "Applied AI & Automation",
      description:
        "Custom machine learning models, document intelligence, and smart workflows that reduce manual work.",
    },
    {
      icon: Layers,
      title: "Custom Enterprise Software",
      description:
        "High-performance web applications, internal dashboards, and seamless ERP/CRM integrations.",
    },
    {
      icon: Cloud,
      title: "Cloud & System Architecture",
      description:
        "Secure, scalable cloud infrastructure built for high availability and data protection.",
    },
  ];

  const highlights = [
    {
      icon: Workflow,
      title: "Built Around Your Workflow",
      description:
        "Software tailored to how your business actually runs, eliminating cumbersome workarounds.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      description:
        "End-to-end encryption, strict access governance, and client data privacy by design.",
    },
    {
      icon: Zap,
      title: "Fast, Practical Delivery",
      description:
        "Agile engineering focused on real operational ROI, not theoretical slides or endless consulting.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* ======================================================== */}
      {/* SECTION 1 — HERO (Split Layout: Text Left, 3D Rubik Right) */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 flex items-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>KRYNEX LABS • AHMEDABAD, INDIA</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Building Intelligent Software for Modern Business.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                We design custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] text-white border border-white/10 font-medium text-sm hover:bg-white/[0.08] transition-all"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>
            </div>

            {/* Right 3D Rubik Column */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroRubikScene />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 — CORE CAPABILITIES (3 Clean Cards)           */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Engineered for Precision &amp; Reliability.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Modern digital systems designed to automate workflows and scale operations without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
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

                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/solutions"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 group-hover:text-white transition-colors"
                    >
                      <span>Learn more</span>
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
      {/* SECTION 3 — WHY KRYNEX LABS (3 Highlights)              */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              The Krynex Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Why Forward-Thinking Businesses Choose Us.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-zinc-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4 — MINIMAL CTA BANNER                          */}
      {/* ======================================================== */}
      <section className="relative py-20 border-t border-white/[0.08] bg-[#070707] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Have a project or operational challenge in mind?
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Discuss your technical goals with our engineering architects in Ahmedabad.
          </p>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] group"
            >
              <span>Talk to Our Team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
