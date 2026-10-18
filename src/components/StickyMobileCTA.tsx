"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Shield } from "lucide-react";

interface StickyMobileCTAProps {
  onRequestDemo: () => void;
}

export default function StickyMobileCTA({ onRequestDemo }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky mobile bar after scrolling past initial hero headline (approx 300px)
      setVisible(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-50 animate-slide-up">
      <div className="rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/15 p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              AHMEDABAD DC-01
            </span>
            <span className="text-[11px] font-semibold text-white">
              Executive R&amp;D
            </span>
          </div>
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] shrink-0"
        >
          <span>Connect With Krynex &rarr;</span>
        </a>
      </div>
    </div>
  );
}
