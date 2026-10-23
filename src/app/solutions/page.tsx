"use client";

import React from "react";
import Link from "next/link";
import {
  Brain,
  Smartphone,
  Network,
  CloudCog,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralConstellationScene from "@/components/canvas/NeuralConstellationScene";

export default function SolutionsPage() {
  const services = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Predictive analytics, computer vision for quality checks, and smart AI assistants trained on your business data.",
      features: [
        "Domain-tuned language models",
        "Edge computer vision & defect detection",
        "Predictive analytics & forecasting",
      ],
    },
    {
      icon: Smartphone,
      title: "Custom Web & Mobile Platforms",
      description:
        "Fast, intuitive applications and executive portals engineered for daily operational use.",
      features: [
        "Executive dashboards & web portals",
        "Cross-platform iOS and Android apps",
        "Responsive, high-throughput interfaces",
      ],
    },
    {
      icon: Network,
      title: "System & ERP Integration",
      description:
        "Connecting legacy databases, accounting tools, and modern cloud apps so your data flows automatically without manual re-entry.",
      features: [
        "SAP, Oracle, and Tally connectors",
        "Automated cross-system ETL pipelines",
        "Real-time data synchronization",
      ],
    },
    {
      icon: CloudCog,
      title: "Cloud Infrastructure & DevOps",
      description:
        "Reliable cloud setup, automated deployments, and secure architecture on AWS and modern cloud platforms.",
      features: [
        "High-availability cloud architecture",
        "Automated CI/CD pipelines",
        "Zero-trust VPC security & backups",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* ======================================================== */}
      {/* SECTION 1 — HERO (Split Layout: Text Left, 3D Right)     */}
      {/* ======================================================== */}
      <section className="relative min-h-[85vh] pt-32 sm:pt-40 pb-20 flex items-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-[#02fcef] animate-pulse" />
                <span>OUR CAPABILITIES</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Practical Engineering That Scales With You.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                From intelligent automation to full-stack platforms, we build reliable technology tailored to your goals.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] group"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right 3D Neural Constellation */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <NeuralConstellationScene />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 — 4 CORE SERVICES (2x2 Grid)                  */}
      {/* ======================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Core Engineering Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              End-to-End Technology for Complex Workflows.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-white/20 p-8 sm:p-10 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Top Specular Rim */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/30 transition-all">
                      <Icon className="w-6 h-6 text-zinc-200" />
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                      {service.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2.5 text-xs text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 group-hover:text-white transition-colors"
                    >
                      <span>Inquire about this service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3 — MINIMAL CTA BANNER                          */}
      {/* ======================================================== */}
      <section className="relative py-20 border-t border-white/[0.08] bg-[#070707] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Ready to modernize your software systems?
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Tell us about your technical challenges and operational workflows.
          </p>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] group"
            >
              <span>Start a Project →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
