"use client";

import React from "react";
import Link from "next/link";
import { Sun, Scale, Factory, ArrowRight } from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    {
      id: "solar",
      icon: Sun,
      title: "Solar Energy",
      subtitle: "Operations & Maintenance Management",
      description:
        "Software engineered for solar EPC contractors, commercial installers, and asset managers. We automate feasibility modeling, proposal generation, DISCOM approval tracking, and real-time generation monitoring.",
      capabilities: [
        "Real-time central & string inverter monitoring",
        "Algorithmic soiling & degradation alerts",
        "Automated O&M maintenance crew dispatch",
        "DISCOM statutory net-metering checklists",
      ],
      productName: "Operated via SolarOps",
      productLink: "/products/solarops",
      industryLink: "/industries/solar",
    },
    {
      id: "legal",
      icon: Scale,
      title: "Legal & Document Automation",
      subtitle: "Conveyancing & Statutory Drafting",
      description:
        "Purpose-built software for advocates, law firms, real estate developers, and corporate legal counsel. We replace static templates with automated bilingual deed generation and statutory verification.",
      capabilities: [
        "Bilingual deed generation (Gujarati & English)",
        "30-year sub-registrar Index-II title verification",
        "Automated Gujarat stamp duty & fee calculation",
        "Complete client data sovereignty and isolation",
      ],
      productName: "Operated via Krynex LawOS",
      productLink: "/products/krynex-lawos",
      industryLink: "/industries/legal",
    },
    {
      id: "manufacturing",
      icon: Factory,
      title: "Continuous Manufacturing",
      subtitle: "Industrial Quality & Defect Detection",
      description:
        "On-premise edge computing for precision fabrication and high-speed assembly lines. We inspect parts at line speed with zero external cloud network dependency.",
      capabilities: [
        "High-speed line inspection with sub-10ms response",
        "Vibration and temperature anomaly monitoring",
        "Integration with factory PLC and ERP databases",
        "Offline-first execution without cloud latency",
      ],
      productName: "Industrial Architecture",
      productLink: "/technology",
      industryLink: "/industries",
    },
  ];

  return (
    <section id="industries" className="relative py-16 sm:py-24 lg:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.06] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <span>06 // INDUSTRIES WE SERVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Software Engineered for Specific Industries.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              We do not build generic software. Our applications are designed around the exact operational regulations, workflows, and challenges of each sector.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-[#F5F5F5] text-[#050505] font-semibold text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Explore All Industry Dossiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                    {ind.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mb-4">
                    {ind.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                    {ind.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/[0.04] mb-8">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Key Capabilities:
                    </div>
                    {ind.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="text-xs text-zinc-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    {ind.productName}
                  </span>
                  <Link
                    href={ind.productLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold py-2 px-3 -my-2 -mx-3 rounded-lg"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
