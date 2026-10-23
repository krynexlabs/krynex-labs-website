"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { safeLocalStorage } from "@/lib/safe-storage";

/**
 * Universal conversion event tracker for Krynex Labs.
 * Dispatches to Vercel Analytics and Google Tag Manager (window.dataLayer).
 */
export function trackConversionEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  try {
    // 1. Dispatch to Vercel Analytics
    track(eventName, properties);

    // 2. Dispatch to Google Tag Manager dataLayer if available
    const win = window as any;
    if (win.dataLayer && Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Dispatch to Google Analytics (gtag.js) if available
    if (typeof win.gtag === "function") {
      win.gtag("event", eventName, properties);
    }

    // 4. Local diagnostic telemetry logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[CONVERSION TRACKER] Event: "${eventName}"`, properties);
    }
  } catch (err) {
    // Graceful error suppression so analytics never blocks user action
    console.debug("[CONVERSION TRACKER] Error dispatching event:", err);
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Notify Google Analytics of route transitions in Single Page Application navigation
    const win = window as any;
    if (typeof win.gtag === "function") {
      win.gtag("config", "G-KZCMWZSRFN", {
        page_path: pathname,
      });
    }

    // Lightweight privacy-first telemetry logger for aggregate internal routing metrics
    const consent = safeLocalStorage.getItem("krynex_cookie_consent");
    if (consent === "all") {
      const metric = {
        route: pathname,
        timestamp: new Date().toISOString(),
        node: "AHMEDABAD-LABS",
      };
      if (process.env.NODE_ENV === "development") {
        console.debug("[KRYNEX TELEMETRY]", metric);
      }
    }
  }, [pathname]);

  return null;
}
