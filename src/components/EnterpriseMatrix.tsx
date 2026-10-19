"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Factory,
  Scale,
  Truck,
  Landmark,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

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
      title: "Advanced Manufacturing & Industrial IoT",
      sectorType: "Heavy Industry & Continuous Plants",
      icon: Factory,
      workflow: "High-speed line assembly, part inspection, and SCADA PLC logging.",
      painPoint:
        "Human visual inspection suffers a 3% to 6% defect escape rate on fast-moving lines (500+ parts/min), while cloud-based AI fails due to 200ms+ network latency and factory internet dropouts.",
      whyExistingFails:
        "Legacy machine vision requires expensive custom programming and cannot correlate detected defects with upstream PLC vibration and temperature sensors.",
      solution:
        "Krynex Vision: Sub-15ms edge TensorRT computer vision operating entirely on-premise without cloud latency, coupled with real-time SCADA telemetry and pneumatic reject actuators.",
      beneficiaries: "Plant managers, quality control engineers, and precision component manufacturers.",
      statusBadge: "Commercial Product (Krynex Vision)",
      metrics: ["Sub-15ms Edge Inference", "0.02% Target Defect Escape", "100% Offline Autonomy"],
      productLink: "/products/krynex-vision",
    },
    {
      id: "legal",
      title: "Legal, Real Estate & Statutory Compliance",
      sectorType: "Statutory Practice & Conveyancing",
      icon: Scale,
      workflow: "Real estate conveyancing, 30-year sub-registrar index searches, and bilingual notice drafting.",
      painPoint:
        "Corporate legal counsel and advocates spend 4 to 8 hours per deed copying boilerplate clauses, risking omitted statutory covenants and clumsy bilingual Gujarati-English translation errors.",
      whyExistingFails:
        "Static Word templates and generic public AI tools hallucinate non-existent citations and risk serious confidentiality breaches under statutory privilege rules.",
      solution:
        "Krynex Lexis: India's premier bilingual legal drafting and title clearance platform, compiling structured draft deeds in under 1.2 seconds with deterministic statutory guardrails.",
      beneficiaries: "Corporate legal counsel, title advocates, real estate developers, and statutory compliance panels.",
      statusBadge: "Commercial Product (Krynex Lexis)",
      metrics: ["Sub-Second Compilation", "30-Year Index-II Triage", "Zero Public Model Training"],
      productLink: "/products/krynex-lexis",
    },
    {
      id: "logistics",
      title: "Logistics & Multimodal Supply Chain",
      sectorType: "Terminal Gates & Freight Fleets",
      icon: Truck,
      workflow: "Container gate clearance, multilingual manifest extraction, and customs EDI filing.",
      painPoint:
        "Container gate dwell times average 24 to 36 hours due to manual shipping manifest key-value extraction, leading to substantial demurrage penalties and truck queue congestion.",
      whyExistingFails:
        "Traditional OCR tools choke on low-resolution multilingual scans and lack direct bi-directional integration with port operating systems (TOS).",
      solution:
        "Krynex Flow: High-throughput event middleware and neural document extraction pipeline that parses shipping manifests and synchronizes ERP ledgers in under 4 minutes.",
      beneficiaries: "Container terminal operators, customs house agents (CHA), freight forwarders, and logistics fleets.",
      statusBadge: "Commercial Product (Krynex Flow)",
      metrics: ["<3 Min Gate Clearance Target", "10x Ingestion Acceleration", "Automated 3-Way ERP Match"],
      productLink: "/products/krynex-flow",
    },
    {
      id: "fintech",
      title: "FinTech & Banking Infrastructure",
      sectorType: "Risk Scoring & Lending Audits",
      icon: Landmark,
      workflow: "Real-time payment transaction scoring, synthetic identity detection, and loan collateral verification.",
      painPoint:
        "Batch transaction scoring fails to catch multi-account circular fraud rings in real time, and manual collateral land registry searches stall commercial loan disbursements for 5 to 7 days.",
      whyExistingFails:
        "Traditional rules engines cannot scale to graph topologies under high-concurrency loads and lack automated sub-registrar verification hooks.",
      solution:
        "Streaming Graph Neural Network (GNN) risk-scoring middleware coupled with automated collateral verification pipelines engineered for zero-trust compliance.",
      beneficiaries: "Commercial banks, MSME lenders, NBFCs, and financial risk compliance teams.",
      statusBadge: "Architectural Research & Prototyping",
      metrics: ["<5ms Scoring Target", "<90s Collateral Verification", "Zero-Trust KMS Encryption"],
      productLink: "/industries#fintech",
    },
    {
      id: "healthcare",
      title: "Healthcare & Clinical Diagnostics",
      sectorType: "Emergency Imaging & Hospital Networks",
      icon: Activity,
      workflow: "Emergency diagnostic scan ingestion, radiologist triage, and hospital EHR synchronization.",
      painPoint:
        "Acute radiologist shortages cause critical scan review turnarounds to exceed 4 to 8 hours, while strict healthcare data laws prohibit uploading patient DICOM scans to public cloud APIs.",
      whyExistingFails:
        "Cloud-based consumer AI violates patient privacy and data sovereignty laws, while legacy hospital software lacks modern neural prioritization.",
      solution:
        "Air-gapped on-premise convolutional neural network triage nodes that prioritize urgent emergency scans on local hospital servers without external cloud transmission.",
      beneficiaries: "Hospital emergency departments, diagnostic imaging networks, and clinical radiologist teams.",
      statusBadge: "Clinical Research & Regulatory Exploration",
      metrics: ["<3 Min Triage Window Target", "100% Offline Hospital LAN", "Zero External Exposure"],
      productLink: "/industries#healthcare",
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
            <span>05 // INDUSTRIES &amp; PROBLEMS UNDER INVESTIGATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Industries and Operational Problems We Investigate.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We research the deep operational friction within high-stakes business workflows—from vernacular legal bottlenecks and manual factory inspection to supply chain manifest triage—to evaluate and engineer focused software products.
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

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate">
                        {sec.title}
                      </h4>
                      <ArrowUpRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "text-white translate-x-0.5 -translate-y-0.5" : "text-zinc-600"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 block truncate">{sec.sectorType}</span>
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
                  RESEARCH DOSSIER // {sectors[activeSector].id.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10">
                  {sectors[activeSector].statusBadge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                {sectors[activeSector].title}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                Target Workflow: {sectors[activeSector].workflow}
              </p>

              {/* The Pain Point */}
              <div className="mb-5 p-4 rounded-2xl bg-black border border-white/[0.08]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                  <span>The Operational Pain Point</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                  {sectors[activeSector].painPoint}
                </p>
                <div className="pt-2 border-t border-white/[0.04] text-xs text-zinc-400">
                  <strong className="text-zinc-300">Why Existing Tools Fall Short: </strong>
                  {sectors[activeSector].whyExistingFails}
                </div>
              </div>

              {/* The Krynex Software Solution */}
              <div className="mb-6 p-4 rounded-2xl bg-black border border-white/20">
                <div className="text-[11px] font-mono text-white uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-white" />
                  <span>The Software Product Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-3">
                  {sectors[activeSector].solution}
                </p>
                <div className="text-xs text-zinc-400">
                  <strong className="text-zinc-300">Beneficiaries: </strong>
                  {sectors[activeSector].beneficiaries}
                </div>
              </div>

              {/* Modeled Metrics */}
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

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-zinc-500">
                Category: {sectors[activeSector].statusBadge}
              </span>
              <Link
                href={sectors[activeSector].productLink}
                className="text-white hover:text-zinc-300 transition-colors font-medium flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
