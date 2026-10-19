import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, FileText, CheckCircle, Scale, Building2, Server, Key, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service & SLA Governance",
  description:
    "Enterprise terms of service, subscription billing, guided sandbox access, zero-retention data sovereignty, and 99.9% service availability targets for Krynex Labs SaaS products.",
  alternates: {
    canonical: "https://www.krynexlabs.in/terms",
  },
  openGraph: {
    title: "Terms of Service & SLA Governance | Krynex Labs",
    description:
      "Enterprise terms of service, subscription billing, guided sandbox access, zero-retention data sovereignty, and 99.9% service availability targets for Krynex Labs SaaS products.",
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
            <span>ENTERPRISE SAAS TERMS // 99.9% SLA TARGET</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Terms of Service &amp; SLA Governance
          </h1>
          <p className="text-zinc-400 text-xs font-mono">
            OPERATING JURISDICTION: AHMEDABAD, GUJARAT, INDIA • LAST REVISED: OCTOBER 2026
          </p>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 mb-12">
          <div>
            <div className="text-white font-bold text-sm">99.9% Target</div>
            <div className="text-zinc-500 text-[11px]">Monthly Service Availability Target</div>
          </div>
          <div>
            <div className="text-white font-bold text-sm">SaaS Subscriptions</div>
            <div className="text-zinc-500 text-[11px]">Predictable Monthly / Annual Rented Access</div>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Ahmedabad HQ</div>
            <div className="text-zinc-500 text-[11px]">Sindhu Bhavan Road (SBR), Gujarat, India</div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-400" />
              1. Scope of SaaS Products &amp; Subscription Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs (&ldquo;Krynex Labs&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) operates as a unified software product company. We architect, operate, and maintain specialized software applications and platforms—including <strong className="text-white">Krynex Lexis</strong> (bilingual legal intelligence), <strong className="text-white">Krynex Flow</strong> (integration middleware), and <strong className="text-white">Krynex Vision</strong> (industrial edge quality control).
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Access to our software is delivered on a subscription and software-rental basis under standardized service tiers. Krynex Labs does not sell billable consulting hours, custom development agency contracts, or one-off work-for-hire statements of work. All rights to the underlying software products, engines, model weights, and application architectures remain the exclusive property of Krynex Labs.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-5 h-5 text-zinc-400" />
              2. Guided Sandbox Trials &amp; Evaluation Access
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Prospective enterprise subscribers may request access to a guided sandbox trial environment. Sandbox environments are configured to allow enterprise legal, technical, and operational stakeholders to evaluate software features against simulated data or controlled datasets.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Sandbox trials are provided for a defined evaluation window (typically 14 calendar days unless extended in writing). Commercial use of sandbox outputs for production transactions without an active paid subscription is strictly prohibited. Sandbox environments may be throttled or decommissioned upon completion of the trial period.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-zinc-400" />
              3. Acceptable Use Policy &amp; Security Boundaries
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Subscribers agree not to: (a) reverse-engineer, decompile, or disassemble any portion of Krynex software engines or edge inference binaries; (b) probe, scan, or breach system security controls without explicit written authorization; (c) utilize Krynex platform APIs to train competing generative AI or machine-learning models; or (d) input malicious scripts, defamatory payloads, or unlawful content into any Krynex application.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Key className="w-5 h-5 text-zinc-400" />
              4. Subscription Billing, Upgrades &amp; Cancellation
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Subscription fees are billed in advance on a recurring monthly or annual schedule in Indian Rupees (INR ₹) or United States Dollars (USD $) as agreed during checkout or enterprise onboarding. All published subscription tiers (such as Krynex Lexis starting at ₹1,499/mo, Krynex Flow starting at ₹7,999/mo, and Krynex Vision starting at ₹18,500/station/mo) exclude applicable statutory GST/taxes.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Subscribers may cancel their subscription at any time via the customer billing portal or by emailing <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a>. Upon cancellation, software access persists until the conclusion of the active billing period, after which access is revoked without recurring charges. Refunds are not granted for partial billing periods.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-zinc-400" />
              5. Customer Data Sovereignty &amp; Zero-Retention Handling
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Customers retain 100% exclusive ownership of all documents, title extracts, ERP payloads, and camera frames submitted to Krynex Labs products. Krynex Labs operates under strict zero-retention and per-tenant cryptographic isolation: customer data is never co-mingled, sold, or utilized to train public foundation models. For edge deployments (Krynex Vision), inference runs 100% offline on on-premise edge hardware without cloud telemetry transmission.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              6. 99.9% Service Availability Target (SLA) &amp; Maintenance
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              For commercial production tiers, Krynex Labs commits to a <strong className="text-white">99.9% Service Availability Target</strong> during each calendar month, measured across core application endpoints. Scheduled maintenance windows (typically executed during low-traffic periods between 01:00 and 04:00 IST on Sundays) are announced at least 48 hours in advance and are excluded from downtime calculations.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              In the event that monthly service availability falls below 99.9% due to verifiable Krynex infrastructure failure, affected enterprise subscribers are eligible to receive prorated service credits applicable toward future subscription renewals upon written request within 30 days of the incident.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-zinc-400" />
              7. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              These Terms and any subscription agreements shall be governed by, interpreted, and construed in accordance with the laws of the Republic of India, without regard to conflict of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms shall be instituted exclusively in the competent courts situated in Ahmedabad, Gujarat, India.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1.5">
              <div className="text-white font-bold">LEGAL &amp; COMMERCIAL GOVERNANCE</div>
              <div>Entity: KRYNEX LABS</div>
              <div>Headquarters: Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India</div>
              <div>Official Contact: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
              <div>Direct Messaging: <a href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20have%20a%20governance%20inquiry." target="_blank" rel="noopener noreferrer" className="text-white underline">+91 9879418569</a> (WhatsApp Business)</div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
