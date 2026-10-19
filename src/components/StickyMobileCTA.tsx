"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackConversionEvent } from "./Analytics";

export default function StickyMobileCTA() {
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

  const handleContactClick = () => {
    trackConversionEvent("inquiry_click", { location: "sticky_mobile_cta" });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent("whatsapp_click", { location: "sticky_mobile_cta" });
  };

  const whatsappUrl =
    "https://wa.me/919879418569?text=Hello%20Krynex%20Labs%2C%20I%20would%20like%20to%20discuss%20an%20engineering%20inquiry.";

  return (
    <div className="md:hidden fixed bottom-4 inset-x-3 z-50 animate-slide-up">
      <div className="rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/15 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2">
        {/* WhatsApp Direct Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Direct WhatsApp Consultation"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-mono transition-colors shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-zinc-300">WhatsApp</span>
        </a>

        {/* Primary Contact Us CTA */}
        <Link
          href="/contact"
          onClick={handleContactClick}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] text-center"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </Link>
      </div>
    </div>
  );
}
