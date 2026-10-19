"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, ArrowRight, Compass, Search, Check, Layers, Cpu, Rocket, TrendingUp } from "lucide-react";

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
      badge: "OBSERVATION",
      title: "Discover the Industry",
      subtitle: "First-Principles Operational Immersion",
      description:
        "We immerse ourselves in actual industrial and corporate environments—shadowing advocates in registrar offices, observing factory assembly lines, and tracing multi-system logistics handoffs to uncover hidden friction.",
      points: [
        "First-principles operational workflow mapping",
        "Direct observation of daily human handoffs and delays",
        "Uncovering structural inefficiencies ignored by legacy vendors",
        "Documenting actual workarounds used by field practitioners",
      ],
      terminalSnippet: `// 01 // DISCOVER THE INDUSTRY
>> Target: Industrial Environment Immersion (Ahmedabad & Regional Hubs)
>> Observing: Daily operational workflows, clerical touchpoints, manual handoffs
>> Finding: Highly repetitive routines executed via static tools and paper logs
>> Operational Friction Index: High (multiple daily bottlenecks identified)
>> Status: FIELD_OBSERVATIONS_LOGGED`,
    },
    {
      step: "02",
      badge: "QUANTIFICATION",
      title: "Identify the Pain Point",
      subtitle: "Isolating Concrete Economic & Time Waste",
      frictionDetail:
        "We pinpoint the exact mechanical or human bottleneck costing time or money. We ask: which tasks consume hours? Where do errors trigger legal disputes or scrap penalties? Which steps create friction?",
      description:
        "We isolate specific tasks that consume excessive time, generate avoidable errors, or depend on bloated legacy systems, quantifying the exact economic burden.",
      points: [
        "Time-and-motion studies across target tasks",
        "Quantifying error rates, dispute risks, and scrap costs",
        "Documenting regulatory compliance and latency boundaries",
        "Establishing quantifiable ROI benchmarks for software relief",
      ],
      terminalSnippet: `// 02 // IDENTIFY THE PAIN POINT
>> Target: Bottleneck Isolation & Friction Audit
>> Identified Choke Point: Manual deed drafting & Index-II search
>> Baseline Error Risk: Omitted statutory covenants & transcription drift
>> Measurable Impact: Advocate backlogs exceeding multiple working days
>> Status: BOTTLENECK_DEFINED_AND_QUANTIFIED`,
    },
    {
      step: "03",
      badge: "FEASIBILITY",
      title: "Validate the Opportunity",
      subtitle: "Distinguishing Real Demand from Hypotheses",
      description:
        "We never build software based on unvalidated speculation. We interview prospective business users to verify that the problem is widespread, painful, and worth paying recurring subscriptions to solve.",
      points: [
        "Interviews with corporate practitioners and operational leaders",
        "Verification of recurring willingness-to-subscribe",
        "Regulatory and technological feasibility confirmation",
        "Clear go/no-go product decision gate",
      ],
      terminalSnippet: `// 03 // VALIDATE THE OPPORTUNITY
>> Target: Commercial Demand & Feasibility Gate
>> Sampling: Corporate legal teams, developers, and title practitioners
>> Validation Result: Strong practitioner demand for deterministic drafting
>> Regulatory Check: Full alignment with Registration Act 1908 & Stamp Acts
>> Decision: PROCEED_TO_PRODUCT_ARCHITECTURE`,
    },
    {
      step: "04",
      badge: "ERGONOMICS",
      title: "Design the Solution",
      subtitle: "Architecting the Simplest Effective Workflow",
      description:
        "We design focused software experiences tailored directly to how professionals actually work. No bloated menus, no useless novelties—just clean, high-velocity workflows designed for maximum speed.",
      points: [
        "Frictionless user experience modeled around daily operator routines",
        "Deterministic input verification and contextual autocomplete",
        "Zero-latency interface design with rapid response targets",
        "Bilingual typography and regional vocabulary support",
      ],
      terminalSnippet: `// 04 // DESIGN THE SOLUTION
>> Target: Ergonomic Workflow Canvas & State Architecture
>> Interface Specification: Dark-mode high-density telemetry canvas
>> Vocabulary Engine: Gujarati revenue terms mapped to English covenants
>> Human Interaction Model: Streamlined form-to-compilation workflow
>> Status: ARCHITECTURAL_BLUEPRINT_SEALED`,
    },
    {
      step: "05",
      badge: "ENGINEERING",
      title: "Build the Software",
      subtitle: "Industrial-Grade Full-Stack Construction",
      description:
        "We build resilient, scalable software applications using modern production technologies: Next.js, Go, Rust, Python, and TensorRT. Every model is protected by mathematical guardrails, and every database is protected by zero-trust encryption.",
      points: [
        "Next.js SSR web platforms optimized for rapid First Contentful Paint",
        "High-performance Go and Rust event-processing backends",
        "Deterministic grammar decoders and mathematical guardrails",
        "Isolated tenant architecture with per-tenant KMS envelope encryption",
      ],
      terminalSnippet: `// 05 // BUILD THE SOFTWARE
>> Compiling: KRYNEX Production Engine Core
>> Runtime Stack: Next.js + Go Event Mesh + TensorRT Quantized Engine
>> AST Verification Layer: ACTIVE (Constrained grammar & deterministic schema verification)
>> Security Boundary: Per-tenant KMS encryption & isolated tenant namespaces
>> Status: PRODUCTION_BUILD_COMPILED_AND_VERIFIED`,
    },
    {
      step: "06",
      badge: "DEPLOYMENT",
      title: "Test and Launch",
      subtitle: "Reliable Market Onboarding",
      description:
        "We subject the product to extreme stress testing, statutory compliance audits, and security pen-testing. We then launch the product commercially with reliable subscription access.",
      points: [
        "Automated end-to-end regression testing and benchmark evaluation",
        "Zero-downtime containerized cloud and edge deployment",
        "Predictable monthly and annual recurring software access",
        "Instant cloud onboarding with self-service or guided setup",
      ],
      terminalSnippet: `// 06 // TEST AND LAUNCH
>> Executing: Automated Statutory Vector & Regression Suites...
>> Stress Load: High-concurrency simulation validation
>> Commercial Status: STAGED_DEPLOYMENT
>> Subscription Gateways: LIVE (Automated invoicing & seat management)
>> Status: PRODUCT_LAUNCHED_TO_MARKET`,
    },
    {
      step: "07",
      badge: "EVOLUTION",
      title: "Improve Continuously",
      subtitle: "Compounding Product Velocity",
      description:
        "Software is never static. Through recurring subscription revenue, we continuously fund weekly performance updates, statutory guideline changes, model optimizations, and customer-requested enhancements.",
      points: [
        "Weekly feature releases and performance calibrations",
        "Automated statutory guideline and tax rate updates",
        "Direct telemetry monitoring of product health and latency",
        "Dedicated customer support and continuous feedback loops",
      ],
      terminalSnippet: `// 07 // IMPROVE CONTINUOUSLY
>> Pipeline: Continuous Weekly Evolution Cycle
>> Telemetry Active: Rapid deed compilation & high service availability
>> Customer Feedback: Ingested directly into product engineering backlog
>> Revenue Engine: Recurring subscriptions directly funding R&D
>> Status: COMPOUNDING_SOFTWARE_VALUE_ACTIVE`,
    },
  ];

  return (
    <section
      id="approach"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-[#202630] bg-[#07090D]"
    >
      {/* Background Subtle Cyan Atmospheric Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(circle,rgba(0,229,255,0.04),transparent_65%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1118] border border-[#202630] text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase mb-4 shadow-sm">
            <span>03 // HOW WE BUILD // UNIFIED PRODUCT LIFECYCLE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-[#F5F7FA]">
            Find the Problem. <span className="text-gradient-cyan">Build the Solution.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#929BAA] leading-relaxed">
            Every software system at Krynex Labs follows our disciplined 7-stage engineering lifecycle. We identify real-world business challenges, validate market demand, engineer focused software solutions, and continuously improve them for the businesses that depend on them.
          </p>
        </div>

        {/* 7 Interactive Stage Selectors */}
        <div
          role="tablist"
          aria-label="Product Lifecycle Stages"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-[#0D1118] border border-[#202630] mb-8 max-w-6xl mx-auto"
        >
          {steps.map((st, sIdx) => {
            const isSelected = activeStep === sIdx;
            return (
              <button
                key={st.step}
                id={`stage-tab-${sIdx}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`stage-panel-${sIdx}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveStep(sIdx)}
                className={`py-2 px-2.5 rounded-xl text-center transition-all flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                  isSelected
                    ? "bg-[#00E5FF] text-[#07090D] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                    : "text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#111722]"
                }`}
              >
                <span className={`text-[10px] font-mono uppercase ${isSelected ? "text-[#07090D]/80 font-bold" : "text-[#929BAA]/70"}`}>
                  Step {st.step}
                </span>
                <span className="text-xs truncate max-w-full font-medium">
                  {st.title.replace("the ", "")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Spotlight Card (All 7 panels rendered in SSR; active panel visible) */}
        <div className="spotlight-card rounded-3xl bg-[#0D1118] border border-[#202630] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent pointer-events-none" />

          {steps.map((st, sIdx) => {
            const isSelected = activeStep === sIdx;
            return (
              <div
                key={st.step}
                id={`stage-panel-${sIdx}`}
                role="tabpanel"
                aria-labelledby={`stage-tab-${sIdx}`}
                aria-hidden={!isSelected}
                className={isSelected ? "block" : "hidden"}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Stage Overview & Action Points */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-mono font-bold text-[#00E5FF] px-3 py-1 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                        {st.step}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-widest block font-semibold">
                          {`STAGE ${st.step} // ${st.badge}`}
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
                          {st.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-sm font-mono text-[#929BAA]">
                      {st.subtitle}
                    </div>

                    <p className="font-sans text-sm text-[#929BAA] leading-relaxed">
                      {st.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-[#202630]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]/80 block mb-2 font-semibold">
                        Key Operational Objectives:
                      </span>
                      {st.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#F5F7FA]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Telemetry Console Snippet */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                    <div className="rounded-2xl bg-[#07090D] border border-[#202630] p-5 font-mono text-xs shadow-inner relative overflow-hidden">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#202630] text-[#929BAA]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                          <span className="text-[#F5F7FA]">krynex-lifecycle // step-{st.step}</span>
                        </div>
                        <span className="text-[10px] text-[#00E5FF]">EXECUTION_LOG</span>
                      </div>

                      <pre className="text-[#929BAA] whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs overflow-x-auto">
                        {st.terminalSnippet}
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl bg-[#111722] border border-[#202630] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#929BAA]">Current Phase:</span>
                      <span className="text-[#00E5FF] font-medium">
                        {st.step} of 07 — {st.badge}
                      </span>
                    </div>
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
