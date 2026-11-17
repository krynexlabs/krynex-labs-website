"use client";

import React from "react";
import {
  FileText,
  Workflow,
  Eye,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function WhatWeSolveSection() {
  const problems = [
    {
      number: "01",
      title: "Manual Business Operations",
      description:
        "Valuable staff spend hours on repetitive, manual coordination tasks across spreadsheets, emails, and disconnected tools instead of high-value work.",
      solution:
        "We build automated workflows that orchestrate tasks, route approvals, and sync systems without manual human intervention.",
      productTag: "Operational Automation",
    },
    {
      number: "02",
      title: "Repetitive Documentation",
      description:
        "Legal contracts, property deeds, and statutory filings are manually copied from boilerplate templates, creating multi-day delays and clerical errors.",
      solution:
        "Krynex LawOS automates bilingual legal and property document compilation with guaranteed compliance against statutory revenue codes.",
      productTag: "Krynex LawOS",
    },
    {
      number: "03",
      title: "Fragmented Workflows",
      description:
        "Critical operational data is trapped in separate legacy software, paper registers, and departmental silos that cannot communicate with one another.",
      solution:
        "We engineer unified web and mobile platforms that connect business processes into one coherent, trackable workflow.",
      productTag: "Platform Engineering",
    },
    {
      number: "04",
      title: "Lack of Operational Visibility",
      description:
        "Plant operators, solar EPC teams, and field managers cannot see equipment performance, string dropouts, or job statuses until delays occur.",
      solution:
        "SolarOps provides real-time monitoring, automated anomaly alerts, and instant field technician dispatch to maintain maximum generation yield.",
      productTag: "SolarOps",
    },
    {
      number: "05",
      title: "Time-Consuming Administrative Work",
      description:
        "Businesses struggle with lengthy administrative cycles for project estimation, quotation generation, and statutory compliance approvals.",
      solution:
        "Intelligent automation reduces administrative cycle times from days to minutes, accelerating project delivery and customer response.",
      productTag: "Productivity Software",
    },
  ];

  return (
    <section id="what-we-solve" className="relative py-16 sm:py-24 lg:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>04 // WHAT WE SOLVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Solving Real Operational Friction Across Industries.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We focus exclusively on tangible operational problems that cost businesses time, accuracy, and revenue. Here is what our software products solve.
          </p>
        </div>

        {/* 5 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob) => (
            <div
              key={prob.number}
              className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-zinc-300 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                    PROBLEM {prob.number}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-white/[0.03]">
                    {prob.productTag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-zinc-200 transition-colors">
                  {prob.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                  {prob.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>How Our Software Solves This:</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {prob.solution}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Callout Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/10 hover:border-white/[0.22] transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4">
                PRACTICAL ENGINEERING
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Software Built for Everyday Use
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                We believe great software is defined by how reliably it solves problems for the teams using it every day. No shelfware, no unnecessary complexity.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">AHMEDABAD LABS</span>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold py-2 px-3 -my-2 -mx-3 rounded-lg"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
