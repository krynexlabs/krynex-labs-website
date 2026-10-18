import Link from "next/link";
import { ArrowLeft, Shield, FileText, CheckCircle, Scale, Building2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service & SLA Governance | Krynex Labs",
  description:
    "Enterprise terms of engagement, 99.99% high-availability SLA, IP ownership, and liability standards governing Krynex Labs contracts.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top ambient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-10">
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
            <span>ENTERPRISE SERVICE LEVEL AGREEMENT // MNC GRADE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Terms of Service &amp; SLA Governance
          </h1>
          <p className="text-zinc-400 text-sm font-mono">
            OPERATING JURISDICTION: AHMEDABAD, GUJARAT, INDIA • OCTOBER 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-400" />
              1. Scope of Enterprise Engineering Services
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs Inc. provides applied artificial intelligence (AI), machine learning (ML), data intelligence,
              and enterprise cloud software engineering services. Specific delivery parameters, milestone schedules, and
              acceptance metrics are established through bilateral Statements of Work (SOW) executed between Krynex Labs and the client enterprise.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              2. 99.99% Mission-Critical SLA Commitment
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              For deployed enterprise runtime systems and managed neural microservices, Krynex Labs guarantees a monthly uptime of 99.99%,
              excluding scheduled maintenance notified at least 72 hours in advance. Failure to achieve the guaranteed SLA threshold entitles
              enterprise clients to proportionate service credits as defined in their master enterprise contract.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400">
              <div>
                <div className="text-white font-bold">&gt; 99.99% SLA</div>
                <div className="text-zinc-500 text-[11px]">Primary High-Availability Target</div>
              </div>
              <div>
                <div className="text-white font-bold">&lt; 15 Min MTTR</div>
                <div className="text-zinc-500 text-[11px]">Critical Incident Escalation</div>
              </div>
              <div>
                <div className="text-white font-bold">24/7/365 Mesh</div>
                <div className="text-zinc-500 text-[11px]">Ahmedabad SRE Monitoring</div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-zinc-400" />
              3. Intellectual Property Ownership
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Upon final payment for customized engineering deliverables, all custom-engineered pipeline logic, bespoke model weights,
              and client-specific automation workflows are the exclusive intellectual property of the client.
              Krynex Labs retains rights solely to its pre-existing core algorithmic frameworks and internal developer toolchains.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-zinc-400" />
              4. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              These terms and all related agreements shall be governed by and construed in accordance with the laws of the Republic of India.
              Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts
              in Ahmedabad, Gujarat, India.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
              <div>LEGAL AFFAIRS &amp; COMMERCIAL ARBITRATION</div>
              <div>KRYNEX LABS INC.</div>
              <div>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat 380054, India</div>
              <div>Inquiries: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
