"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

interface FinalCTASectionProps {
  onRequestDemo?: () => void;
}

export default function FinalCTASection({ onRequestDemo }: FinalCTASectionProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-[#080B12] border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START THE CONVERSATION {"//"} KRYNEX LABS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Let&rsquo;s Build Something Meaningful.
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you are looking to streamline legal conveyancing, monitor solar plant operations, or automate complex business workflows, we are ready to help.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(37,99,235,0.35)] flex items-center gap-2 group"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onRequestDemo ? (
            <button
              type="button"
              onClick={onRequestDemo}
              className="px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Us</span>
            </button>
          ) : (
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Us</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
