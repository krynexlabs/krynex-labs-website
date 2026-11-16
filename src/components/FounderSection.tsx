"use client";

import React from "react";
import { Quote, Building2, Sparkles } from "lucide-react";

export default function FounderSection() {
  return (
    <section id="founder" className="relative py-24 sm:py-32 bg-[#080B12] border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
          <Building2 className="w-3.5 h-3.5" />
          <span>09 // THE FOUNDER</span>
        </div>

        {/* Founder Profile Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121A27] border border-white/[0.08] hover:border-blue-500/30 transition-all shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />

          {/* Header Row: DP Monogram + Name & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
            <div className="flex items-center gap-5">
              {/* Premium DP Monogram (No photograph) */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/20 flex items-center justify-center text-white font-mono font-bold text-2xl tracking-tight shadow-inner shrink-0">
                <span>DP</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  D. PATEL
                </h3>
                <div className="text-sm font-mono text-blue-400 mt-1">
                  Founder, Krynex Labs
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                HEADQUARTERS
              </span>
              <span className="text-xs font-mono text-zinc-300">
                AHMEDABAD, GUJARAT, INDIA
              </span>
            </div>
          </div>

          {/* Quote Block */}
          <div className="relative">
            <Quote className="w-8 h-8 text-blue-400/40 mb-4" />

            <div className="space-y-4 text-base sm:text-lg text-zinc-200 leading-relaxed font-sans border-l-2 border-blue-500/40 pl-6 sm:pl-8">
              <p>
                &ldquo;Technology should solve real problems, simplify complex processes and create meaningful value.
              </p>
              <p>
                At Krynex Labs, our focus is to identify challenges across industries and transform them into practical, intelligent and reliable software products.
              </p>
              <p>
                We believe great software is not defined by how complicated it is, but by how effectively it solves problems.
              </p>
              <p>
                Our vision is to build technology products that businesses can trust and depend on.&rdquo;
              </p>
            </div>
          </div>

          {/* Footer Docket */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
            <div>
              &mdash; <span className="text-white font-semibold">D. Patel</span>, Founder, Krynex Labs
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>LEADERSHIP PERSPECTIVE // 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
