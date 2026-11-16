"use client";

import React from "react";
import { ShieldCheck, Lock, Server, KeyRound, Cpu, FileCheck } from "lucide-react";

export default function SecurityArchitectureSection() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Data Isolation & Zero-Trust",
      description:
        "Every tenant environment operates within strictly partitioned network boundaries designed to prevent cross-tenant memory or storage leakage.",
      tag: "TENANT ISOLATION",
    },
    {
      icon: KeyRound,
      title: "KMS Envelope Encryption",
      description:
        "All data at rest is encrypted using dedicated cryptographic keys with automated rotation policies and customer-managed KMS options for enterprise tiers.",
      tag: "AES-256 / KMS",
    },
    {
      icon: ShieldCheck,
      title: "Client Sovereignty Commitment",
      description:
        "Strict contractual zero-retention policy. Your proprietary business data, contracts, and telemetry are never used to train public AI models.",
      tag: "ZERO RETENTION",
    },
    {
      icon: Server,
      title: "High-Availability Distributed Systems",
      description:
        "Multi-zone redundancy, automated health checks, and instant failover designed for continuous 24/7 mission-critical operations.",
      tag: "HIGH AVAILABILITY",
    },
    {
      icon: Cpu,
      title: "Air-Gapped & On-Premise Execution",
      description:
        "Containerized deployment options for sensitive defense, manufacturing, and legal environments requiring zero cloud egress.",
      tag: "EDGE & AIR-GAP",
    },
    {
      icon: FileCheck,
      title: "Immutable Audit Trails",
      description:
        "Cryptographically signed event logs recording every document generation, API call, and administrative access for compliance audits.",
      tag: "COMPLIANCE READY",
    },
  ];

  return (
    <section id="security" className="relative py-24 sm:py-32 bg-[#080B12] border-t border-white/[0.08] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono tracking-widest text-blue-400 uppercase mb-4">
            <span>08 // SECURITY &amp; ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Enterprise-Grade Security by Design.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We engineer our software products with the highest security standards, deterministic cryptographic protection, and sovereign data isolation.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#121A27] border border-white/[0.08] hover:border-blue-500/30 transition-all relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/10">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
