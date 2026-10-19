"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { trackConversionEvent } from "./Analytics";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show WhatsApp button after brief initial delay to prevent layout disruption
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    trackConversionEvent("whatsapp_click", {
      location: "floating_button",
      target: "+919879418569",
    });
  };

  const whatsappUrl =
    "https://wa.me/919879418569?text=Hello%20Krynex%20Labs%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20software%20products%20for%20our%20business.";

  if (!visible) return null;

  return (
    <aside
      aria-label="Direct WhatsApp Consultation"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center group animate-fade-in"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with Krynex Labs on WhatsApp (+91 9879418569)"
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#080808]/90 hover:bg-[#121212] border border-white/15 hover:border-white/30 text-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {/* Pulsing Green Live Status Dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-emerald-400 fill-current"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>

        <span className="text-xs font-mono font-medium tracking-wide">
          WhatsApp Direct
        </span>
      </a>
    </aside>
  );
}
