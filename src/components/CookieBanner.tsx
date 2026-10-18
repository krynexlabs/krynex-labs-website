"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check localStorage for consent choice
    const consent = localStorage.getItem("krynex_cookie_consent");
    if (!consent) {
      // Small timeout for smooth slide-in
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: "all" | "essential") => {
    localStorage.setItem("krynex_cookie_consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-slide-up"
    >
      <div className="relative rounded-2xl bg-[#080808]/95 backdrop-blur-xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Top Specular Rim */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
              TELEMETRY &amp; DATA PRIVACY
            </span>
          </div>

          <button
            onClick={() => handleChoice("essential")}
            className="text-zinc-500 hover:text-white transition-colors p-1"
            aria-label="Dismiss banner with essential cookies only"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          Krynex Labs uses non-intrusive cookies to preserve enterprise session integrity and collect anonymous aggregate system telemetry. Zero advertising trackers. Read our{" "}
          <Link href="/privacy" className="text-white underline hover:text-zinc-200">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleChoice("all")}
            className="flex-1 py-2 px-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Accept Telemetry
          </button>
          <button
            onClick={() => handleChoice("essential")}
            className="py-2 px-3.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 font-medium text-xs hover:bg-white/[0.08] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
}
