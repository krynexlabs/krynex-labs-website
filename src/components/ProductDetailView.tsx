"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductDetail } from "@/data/products-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Workflow,
  Eye,
  Shield,
  Layers,
  Terminal,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Clock,
  HelpCircle,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionDivider from "./SectionDivider";

interface ProductDetailViewProps {
  product: ProductDetail;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // For Lexis interactive preview
  const [selectedDeed, setSelectedDeed] = useState("sale-deed");
  const [selectedLang, setSelectedLang] = useState<"bilingual" | "gujarati" | "english">("bilingual");

  // For Flow interactive workflow canvas
  const [flowNodeStep, setFlowNodeStep] = useState<number>(0);
  const [isFlowRunning, setIsFlowRunning] = useState<boolean>(false);

  // For Vision industrial inspection HUD
  const [isVisionScanning, setIsVisionScanning] = useState<boolean>(false);
  const [visionInspected, setVisionInspected] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(async () => {
      setIsSimulating(false);
      setSimulationComplete(true);
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 },
          colors: ["#ffffff", "#a1a1aa", "#71717a"],
        });
      } catch {
        // Non-blocking visual effect
      }
    }, 1200);
  };

  const runFlowPipeline = () => {
    setIsFlowRunning(true);
    setFlowNodeStep(1);
    setTimeout(() => setFlowNodeStep(2), 600);
    setTimeout(() => setFlowNodeStep(3), 1200);
    setTimeout(() => {
      setFlowNodeStep(4);
      setIsFlowRunning(false);
    }, 1800);
  };

  const triggerVisionScan = () => {
    setIsVisionScanning(true);
    setVisionInspected(false);
    setTimeout(() => {
      setIsVisionScanning(false);
      setVisionInspected(true);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Top Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Back Link */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>&larr; Return to Product Directory</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-zinc-400">
              {product.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            {product.name}
          </h1>

          <p className="text-base sm:text-lg font-mono text-zinc-300 mb-6">
            {product.fullTagline}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-4xl">
            {product.summary}
          </p>
        </div>
      </section>

      {/* Problem & Solution Comparison */}
      <section className="py-20 bg-[#050505] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/[0.08] relative">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 mb-4">
                <AlertCircle className="w-3 h-3 text-zinc-400" />
                <span>The Industry Problem</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">
                {product.theProblem.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {product.theProblem.description}
              </p>
              <ul className="space-y-3">
                {product.theProblem.painPoints.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/15 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-300 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 mb-4">
                <Sparkles className="w-3 h-3 text-white" />
                <span>The Krynex Solution</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">
                {product.theSolution.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {product.theSolution.description}
              </p>
              <ul className="space-y-3">
                {product.theSolution.keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator / Live Preview */}
      <section id="demo" className="py-24 bg-black border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.08] border border-white/20 text-xs font-mono text-zinc-300 font-semibold mb-3">
              Illustrative demo, not live data.
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {product.demoPreview.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              {product.demoPreview.subtitle} — Interactive simulation modeled on production execution kernels.
            </p>
          </div>

          <div className="rounded-3xl bg-[#080808] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Lexis Legal Drafting Simulator */}
            {product.demoPreview.type === "legal-drafting" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-mono text-zinc-300 font-semibold uppercase">
                      BILINGUAL STATUTORY CLAUSE COMPILER
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-400">Language Mode:</span>
                    <div className="inline-flex rounded-lg bg-black p-0.5 border border-white/10">
                      {(["bilingual", "gujarati", "english"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLang(lang)}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded capitalize transition-all ${
                            selectedLang === lang
                              ? "bg-white text-black font-semibold"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Deed Template
                    </label>
                    <select
                      value={selectedDeed}
                      onChange={(e) => setSelectedDeed(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="sale-deed">Deed of Absolute Sale (વેચાણ દસ્તાવેજ)</option>
                      <option value="title-report">Title Search Report (ટાઈટલ પ્રમાણપત્ર)</option>
                      <option value="poa">General Power of Attorney (જનરલ મુખત્યારનામું)</option>
                      <option value="lease">Commercial Lease Deed (ભાડા કરાર)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Sub-Registrar Jurisdiction
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Ahmedabad-04 (Sanand) / Gujarat"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-zinc-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Statutory Stamp Calculation
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Calculated Statutory Duty & Registration Fees (Gujarat Stamp Act 2026)"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-zinc-300 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Simulated Output Docket Terminal */}
                <div className="p-4 rounded-2xl bg-black border border-white/[0.08] font-mono text-xs leading-relaxed mb-6 min-h-[160px] flex flex-col justify-between">
                  {isSimulating ? (
                    <div className="py-8 flex flex-col items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span className="text-zinc-400 text-xs">
                        Compiling statutory property covenants across Gujarat Revenue Code &amp; Registration Act...
                      </span>
                    </div>
                  ) : simulationComplete ? (
                    <div className="space-y-2 text-zinc-300 animate-fade-in">
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                        <span className="text-white font-bold">
                          [DOCKET COMPILED] // VERIFIED DRAFT DOCKET READY
                        </span>
                        <span>COMPILED AT RUNTIME</span>
                      </div>
                      <div className="text-zinc-400 text-[11px] pt-1">
                        {selectedLang === "gujarati" ? (
                          <>
                            <strong>વેચાણ કરાર પરિશિષ્ટ:</strong> આથી લખી આપનાર પક્ષકાર #1 જણાવે છે કે સાણંદ સબ-ડિસ્ટ્રિક્ટ સ્થિત બ્લોક/સર્વે નં. 412/A વાળી જમીન તમામ બોજાઓ, લોન તથા સરકારી લેણાંથી મુક્ત છે...
                          </>
                        ) : selectedLang === "english" ? (
                          <>
                            <strong>SCHEDULE OF PROPERTY:</strong> The Vendor covenants that the Non-Agricultural commercial parcel situated at Block/Survey #412/A, Sanand Sub-District is clear, marketable, and unencumbered...
                          </>
                        ) : (
                          <>
                            <strong>PARALLEL BILINGUAL COVENANTS:</strong>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5 pt-1.5 border-t border-white/[0.04]">
                              <div className="text-zinc-300">
                                <em>[ગુજરાતી]:</em> વેચાણ આપેલ જમીન પર કોઈ પણ પ્રકારનો ગીરો બોજો, દીવાની દાવો કે કોર્ટનો મનાઈ હુકમ નથી...
                              </div>
                              <div className="text-zinc-300">
                                <em>[English]:</em> The Vendor warrants that no pending civil litigation, lis pendens, or judicial injunction exists on the property...
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 pt-2 flex flex-wrap items-center gap-3">
                        <span>&bull; Statutory AST: VERIFIED</span>
                        <span>&bull; Stamp Duty Target: CALCULATED</span>
                        <span>&bull; Sub-Registrar Index-II: MATCHED</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 pt-1.5 border-t border-white/[0.04] leading-relaxed">
                        * Notice: Lexis provides automated drafting assistance for legal practitioners. Generated covenants require review and execution by qualified legal counsel.
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-500 py-6 text-center">
                      Click &ldquo;Execute Deterministic Compile&rdquo; to simulate sub-second bilingual deed generation.
                    </div>
                  )}
                </div>

                {/* Simulator Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-zinc-400">
                    Engine: <span className="text-white">Lexis-Statutory-AST</span>
                  </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2 rounded-xl transition-all text-xs tracking-wide flex items-center gap-2 disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isSimulating ? "Compiling..." : "Execute Deterministic Compile"}</span>
                      </button>
                    </div>
                </div>
              </div>
            )}

            {/* Flow State-Machine Workflow Canvas Preview */}
            {product.demoPreview.type === "workflow-engine" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-mono text-zinc-300 font-semibold uppercase">
                      AUTONOMOUS STATE-MACHINE WORKFLOW CANVAS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-400">ENGINE:</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white">
                      EVENT RUNTIME
                    </span>
                  </div>
                </div>

                {/* 4 Interactive Node Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                  {/* Node 1 */}
                  <div className={`p-4 rounded-2xl border transition-all ${flowNodeStep >= 1 ? "bg-white/[0.08] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black border-white/10"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-400">NODE 01</span>
                      <span className={`w-2 h-2 rounded-full ${flowNodeStep >= 1 ? "bg-white" : "bg-zinc-700"}`} />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">SAP / Tally Ingestion</div>
                    <div className="text-[11px] font-mono text-zinc-400">Port 8443 Webhook Ingest</div>
                  </div>

                  {/* Node 2 */}
                  <div className={`p-4 rounded-2xl border transition-all ${flowNodeStep >= 2 ? "bg-white/[0.08] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black border-white/10"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-400">NODE 02</span>
                      <span className={`w-2 h-2 rounded-full ${flowNodeStep >= 2 ? "bg-white" : "bg-zinc-700"}`} />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">Neural Invoice Parser</div>
                    <div className="text-[11px] font-mono text-zinc-400">OCR &amp; Tax HSN Verify</div>
                  </div>

                  {/* Node 3 */}
                  <div className={`p-4 rounded-2xl border transition-all ${flowNodeStep >= 3 ? "bg-white/[0.08] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black border-white/10"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-400">NODE 03</span>
                      <span className={`w-2 h-2 rounded-full ${flowNodeStep >= 3 ? "bg-white" : "bg-zinc-700"}`} />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">Policy Approval Gate</div>
                    <div className="text-[11px] font-mono text-zinc-400">Policy Limit Auto-Approve</div>
                  </div>

                  {/* Node 4 */}
                  <div className={`p-4 rounded-2xl border transition-all ${flowNodeStep >= 4 ? "bg-white/[0.08] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black border-white/10"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-400">NODE 04</span>
                      <span className={`w-2 h-2 rounded-full ${flowNodeStep >= 4 ? "bg-white" : "bg-zinc-700"}`} />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">Multi-System Ledger Sync</div>
                    <div className="text-[11px] font-mono text-zinc-400">SQL + CRM + Port TOS</div>
                  </div>
                </div>

                {/* Execution Telemetry Console */}
                <div className="p-4 rounded-2xl bg-black border border-white/[0.08] font-mono text-xs leading-relaxed">
                  <div className="text-zinc-500 mb-2 flex items-center justify-between text-[11px]">
                    <span>LIVE PIPELINE TELEMETRY</span>
                    <span>STATUS: {flowNodeStep > 0 ? "Pipeline Transition Complete" : "IDLE"}</span>
                  </div>
                  {flowNodeStep === 0 && (
                    <div className="text-zinc-400">
                      &gt;&gt; Ready. Click &ldquo;Trigger Pipeline Simulation&rdquo; to execute event-driven state transition.
                    </div>
                  )}
                  {flowNodeStep >= 1 && (
                    <div className="text-zinc-300">
                      &gt;&gt; Ingested multipart invoice payload from SAP ERP instance.<br />
                      &gt;&gt; Extracted line items, validated GSTIN &amp; HSN statutory codes.<br />
                      &gt;&gt; Policy rule PASS: Invoiced amount matches Purchase Order itemization.<br />
                      &gt;&gt; State machine COMPLETE: Ledger updated across Oracle &amp; Salesforce.
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    * Interactive state-machine canvas connecting fragmented enterprise software.
                  </span>
                  <button
                    onClick={runFlowPipeline}
                    disabled={isFlowRunning}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isFlowRunning ? "Executing Pipeline..." : "Trigger Pipeline Simulation"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Vision Edge Industrial Inspection HUD */}
            {product.demoPreview.type === "edge-vision" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span className="text-xs text-zinc-300 font-semibold uppercase">
                      ON-PREMISE EDGE CAMERA INSPECTION HUD
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-400">INFERENCE:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white font-bold">
                      TensorRT INT8 Runtime
                    </span>
                  </div>
                </div>

                {/* Simulated Industrial Camera Viewport */}
                <div className="relative rounded-2xl bg-black border border-white/10 p-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {/* Corner Reticles */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40" />

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>CAM-01 // CONTINUOUS CONVEYOR LINE</span>
                    <span className="text-zinc-300">HIGH-SPEED LINE INSPECTION</span>
                  </div>

                  {/* Defect Bounding Box */}
                  <div className="relative z-10 my-4 mx-auto max-w-md w-full p-4 rounded-xl border border-white/40 bg-white/[0.04] backdrop-blur-sm shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded border border-white/20">
                        {isVisionScanning ? "ANALYZING TENSOR KERNEL..." : "DEFECT DETECTED // #DF-409"}
                      </span>
                      <span className="text-[10px] text-white font-bold">SIM CONF: HIGH</span>
                    </div>
                    <div className="text-xs text-zinc-200 mt-2 font-sans font-medium">
                      Micro-surface fracture on flange seal.
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                      PLC Actuation: Pneumatic Reject Valve Triggered via Modbus TCP.
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/[0.04]">
                    <span>STATUS: REJECT DIVERTED TO SCRAP CHUTE</span>
                    <span className="text-white font-bold">SIMULATED CLEAN YIELD</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] text-zinc-400">
                    * On-Premise Edge Execution: Designed for zero cloud dependency and low network latency.
                  </span>
                  <button
                    onClick={triggerVisionScan}
                    disabled={isVisionScanning}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2 disabled:opacity-50"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isVisionScanning ? "Scanning Line..." : "Trigger Conveyor Line Scan"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Features Grid */}
      <section className="py-20 bg-[#050505] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              DEEP CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Production Feature Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white tracking-tight">{feat.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400">
                    {feat.specs}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Zero-Trust Security */}
      <section className="py-20 bg-black border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 mb-4">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>ZERO-TRUST SECURITY BASELINE</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {product.architecture.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              {product.architecture.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.architecture.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Commercial Subscriptions & Pricing Section */}
      <section id="pricing" className="py-24 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/[0.06] pb-6 gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                TRANSPARENT COMMERCIAL ACCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                {product.name} Subscription Tiers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
                Rented software access with predictable recurring billing. Zero upfront consultant retainers or multi-year vendor lock-in.
              </p>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-zinc-400">Currency:</span>
              <div className="inline-flex p-1 rounded-xl bg-[#080808] border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currency === "INR"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-label="View pricing in Indian Rupees (INR)"
                >
                  INR (₹)
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currency === "USD"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-label="View pricing in US Dollars (USD)"
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.pricingTiers.map((tier, idx) => {
              const displayPrice = currency === "INR" ? tier.price : (tier.usdPrice || tier.price);

              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all relative overflow-hidden ${
                    tier.highlighted
                      ? "bg-[#0c0c0e] border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                      : "bg-[#080808] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {tier.name}
                      </span>
                      {tier.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 text-white font-semibold">
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {displayPrice}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mt-1">{tier.period}</div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 pb-6 border-b border-white/[0.06]">
                      {tier.description}
                    </p>

                    <ul className="space-y-2.5 mb-8">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?product=${product.slug}&tier=${encodeURIComponent(tier.name)}`}
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      tier.highlighted
                        ? "bg-white text-black hover:bg-zinc-200 shadow-md"
                        : "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span>Request Sandbox Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-xs font-mono text-zinc-500">
            * Guided Sandbox &amp; Cloud Onboarding &bull; Flat Predictable Recurring Access &bull; High Availability Architecture
          </div>
        </div>
      </section>

      {/* Documentation & Support Links */}
      <section className="py-16 bg-black border-t border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#080808] border border-white/[0.08]">
            <div>
              <div className="text-sm font-bold text-white">Need Technical Documentation or Runbooks?</div>
              <div className="text-xs text-zinc-400 mt-1">
                Access developer guides, API schemas, and deployment checklists.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {product.documentationLinks.map((doc, dIdx) => (
                <Link
                  key={dIdx}
                  href={doc.href}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  {doc.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
