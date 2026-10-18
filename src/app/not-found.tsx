import Link from "next/link";
import { Terminal, ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none -z-10" />

      {/* Terminal 404 Box */}
      <div className="max-w-xl w-full rounded-2xl bg-[#080808] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-zinc-800 border border-white/20" />
            <span className="w-3 h-3 rounded-full bg-zinc-800 border border-white/20" />
            <span className="w-3 h-3 rounded-full bg-zinc-800 border border-white/20" />
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-wider">
            HTTP 404 // ROUTE_UNRESOLVED
          </span>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-400 uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-300" />
            <span>KRYNEX CORE TELEMETRY ERROR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            404: System Route Not Found
          </h1>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            The requested sub-routine or endpoint does not exist within the Krynex Labs enterprise cluster.
            The route may have been decommissioned or quarantined under zero-trust governance.
          </p>

          <div className="p-4 rounded-xl bg-black border border-white/[0.06] font-mono text-xs text-zinc-500 space-y-1">
            <div>&gt; HOST: ahmedabad-dc01.krynexlabs.internal</div>
            <div>&gt; STATUS: NULL_POINTER_EXCEPTION (ERR_ROUTING_TARGET)</div>
            <div>&gt; ACTION: RE-ENGAGE CORE ORCHESTRATION PIPELINE</div>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
            >
              <ArrowLeft className="w-4 h-4 text-black group-hover:-translate-x-1 transition-transform" />
              <span>Return to Krynex Core &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
