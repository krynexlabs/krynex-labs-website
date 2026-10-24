"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { safeLocalStorage } from "@/lib/safe-storage";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check safeLocalStorage for consent choice
    const consent = safeLocalStorage.getItem("krynex_cookie_consent");
    setCurrentConsent(consent);

    if (!consent) {
      // Small timeout for smooth slide-in on initial visit
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else if (consent === "all") {
      // Restore granted consent for returning visitors
      if (typeof window !== "undefined") {
        const win = window as any;
        if (typeof win.gtag === "function") {
          win.gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      }
    }

    // Listener for reopening cookie settings from Footer or Privacy Policy
    const handleOpenSettings = () => {
      const latestConsent = safeLocalStorage.getItem("krynex_cookie_consent");
      setCurrentConsent(latestConsent);
      setVisible(true);
    };

    window.addEventListener("krynex_open_cookie_settings", handleOpenSettings);
    return () => {
      window.removeEventListener("krynex_open_cookie_settings", handleOpenSettings);
    };
  }, []);

  const handleChoice = (choice: "all" | "essential") => {
    safeLocalStorage.setItem("krynex_cookie_consent", choice);
    setCurrentConsent(choice);

    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.gtag === "function") {
        win.gtag("consent", "update", {
          analytics_storage: choice === "all" ? "granted" : "denied",
        });
      }

      // TASK 2: Active Consent Withdrawal — purge persistent Google Analytics cookies if withdrawn
      if (choice === "essential") {
        try {
          const cookies = document.cookie.split(";");
          for (const c of cookies) {
            const eqPos = c.indexOf("=");
            const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
            if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_gat")) {
              document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
              document.cookie = `${name}=; Path=/; Domain=${window.location.hostname}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
              const hostParts = window.location.hostname.split(".");
              if (hostParts.length > 1) {
                const rootDomain = "." + hostParts.slice(-2).join(".");
                document.cookie = `${name}=; Path=/; Domain=${rootDomain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
              }
            }
          }
        } catch {
          // Graceful fallback if cookie access is restricted
        }
      }

      // UI-001 & TASK 2: Notify UI components (StickyMobileCTA, Analytics) that consent has changed
      window.dispatchEvent(new CustomEvent("krynex_cookie_action", { detail: { choice } }));
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    if (currentConsent) {
      setVisible(false);
    } else {
      handleChoice("essential");
    }
  };

  if (!visible) return null;

  const isReopened = Boolean(currentConsent);

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-slide-up"
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
            onClick={handleDismiss}
            className="text-zinc-500 hover:text-white transition-colors p-1"
            aria-label="Dismiss cookie settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic status badge when reopened from Footer */}
        {isReopened && (
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center justify-between">
            <span>
              Status:{" "}
              {currentConsent === "all" ? (
                <span className="text-white font-semibold">Optional Telemetry Enabled</span>
              ) : (
                <span className="text-zinc-400 font-semibold">Essential Only (Telemetry Denied)</span>
              )}
            </span>
            <span className={currentConsent === "all" ? "text-emerald-400 text-xs" : "text-zinc-500 text-xs"}>
              ●
            </span>
          </div>
        )}

        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          Krynex Labs uses non-intrusive cookies to preserve enterprise session integrity and collect anonymous aggregate system telemetry. Zero advertising trackers. You can adjust or withdraw consent at any time. Read our{" "}
          <Link href="/privacy" className="text-white underline hover:text-zinc-200">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleChoice("all")}
            className="flex-1 py-2 px-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {isReopened && currentConsent === "all" ? "Keep Telemetry Enabled" : "Accept Telemetry"}
          </button>
          <button
            onClick={() => handleChoice("essential")}
            className="py-2 px-3.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 font-medium text-xs hover:bg-white/[0.08] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {isReopened && currentConsent === "all" ? "Withdraw Consent (Essential Only)" : "Essential Only"}
          </button>
        </div>
      </div>
    </aside>
  );
}
