import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, Lock, EyeOff, Server, Mail, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Enterprise data sovereignty, cryptographic security standards, and privacy disclosures governing Krynex Labs client workflows, SaaS products, and contact inquiries.",
  alternates: {
    canonical: "https://www.krynexlabs.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Krynex Labs",
    description:
      "Enterprise data sovereignty, cryptographic security standards, and privacy disclosures governing Krynex Labs client workflows, SaaS products, and contact inquiries.",
    url: "https://www.krynexlabs.in/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Krynex Labs",
    description:
      "Enterprise data sovereignty, cryptographic security standards, and privacy disclosures governing Krynex Labs client workflows, SaaS products, and contact inquiries.",
  },
};

export default function PrivacyPage() {
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
            <span>ENTERPRISE GOVERNANCE &amp; PRIVACY DISCLOSURE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy &amp; Data Sovereignty
          </h1>
          <p className="text-zinc-400 text-xs font-mono">
            LAST REVISED: OCTOBER 2026 • AHMEDABAD ENGINEERING HEADQUARTERS
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Lock className="w-5 h-5 text-zinc-400" />
              1. Client Data Sovereignty &amp; Zero Public Model Co-Mingling
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              At Krynex Labs (&ldquo;Krynex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), enterprise confidentiality and client proprietary
              intelligence form our foundational baseline. Unlike consumer AI aggregators, Krynex Labs maintains an absolute zero public model
              co-mingling policy: proprietary customer datasets, industrial logs, SCADA records, and ERP schemas processed by our software products
              and platforms are never utilized to train or fine-tune public or foundation neural models.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
              <div>&bull; ZERO PUBLIC MODEL CO-MINGLING</div>
              <div>&bull; ISOLATED TENANT CONTAINERIZATION</div>
              <div>&bull; CLIENT-CONTROLLED ENCRYPTION KEYS FOR SENSITIVE WORKFLOWS</div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-zinc-400" />
              2. Information Collected via Website &amp; Technical Inquiries
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              When prospective enterprise partners submit project inquiries via our website or consultation portal, we collect business contact
              details necessary to establish and administer commercial discussions:
            </p>
            <ul className="space-y-2 text-xs text-zinc-400 pl-4 list-disc">
              <li>
                <strong className="text-white">Contact Information:</strong> Executive name, corporate email address, and company/sector designation.
              </li>
              <li>
                <strong className="text-white">Project Scope &amp; Friction Details:</strong> High-level operational challenges, workflow requirements, or software licensing inquiries submitted through our forms.
              </li>
              <li>
                <strong className="text-white">Technical Access Logs:</strong> Standard HTTP server logs (IP address, browser user-agent, request timestamps) captured at the network edge for security, DDoS mitigation, and operational integrity.
              </li>
            </ul>
            <p className="text-zinc-400 text-xs">
              Contact and inquiry submissions are retained for up to 24 months from the date of submission to maintain commercial continuity and technical evaluation records, unless earlier deletion is requested by the data subject. Inquiries are never sold, rented, or brokered to any third party.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-5 h-5 text-zinc-400" />
              3. Categories of Infrastructure Sub-Processors
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Krynex Labs engages enterprise cloud and edge infrastructure sub-processors subject to strict data processing agreements, zero-retention commitments, and KMS envelope encryption:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#080808] border border-white/[0.08]">
                <div className="text-white font-semibold mb-1">Edge CDN &amp; Cloud Hosting</div>
                <div className="text-zinc-400">Vercel Inc. (Edge Network &amp; Serverless SSR Runtime)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080808] border border-white/[0.08]">
                <div className="text-white font-semibold mb-1">Transactional Communication</div>
                <div className="text-zinc-400">Enterprise Email Relay (Inquiry Notification Delivery)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080808] border border-white/[0.08]">
                <div className="text-white font-semibold mb-1">Data Storage &amp; Encryption</div>
                <div className="text-zinc-400">Isolated VPC Instances with KMS Hardware Envelope Keys</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080808] border border-white/[0.08]">
                <div className="text-white font-semibold mb-1">Local Edge Inference</div>
                <div className="text-zinc-400">100% On-Premise Air-Gapped Appliances (Krynex Vision)</div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-zinc-400" />
              4. Telemetry, Cookies &amp; User Choices
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              This website employs minimal, non-invasive cookies solely for essential session persistence, regional CDN routing,
              and anonymous aggregate performance metrics. We do not engage in third-party behavioral advertising tracking or cross-site fingerprinting.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Visitors may choose &ldquo;Essential Only&rdquo; on our telemetry banner to disable all non-critical performance metrics without affecting site functionality. Your preference is persisted locally in your browser (<code className="text-zinc-200">krynex_cookie_consent</code>) and may be cleared at any time via your browser settings.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-zinc-400" />
              5. Data Subject Rights &amp; DPDP Grievance Officer
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              In accordance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023 and international privacy standards, data subjects hold the right to access, rectify, or request erasure of personal data held by Krynex Labs.
            </p>
            <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1.5">
              <div className="text-white font-bold">DESIGNATED PRIVACY &amp; GRIEVANCE OFFICER</div>
              <div>Entity: KRYNEX LABS</div>
              <div>Location: Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India</div>
              <div>Grievance Email: <a href="mailto:support@krynexlabs.in" className="text-white underline">support@krynexlabs.in</a></div>
              <div>Direct Messaging: <a href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20have%20a%20data%20governance%20inquiry." target="_blank" rel="noopener noreferrer" className="text-white underline">+91 9879418569</a> <span className="text-[10px] text-zinc-400 font-mono">(Direct Messaging • WhatsApp Business)</span></div>
              <div className="text-[11px] text-zinc-500 pt-1">Response Window: All statutory data privacy and grievance inquiries are acknowledged within 24 hours.</div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
