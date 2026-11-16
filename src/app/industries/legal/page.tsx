import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, CheckCircle2, ArrowRight, ShieldCheck, FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal & Document Automation Software | Krynex Labs",
  description:
    "Explore how Krynex Labs researches legal clerical friction and engineers LawOS—deterministic bilingual legal document compilation and automated sub-registrar title search software.",
  alternates: {
    canonical: "https://www.krynexlabs.in/industries/legal",
  },
  openGraph: {
    title: "Legal & Document Automation Software | Krynex Labs",
    description:
      "Deterministic legal document compilation, automated title search dockets, and bilingual Gujarati-English statutory conveyancing software for Indian legal practice.",
    url: "https://www.krynexlabs.in/industries/legal",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal & Document Automation Software | Krynex Labs",
    description:
      "Deterministic legal document compilation, automated title search dockets, and bilingual Gujarati-English statutory conveyancing software for Indian legal practice.",
    images: ["/opengraph-image"],
  },
};

export default function LegalIndustryPage() {
  const bottlenecks = [
    {
      title: "Boilerplate Copy-Paste Risks",
      description:
        "Advocates and corporate title examiners spend hours re-typing standard legal clauses, creating constant risks of omitted statutory covenants or incorrect schedule coordinates.",
    },
    {
      title: "Bilingual Translation Ambiguity",
      description:
        "Regional land conveyancing requires parallel Gujarati and English covenants. Clumsy manual translation frequently introduces legal discrepancies between vernacular and English schedules.",
    },
    {
      title: "Multi-Decade Sub-Registrar Triage",
      description:
        "Title search dockets spanning 30+ years of sub-registrar Index-II records require tedious chronological transcription, increasing the risk of overlooked bank mortgages or encumbrances.",
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
              <li className="text-blue-400">Legal &amp; Document Automation</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
            <Scale className="w-3.5 h-3.5" />
            <span>INDUSTRY DOSSIER // LEGALTECH &amp; CONVEYANCING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Legal &amp; Document Automation Software
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            Drafting real estate deeds, title verification reports, and statutory legal notices in India has long been an administrative bottleneck. We research conveyancing friction and engineer deterministic legal software that eliminates clerical overhead without sacrificing precision.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products/lawos"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] flex items-center gap-2"
            >
              <span>Explore Krynex LawOS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-medium text-xs hover:bg-white/[0.08] transition-all"
            >
              Request Legal Briefing
            </Link>
          </div>
        </div>
      </section>

      {/* Operational Friction Section */}
      <section className="py-20 border-b border-white/[0.08] bg-[#0D121C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Clerical Friction in Indian Conveyancing &amp; Title Verification
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-10 max-w-2xl">
            Legal practice requires absolute statutory precision. Rather than unconstrained generative text that can hallucinate citations, legal teams need deterministic clause synthesis with mathematical verification.
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
              <span>KRYNEX LAWOS PLATFORM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Deterministic Bilingual Document Compilation
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
              Krynex LawOS structures property conveyancing into a deterministic abstract syntax tree. It compiles parallel Gujarati and English covenants, validates stamp duty requirements, and cross-references multi-decade revenue entries with dedicated KMS envelope encryption.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Bilingual Gujarati &amp; English AST</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Automated Revenue Record Ingestion</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Zero Public AI Model Training</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
