"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Methodology() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking spotlight
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

  const steps = [
    {
      step: "01",
      badge: "DISCOVERY",
      title: "Industrial Pain-Point Audit",
      description:
        "Comprehensive operational diagnostics across enterprise workflows and database silos to uncover high-friction choke points. We map unoptimized legacy handoffs and establish strict quantifiable ROI benchmarks.",
      points: [
        "End-to-end workflow time-and-motion studies",
        "Legacy database & API ingestion bottleneck mapping",
        "Enterprise security & data sovereignty requirements definition",
        "Clear quantifiable ROI & throughput benchmark modeling",
      ],
      terminalSnippet: `// 01 // DISCOVERY PHASE
>> Target: Enterprise Workflow Audit & Telemetry Ingestion
>> Scanning ERP, Database Silos, and Field Operational Logs...
>> Identified Critical Inefficiencies: High manual touchpoints & fragmented reporting
>> Baseline Cycle Time: 48-72 hours per workflow transaction
>> Target Optimization: <60 seconds automated execution`,
    },
    {
      step: "02",
      badge: "AI & ML R&D LAB",
      title: "Custom Neural Architecture",
      description:
        "Designing proprietary machine learning models, custom neural pipelines, and autonomous decision trees tailored to exact industry taxonomy. Every architecture incorporates deterministic mathematical bounds to eliminate hallucination.",
      points: [
        "Domain-specific tokenization & fine-tuned transformer weights",
        "Deterministic guardrails with zero-hallucination semantic RAG",
        "Multi-agent validation: execution, verification, and audit agents",
        "Optimized 4-bit/8-bit quantization for sub-10ms inference latencies",
      ],
      terminalSnippet: `// 02 // NEURAL ENGINEERING PHASE
>> Architecting KRYNEX Neural Core v4.2 (Domain Adapted)
>> Model Taxonomy: Multi-Agent Arbitration & Localized Embeddings
>> Guardrails Active: 100% Deterministic Schema Validation
>> Inference Benchmark: 99.6% F1 Accuracy on Enterprise Test Vectors
>> Latency Profile: 8.4ms (p99 GPU TensorRT Core)`,
    },
    {
      step: "03",
      badge: "MNC INFRASTRUCTURE",
      title: "Enterprise-Grade IT Scale",
      description:
        "Building resilient, cloud-native full-stack software systems with MNC-level security, scalability, and 99.99% reliability. We deploy high-concurrency microservices, zero-trust cloud meshes, and intuitive executive dashboards.",
      points: [
        "Distributed Kubernetes & edge runtime deployment",
        "Bank-grade AES-256 end-to-end encryption & ISO standards",
        "Bidirectional enterprise connectors for SAP, Salesforce, Oracle & Custom ERPs",
        "24/7 dedicated engineering SLA support & automated model health telemetry",
      ],
      terminalSnippet: `// 03 // ENTERPRISE DEPLOYMENT PHASE
>> Target Mesh: Distributed Multi-Region High-Availability Cluster
>> Security Architecture: Zero-Trust Network Access (mTLS + AES-256)
>> SLA Status: 99.99% Uptime Verified
>> System Load: 125,000+ Real-Time Concurrent Transactions / Second
>> Status: PRODUCTION_READY_GLOBAL_MESH`,
    },
  ];

  return (
    <section
      id="methodology"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08]"
    >
      {/* Background Subtle Silver Top Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4 shadow-sm">
            <span>01 // THE KRYNEX ENGINEERING MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Turning Industry Pain Points Into Intelligent Infrastructure.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Pure enterprise R&amp;D, custom AI/ML architectures, and mission-critical IT deployment.
          </p>
        </div>

        {/* 3 High-Impact Cards with Bespoke Animated Visual Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, index) => {
            const isSelected = activeStep === index;
            return (
              <button
                type="button"
                key={item.step}
                onClick={() => setActiveStep(index)}
                aria-pressed={isSelected}
                aria-controls="methodology-terminal-panel"
                className={`spotlight-card group relative rounded-2xl bg-[#080808] p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isSelected
                    ? "border-white/30 shadow-[0_0_35px_rgba(255,255,255,0.08)] bg-[#0a0a0a]"
                    : "border-white/[0.08] hover:border-white/[0.22] hover:bg-[#0a0a0c]"
                }`}
              >
                {/* 1px Silver Specular Highlight on Top Edge */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                <div>
                  {/* Top Step & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-bold tracking-tight text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  {/* Upgrade 3: Sleek h-40 Bespoke Animated Monochrome Visual Canvas */}
                  <div className="h-40 w-full bg-[#040404] border border-white/[0.06] rounded-xl mb-6 overflow-hidden flex items-center justify-center relative shadow-inner">
                    {/* Visual 01: Sweeping Radar & Target Lock */}
                    {index === 0 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 280 160" fill="none">
                          {/* Concentric Range Rings */}
                          <circle cx="140" cy="80" r="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="140" cy="80" r="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                          <circle cx="140" cy="80" r="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                          {/* Crosshair Axes */}
                          <line x1="140" y1="15" x2="140" y2="145" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                          <line x1="75" y1="80" x2="205" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                          {/* Rotating Radar Sweep Beam */}
                          <g className="origin-[140px_80px] animate-spin-slow">
                            <line x1="140" y1="80" x2="200" y2="80" stroke="#ffffff" strokeWidth="1.5" />
                            <polygon points="140,80 195,65 198,80" fill="rgba(255,255,255,0.15)" />
                          </g>
                          {/* Target Lock Nodes */}
                          <circle cx="165" cy="55" r="3" fill="#ffffff" />
                          <circle cx="165" cy="55" r="7" stroke="#ffffff" strokeWidth="1" className="animate-ping" />
                          <circle cx="115" cy="98" r="3" fill="#d4d4d8" />
                          <circle cx="115" cy="98" r="6" stroke="#a1a1aa" strokeWidth="0.8" />
                        </svg>
                        <div className="absolute bottom-2 left-3 text-[9px] font-mono text-zinc-500">
                          DIAGNOSTIC_SCAN // 24 NODES
                        </div>
                      </div>
                    )}

                    {/* Visual 02: 3-Layer Neural Mesh with Synaptic Pulses */}
                    {index === 1 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 280 160" fill="none">
                          {/* Synaptic Connections */}
                          <line x1="60" y1="40" x2="140" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                          <line x1="60" y1="40" x2="140" y2="65" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                          <line x1="60" y1="80" x2="140" y2="65" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                          <line x1="60" y1="80" x2="140" y2="95" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                          <line x1="60" y1="120" x2="140" y2="95" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                          <line x1="60" y1="120" x2="140" y2="125" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                          <line x1="140" y1="35" x2="220" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                          <line x1="140" y1="65" x2="220" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                          <line x1="140" y1="95" x2="220" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                          <line x1="140" y1="125" x2="220" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                          {/* Input Nodes */}
                          <circle cx="60" cy="40" r="5" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                          <circle cx="60" cy="80" r="5" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" />
                          <circle cx="60" cy="120" r="5" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />

                          {/* Hidden Nodes */}
                          <circle cx="140" cy="35" r="5" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                          <circle cx="140" cy="65" r="6" fill="#ffffff" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                          <circle cx="140" cy="95" r="6" fill="#ffffff" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                          <circle cx="140" cy="125" r="5" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />

                          {/* Output Nodes */}
                          <circle cx="220" cy="60" r="6" fill="#ffffff" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="220" cy="100" r="6" fill="#27272a" stroke="#d4d4d8" strokeWidth="1.5" />
                        </svg>
                        <div className="absolute bottom-2 left-3 text-[9px] font-mono text-zinc-500">
                          SYNAPSE_MESH // 64k VOCAB
                        </div>
                      </div>
                    )}

                    {/* Visual 03: Isometric Cloud Shield Matrix & Heartbeat */}
                    {index === 2 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 280 160" fill="none">
                          {/* Central Hexagonal Shield */}
                          <polygon points="140,40 175,60 175,100 140,120 105,100 105,60" fill="rgba(255,255,255,0.04)" stroke="#ffffff" strokeWidth="1.4" />
                          <polygon points="140,48 167,64 167,96 140,112 113,96 113,64" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 2" />

                          {/* Core Lock Symbol */}
                          <rect x="133" y="74" width="14" height="12" rx="2" fill="#ffffff" />
                          <path d="M136 74 V70 A4 4 0 0 1 144 70 V74" stroke="#ffffff" strokeWidth="1.8" />

                          {/* Distributed Region Nodes */}
                          <circle cx="50" cy="80" r="4" fill="#a1a1aa" />
                          <line x1="56" y1="80" x2="105" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                          <text x="35" y="68" fill="#71717a" fontSize="8" fontFamily="monospace">US-EAST</text>

                          <circle cx="230" cy="80" r="4" fill="#ffffff" />
                          <circle cx="230" cy="80" r="8" stroke="#ffffff" strokeWidth="0.8" className="animate-ping" />
                          <line x1="175" y1="80" x2="224" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                          <text x="210" y="68" fill="#ffffff" fontSize="8" fontFamily="monospace">AHMEDABAD</text>
                        </svg>
                        <div className="absolute bottom-2 left-3 text-[9px] font-mono text-zinc-500">
                          SLA_UPTIME // 99.99% MESH
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Crisp Title */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Clean 2-Sentence Description (Zero Duplicate Text) */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Checklist Points */}
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300 leading-tight">{pt}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Engine Inspector in Monochrome Terminal */}
        <div
          id="methodology-terminal-panel"
          aria-live="polite"
          className="mt-10 rounded-2xl bg-[#080808] border border-white/[0.08] p-6 lg:p-8 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                krynex-engineering-matrix // phase_{steps[activeStep].step}.log
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-500">ENGINEERING VECTOR:</span>
              <span className="text-[11px] font-mono text-white font-semibold uppercase">
                {steps[activeStep].title}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
            <div className="lg:col-span-8">
              <pre className="p-4 rounded-xl bg-[#030303] border border-white/10 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{steps[activeStep].terminalSnippet}</code>
              </pre>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-4">
              <div className="p-4 rounded-xl bg-black border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  System Reliability
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  99.99% Availability SLA
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Engineered for mission-critical industrial &amp; financial throughput.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  Security Standard
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  Zero-Trust Architecture
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  End-to-end cryptographic boundaries &amp; ISO-aligned engineering.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
