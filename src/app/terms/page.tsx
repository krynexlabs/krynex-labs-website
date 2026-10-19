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
              1. Scope of Software Products &amp; Subscription Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs develops, owns, operates, and maintains proprietary software products, web applications, and SaaS platforms (including Krynex Lexis, Krynex Flow, and Krynex Vision). Customers subscribe to or rent ongoing access to these software products under product-specific subscription agreements (monthly, annual, or enterprise tiers). Krynex Labs operates as a unified software product company and does not primarily sell billable development hours or one-off custom agency projects.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              2. Service Availability Targets &amp; Continuous Maintenance
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              For commercial software products, standard service availability targets 99.9% monthly uptime, excluding scheduled maintenance windows. Krynex Labs provides ongoing cloud infrastructure management, security patching, and continuous product updates funded by recurring software subscriptions. Public website demonstrations and diagnostic sandbox environments are provided for illustrative simulation purposes on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400">
              <div>
                <div className="text-white font-bold">&gt; 99.9% Target</div>
                <div className="text-zinc-500 text-[11px]">Standard Software Availability Target</div>
              </div>
              <div>
                <div className="text-white font-bold">Rented Software</div>
                <div className="text-zinc-500 text-[11px]">Predictable Recurring Subscriptions</div>
              </div>
              <div>
                <div className="text-white font-bold">Ahmedabad HQ</div>
                <div className="text-zinc-500 text-[11px]">Primary Software Operations</div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-zinc-400" />
              3. Intellectual Property Rights &amp; Customer Data Sovereignty
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs retains all right, title, and interest in and to its software products, platforms, algorithms, application architectures, and documentation. Customers and subscribers retain 100% exclusive ownership and sovereignty over all customer data, uploaded files, revenue records, and business documents processed through Krynex Labs products. Customer data is never co-mingled, sold, or used to train public foundation models.
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
              <div>AHMEDABAD (IN)</div>
              <div>Inquiries: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
