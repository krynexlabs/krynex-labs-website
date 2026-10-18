"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Rocket,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

export default function BusinessModelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>(".spotlight-card");
    if (!cards) return;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const modelSteps = [
    {
      step: "01",
      icon: Layers,
      title: "Build",
      tagline: "Problem-Driven Product Engineering",
      description:
        "We identify a verified industry pain point through field research and develop a focused, production-grade software product to solve it.",
    },
    {
      step: "02",
      icon: Rocket,
      title: "Launch",
      tagline: "Transparent Commercial Access",
      description:
        "We bring the software to market with clear, upfront subscription tiers—eliminating bloated upfront consultant fees and long development delays.",
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Subscribe",
      tagline: "Rented Software Access",
      description:
        "Businesses pay monthly or annually to access the software. Organizations gain enterprise tools with zero capex overhead or vendor lock-in.",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Maintain",
      tagline: "Operational Care & Security",
      description:
        "We operate the cloud infrastructure, enforce zero-trust encryption, maintain uptime targets, and provide direct technical support.",
    },
    {
      step: "05",
      icon: TrendingUp,
      title: "Improve",
      tagline: "Continuous Software Evolution",
      description:
        "Recurring software subscriptions directly fund ongoing engineering: new features, faster compile times, and updated statutory compliance.",
    },
  ];

  return (
    <section
      id="business-model"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#030303] overflow-hidden"
    >
      {/* Specular Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4 shadow-sm">
            <span>07 // PRIMARY BUSINESS MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Software You Subscribe To. Built to Last.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We do not sell billable development hours, consulting packages, or one-time custom client contracts. Krynex Labs develops, owns, operates, and continuously improves software products. Businesses rent access through predictable recurring subscriptions.
          </p>
        </div>

        {/* The Fundamental Principle Monogram Banner */}
        <div className="spotlight-card rounded-3xl bg-[#080808] border border-white/10 p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-4">
            <span>OUR CORE OPERATING CYCLE</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-tight text-white mb-4 uppercase max-w-4xl mx-auto leading-relaxed">
            Customers Pay to Use the Software.
            <br className="hidden sm:inline" />
            <span className="text-zinc-400"> Krynex Labs Continuously Improves the Software.</span>
            <br className="hidden sm:inline" />
            <span className="text-zinc-500"> Recurring Subscriptions Fund the Business.</span>
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            This aligned economic model means our incentives match our customers&apos; incentives: the better, faster, and more reliable our software products are, the longer businesses stay subscribed.
          </p>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {modelSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 font-bold">
                      {step.step}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 tracking-tight">
                    {step.title}
                  </h4>
                  <div className="text-[10px] font-mono text-zinc-400 mb-3 uppercase">
                    {step.tagline}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <span>Phase {step.step} of 05</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Pillars of Subscriber Advantage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-black border border-white/[0.06]">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              01 // Predictable Cost
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Zero Upfront Capex Overhead
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No bloated upfront development fees, unpredictable consultant hourly billing, or hidden server maintenance surcharges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-white/[0.06]">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              02 // Compounding Value
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Continuous Weekly Improvements
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our engineering team regularly deploys performance optimizations, statutory updates, and workflow additions directly into active products.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-white/[0.06]">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              03 // Full Data Sovereignty
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Zero-Retention Privacy Standard
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You rent the software application; you maintain 100% sovereignty over your operational data. We never co-mingle data or train public foundation models on client files.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
