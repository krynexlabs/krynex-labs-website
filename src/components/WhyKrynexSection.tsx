"use client";

import React from "react";
import {
  Target,
  Workflow,
  Cpu,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function WhyKrynexSection() {
  const differentiators = [
    {
      number: "01",
      icon: Target,
      title: "Industry-Focused Products",
      description:
        "We build software specifically around the operational realities, terminology, and legal frameworks of each industry we serve, rather than generic tools.",
    },
    {
      number: "02",
      icon: Workflow,
      title: "Practical Automation",
      description:
        "We focus on automating repetitive clerical and operational tasks that drain business hours, delivering direct productivity gains without unnecessary complexity.",
    },
    {
      number: "03",
      icon: Cpu,
      title: "Modern Engineering",
      description:
        "Our applications are built on modern web and mobile architectures engineered for speed, clean interfaces, high availability, and offline resilience.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Security-Conscious Development",
      description:
        "We treat your business data with strict confidentiality. Every product enforces tenant isolation, data encryption at rest and in transit, and zero-retention privacy.",
    },
    {
      number: "05",
      icon: RefreshCw,
      title: "Continuous Product Improvement",
      description:
        "Our recurring subscription model aligns our incentives with yours. Regular software updates, feature enhancements, and maintenance are included continuously.",
    },
  ];

  return (
    <section id="why-krynex" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>07 // WHY KRYNEX LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Built Around Practical Utility, Not Speculative Novelty.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We measure our success by the actual time, errors, and operational friction eliminated for the businesses that depend on our products.
          </p>
        </div>

        {/* 5 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.number}
                className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-zinc-300 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                      {diff.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                  <span>KRYNEX DIFFERENTIATOR</span>
                  <span className="text-zinc-400">#{diff.number}</span>
                </div>
              </div>
            );
          })}

          {/* 6th Telemetry Box */}
          <div className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-4">
                HEADQUARTERS &amp; OPERATIONS
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Ahmedabad, Gujarat, India
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Operating directly from Ahmedabad, our engineering teams observe and solve operational friction on the ground for Indian enterprises and global business partners.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ACTIVE PRODUCT OPERATIONS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
