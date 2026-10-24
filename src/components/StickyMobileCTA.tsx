"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { trackConversionEvent } from "./Analytics";
import { safeLocalStorage } from "@/lib/safe-storage";

interface StickyMobileCTAProps {
  onRequestDemo?: () => void;
}

export default function StickyMobileCTA({ onRequestDemo }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [hasCookieConsent, setHasCookieConsent] = useState(true);

  useEffect(() => {
    // Check if user has already made a cookie consent choice
    const consent = safeLocalStorage.getItem("krynex_cookie_consent");
    setHasCookieConsent(Boolean(consent));

    const handleCookieAction = () => {
      setHasCookieConsent(true);
    };

    const handleOpenSettings = () => {
      setHasCookieConsent(false);
    };

    window.addEventListener("krynex_cookie_action", handleCookieAction);
    window.addEventListener("krynex_open_cookie_settings", handleOpenSettings);

    const handleScroll = () => {
      // Show sticky mobile bar after scrolling past initial hero headline (approx 280px)
      setVisible(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("krynex_cookie_action", handleCookieAction);
      window.removeEventListener("krynex_open_cookie_settings", handleOpenSettings);
    };
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
    <div
      className={`md:hidden fixed inset-x-3 z-50 animate-slide-up transition-all duration-300 ease-in-out ${
        hasCookieConsent
          ? "bottom-[max(1rem,env(safe-area-inset-bottom))]"
          : "bottom-[max(11.5rem,calc(11.5rem+env(safe-area-inset-bottom)))]"
      }`}
    >
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
