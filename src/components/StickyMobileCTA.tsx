"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { trackConversionEvent } from "./Analytics";

interface StickyMobileCTAProps {
  onRequestDemo?: () => void;
}

export default function StickyMobileCTA({ onRequestDemo }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky mobile bar after scrolling past initial hero headline (approx 280px)
      setVisible(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const handleDemoClick = (e: React.MouseEvent) => {
    trackConversionEvent("demo_click", { location: "sticky_mobile_cta" });
    if (onRequestDemo) {
      e.preventDefault();
      onRequestDemo();
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        e.preventDefault();
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="md:hidden fixed bottom-4 inset-x-3 z-50 animate-slide-up">
      <div className="rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/15 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2">
        {/* Primary Contact Us CTA */}
        <a
          href="#contact"
          onClick={handleDemoClick}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] text-center"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </a>
      </div>
    </div>
  );
}
