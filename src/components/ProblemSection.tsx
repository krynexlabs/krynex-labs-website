"use client";

import React, { useState, useRef } from "react";
import {
  AlertTriangle,
  Clock,
  Layers,
  Database,
  DollarSign,
  EyeOff,
  ZapOff,
  Scale,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

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

  const problemCategories = [
    {
      id: "workflows",
      icon: Clock,
      title: "Inefficient Workflows",
      subtitle: "Multi-Day Delays in Simple Administrative Routines",
      frictionDetail:
        "Processes that should take 5 minutes frequently drag across 3 to 5 business days because of fragmented cross-departmental coordination, manual sign-offs, and disjointed email threads.",
      questions: [
        "Which operational tasks consume excessive human hours?",
        "Where do approval chains bottleneck between departments?",
        "How much revenue is leaked through administrative latency?",
      ],
      investigationVector:
        "Investigating event-driven state machines and automated routing to shrink day-long approval cycles into sub-minute executions.",
      solutionExample: "Being built in Krynex Flow via automated event-driven middleware.",
    },
    {
      id: "manual-work",
      icon: ZapOff,
      title: "Repetitive Manual Work",
      subtitle: "Human Capital Trapped in Routine Data Re-Keying",
      frictionDetail:
        "Skilled professionals frequently spend a major portion of their workday copying data from PDFs, re-typing invoice line items into ERPs, or manually assembling boilerplate legal agreements from static Word templates.",
      questions: [
        "Which workflows remain unnecessarily manual?",
        "Where are knowledge workers acting as human glue between software?",
        "Which recurring tasks generate high fatigue and avoidable clerical errors?",
      ],
      investigationVector:
        "Designing deterministic AI compilers and document extraction engines that eliminate manual re-keying completely.",
      solutionExample: "Resolved in Krynex Lexis with bilingual statutory deed compilation.",
    },
    {
      id: "fragmented-info",
      icon: Database,
      title: "Fragmented Information",
      subtitle: "Critical Knowledge Trapped in Disconnected Silos",
      frictionDetail:
        "Valuable operational data lives fragmented across legacy SQL servers, paper records, sub-registrar offices, local spreadsheets, and cloud portals that cannot communicate with one another.",
      questions: [
        "Where do decision-makers lack reliable, real-time information?",
        "Why must workers query three separate databases to answer one customer question?",
        "How many historical records remain unsearchable and un-indexed?",
      ],
      investigationVector:
        "Building unified ingestion backends, automated indexation pipelines, and zero-trust data bridges.",
      solutionExample: "Addressed via statutory automated title search in Krynex Lexis.",
    },
    {
      id: "expensive-tools",
      icon: DollarSign,
      title: "Expensive or Complicated Tools",
      subtitle: "Bloated Enterprise Suites with Steep Learning Curves",
      frictionDetail:
        "Traditional enterprise software vendors charge exorbitant multi-lakh upfront fees, lock organizations into multi-year contracts, and require months of consultant training to perform straightforward tasks.",
      questions: [
        "Which existing software tools are too expensive, bloated, or complicated?",
        "How many purchased software features remain unused shelfware?",
        "Why should businesses pay upfront capital expenditure for unproven value?",
      ],
      investigationVector:
        "Creating focused, lightweight software applications with transparent monthly subscriptions and zero onboarding friction.",
      solutionExample: "Rented software model: flat monthly subscriptions, zero upfront capex.",
    },
    {
      id: "poor-visibility",
      icon: EyeOff,
      title: "Poor Operational Visibility",
      subtitle: "Managing Plant Operations and Transactions in the Dark",
      frictionDetail:
        "Executive teams and plant operators frequently discover quality defects, machine over-heating, or logistics hold-ups days after they occur, resulting in costly warranty scrap and customer churn.",
      questions: [
        "Where does management lack live, granular operational telemetry?",
        "Why are equipment defects caught after shipment rather than at production speed?",
        "Where do unexpected bottlenecks blindside daily operations?",
      ],
      investigationVector:
        "Deploying edge computer vision and real-time SCADA telemetry for instantaneous defect isolation.",
      solutionExample: "Being built in Krynex Vision via local edge inference nodes.",
    },
    {
      id: "slow-decisions",
      icon: AlertTriangle,
      title: "Slow Decision-Making",
      subtitle: "Delayed Approvals Stalling Commercial Velocity",
      frictionDetail:
        "Commercial loan approvals and vendor payments face prolonged administrative lag because risk scoring and collateral audits depend on manual paper reviews.",
      questions: [
        "Where does sluggish data access prevent immediate, confident decisions?",
        "How can automated mathematical guardrails replace slow manual vetting?",
        "What is the cost of capital lockup caused by batch reconciliation?",
      ],
      investigationVector:
        "Engineering high-frequency streaming analytics and deterministic verification engines.",
      solutionExample: "Streaming fraud and automated collateral verification pipelines.",
    },
    {
      id: "industry-gaps",
      icon: Scale,
      title: "Industry-Specific Process Gaps",
      subtitle: "Generic Software Failing Specialized Regional Realities",
      frictionDetail:
        "Silicon Valley software often overlooks regional Indian statutory nuances (e.g. Gujarati revenue terms, Gujarat Stamp Act, Village Form 7/12) and offline industrial plant constraints.",
      questions: [
        "Which regional, vernacular, or legal requirements are ignored by global tools?",
        "Why do standard SaaS platforms fail when internet connections drop on factory floors?",
        "Where do unique local compliance hurdles create widespread operational gridlock?",
      ],
      investigationVector:
        "Architecting software products specifically tailored to vernacular Indian jurisdictions and harsh edge physical environments.",
      solutionExample: "Bilingual Gujarati-English legal models and offline edge vision architectures.",
    },
  ];

  return (
    <section
      id="problem"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505] overflow-hidden"
    >
      {/* Subtle Specular Ambient Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4 shadow-sm">
            <span>02 // THE PROBLEM-FIRST PRINCIPLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Good Software Begins with an Actual Problem.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We do not build software simply because a technology is popular. We systematically investigate the questions that define operational reality: What is inefficient? Where do businesses lose time or money? Which processes remain unnecessarily manual?
          </p>
        </div>

        {/* Illustrative Context Notice */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono text-zinc-400 mb-8 flex items-start gap-3 max-w-4xl">
          <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">RESEARCH ENVELOPE:</strong> These problem categories represent operational friction patterns Krynex Labs actively investigates across industries to evaluate product feasibility.
          </span>
        </div>

        {/* 7 Interactive Pain Category Tabs */}
        <div
          role="tablist"
          aria-label="Operational Problem Categories"
          className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#080808] border border-white/10 mb-8"
        >
          {problemCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === idx;
            return (
              <button
                key={cat.id}
                id={`problem-tab-${idx}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`problem-panel-${idx}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Problem Exploration Cards (All rendered for SSR/SEO; active one visible) */}
        <div className="spotlight-card rounded-3xl bg-[#080808] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {problemCategories.map((cat, idx) => {
            const isSelected = activeCategory === idx;
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                id={`problem-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`problem-tab-${idx}`}
                aria-hidden={!isSelected}
                className={isSelected ? "block" : "hidden"}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Problem Anatomy */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                          PROBLEM CATEGORY #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-sm font-mono text-zinc-300">
                      {cat.subtitle}
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {cat.frictionDetail}
                    </p>

                    {/* Discovery Questions Krynex Investigates */}
                    <div className="p-5 rounded-2xl bg-black border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Questions We Investigate in This Vector:</span>
                      </div>
                      <ul className="space-y-2">
                        {cat.questions.map((q, qIdx) => (
                          <li key={qIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-zinc-500 font-mono">0{qIdx + 1}.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Software Opportunity & Product Result */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 p-6 rounded-2xl bg-black border border-white/[0.08]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                        HOW WE TURN THIS INTO A SOFTWARE PRODUCT:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                        {cat.investigationVector}
                      </p>

                      <div className="pt-4 border-t border-white/[0.06] space-y-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                          Krynex Implementation Status:
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>{cat.solutionExample}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Validation Protocol:</span>
                      <span className="text-zinc-300">Empirical Demand Verification</span>
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
