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
        "We pinpoint the exact mechanical or human bottleneck costing time or money. We ask: which tasks consume 4+ hours? Where do errors trigger legal disputes or scrap penalties? Which steps create friction?",
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
>> Identified Choke Point: Manual 4-8 hr deed drafting & 30-yr Index-II search
>> Baseline Error Risk: Omitted statutory covenants & transcription drift
>> Measurable Impact: Advocate backlogs exceeding 14 working days
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
>> Validation Result: 87% express strong urgency for deterministic drafting
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
        "Zero-latency interface design with sub-100ms response targets",
        "Bilingual typography and regional vocabulary support",
      ],
      terminalSnippet: `// 04 // DESIGN THE SOLUTION
>> Target: Ergonomic Workflow Canvas & State Architecture
>> Interface Specification: Dark-mode high-density telemetry canvas
>> Vocabulary Engine: Gujarati revenue terms mapped to English covenants
>> Human Interaction Model: Form-to-compilation in under 3 clicks
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
        "Next.js SSR web platforms with sub-100ms First Contentful Paint",
        "High-performance Go and Rust event-processing backends",
        "Deterministic grammar decoders and mathematical guardrails",
        "Isolated tenant architecture with FIPS 140-2 Level 3 HSM keys",
      ],
      terminalSnippet: `// 05 // BUILD THE SOFTWARE
>> Compiling: KRYNEX Production Engine Core v3.8
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
        "We subject the product to extreme stress testing, statutory compliance audits, and security pen-testing. We then launch the product commercially with transparent, flat subscription pricing.",
      points: [
        "Automated end-to-end regression testing and benchmark evaluation",
        "Zero-downtime containerized cloud and edge deployment",
        "Transparent monthly and annual subscription plans",
        "Instant cloud onboarding with self-service or guided setup",
      ],
      terminalSnippet: `// 06 // TEST AND LAUNCH
>> Executing: 1,500+ Automated Statutory Vector Test Suites...
>> Stress Load: 50,000 concurrent simulation cycles | 0 errors
>> Commercial Status: GENERAL_AVAILABILITY (GA)
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
>> Telemetry Active: Sub-second deed compilation & 99.9% uptime target
>> Customer Feedback: Ingested directly into product engineering backlog
>> Revenue Engine: Recurring subscriptions directly funding R&D
>> Status: COMPOUNDING_SOFTWARE_VALUE_ACTIVE`,
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <section
      id="approach"
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
            <span>03 // HOW WE BUILD // UNIFIED PRODUCT LIFECYCLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Find the Problem. Build the Solution.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every software product at Krynex Labs follows our disciplined 7-stage product lifecycle. We identify real-world business challenges, validate market demand, engineer focused software solutions, and continuously improve them for the businesses that subscribe to them.
          </p>
        </div>

        {/* 7 Interactive Stage Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-[#080808] border border-white/10 mb-8 max-w-6xl mx-auto">
          {steps.map((st, sIdx) => (
            <button
              key={st.step}
              onClick={() => setActiveStep(sIdx)}
              className={`py-2 px-2.5 rounded-xl text-center transition-all flex flex-col items-center gap-1 ${
                activeStep === sIdx
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className={`text-[10px] font-mono uppercase ${activeStep === sIdx ? "text-zinc-700" : "text-zinc-500"}`}>
                Step {st.step}
              </span>
              <span className="text-xs truncate max-w-full font-medium">
                {st.title.replace("the ", "")}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Spotlight Card */}
        <div className="spotlight-card rounded-3xl bg-[#080808] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Stage Overview & Action Points */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-white px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10">
                  {currentStep.step}
                </span>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    {`STAGE ${currentStep.step} // ${currentStep.badge}`}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {currentStep.title}
                  </h3>
                </div>
              </div>

              <div className="text-sm font-mono text-zinc-300">
                {currentStep.subtitle}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                  Key Operational Objectives:
                </span>
                {currentStep.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Telemetry Console Snippet */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
              <div className="rounded-2xl bg-black border border-white/[0.08] p-5 font-mono text-xs shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-zinc-300">krynex-lifecycle // step-{currentStep.step}</span>
                  </div>
                  <span className="text-[10px]">EXECUTION_LOG</span>
                </div>

                <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs overflow-x-auto">
                  {currentStep.terminalSnippet}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Current Phase:</span>
                <span className="text-white font-medium">
                  {currentStep.step} of 07 — {currentStep.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
