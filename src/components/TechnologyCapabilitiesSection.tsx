import React from "react";
import Link from "next/link";
import {
  Cpu,
  Server,
  Workflow,
  Database,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function TechnologyCapabilitiesSection() {
  const capabilities = [
    {
      icon: Cpu,
      title: "Applied AI & Neural Models",
      tagline: "Deterministic inference & domain vision",
      description:
        "High-performance computer vision for industrial telemetry and domain-adapted document intelligence with strict validation constraints and zero data retention.",
      tags: ["Computer Vision", "Document NLP", "Constrained Inference"],
    },
    {
      icon: Server,
      title: "Distributed Cloud Architecture",
      tagline: "High availability & low-latency edge",
      description:
        "Fault-tolerant microservices, globally distributed edge endpoints, and automated recovery pipelines designed for 99.9% uptime reliability.",
      tags: ["Edge Routing", "Microservices", "Failover Resilience"],
    },
    {
      icon: Workflow,
      title: "Workflow & Process Automation",
      tagline: "Deterministic operational pipelines",
      description:
        "Industrial event pipelines, rule validation engines, and automated document synthesis that eliminate clerical errors and manual bottlenecks.",
      tags: ["Rule Engines", "Document Synthesis", "Event Pipelines"],
    },
    {
      icon: Database,
      title: "Data Engineering & Telemetry",
      tagline: "Time-series & real-time telemetry",
      description:
        "Scalable ingestion of high-frequency IoT sensor telemetry, time-series generation analytics, and secure tenant data isolation.",
      tags: ["IoT Telemetry", "Time-Series Data", "Tenant Isolation"],
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Platforms",
      tagline: "Fluid, mission-critical interfaces",
      description:
        "Instant-loading web portals and responsive mobile applications engineered for field operations, offline data synchronization, and operational oversight.",
      tags: ["Next.js", "Offline Sync", "Real-Time Telemetry"],
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security & Privacy",
      tagline: "Zero-trust & envelope encryption",
      description:
        "KMS-managed AES-256 envelope encryption, complete client data sovereignty, and strict access controls safeguarding enterprise assets.",
      tags: ["AES-256 KMS", "Data Sovereignty", "Role-Based Access"],
    },
  ];

  return (
    <section
      id="technology"
      className="relative py-16 sm:py-24 lg:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Top Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-4">
            <span>08 // TECHNOLOGY CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Modern Engineering for Reliable Software Products.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            We select proven, modern technologies to build resilient web applications, distributed backend services, practical AI models, and real-time operational platforms that businesses can depend on.
          </p>
        </div>

        {/* 6-Card Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Specular Rim */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-6 group-hover:border-white/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {cap.title}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400 mb-4">
                    {cap.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Engineered for High-Reliability Enterprise Deployments
              </div>
              <div className="text-xs text-zinc-400 font-sans mt-0.5">
                Every product is built with strict security baselines, modular architecture, and zero external dependency risk.
              </div>
            </div>
          </div>

          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-xs transition-colors shrink-0"
          >
            <span>Explore Technical Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
