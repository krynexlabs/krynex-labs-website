"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error telemetry to console without personal data
    console.error("[KRYNEX APP ERROR]", error.message || "Unhandled client component error");
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full rounded-3xl bg-[#080808] border border-white/10 p-8 shadow-2xl relative text-center">
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-white" />
        </div>

        <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
          APPLICATION RECOVERY RUNTIME
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
          Temporary Runtime Exception
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
          The application encountered an unexpected state. You can safely retry loading the component or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Operation</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 hover:bg-white/[0.08] hover:text-white transition-colors text-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
