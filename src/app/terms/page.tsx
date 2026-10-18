import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, FileText, CheckCircle, Scale, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Enterprise terms of engagement, service level targets, intellectual property rights, and governance standards for Krynex Labs engineering services and SaaS products.",
  alternates: {
    canonical: "https://www.krynexlabs.in/terms",
  },
  openGraph: {
    title: "Terms of Service | Krynex Labs",
    description:
      "Enterprise terms of engagement, service level targets, intellectual property rights, and governance standards for Krynex Labs engineering services and SaaS products.",
    url: "https://www.krynexlabs.in/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Top ambient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
            <span>&larr; Return to Krynex Labs Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-zinc-300" />
            <span>ENTERPRISE TERMS OF SERVICE // SERVICE LEVEL TARGETS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Terms of Service &amp; SLA Governance
          </h1>
          <p className="text-zinc-400 text-xs font-mono">
            OPERATING JURISDICTION: AHMEDABAD, GUJARAT, INDIA • OCTOBER 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-400" />
              1. Scope of Enterprise Engineering Services &amp; SaaS Products
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs provides custom applied artificial intelligence (AI), machine learning (ML), and enterprise software engineering services (Division A), alongside standardized proprietary SaaS products (Division B). Specific delivery parameters, milestone schedules, and acceptance criteria for custom client engineering are established through bilateral Statements of Work (SOW) or Master Services Agreements (MSA).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              2. High-Availability Targets &amp; Service Level Commitments
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              For custom deployed enterprise systems and managed infrastructure, specific availability thresholds (such as 99.99% monthly uptime targets), support response windows, and service credits are governed by the applicable bilateral enterprise contract. For standardized SaaS products (such as Krynex Lexis), standard service availability targets 99.9% monthly uptime, excluding scheduled maintenance. Public website demonstrations and diagnostic sandbox environments are provided for illustrative purposes on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400">
              <div>
                <div className="text-white font-bold">&gt; 99.9% Target</div>
                <div className="text-zinc-500 text-[11px]">Standard SaaS Availability Target</div>
              </div>
              <div>
                <div className="text-white font-bold">Bilateral MSA</div>
                <div className="text-zinc-500 text-[11px]">Custom Enterprise SLA Contracts</div>
              </div>
              <div>
                <div className="text-white font-bold">Ahmedabad Labs</div>
                <div className="text-zinc-500 text-[11px]">Primary Engineering Operations</div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-zinc-400" />
              3. Intellectual Property Rights &amp; Ownership
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Upon full settlement of agreed deliverables under custom client contracts, all custom-engineered pipeline logic, bespoke model weights, and client-specific automation workflows are transferred to the client as their exclusive intellectual property. Krynex Labs retains proprietary rights solely to its pre-existing core algorithmic frameworks, SaaS products, and internal developer toolchains.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-zinc-400" />
              4. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              These terms and all related agreements shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising under or in connection with these Terms shall be subject to the jurisdiction of the competent courts in Ahmedabad, Gujarat, India.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
              <div>LEGAL &amp; COMMERCIAL ARBITRATION</div>
              <div>KRYNEX LABS</div>
              <div>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat 380054, India</div>
              <div>Inquiries: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
