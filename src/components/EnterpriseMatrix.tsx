"use client";

import React, { useState, useRef } from "react";
import { Factory, Droplets, Anchor, Gem, Building2, ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";

export default function EnterpriseMatrix() {
  const [activeSector, setActiveSector] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const sectors = [
    {
      id: "manufacturing",
      title: "Advanced Manufacturing & Robotics",
      sectorType: "Heavy Industry & Automotive",
      icon: Factory,
      painPoint:
        "Severe bottlenecks in multi-tier supply chain visibility, manual quality inspections on high-speed lines, and unscheduled equipment breakdowns causing capital losses.",
      solution:
        "KRYNEX deploys edge vision inference clusters and real-time SCADA anomaly detection directly onto plant floors, linking telemetry with enterprise ERP systems.",
      metrics: ["-42% Maintenance Downtime", "Sub-15ms Edge Vision QC", "Automated 3-Way ERP Reconciliation"],
    },
    {
      id: "fintech",
      title: "Banking, FinTech & Capital Markets",
      sectorType: "Financial Services & Risk",
      icon: Building2,
      painPoint:
        "High-latency fraud scoring engines, fragmented cross-border compliance audits, and legacy core banking transaction reconciliation bottlenecks.",
      solution:
        "Streaming Graph Neural Networks (GNN) and zero-trust transaction ledgers delivering sub-5ms risk scoring and continuous statutory audit certification.",
      metrics: ["99.8% Fraud Interception", "<5ms Streaming Inference", "ISO 27001 Cryptographic Vault"],
    },
    {
      id: "ports",
      title: "Maritime Ports & Global Logistics",
      sectorType: "Supply Chain & Multi-Modal",
      icon: Anchor,
      painPoint:
        "Multilingual bills of lading and container customs documentation creating 24-48 hour gate delays, demurrage penalties, and manual clerical bottlenecks.",
      solution:
        "Bespoke multimodal document extraction and fleet dispatch optimization engines that process shipping documents in seconds and clear terminal gates in under 3 minutes.",
      metrics: ["<3 Min Gate Clearance", "Multilingual Document Parsing", "Direct ICEGATE / TOS Bridge"],
    },
    {
      id: "energy-process",
      title: "Chemical, Energy & Process Engineering",
      sectorType: "Continuous Process & Refineries",
      icon: Droplets,
      painPoint:
        "Complex statutory environmental compliance audits, volatile continuous process reactions, and fragmented hazardous material tracking across distributed facilities.",
      solution:
        "Self-calibrating chemical process optimization models that ingest live sensor streams, predict thermal/pressure anomalies, and automate environmental compliance reporting.",
      metrics: ["Zero Environmental Non-Compliance", "+18% Yield Efficiency", "Real-Time Sensor Telemetry"],
    },
    {
      id: "enterprise-automation",
      title: "Corporate Workflow & Cognitive IT",
      sectorType: "Global Enterprise Operations",
      icon: Cpu,
      painPoint:
        "Human capital drained by repetitive cross-system data entry across legacy enterprise software, creating operational latency and clerical error rates.",
      solution:
        "Autonomous multi-agent enterprise systems that orchestrate cross-departmental tasks with deterministic validation and complete cryptographic audit trails.",
      metrics: ["15x Workflow Velocity", "Zero Clerical Error", "Comprehensive Audit Logging"],
    },
  ];

  return (
    <section
      id="industries"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08]"
    >
      {/* Background Subtle Silver Top Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
            <span>[ TARGET INDUSTRY VERTICALS ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Engineering Custom Solutions for Complex Industrial Sectors.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Every enterprise has unique operational friction. Krynex Labs architects custom AI/ML
            and full-stack software tailored to the exact statutory and technical realities of each domain.
          </p>
        </div>

        {/* Interactive Industry Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {sectors.map((sec, idx) => {
              const Icon = sec.icon;
              const isSelected = activeSector === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "bg-[#0a0a0a] border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                      : "bg-[#080808] border-white/[0.08] hover:border-white/[0.22] hover:bg-[#0c0c0e]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected ? "bg-white text-black border-white" : "bg-black text-white border-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {sec.title}
                      </h4>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? "text-white translate-x-0.5 -translate-y-0.5" : "text-zinc-600"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 block">{sec.sectorType}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Deep-Dive Showcase with Spotlight */}
          <div className="lg:col-span-7 spotlight-card rounded-3xl bg-[#080808] border border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
                  SECTOR CAPABILITY DOSSIER // {sectors[activeSector].id.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {sectors[activeSector].sectorType}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
                {sectors[activeSector].title}
              </h3>

              {/* The Pain Point */}
              <div className="mb-6 p-4 rounded-2xl bg-black border border-white/[0.08]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                  Identified Operational Bottleneck
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {sectors[activeSector].painPoint}
                </p>
              </div>

              {/* The Krynex AI Architecture Solution */}
              <div className="mb-6 p-4 rounded-2xl bg-black border border-white/20">
                <div className="text-[11px] font-mono text-white uppercase tracking-wider mb-1 font-semibold">
                  KRYNEX Custom AI/IT Architecture
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {sectors[activeSector].solution}
                </p>
              </div>

              {/* Deliverable Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sectors[activeSector].metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3.5 rounded-xl bg-[#050505] border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{m}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>DEPLOYMENT: ENTERPRISE PRIVATE CLOUD OR HYBRID ON-PREM</span>
              <a href="#contact" className="text-white hover:text-zinc-300 transition-colors font-medium">
                REQUEST TECHNICAL AUDIT &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
