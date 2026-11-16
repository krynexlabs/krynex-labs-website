import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sun, CheckCircle2, ArrowRight, Zap, ShieldCheck, Activity, ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Energy & Operations Management Software | Krynex Labs",
  description:
    "Discover how Krynex Labs researches solar plant operational friction and engineers SolarOps—intelligent software for inverter telemetry, string yield monitoring, and automated O&M dispatch.",
  alternates: {
    canonical: "https://www.krynexlabs.in/industries/solar",
  },
  openGraph: {
    title: "Solar Energy & Operations Management Software | Krynex Labs",
    description:
      "Intelligent software solutions for solar power plants: real-time inverter SCADA telemetry, string MPPT yield analytics, and automated O&M crew dispatch.",
    url: "https://www.krynexlabs.in/industries/solar",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Energy & Operations Management Software | Krynex Labs",
    description:
      "Intelligent software solutions for solar power plants: real-time inverter SCADA telemetry, string MPPT yield analytics, and automated O&M crew dispatch.",
    images: ["/opengraph-image"],
  },
};

export default function SolarIndustryPage() {
  const bottlenecks = [
    {
      title: "Undetected String Dropouts",
      description:
        "Inverter arrays with dozens of solar strings frequently suffer localized fuse blown or diode failures that remain unnoticed for days, causing continuous generation revenue loss.",
    },
    {
      title: "Dust & Soiling Degradation",
      description:
        "Dust accumulation and environmental soiling degrade generation yields by 8% to 18%. Legacy plants rely on fixed periodic cleaning schedules rather than condition-based dispatch.",
    },
    {
      title: "Fragmented SCADA & Spreadsheets",
      description:
        "Plant operators juggle disjointed inverter monitoring portals, manual logbooks, and Excel spreadsheets, creating significant reporting delays for investors and EPC stakeholders.",
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
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
              </li>
              <li><ChevronRight className="w-3 h-3 text-zinc-600" /></li>
              <li className="text-blue-400">Solar Energy</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
            <Sun className="w-3.5 h-3.5" />
            <span>INDUSTRY DOSSIER // RENEWABLE OPERATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Solar Energy Operations &amp; Management Software
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            Utility-scale and commercial rooftop solar plants lose significant megawatt-hours every month to undetected inverter faults and unoptimized cleaning cycles. We research solar operational bottlenecks and engineer practical software systems that maximize solar asset yield.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products/solarops"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] flex items-center gap-2"
            >
              <span>Explore SolarOps Software</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-xs hover:bg-white/[0.08] transition-all"
            >
              Schedule Solar Briefing
            </Link>
          </div>
        </div>
      </section>

      {/* Operational Friction Section */}
      <section className="py-20 border-b border-white/[0.08] bg-[#0D121C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Real Operational Challenges in Solar Asset Management
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-10 max-w-2xl">
            Software is only as valuable as the friction it removes. Before writing code, we spent hours analyzing field reports from plant engineers and O&amp;M teams across India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottlenecks.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#121A27] border border-white/[0.08] relative">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                  0{idx + 1} {"//"} BOTTLENECK
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Software Solution */}
      <section className="py-20 bg-[#080B12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121A27] border border-blue-500/30 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-mono text-blue-400 mb-4">
              <span>SOLAROPS SOFTWARE PLATFORM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Automated Solar Telemetry &amp; Work-Order Dispatch
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
              SolarOps connects directly to central inverters and string combiners via edge Modbus gateways. It ingests 1-second telemetry, isolates underperforming strings against meteorological reference sensors, and automatically creates actionable work orders for maintenance crews.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Modbus RTU / MQTT Ingestion</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> String Degradation Algorithms</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Automated Work-Order Generation</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
