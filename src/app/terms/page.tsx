import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, FileText, CheckCircle, Scale, Building2, Server, Key, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service & SLA Governance",
  description:
    "Enterprise terms of service, subscription billing, data sovereignty, and high availability targets for Krynex Labs technology solutions and services.",
  alternates: {
    canonical: "https://www.krynexlabs.in/terms",
  },
  openGraph: {
    title: "Terms of Service & SLA Governance | Krynex Labs",
    description:
      "Enterprise terms of service, subscription billing, data sovereignty, and high availability targets for Krynex Labs technology solutions and services.",
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
            <span>ENTERPRISE TERMS // SERVICE GOVERNANCE</span>
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
            <div className="text-white font-bold text-sm">High Availability</div>
            <div className="text-zinc-500 text-[11px]">Monthly Service Availability Target</div>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Enterprise Agreements</div>
            <div className="text-zinc-500 text-[11px]">Predictable Service &amp; Access Terms</div>
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
              1. Scope of Technology Services &amp; Platform Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs (&ldquo;Krynex Labs&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) operates as a technology solutions and enterprise software engineering company. We architect, deploy, and maintain specialized software systems, cloud architectures, and intelligent workflows for enterprise clients.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Access to our platform capabilities, hosted environments, and proprietary modules is governed under executed enterprise service agreements. All rights to the underlying core architectures, proprietary algorithms, model orchestrations, and internal libraries remain the exclusive property of Krynex Labs.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-5 h-5 text-zinc-400" />
              2. Evaluation Access &amp; Staging Environments
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Prospective enterprise clients may be granted time-limited evaluation access to staging environments. These environments are configured to allow technical, security, and operational stakeholders to evaluate system capabilities against simulated data or controlled datasets.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Evaluation access is provided for a defined evaluation window agreed upon in writing. Commercial use of staging outputs for production operations without an active enterprise agreement is strictly prohibited. Staging environments may be decommissioned upon completion of the evaluation period.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-zinc-400" />
              3. Acceptable Use Policy &amp; Security Boundaries
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Clients agree not to: (a) reverse-engineer, decompile, or disassemble any portion of Krynex proprietary binaries or engines; (b) probe, scan, or breach system security controls without explicit written authorization; (c) utilize Krynex platform APIs to train competing foundation models; or (d) transmit malicious code, destructive payloads, or unlawful content into any Krynex application.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Key className="w-5 h-5 text-zinc-400" />
              4. Commercial Terms, Billing &amp; Invoicing
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Service fees are billed according to executed service dockets and enterprise agreements in Indian Rupees (INR ₹) or United States Dollars (USD $). Applicable statutory taxes (including Indian GST) are itemized separately on all official invoices.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Clients may manage billing contacts or discuss contract renewals by contacting <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a>. Contract terminations are governed by the termination provisions specified in the respective enterprise agreement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-zinc-400" />
              5. Customer Data Sovereignty &amp; Zero-Retention Handling
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Clients retain 100% exclusive ownership of all client-supplied data, documents, database records, and operational payloads submitted to Krynex Labs solutions. Krynex Labs operates under strict zero-retention principles and cryptographic tenant isolation: client data is never co-mingled, sold, or utilized for unauthorized model training.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              6. High Availability Service Target (SLA) &amp; Maintenance
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              For commercial production tiers, Krynex Labs targets continuous high availability during each calendar month, measured across core application endpoints. Scheduled maintenance windows (typically executed during low-traffic periods between 01:00 and 04:00 IST on Sundays) are announced in advance and are excluded from downtime calculations.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              In the event that monthly service availability falls below scheduled targets due to verifiable Krynex infrastructure failure, affected enterprise subscribers are eligible to receive prorated service credits applicable toward future subscription renewals upon written request within 30 days of the incident.
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
