"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[KRYNEX GLOBAL ERROR]", error.message || "Root layout exception");
  }, [error]);

  return (
    <html lang="en" className="dark bg-black text-white">
      <body className="min-h-screen bg-black text-white flex items-center justify-center p-4 antialiased font-sans">
        <div className="max-w-md w-full rounded-3xl bg-[#080808] border border-white/10 p-8 shadow-2xl relative text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>

          <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
            GLOBAL RUNTIME HANDLER
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
            System Level Exception
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
            A critical rendering boundary exception was caught. The engineering telemetry has captured the event.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restart Application</span>
            </button>

            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 hover:bg-white/[0.08] hover:text-white transition-colors text-xs"
            >
              <span>Reload Homepage</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
