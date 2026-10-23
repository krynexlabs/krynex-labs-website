"use client";

import React, { useState, useRef } from "react";
import {
  Cpu,
  Layers,
  Shield,
  Zap,
  Server,
  Database,
  Globe2,
  Lock,
  ArrowRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string>("core");

  // Mouse tracking for Resend-style radial spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>(".spotlight-card");
    if (!cards) return;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  // 14 bars for the microservices latency histogram in Card 2
  const latencyBars = [25, 40, 30, 65, 45, 80, 50, 35, 90, 60, 45, 75, 55, 30];

  return (
    <section
      id="capabilities"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Subtle Silver Top Radial */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
            <span>06 // PRODUCT-BUILDING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            We Use the Right Technologies to Solve the Problem.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We do not structure our technology as an agency service catalogue or sell billable hours. We master the full technological spectrum—from applied neural networks to distributed backends, web, mobile, and edge computing—to build resilient software products businesses can depend on.
          </p>
        </div>

        {/* Asymmetric 4-Card Resend-Style Monochrome Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ======================================================== */}
          {/* CARD 1: Large Span (8 cols) - Monochrome Neural Node Graph */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 spotlight-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-200 text-xs font-mono font-semibold tracking-wide">
                  <span>●</span>
                  APPLIED AI &amp; ML PIPELINES
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  NEURAL MESH // ARCHITECTURE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Applied Artificial Intelligence &amp; Custom ML Pipelines
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                Architecting practical neural models, high-speed computer vision, domain-adapted document intelligence,
                and automated enterprise decision systems with verified logic and strict validation guardrails.
              </p>

              {/* Monochrome Node Graph with Animated Bezier Data Beams */}
              <div className="rounded-2xl bg-[#030303] border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08] text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>krynex-neural-topology // continuous-stream</span>
                  </div>
                  <span className="text-zinc-400 text-[11px]">WEIGHTS: REGIONAL VOCABULARY // VERIFIED</span>
                </div>

                {/* Relative Node Container with Embedded SVG Curved Data Beams */}
                <div className="relative py-6 px-2 min-h-[240px] flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Background SVG Animated Curved Bezier Data Beams */}
                  <svg className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                      </linearGradient>
                    </defs>

                    {/* Beam 1: Ingestion 1 -> Core */}
                    <path
                      d="M 170 50 C 260 50, 270 120, 360 120"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 170 50 C 260 50, 270 120, 360 120"
                      fill="none"
                      stroke="url(#beamGrad)"
                      strokeWidth="2"
                      strokeDasharray="8 14"
                      className="animate-shimmer"
                    />

                    {/* Beam 2: Ingestion 2 -> Core */}
                    <path
                      d="M 170 190 C 260 190, 270 120, 360 120"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 170 190 C 260 190, 270 120, 360 120"
                      fill="none"
                      stroke="url(#beamGrad)"
                      strokeWidth="2"
                      strokeDasharray="8 14"
                      className="animate-shimmer"
                    />

                    {/* Beam 3: Core -> Output 1 */}
                    <path
                      d="M 490 120 C 580 120, 590 50, 680 50"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 490 120 C 580 120, 590 50, 680 50"
                      fill="none"
                      stroke="url(#beamGrad)"
                      strokeWidth="2"
                      strokeDasharray="8 14"
                      className="animate-shimmer"
                    />

                    {/* Beam 4: Core -> Output 2 */}
                    <path
                      d="M 490 120 C 580 120, 590 190, 680 190"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 490 120 C 580 120, 590 190, 680 190"
                      fill="none"
                      stroke="url(#beamGrad)"
                      strokeWidth="2"
                      strokeDasharray="8 14"
                      className="animate-shimmer"
                    />
                  </svg>

                  {/* Left Ingestion Nodes */}
                  <div className="flex flex-col gap-5 w-full sm:w-auto relative z-10">
                    <button
                      onClick={() => setSelectedNode("data")}
                      className={`px-4 py-3 rounded-xl border text-left font-mono text-xs transition-all ${
                        selectedNode === "data"
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold"
                          : "bg-[#080808] border-white/10 text-zinc-300 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <div className="text-[10px] text-zinc-500 uppercase">Input Node 01</div>
                      <div>Raw Industry Data</div>
                    </button>

                    <button
                      onClick={() => setSelectedNode("erp")}
                      className={`px-4 py-3 rounded-xl border text-left font-mono text-xs transition-all ${
                        selectedNode === "erp"
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold"
                          : "bg-[#080808] border-white/10 text-zinc-300 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <div className="text-[10px] text-zinc-500 uppercase">Input Node 02</div>
                      <div>Legacy ERP Logs</div>
                    </button>
                  </div>

                  {/* Center Highlighted Neural Core with Pulsing Outer Ring */}
                  <div className="relative my-2 sm:my-0 z-10">
                    {/* Outer Pulsing Beacon Halo */}
                    <div className="absolute -inset-3 rounded-2xl border border-white/30 animate-pulse pointer-events-none" />
                    <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-md pointer-events-none" />

                    <button
                      onClick={() => setSelectedNode("core")}
                      className={`relative px-6 py-5 rounded-2xl border text-center font-mono transition-all z-10 ${
                        selectedNode === "core"
                          ? "bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                          : "bg-[#0a0a0a] border-white/40 text-white hover:border-white/80"
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-current mx-auto mb-1.5 animate-ping" />
                      <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                        ARBITRATION ENGINE
                      </div>
                      <div className="text-sm font-bold tracking-wide">
                        KRYNEX NEURAL CORE
                      </div>
                      <div className="text-[9px] opacity-70 mt-1">
                        Quantized Edge Model
                      </div>
                    </button>
                  </div>

                  {/* Right Output Nodes */}
                  <div className="flex flex-col gap-5 w-full sm:w-auto relative z-10">
                    <button
                      onClick={() => setSelectedNode("predictive")}
                      className={`px-4 py-3 rounded-xl border text-left font-mono text-xs transition-all ${
                        selectedNode === "predictive"
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold"
                          : "bg-[#080808] border-white/10 text-zinc-300 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <div className="text-[10px] text-zinc-500 uppercase">Output Node 01</div>
                      <div>Predictive Analytics</div>
                    </button>

                    <button
                      onClick={() => setSelectedNode("workflow")}
                      className={`px-4 py-3 rounded-xl border text-left font-mono text-xs transition-all ${
                        selectedNode === "workflow"
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold"
                          : "bg-[#080808] border-white/10 text-zinc-300 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <div className="text-[10px] text-zinc-500 uppercase">Output Node 02</div>
                      <div>Autonomous Workflow</div>
                    </button>
                  </div>
                </div>

                {/* Node Status Banner */}
                <div className="mt-4 p-3 rounded-xl bg-black border border-white/5 text-xs font-mono text-zinc-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    <span>
                      {selectedNode === "core" && "KRYNEX NEURAL CORE: Multi-Agent arbitration with deterministic mathematical constraints."}
                      {selectedNode === "data" && "RAW INDUSTRY DATA: Real-time telemetry, SCADA sensors, and high-frequency edge logs."}
                      {selectedNode === "erp" && "LEGACY ERP LOGS: Ingesting SAP, Oracle, and enterprise transactional records."}
                      {selectedNode === "predictive" && "PREDICTIVE ANALYTICS: Anomaly forecasting, maintenance prevention, and cash-flow intelligence."}
                      {selectedNode === "workflow" && "AUTONOMOUS WORKFLOW: Automated multi-system execution minimizing manual touchpoint delays."}
                    </span>
                  </div>
                  <span className="text-[11px] text-white shrink-0 font-semibold">STREAMING</span>
                </div>
              </div>
            </div>

            {/* Bottom Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/[0.08]">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">High</div>
                <div className="text-xs text-zinc-500">Model F1 Objective</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">Low Latency</div>
                <div className="text-xs text-zinc-500">GPU Latency Target</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">Zero Trust</div>
                <div className="text-xs text-zinc-500">Enterprise Isolation</div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: Full-Stack Enterprise IT Systems (4 cols) with Live Latency Histogram */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-300 tracking-wider uppercase font-semibold">
                  CLOUD INFRASTRUCTURE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                  GLOBAL SCALE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Enterprise Cloud &amp; Full-Stack IT
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                High-throughput cloud architectures, microservices, and modern web/mobile ecosystems
                built for global scale with zero downtime.
              </p>

              {/* Upgrade 4: Live Animated Monochrome Latency Histogram */}
              <div className="p-3.5 rounded-xl bg-black border border-white/[0.08] mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                  <span>MICROSERVICE LATENCY MESH</span>
                  <span className="text-white font-semibold">LOW LATENCY MESH</span>
                </div>
                {/* 14 Bar Histogram */}
                <div className="flex items-end justify-between gap-1 h-12 pt-1">
                  {latencyBars.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-gradient-to-t from-white/20 via-zinc-400 to-white rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mt-2">
                  <span>MIN</span>
                  <span>HIGH-THROUGHPUT INGRESS</span>
                  <span>MAX</span>
                </div>
              </div>

              {/* Architecture Bullet Highlights */}
              <div className="space-y-2.5 mb-6">
                <div className="p-2.5 rounded-xl bg-black border border-white/[0.06] flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-[11px] text-zinc-300">Go, Rust &amp; Kafka distributed event pipelines</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black border border-white/[0.06] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-[11px] text-zinc-300">Multi-region Kubernetes auto-healing mesh</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">HIGH SERVICE AVAILABILITY</span>
              <span className="text-zinc-300 font-medium">Enterprise Baseline</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 3: Cross-Industry Transformation (6 cols) with Live Sparkline */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-300 tracking-wider uppercase font-semibold">
                  CROSS-INDUSTRY TRANSFORMATION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                  REAL-TIME ETL
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Data Intelligence &amp; Industrial Automation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Transforming fragmented industrial data into high-fidelity real-time executive
                intelligence and automated operational execution.
              </p>

              {/* Upgrade 4: Real-time Live Sensor Stream Ticker & Sparkline */}
              <div className="p-3.5 rounded-xl bg-black border border-white/[0.08] mb-5 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>SCADA TELEMETRY STREAM</span>
                  </div>
                  <span className="text-white font-semibold">REAL-TIME SCADA TELEMETRY</span>
                </div>
                {/* SVG Real-time Sparkline */}
                <div className="h-10 w-full overflow-hidden flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40" fill="none">
                    <path
                      d="M0 25 L30 20 L60 30 L90 12 L120 28 L150 18 L180 8 L210 22 L240 14 L270 20 L300 10"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                    />
                    <circle cx="300" cy="10" r="3" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              {/* Data Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-black border border-white/[0.06]">
                  <div className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Automated Data Cleaning</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Real-time schema mapping across heterogeneous databases.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black border border-white/[0.06]">
                  <div className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Autonomous Execution</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Triggering ERP work-orders without human latency.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">STREAMING INGESTION</span>
              <span className="text-zinc-300 font-medium">Sub-Second Refresh Target</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 4: Hardened Enterprise Security & Performance (6 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-300 tracking-wider uppercase font-semibold">
                  ENTERPRISE-GRADE RELIABILITY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                  ZERO-TRUST
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Enterprise Security &amp; Performance
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Engineered under zero-trust paradigms. Strict isolation boundaries,
                air-gapped deployment options, and compliance alignment with global data governance mandates.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-black border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">API Latency Target</div>
                  <div className="text-xl font-bold font-mono text-white my-0.5">Low Latency</div>
                  <div className="text-[10px] text-zinc-500">Edge Gateway p99 Objective</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Transport &amp; Storage</div>
                  <div className="text-xl font-bold font-mono text-white my-0.5">TLS / AES</div>
                  <div className="text-[10px] text-zinc-500">In-Transit &amp; At-Rest</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black border border-white/[0.06] col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Framework Alignment</div>
                  <div className="text-xl font-bold font-mono text-white my-0.5">ISO 27001</div>
                  <div className="text-[10px] text-zinc-500">Control Guidelines Target</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <Shield className="w-5 h-5 text-zinc-400 shrink-0" />
                <div className="text-xs text-zinc-400">
                  <span className="font-semibold text-white">Zero-Trust Architecture:</span> Complete customer data segregation, continuous mutual TLS authentication, and sovereign on-premise hardware support.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">SECURITY PROTOCOL: ACTIVE</span>
              <span className="text-zinc-300 font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ENTERPRISE MESH SECURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
