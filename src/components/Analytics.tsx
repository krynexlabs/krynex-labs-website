"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { safeLocalStorage } from "@/lib/safe-storage";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Lightweight privacy-first telemetry logger for aggregate internal routing metrics
    const consent = safeLocalStorage.getItem("krynex_cookie_consent");
    if (consent === "all") {
        // Record route impression anonymously without PII
        const metric = {
          route: pathname,
          timestamp: new Date().toISOString(),
          node: "AHMEDABAD-LABS",
        };
        // Internal diagnostic heartbeat channel
        if (process.env.NODE_ENV === "development") {
          console.debug("[KRYNEX TELEMETRY]", metric);
        }
    }
  }, [pathname]);

  return null;
}
