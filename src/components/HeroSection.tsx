"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Cpu, Globe2, Compass } from "lucide-react";

import HeroCubeFallback from "./HeroCubeFallback";

// Dynamically import 3D Cube with SSR disabled to prevent hydration errors;
// lightweight static wireframe renders instantly during load and for non-interactive clients
const Hero3DCube = dynamic(() => import("./Hero3DCube"), {
  ssr: false,
  loading: () => <HeroCubeFallback />,
});

interface HeroSectionProps {
  onRequestDemo?: () => void;
}

export default function HeroSection({ onRequestDemo }: HeroSectionProps) {
  return (
    <section
      id="vision"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-black"
    >
      {/* Top Specular Radial Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_70%)]" />
      </div>

      {/* Resend diagonal floor light streaks behind the cube */}
      <div className="absolute right-0 bottom-0 w-full sm:w-2/3 h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -right-20 bottom-0 w-[850px] h-[700px] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.04)_48%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.04)_52%,transparent_60%)] blur-2xl opacity-75 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Headline, Subheadline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md mb-6 shadow-sm group">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-zinc-300 uppercase">
                KRYNEX LABS // SOFTWARE PRODUCT COMPANY
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-[10px] font-mono text-zinc-400 font-semibold">AHMEDABAD, INDIA</span>
            </div>

            {/* Main Headline - Exact Resend Silver Metallic Gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              We Find Industry Problems. We Build the Software That Solves Them.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
              Krynex Labs researches real business challenges and turns them into practical software products. From web and mobile applications to AI-powered platforms, we build, launch, and continuously improve software that businesses can subscribe to and use.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#products"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#approach"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                <span>How We Build</span>
              </a>
            </div>

            {/* Monochrome Telemetry Proof Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08] w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase mb-1">
                  <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Business Model</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                  Rented SaaS
                </div>
                <span className="text-[11px] text-zinc-500">Zero upfront capex</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Reliability</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                  99.9% Target
                </div>
                <span className="text-[11px] text-zinc-500">Service availability target</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase mb-1">
                  <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Precision</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                  Deterministic
                </div>
                <span className="text-[11px] text-zinc-500">Constrained AST guardrails</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase mb-1">
                  <Zap className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Evolution</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                  Continuous
                </div>
                <span className="text-[11px] text-zinc-500">Compounding product updates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Unboxed Floating 3D Canvas bleeding naturally into pitch black */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[680px] flex items-center justify-center">
            <Hero3DCube />
          </div>
        </div>
      </div>
    </section>
  );
}
