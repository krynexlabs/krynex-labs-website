import Link from "next/link";
import { CheckCircle2, Shield, ArrowLeft, Clock, Lock, Server } from "lucide-react";

export const metadata = {
  title: "Inquiry Confirmed | Krynex Labs",
  description: "Executive R&D Consultation request securely received by Krynex Labs corporate engineering division.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams?: { ref?: string };
}) {
  const docketId = searchParams?.ref;

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-2xl w-full rounded-3xl bg-[#080808] border border-white/10 p-8 sm:p-12 shadow-2xl relative">
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Status Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono text-zinc-300">
              {docketId ? `DOCKET ID: ${docketId}` : "DISPATCH STATUS: TRANSMITTED"}
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            SBR, AHM, GUJ // DC-01
          </span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              R&amp;D CONSULTATION BRIEF CONFIRMED
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Executive Brief Securely Received.
            </h1>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Your technical inquiry and operational parameters have been encrypted using AES-256 and routed directly
            to our Senior Systems Architects and Machine Learning Engineering Division at SBR, Ahmedabad.
          </p>

          {/* Telemetry Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black border border-white/[0.08] font-mono text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                Response SLA
              </span>
              <span className="text-white font-semibold">&lt; 2 Business Hours</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                NDA Security
              </span>
              <span className="text-white font-semibold">Strict Bilateral</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                <Server className="w-3 h-3 text-zinc-400" />
                Routing Node
              </span>
              <span className="text-white font-semibold">Ahmedabad DC-01</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Shield className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>MNC-grade data isolation active. Training data never co-mingled.</span>
          </div>

          {/* Return CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
            >
              <ArrowLeft className="w-4 h-4 text-black group-hover:-translate-x-1 transition-transform" />
              <span>Return to Krynex Labs Home &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
