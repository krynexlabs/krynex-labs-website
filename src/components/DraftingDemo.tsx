"use client";

import React, { useState, useRef } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function DraftingDemo() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for Resend-style radial spotlight (batched & throttled to eliminate forced reflow)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    const card = (e.target as HTMLElement)?.closest(".spotlight-card") as HTMLElement | null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    requestAnimationFrame(() => {
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const sectors = [
    {
      id: "manufacturing",
      name: "Manufacturing",
      painPoint:
        "Severe unplanned machinery downtime, uncalibrated visual quality defects on high-speed lines, and prolonged procurement invoice matching delays costing significant operational waste.",
      painMetrics: [
        "Unplanned machinery stoppages across high-speed lines",
        "Manual QC visual inspection error susceptibility",
        "Multi-day vendor invoice reconciliation delays",
      ],
      architecture:
        "Edge-deployed Computer Vision inference nodes coupled with an automated Industrial IoT anomaly pipeline and real-time 3-way ERP reconciliation agent.",
      archDetails: [
        "Edge TensorRT vision models for high-speed line inspection",
        "SCADA vibration & temperature predictive telemetry",
        "Automated SAP/Oracle bidirectional ledger connector",
      ],
      impact: [
        { label: "Target Cost Reduction", value: "Significant", detail: "Scrap & maintenance downtime reduction objective" },
        { label: "Target Processing Speed", value: "Accelerated", detail: "Real-time edge inspection & ERP sync objective" },
        { label: "Target Defect Rate", value: "Minimized", detail: "Objective compared to manual visual inspection baselines" },
      ],
      terminalLogs: [
        ">> init krynex_audit --sector='Manufacturing' --facility='Simulated Facility: Heavy Works (Sandbox Demo)'",
        ">> Ingesting SCADA sensor streams and High-Speed Vision cameras...",
        ">> Operational Bottleneck: Bearing vibration anomaly detected on line",
        ">> Deploying KRYNEX edge predictive container to local gateway...",
        ">> Runtime: Edge TensorRT inference | Zero-Trust isolated LAN",
        ">> Automated Work-Order generated in ERP (Simulated Ticket)",
        ">> SIMULATED ARCHITECTURE TARGET: Scrap & Downtime Reduction | Accelerated Pipeline",
      ],
    },
    {
      id: "fintech",
      name: "FinTech",
      painPoint:
        "Latency in fraud scoring, manual collateral title verification across fragmented government registries, and batch settlement bottlenecks causing capital lockup.",
      painMetrics: [
        "Transaction fraud scoring delays during peak loads",
        "Multi-day loan collateral and title verification turnaround",
        "Clearing and reconciliation discrepancy exposure",
      ],
      architecture:
        "Streaming Graph Neural Network (GNN) for real-time transaction fraud scoring combined with automated document verification and distributed ledger audit pipelines.",
      archDetails: [
        "Streaming Kafka + Flink real-time feature store",
        "Graph Convolutional Network inference at transaction speed",
        "Hardware-enforced cryptographic key vault",
      ],
      impact: [
        { label: "Fraud Interception Target", value: "High", detail: "Simulated multi-account correlation objective" },
        { label: "Verification Target", value: "Rapid", detail: "Modeled turnaround compared to multi-day manual review" },
        { label: "Capacity Target", value: "Scalable", detail: "Concurrent transaction design envelope" },
      ],
      terminalLogs: [
        ">> init krynex_audit --sector='FinTech' --node='Simulated Core Banking Engine (Demo Sandbox)'",
        ">> Monitoring streaming ledger: high-volume concurrent transactions modeled under load...",
        ">> Anomaly Triggered: Multi-hop circular disbursement pattern flagged",
        ">> Executing GNN Graph Reasoning Model on GPU cluster...",
        ">> Decision: Transaction Suspended & Risk Payload routed to Compliance Vault",
        ">> Latency: Optimized runtime | Architecture Standard: Aligned with ISO 27001 Control Guidelines",
        ">> SIMULATED ARCHITECTURE TARGET: Comprehensive Fraud Interception Target | Real-Time Scoring",
      ],
    },
    {
      id: "logistics",
      name: "Logistics",
      painPoint:
        "Multilingual shipping manifests, customs paperwork errors creating prolonged port container gate bottlenecks, and unoptimized multi-modal route demurrage penalties.",
      painMetrics: [
        "Container gate dwell time and port congestion delays",
        "Manual multilingual customs manifest parsing overhead",
        "Demurrage exposure from documentation clearing bottlenecks",
      ],
      architecture:
        "Multimodal Computer Vision + multilingual document intelligence engine integrated with real-time port terminal gate telematics and predictive fleet dispatch optimization.",
      archDetails: [
        "Multilingual OCR & structural key-value extraction",
        "Direct ICEGATE & port container operating system bridge",
        "Dynamic route recalculation based on live maritime congestion",
      ],
      impact: [
        { label: "Turnaround Target", value: "Rapid", detail: "Gate clearance modeled from multi-day manual queues" },
        { label: "Manifest Accuracy Target", value: "High", detail: "Target zero customs clearance penalty objective" },
        { label: "Fleet Utilization Target", value: "Optimized", detail: "Simulated turnaround efficiency gain" },
      ],
      terminalLogs: [
        ">> init krynex_audit --sector='Logistics' --hub='Simulated Maritime Terminal (Demo Sandbox)'",
        ">> Ingesting Multilingual Bill of Lading & Inland Container Manifests...",
        ">> Discrepancy Found: HSN Code mismatch in legacy vendor scan",
        ">> Running Neural Document Parser with Automated Cross-Reference Engine...",
        ">> Auto-Corrected against National Tariff Database & verified with digital token",
        ">> Gate Clearance Token dispatched to Driver Mobile App at line speed",
        ">> SIMULATED ARCHITECTURE TARGET: Reduced Dwell Time Target | Fleet Turnaround Efficiency Gain",
      ],
    },
    {
      id: "enterprise-it",
      name: "Enterprise IT",
      painPoint:
        "Knowledge workers trapped in repetitive cross-departmental data entry between CRM, ERP, and email systems, leading to high operational friction and clerical error rates.",
      painMetrics: [
        "Heavy weekly administrative hours lost to manual re-entry",
        "Prolonged inter-departmental approval cycles",
        "Clerical discrepancy and reconciliation error risks",
      ],
      architecture:
        "Self-orchestrating autonomous enterprise AI agents that understand unstructured business requests, execute cross-system tasks, and compile verified audit trails.",
      archDetails: [
        "Multi-Agent LangGraph orchestration with deterministic safety bounds",
        "Bidirectional REST & Webhook connectors across all enterprise suites",
        "Comprehensive human-in-the-loop exception escalations",
      ],
      impact: [
        { label: "Target Workflow Velocity", value: "Accelerated", detail: "Approvals modeled from days to rapid completion" },
        { label: "Syntax Schema Errors", value: "Zero", detail: "Enforced via deterministic schema grammar" },
        { label: "Productivity Target", value: "Reclaimed", detail: "Administrative capacity reclaimed" },
      ],
      terminalLogs: [
        ">> init krynex_audit --sector='Enterprise IT' --domain='Simulated Corporate Operations (Demo)'",
        ">> Ingesting cross-departmental email, PDF purchase requests & ERP records...",
        ">> Parsing unstructured supplier quote into structured procurement schema...",
        ">> Verifying departmental budget allocations & statutory compliance...",
        ">> Autonomous PO Creation, Tax Verification, and Multi-Level Approval executed",
        ">> Audit Trail Sealed: Cryptographic immutable signature generated",
        ">> SIMULATED ARCHITECTURE TARGET: Accelerated Workflow Velocity Target | Verified Conformance",
      ],
    },
  ];

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <section
      id="console"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08]"
    >
      {/* Background Subtle Silver Top Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
            <span>[ R&amp;D DIAGNOSTIC CONSOLE ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Enterprise R&amp;D Diagnostic Console.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Real-time industry bottleneck simulation &amp; IT telemetry. Select an industry domain below
            to inspect Krynex Labs&apos; architectural resolution and performance objectives.
          </p>
        </div>

        {/* Illustrative Simulation Notice */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono text-zinc-400 mb-8 flex items-start gap-3 max-w-4xl">
          <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">ILLUSTRATIVE ARCHITECTURAL SIMULATION:</strong> The facility names, telemetry waveforms, work orders, and metrics displayed in this interactive console represent simulated demonstration data modeling theoretical performance envelopes for custom enterprise neural and microservice architectures. Illustrative demo, not live data.
          </span>
        </div>

        {/* 4 Clickable Industry Domain Tabs */}
        <div
          role="tablist"
          aria-label="Diagnostic Sectors"
          className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#080808] border border-white/10 mb-8 max-w-2xl"
        >
          {sectors.map((sec, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={sec.id}
                id={`demo-tab-${idx}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`demo-panel-${idx}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    const next = (idx + 1) % sectors.length;
                    setActiveTab(next);
                    document.getElementById(`demo-tab-${next}`)?.focus();
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const prev = (idx - 1 + sectors.length) % sectors.length;
                    setActiveTab(prev);
                    document.getElementById(`demo-tab-${prev}`)?.focus();
                  }
                }}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {sec.name}
              </button>
            );
          })}
        </div>

        {/* Main Diagnostic Terminal Container with Spotlight */}
        <div className="spotlight-card rounded-3xl bg-[#080808] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Top Status Bar with Monochrome Window Controls & Visible Demo Warning */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-300 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                krynex-architectural-simulator — demonstration sandbox
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/20 text-xs font-mono text-zinc-300 font-semibold">
                Illustrative demo, not live data.
              </span>
              <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Executing Diagnostics...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run Diagnostic Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* All 4 Sector Panels Rendered for SSR/SEO; Active Sector Visible */}
          {sectors.map((sec, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={sec.id}
                id={`demo-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`demo-tab-${idx}`}
                tabIndex={isSelected ? 0 : -1}
                aria-hidden={!isSelected}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${isSelected ? "block" : "hidden"}`}
              >
                {/* Left Column: 3 Structured Analysis Panels */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Panel 1: Identified Industry Pain */}
                  <div className="p-5 rounded-2xl bg-black border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
                        01 // IDENTIFIED INDUSTRY BOTTLENECK
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">OPERATIONAL AUDIT</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      {sec.painPoint}
                    </p>
                    <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs text-zinc-400 font-mono">
                      {sec.painMetrics.map((pm, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          <span>{pm}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel 2: Krynex AI/IT Architecture */}
                  <div className="p-5 rounded-2xl bg-black border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">
                        02 // KRYNEX ENGINEERED ARCHITECTURE
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">PROPRIETARY R&amp;D</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      {sec.architecture}
                    </p>
                    <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs text-zinc-400 font-mono">
                      {sec.archDetails.map((ad, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>{ad}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel 3: Measured Enterprise Impact */}
                  <div className="p-5 rounded-2xl bg-black border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">
                        03 // DESIGN TARGETS
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">ENGINEERING OBJECTIVES</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {sec.impact.map((imp, iIdx) => (
                        <div key={iIdx} className="p-3.5 rounded-xl bg-[#050505] border border-white/10">
                          <div className="text-2xl font-bold font-mono text-white mb-0.5">
                            {imp.value}
                          </div>
                          <div className="text-xs font-semibold text-zinc-300 mb-1 font-mono">{imp.label}</div>
                          <div className="text-[11px] text-zinc-400 leading-tight">{imp.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Monochrome Terminal Window */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#030303] border border-white/10 p-5 font-mono shadow-inner overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-zinc-400" />
                        <span>runtime-telemetry.log</span>
                      </div>
                      <span className="text-[10px] text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        SIMULATION
                      </span>
                    </div>

                    {/* Terminal Logs in White / Zinc */}
                    <div className="space-y-3 text-xs leading-relaxed max-h-[380px] overflow-y-auto pr-1">
                      {sec.terminalLogs.map((log, lIdx) => (
                        <div
                          key={lIdx}
                          className={`transition-all duration-300 ${
                            lIdx === sec.terminalLogs.length - 1
                              ? "p-2.5 rounded-lg bg-white/[0.05] border border-white/20 text-white font-semibold"
                              : log.startsWith(">>")
                              ? "text-zinc-200"
                              : "text-zinc-400"
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Terminal Telemetry Footer */}
                  <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
                    <span className="text-[10px] font-mono text-zinc-400">TELEMETRY: NOMINAL // RUNTIME: OPTIMIZED</span>
                    <span className="text-white text-[11px] font-semibold">ALL NODES SYNCHRONIZED</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
