import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { ABOUT_DATA } from "@/data/about-data";
import {
  Compass,
  Search,
  CheckCircle2,
  Cpu,
  Rocket,
  CreditCard,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Layers,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Approach | Problem-First Software Product Lifecycle",
  description:
    "Explore Krynex Labs' 7-stage product lifecycle: Discover, Research, Validate, Build, Launch, Subscribe, and Continuously Improve software built around real industry challenges.",
  alternates: {
    canonical: "https://www.krynexlabs.in/approach",
  },
};

export default function ApproachPage() {
  const steps = ABOUT_DATA.lifecycleProcess;

  const iconMap: Record<string, React.ReactNode> = {
    "01": <Compass className="w-5 h-5 text-white" />,
    "02": <Search className="w-5 h-5 text-white" />,
    "03": <CheckCircle2 className="w-5 h-5 text-white" />,
    "04": <Layers className="w-5 h-5 text-white" />,
    "05": <Cpu className="w-5 h-5 text-white" />,
    "06": <Rocket className="w-5 h-5 text-white" />,
    "07": <TrendingUp className="w-5 h-5 text-white" />,
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>METHODOLOGY // PRODUCT LIFECYCLE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Find the Problem. Build the Solution.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              Krynex Labs is not a general development agency selling development hours. We are a software product company. We investigate real-world business challenges, validate market demand, engineer focused software applications, and operate them on recurring subscription terms with continuous weekly improvements.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Problem-First Strategy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Rented Software Model</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Continuous Evolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 7-Stage Process Lifecycle */}
      <section className="py-24 bg-[#030303] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 border-b border-white/[0.06] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                UNIFIED CREATION LIFECYCLE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                From Industry Problem to Compounding Product
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              DISCOVER &rarr; RESEARCH &rarr; VALIDATE &rarr; BUILD &rarr; LAUNCH &rarr; SUBSCRIBE &rarr; IMPROVE
            </div>
          </div>

          {/* 7-Step List */}
          <div className="space-y-6">
            {steps.map((stage) => (
              <div
                key={stage.step}
                className="p-8 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    {iconMap[stage.step]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-zinc-500 font-bold">
                        STAGE {stage.step}
                      </span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        {stage.tagline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      {stage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-16 md:pl-0">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-300">
                    {stage.step === "01" && "Exploratory Auditing"}
                    {stage.step === "02" && "Friction Quantification"}
                    {stage.step === "03" && "Market Demand Check"}
                    {stage.step === "04" && "Ergonomic Prototyping"}
                    {stage.step === "05" && "Production Engineering"}
                    {stage.step === "06" && "General Availability"}
                    {stage.step === "07" && "Weekly Release Cycles"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* The Core Business Model: Rented Software */}
      <section className="py-24 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
              COMMERCIAL ALIGNMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              The Rented Software Model
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Why subscriptions create better software for both our customers and our company.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-white/10 text-center mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            <div className="text-lg sm:text-2xl font-mono font-bold text-white leading-relaxed mb-4">
              &ldquo;CUSTOMERS PAY TO USE THE SOFTWARE.
              <br />
              KRYNEX LABS CONTINUOUSLY IMPROVES THE SOFTWARE.
              <br />
              RECURRING SUBSCRIPTIONS FUND THE BUSINESS.&rdquo;
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto">
              Under this model, we never abandon a product after handover. We maintain the servers, monitor security, optimize latency, and roll out feature updates continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#050505] border border-white/[0.08]">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-2">
                Traditional Agency / Custom Dev
              </div>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Huge upfront capex fees before seeing working software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Software becomes obsolete immediately after handover</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Customer bears 100% of the ongoing maintenance and bugfix burden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Incentivized to bill more hours rather than solve problems quickly</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#050505] border border-white/20 relative">
              <div className="text-xs font-mono text-white font-semibold uppercase mb-2">
                Krynex Labs Software Subscription
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>Zero upfront capex; predictable monthly or annual rental access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>Continuous weekly enhancements, statutory updates, and performance gains</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>Krynex Labs handles hosting, security, uptime, and infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>Incentivized to build high-utility, reliable software that retains subscribers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Services CTA */}
      <section className="py-20 bg-[#050505] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            See Our Approach in Action
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Explore our core engineering capabilities and applied AI architectures built using this exact problem-first methodology.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/solutions"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 font-medium text-xs transition-all"
            >
              <span>Propose an Industry Problem</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
