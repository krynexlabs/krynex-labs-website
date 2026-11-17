import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  Terminal,
  Cpu,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Resources, Whitepapers & Research | Krynex Labs",
  description:
    "Access Krynex Labs' technical whitepapers, operational dossiers, API documentation guides, and enterprise software architecture benchmarks.",
  alternates: {
    canonical: "https://www.krynexlabs.in/resources",
  },
  openGraph: {
    title: "Engineering Resources & Research | Krynex Labs",
    description:
      "Technical whitepapers, architecture benchmarks, and developer resources for deterministic legal tech, solar telemetry, and high-speed industrial software.",
    url: "https://www.krynexlabs.in/resources",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Resources & Research | Krynex Labs",
    description:
      "Technical whitepapers, architecture benchmarks, and developer resources for deterministic legal tech, solar telemetry, and high-speed industrial software.",
    images: ["/opengraph-image"],
  },
};

export default function ResourcesPage() {
  const whitepapers = [
    {
      title: "Optimizing Solar Plant Yield: Algorithmic Soiling Detection vs. Scheduled Washing",
      category: "RENEWABLE IOT",
      readTime: "8 min read",
      description:
        "Modbus RTU / MQTT telemetry pipeline architectures for utility-scale solar arrays: algorithmic soiling detection vs. scheduled manual washing cycles.",
      link: "/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection",
    },
    {
      title: "Deterministic Clause Synthesis in Vernacular Statutory Conveyancing",
      category: "LEGALTECH RESEARCH",
      readTime: "10 min read",
      description:
        "An architectural analysis of using Abstract Syntax Trees (AST) for parallel Gujarati-English land deed compilation, eliminating typographical errors and statutory discrepancies.",
      link: "/resources/deterministic-statutory-conveyancing-bilingual-property-deeds",
    },
    {
      title: "The Product-Led SaaS Architecture: Problem-First Engineering Over Novelty",
      category: "ENTERPRISE SOFTWARE",
      readTime: "7 min read",
      description:
        "Why software companies fail when building solutions in search of problems, and how Krynex Labs engineers high-retention SaaS products through operational field discovery.",
      link: "/resources/product-led-saas-architecture-problem-first-engineering",
    },
    {
      title: "KMS Envelope Encryption & Sovereign Tenant Isolation in SaaS",
      category: "DATA SOVEREIGNTY",
      readTime: "6 min read",
      description:
        "Zero-retention cryptographic architectures for multi-tenant enterprise software, preventing public AI models from training on customer dockets.",
      link: "/privacy",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#FFFFFF]">
      <Navbar />

      <section className="pt-36 pb-20 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-3 h-3 text-zinc-600" /></li>
              <li className="text-white">Resources</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE {"//"} WHITE PAPERS &amp; RESEARCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Engineering Resources &amp; Whitepapers
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            Empirical field research, telemetry benchmarks, and architecture dossiers produced by Krynex Labs engineers in Ahmedabad.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#whitepapers"
              className="px-6 py-3 rounded-full bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              <span>Explore Technical Papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/research"
              className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-xs hover:bg-white/[0.08] transition-all"
            >
              Open Diagnostic Sandbox
            </Link>
          </div>
        </div>
      </section>

      {/* Whitepapers Grid */}
      <section id="whitepapers" className="py-24 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whitepapers.map((paper, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10 font-bold">
                      {paper.category}
                    </span>
                    <span className="text-zinc-500">{paper.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {paper.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {paper.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Krynex Labs Telemetry Dossier</span>
                  <Link
                    href={paper.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold py-2 px-3 -my-2 -mx-3 rounded-lg"
                  >
                    <span>Read Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
