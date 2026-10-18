import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { ABOUT_DATA } from "@/data/about-data";
import {
  Shield,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Layers,
  Cpu,
  Workflow,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Krynex Labs | Positioning, Divisions & Methodology",
  description:
    "Learn about Krynex Labs: Premier Applied AI, Enterprise Engineering, and SaaS Products Company headquartered at SBR, Ahmedabad, India. Explore our Understand-Engineer-Refine-Evolve methodology.",
  alternates: {
    canonical: "https://www.krynexlabs.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>CORPORATE DOSSIER // KRYNEX LABS INC.</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Architecting Intelligence for Industry.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              {ABOUT_DATA.coreMessage} Headquartered at SBR, Ahmedabad, India, we bridge the gap
              between academic artificial intelligence research and mission-critical enterprise execution.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white" />
                <span>SBR, Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Two Operating Divisions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero Capex Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Complementary Divisions Section */}
      <section className="py-24 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              ORGANIZATIONAL ARCHITECTURE
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Two Complementary Operating Divisions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Krynex Labs operates under a dual-engine corporate model designed to serve both bespoke
              enterprise clients and high-velocity SaaS product subscribers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ABOUT_DATA.twoDivisions.map((div, dIdx) => (
              <div
                key={dIdx}
                className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
                    {div.role}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">ENGINE #{dIdx + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{div.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {div.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-8">
                  {div.highlights.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={dIdx === 0 ? "/solutions" : "/products"}
                  className="w-full bg-white text-black font-medium hover:bg-zinc-200 py-2.5 rounded-xl transition-all text-xs tracking-wide flex items-center justify-center gap-2"
                >
                  <span>{dIdx === 0 ? "Explore Custom Engineering" : "Explore SaaS Products"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="py-20 bg-black border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-4 block">
            CORE OPERATING CREED
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            &ldquo;{ABOUT_DATA.philosophy.title}&rdquo;
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {ABOUT_DATA.philosophy.text}
          </p>
        </div>
      </section>

      {/* The 4 Principles of the Krynex Approach */}
      <section className="py-24 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              DELIVERY SYSTEM
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              The 4 Principles of the Krynex Approach
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Every system we engineer adheres to a rigorous four-phase lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_DATA.approachPrinciples.map((principle) => (
              <div
                key={principle.step}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] relative"
              >
                <div className="text-4xl font-mono font-bold text-white/20 mb-3">
                  {principle.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{principle.title}</h3>
                <div className="text-xs font-mono text-zinc-500 mb-3">{principle.subtitle}</div>
                <p className="text-xs text-zinc-400 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Data Sovereignty Standards */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              GOVERNANCE &amp; SECURITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Enterprise Governance Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ABOUT_DATA.governanceAndStandards.map((gov, gIdx) => (
              <div
                key={gIdx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] relative"
              >
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span>{gov.title}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{gov.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
