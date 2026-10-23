"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Code2,
  CheckCircle,
  Headphones,
  ShieldCheck,
  Users2,
  Zap,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GyroscopicCoreScene from "@/components/canvas/GyroscopicCoreScene";

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Understand",
      description:
        "We study your current workflow to find out where time and money are being lost.",
    },
    {
      num: "02",
      icon: Code2,
      title: "Engineer",
      description:
        "We design and build clean, secure software around your exact business needs.",
    },
    {
      num: "03",
      icon: CheckCircle,
      title: "Refine",
      description:
        "We test everything in real operational conditions to ensure speed and reliability.",
    },
    {
      num: "04",
      icon: Headphones,
      title: "Support",
      description:
        "We help your team adopt the system smoothly and scale it as your company grows.",
    },
  ];

  const principles = [
    {
      icon: Zap,
      title: "Pragmatic Engineering",
      description:
        "Solving real operational bottlenecks rather than chasing fleeting technology hype or unnecessary complexity.",
    },
    {
      icon: ShieldCheck,
      title: "Client Data Sovereignty",
      description:
        "Strict isolation, zero-retention data pipelines, and private infrastructure to protect enterprise intellectual property.",
    },
    {
      icon: Users2,
      title: "Direct Collaboration",
      description:
        "Senior engineering leadership working directly with your operational stakeholders from discovery to production.",
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
                <span>ABOUT KRYNEX LABS</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Engineers Focused on Real-World Impact.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                Headquartered at Sindhu Bhavan Road (SBR), Ahmedabad, Krynex Labs is an AI and software engineering company dedicated to turning complex business problems into simple, reliable digital systems.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right 3D Gyroscopic Core */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <GyroscopicCoreScene />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 — HOW WE WORK (4-Step Horizontal Process)      */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Engineering Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              How We Work.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              A transparent, outcome-oriented delivery methodology built for speed and operational reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-white/20 p-8 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Top Specular Rim */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {st.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {st.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3 — CORE PRINCIPLES (3 Clean Cards)              */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Disciplined Architecture. Zero Fluff.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((pr, idx) => {
              const Icon = pr.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-[#09090b] border border-white/[0.08] p-8 space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-zinc-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {pr.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pr.description}
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
            Let’s discuss what we can build for your business.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Our engineering team is ready to analyze your challenges and build custom solutions.
          </p>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] group"
            >
              <span>Get in Touch →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
