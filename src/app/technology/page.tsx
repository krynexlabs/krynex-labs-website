import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Cpu,
  Server,
  Layers,
  Workflow,
  Database,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Capabilities & Architecture | Krynex Labs",
  description:
    "Explore Krynex Labs' engineering capabilities across 7 core disciplines: AI & Machine Learning, Cloud Infrastructure, Enterprise Architecture, Automation, Data Engineering, Security, and Web/Mobile Systems.",
  alternates: {
    canonical: "https://www.krynexlabs.in/technology",
  },
  openGraph: {
    title: "Technology Capabilities & Architecture | Krynex Labs",
    description:
      "Modern software engineering capabilities across AI/ML, distributed cloud infrastructure, deterministic automation, and zero-trust security.",
    url: "https://www.krynexlabs.in/technology",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Capabilities & Architecture | Krynex Labs",
    description:
      "Modern software engineering capabilities across AI/ML, distributed cloud infrastructure, deterministic automation, and zero-trust security.",
    images: ["/opengraph-image"],
  },
};

export default function TechnologyPage() {
  const capabilities = [
    {
      id: "ai-ml",
      icon: Cpu,
      title: "AI and Machine Learning",
      tagline: "Deterministic inference, domain-adapted language models, and edge vision.",
      description:
        "We build practical applied neural architectures rather than speculative AI experiments. From high-speed on-premise computer vision to deterministic statutory document parsers, our models operate with mathematical constraints and zero external data retention.",
      specs: [
        "TensorRT INT8 quantized edge inference for industrial conveyor lines",
        "Deterministic domain-adapted NLP for Indian legal & statutory syntax",
        "Air-gapped on-premise execution with zero cloud egress",
      ],
      link: "/solutions/ai-ml",
    },
    {
      id: "cloud-infra",
      icon: Server,
      title: "Cloud and Infrastructure",
      tagline: "High-availability distributed cloud with automated multi-zone failover.",
      description:
        "Modern cloud backends engineered for mission-critical reliability. We architect containerized microservices and event queues on Kubernetes and serverless runtimes with sub-100ms response targets.",
      specs: [
        "Multi-region auto-healing Kubernetes clusters",
        "High-throughput Go and Rust distributed event dispatchers",
        "Automated backup, health monitoring, and instant failover",
      ],
      link: "/solutions/cloud-data",
    },
    {
      id: "enterprise-arch",
      icon: Layers,
      title: "Enterprise Architecture",
      tagline: "Event-driven microservices and legacy system modernization.",
      description:
        "We untangle complex enterprise tech debt. Our engineers design event-driven architectures that bridge legacy on-premise databases (SAP, Oracle, Tally) with modern cloud APIs without service interruption.",
      specs: [
        "Clean domain-driven design (DDD) with isolated service boundaries",
        "Statutory compliance engines for GST, e-invoicing, and customs EDI",
        "Backward-compatible REST, gRPC, and GraphQL gateways",
      ],
      link: "/solutions/enterprise-software",
    },
    {
      id: "automation",
      icon: Workflow,
      title: "Automation",
      tagline: "Reliable state-machine workflows connecting fragmented business operations.",
      description:
        "We replace fragile robotic desktop clicks with deterministic code-level state machines. Workflows automatically ingest records, apply business policy rules, and synchronize multiple systems.",
      specs: [
        "Deterministic state machines with transactional consistency",
        "Automated work order creation and crew dispatch telemetry",
        "Bi-directional webhook ingestion with replay resilience",
      ],
      link: "/solutions/enterprise-software",
    },
    {
      id: "data-engineering",
      icon: Database,
      title: "Data Engineering",
      tagline: "Real-time streaming pipelines and automated schema reconciliation.",
      description:
        "Handling continuous telemetry from IoT devices, SCADA sensors, and multi-tenant SaaS databases. Our streaming pipelines clean, normalize, and aggregate high-volume records in real time.",
      specs: [
        "Apache Kafka and Flink streaming data pipelines",
        "Automated schema mapping and data sanitization engines",
        "Sub-second aggregation for executive telemetry dashboards",
      ],
      link: "/solutions/cloud-data",
    },
    {
      id: "security",
      icon: ShieldCheck,
      title: "Security",
      tagline: "Zero-trust network boundaries, KMS envelope encryption, and auditability.",
      description:
        "Security is an architectural foundation, not an afterthought. Every software system we deploy enforces strict tenant isolation, hardware-backed envelope encryption, and cryptographically signed audit logs.",
      specs: [
        "AES-256 envelope encryption with hardware KMS keys",
        "Strict zero-retention guarantee for customer enterprise data",
        "Role-based access control (RBAC) and immutable audit trails",
      ],
      link: "/privacy",
    },
    {
      id: "web-mobile",
      icon: Smartphone,
      title: "Web and Mobile Engineering",
      tagline: "High-performance responsive web platforms and offline-first mobile apps.",
      description:
        "User interfaces designed for clarity and speed. We engineer modern Next.js web applications and React Native mobile clients with sub-second page loads, offline synchronization, and accessible UX.",
      specs: [
        "Server-side rendered Next.js with optimized First Load JS (<90kB)",
        "Offline-first mobile synchronization for remote field operators",
        "Full WCAG 2.2 AA accessibility and keyboard navigation",
      ],
      link: "/solutions/web-mobile",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
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
              <li className="text-blue-400">Technology</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENGINEERING FOUNDATION {"//"} 7 CORE DISCIPLINES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Technology Capabilities &amp; Architecture
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            We master the full technical spectrum to build resilient, high-utility software products. We select technologies based on deterministic reliability, security, and low operational latency.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#categories"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] flex items-center gap-2"
            >
              <span>Explore 7 Disciplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-xs hover:bg-white/[0.08] transition-all"
            >
              Consult Technical Architects
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Disciplines Grid */}
      <section id="categories" className="py-24 bg-[#0D121C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#121A27] border border-white/[0.08] hover:border-blue-500/30 transition-all relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        DISCIPLINE 0{idx + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        {cap.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href={cap.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors shrink-0"
                  >
                    <span>View Architectural Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="text-xs font-mono text-zinc-300 mb-3">
                  {cap.tagline}
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {cap.description}
                </p>

                <div className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cap.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
