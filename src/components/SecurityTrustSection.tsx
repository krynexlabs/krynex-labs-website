"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Server,
  FileCheck,
  ArrowRight,
  EyeOff,
} from "lucide-react";

export default function SecurityTrustSection() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Data Protection",
      tag: "ENCRYPTION AT REST & TRANSIT",
      description:
        "All data transferred between your browser and our servers is secured with TLS 1.3 encryption. At rest, database volumes and files are encrypted using industry-standard AES-256 encryption.",
    },
    {
      icon: KeyRound,
      title: "Access Control",
      tag: "ROLE-BASED GOVERNANCE",
      description:
        "We enforce granular role-based permissions and strict tenant workspace isolation. Team members only see the accounts, documents, and assets designated for their role.",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      tag: "HARDENED CLOUD ARCHITECTURE",
      description:
        "Our applications run on hardened cloud infrastructure protected by web application firewalls (WAF), automated distributed denial-of-service protection, and 24/7 uptime monitoring.",
    },
    {
      icon: EyeOff,
      title: "Privacy Practices",
      tag: "ZERO-DATA-MINING POLICY",
      description:
        "Your business data is strictly yours. We do not sell your data, monetize your customer records, or use your private documents to train public or commercial AI models.",
    },
    {
      icon: FileCheck,
      title: "Responsible Data Handling",
      tag: "RETENTION & EXPORT",
      description:
        "We implement automated backup schedules and verifiable data retention schedules. You can export your documents and data records in standard formats at any time.",
    },
  ];

  return (
    <section id="security" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>08 // SECURITY AND TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Enterprise Security Built Into Every Layer.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Security and privacy are not afterthoughts at Krynex Labs. We build practical, verifiable protections into our software so your team can work with absolute confidence.
          </p>
        </div>

        {/* 5 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/10">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Callout Link Card */}
          <div className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-4">
                TRANSPARENCY &amp; COMPLIANCE
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Clear Privacy &amp; Data Rights
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Review our complete enterprise privacy policy, data sovereignty terms, and RFC 9116 security vulnerability reporting standards.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-col gap-2">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold"
              >
                <span>Read Enterprise Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white"
              >
                <span>Review Terms of Service &amp; SLA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
