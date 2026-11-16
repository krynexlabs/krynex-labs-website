"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Workflow,
  FileText,
  Sun,
  Scale,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

export default function ProductDemonstrations() {
  const [activeTab, setActiveTab] = useState<"solarops" | "lawos">("solarops");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1200);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationComplete(false);
  };

  return (
    <section id="demos" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.06] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Play className="w-3.5 h-3.5" />
              <span>05 // PRODUCT DEMONSTRATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Interactive Product Workflow Walkthroughs.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Experience the core user experience and workflows of our software products. All data shown in this interactive console is simulated sample data for evaluation.
            </p>
          </div>

          {/* Product Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#111111] border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab("solarops");
                resetSimulation();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === "solarops"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>SolarOps Console</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("lawos");
                resetSimulation();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === "lawos"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Krynex LawOS Workspace</span>
            </button>
          </div>
        </div>

        {/* Demo Stage Container */}
        <div className="rounded-3xl bg-[#111111] border border-white/[0.08] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Sample Data Notice Banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>SAMPLE DEMONSTRATION WORKFLOW // SIMULATED PREVIEW DATA (NOT LIVE PRODUCTION SYSTEM)</span>
            </div>
            <span className="hidden sm:inline text-[11px] text-amber-400/80">SANDBOX EVALUATION ENVIRONMENT</span>
          </div>

          {/* Interactive Workspace Window */}
          <div className="p-6 sm:p-10">
            {activeTab === "solarops" ? (
              /* ======================================================== */
              /* SOLAROAPS DEMONSTRATION */
              /* ======================================================== */
              <div className="space-y-8">
                {/* Console Top Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      SOLAR OPERATIONS &amp; MANAGEMENT
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                      SolarOps Plant Telemetry &amp; Field Dispatch
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Sample Asset: 120 kWp Commercial Rooftop Array (Sanand Industrial Zone, Ahmedabad)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="px-4 py-2 rounded-xl bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Analyzing Telemetry...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Run Diagnostics</span>
                        </>
                      )}
                    </button>
                    {simulationComplete && (
                      <button
                        type="button"
                        onClick={resetSimulation}
                        className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Reset simulation"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Daily Generation</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">
                      {simulationComplete ? "482.4 kWh" : "468.1 kWh"}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <span>↑ 98.4% of expected PR</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Inverter Health</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">
                      {simulationComplete ? "Optimal" : "Checking"}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Inverter 01 &amp; 02 Online
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">String Status</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">
                      {simulationComplete ? "8 / 8 Active" : "Scanning..."}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">
                      Zero MPPT dropouts
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">DISCOM Stage</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">
                      Commissioned
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Net-metering verified
                    </div>
                  </div>
                </div>

                {/* Simulated Telemetry Log & Work Order */}
                <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] font-mono text-xs text-zinc-400 space-y-2">
                  <div className="text-zinc-500 pb-2 border-b border-white/[0.06] flex items-center justify-between">
                    <span>OPERATIONAL TELEMETRY LOG [SIMULATED STREAM]</span>
                    <span className="text-zinc-300">RS-485 / MODBUS SIMULATION</span>
                  </div>
                  <div>&gt; Array Irradiance: 890 W/m² (POA Pyranometer calibrated)</div>
                  <div>&gt; Module Temperature: 44.2°C | Performance Ratio (PR): 82.6%</div>
                  <div>
                    &gt; {simulationComplete ? (
                      <span className="text-emerald-400">
                        [DIAGNOSTIC COMPLETE] Soiling threshold nominal. No automated cleaning dispatch required.
                      </span>
                    ) : isSimulating ? (
                      <span className="text-zinc-300">
                        [IN PROGRESS] Evaluating string current variance against IEC 61724-1 reference curve...
                      </span>
                    ) : (
                      "Click \"Run Diagnostics\" above to execute sample telemetry evaluation."
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-xs text-zinc-500 font-mono">
                    Product: SolarOps (Private Beta / Early Access)
                  </span>
                  <Link
                    href="/products/solarops"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold"
                  >
                    <span>View Full SolarOps Product Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* KRYNEX LAWOS DEMONSTRATION */
              /* ======================================================== */
              <div className="space-y-8">
                {/* Console Top Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      LEGAL &amp; STATUTORY DOCUMENT AUTOMATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                      Krynex LawOS Bilingual Deed Compilation
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Sample Deed: Absolute Sale Deed (વેચાણ દસ્તાવેજ) — Sub-Registrar Ahmedabad-04 (Sanand)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="px-4 py-2 rounded-xl bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          <span>Compiling Deed...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Generate Bilingual Deed</span>
                        </>
                      )}
                    </button>
                    {simulationComplete && (
                      <button
                        type="button"
                        onClick={resetSimulation}
                        className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Reset simulation"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Side-by-Side Clause Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-300 uppercase flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span>GUJARATI VERNACULAR CLAUSE (વેચાણ દસ્તાવેજ)</span>
                      <span className="text-[10px] text-zinc-500">SECTION 12 // STATUTORY</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      &ldquo;આથી વેચનાર આ વેચાણ દસ્તાવેજથી પોતાની સંપૂર્ણ માલિકી અને કબજા ભોગવટાની સ્થાવર મિલકત તમામ પ્રકારના બોજાથી મુક્ત (બોજા મુક્ત) ગણી ખરીદનારને સંપૂર્ણ માલિકી હક્કથી કાયમી વેચાણ કરી આપે છે.&rdquo;
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Statutory indemnity clause validated</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-300 uppercase flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span>ENGLISH PARALLEL COVENANT (FREE OF ENCUMBRANCE)</span>
                      <span className="text-[10px] text-zinc-500">PARALLEL TOKEN MIRROR</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      &ldquo;The Vendor hereby conveys, transfers and assigns absolutely unto the Purchaser all their right, title, and interest in the Scheduled Immovable Property, free from all encumbrances, charges, liens and claims of any nature whatsoever.&rdquo;
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Zero semantic drift across languages</span>
                    </div>
                  </div>
                </div>

                {/* Validation Checklist */}
                <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] font-mono text-xs text-zinc-400 space-y-2">
                  <div className="text-zinc-500 pb-2 border-b border-white/[0.06] flex items-center justify-between">
                    <span>STATUTORY VERIFICATION AUDIT [SIMULATED]</span>
                    <span className="text-zinc-300">REGISTRATION ACT 1908</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Stamp Duty: 4.9% (Calculated)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Index-II: 30-Year Chain Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>PAN &amp; TDS: Section 194-IA Compliant</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-xs text-zinc-500 font-mono">
                    Product: Krynex LawOS (Live Beta / Enterprise Pilot)
                  </span>
                  <Link
                    href="/products/krynex-lawos"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold"
                  >
                    <span>View Full Krynex LawOS Product Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
