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
  Download,
  AlertCircle,
  Clock,
  HelpCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DemoModal from "./DemoModal";
import SectionDivider from "./SectionDivider";

interface ProductDetailViewProps {
  product: ProductDetail;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  // For Lexis interactive preview
  const [selectedDeed, setSelectedDeed] = useState("sale-deed");
  const [selectedLang, setSelectedLang] = useState<"bilingual" | "gujarati" | "english">("bilingual");

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#a1a1aa", "#71717a"],
      });
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />

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
              <span>&larr; Return to SaaS Products Directory</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 uppercase tracking-widest">
              {product.division}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-zinc-400">
              {product.status}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400">
              {product.version}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            {product.name}
          </h1>

          <p className="text-base sm:text-lg font-mono text-zinc-300 mb-6">
            {product.fullTagline}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-4xl">
            {product.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="bg-white text-black font-medium hover:bg-zinc-200 px-6 py-2.5 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#demo"
              className="bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 px-5 py-2.5 rounded-full transition-all text-xs font-mono flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Interactive Simulator</span>
            </a>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4 ml-2"
            >
              Schedule Live Walkthrough
            </button>
          </div>
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
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              INTERACTIVE DEMONSTRATION
            </span>
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
                      <option value="title-report">30-Year Title Search Report (ટાઈટલ પ્રમાણપત્ર)</option>
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
                      value="₹2,45,000 (4.9% Gujarat Stamp Act 2026)"
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
                        Compiling 18 statutory property covenants across Gujarat Revenue Code &amp; Registration Act...
                      </span>
                    </div>
                  ) : simulationComplete ? (
                    <div className="space-y-2 text-zinc-300 animate-fade-in">
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                        <span className="text-white font-bold">
                          [DOCKET COMPILED] // 18-PAGE BINDING LEGAL DOCKET READY
                        </span>
                        <span>COMPILED IN 1.18s</span>
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
                      <div className="text-[10px] text-zinc-400 pt-2 flex items-center gap-3">
                        <span>&bull; Statutory AST: VERIFIED</span>
                        <span>&bull; Stamp Duty: 100% ACCURATE</span>
                        <span>&bull; Sub-Registrar Index-II: MATCHED</span>
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
                    Engine: <span className="text-white">Lexis-Statutory-AST-v3.8</span>
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
                    {simulationComplete && (
                      <button
                        onClick={() => setIsDemoModalOpen(true)}
                        className="bg-white/[0.04] text-white border border-white/10 hover:border-white/25 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Download Sample (.docx)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Workflow / Vision Generic Telemetry Preview */}
            {product.demoPreview.type !== "legal-drafting" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="font-semibold uppercase tracking-wider">
                      {product.name} LIVE RUNTIME KERNEL
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">STATUS: NOMINAL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.demoPreview.sampleData).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3.5 rounded-xl bg-black border border-white/[0.06]"
                    >
                      <div className="text-[10px] text-zinc-400 uppercase">{key}</div>
                      <div className="text-white font-medium mt-1">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">
                    * Interactive sandbox simulating production event pipeline.
                  </span>
                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="bg-white text-black font-medium hover:bg-zinc-200 px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    Request Full System Trial
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

      {/* Subscription & Pricing Tiers */}
      <section id="pricing" className="py-24 bg-[#030303] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              TRANSPARENT LICENSING
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Simple, Predictable Subscription Tiers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              No hidden fees, no per-seat extortion. Select the operational scale that fits your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.pricingTiers.map((tier, tIdx) => (
              <div
                key={tIdx}
                className={`p-8 rounded-3xl relative flex flex-col justify-between transition-all ${
                  tier.highlighted
                    ? "bg-[#0b0b0b] border-2 border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.08)] scale-100 md:scale-105 z-10"
                    : "bg-[#080808] border border-white/[0.08] hover:border-white/[0.22]"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mb-6 min-h-[36px]">{tier.description}</p>

                  <div className="mb-6 pb-6 border-b border-white/[0.06]">
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
                      {tier.price}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-1">{tier.period}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Included in license:
                    </div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className={`w-full py-3 rounded-xl font-medium text-xs tracking-wide transition-all ${
                    tier.highlighted
                      ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/10"
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Footnote & Guarantee */}
          <div className="mt-12 text-center text-xs font-mono text-zinc-400">
            All subscriptions include 99.9% uptime SLA, automated security updates, and encrypted Indian data residency.
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

      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Consultation Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </main>
  );
}
