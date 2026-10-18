import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, Server, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Enterprise Data Governance | Krynex Labs",
  description:
    "Enterprise data sovereignty, zero-trust encryption, and strict NDA compliance standards governing Krynex Labs client workflows and telemetry.",
};

export default function PrivacyPage() {
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
            <span>ENTERPRISE GOVERNANCE // ISO 27001 ALIGNED</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy &amp; Data Sovereignty
          </h1>
          <p className="text-zinc-400 text-sm font-mono">
            LAST REVISED: OCTOBER 2026 • AHMEDABAD ENGINEERING HEADQUARTERS
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Lock className="w-5 h-5 text-zinc-400" />
              1. Zero-Retention Client Data Guarantee
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              At Krynex Labs (&ldquo;Krynex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), enterprise confidentiality and client proprietary
              intelligence form our foundational baseline. Unlike consumer AI aggregators, Krynex Labs maintains an absolute zero-retention
              architecture: proprietary customer datasets, industrial logs, SCADA records, and ERP schemas are never utilized to train or fine-tune
              public or foundation neural models.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
              <div>&bull; ZERO PUBLIC MODEL CO-MINGLING</div>
              <div>&bull; ISOLATED TENANT CONTAINERIZATION</div>
              <div>&bull; DETERMINISTIC CRYPTOGRAPHIC DISPOSAL UPON PIPELINE COMPLETION</div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-zinc-400" />
              2. Cryptographic Security &amp; Ingestion Standards
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              All data transmitted during operational discovery, pipeline benchmarking, and enterprise IT deployment is encrypted
              in transit using TLS 1.3 with AES-256-GCM cipher suites and encrypted at rest using client-held hardware security module (HSM) keys.
              Internal telemetry logs are anonymized and mathematically scrubbed of all Personally Identifiable Information (PII)
              before aggregation into our Ahmedabad cluster diagnostics.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-5 h-5 text-zinc-400" />
              3. Telemetry &amp; Cookie Consent
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              This website employs minimal, non-invasive cookies solely for essential session persistence, regional CDN routing,
              and anonymous aggregate performance metrics. We do not engage in third-party behavioral ad tracking or cross-site fingerprinting.
              Visitors may choose &ldquo;Essential Only&rdquo; on our telemetry banner to disable all non-critical performance metrics without affecting site functionality.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-zinc-400" />
              4. Corporate Compliance &amp; Contact
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Inquiries regarding enterprise non-disclosure agreements (NDAs), data processing addenda (DPAs), and sovereign cloud isolation
              should be directed to our Legal and Data Protection Office:
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
              <div>OFFICE OF DATA PROTECTION &amp; ENTERPRISE GOVERNANCE</div>
              <div>KRYNEX LABS INC.</div>
              <div>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat 380054, India</div>
              <div>Direct: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
              <div>Executive Phone: <a href="tel:+917940000000" className="text-white underline">+91 (079) 4000-0000</a></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
