import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Mail,
  Shield,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Executive Consultation Portal",
  description:
    "Initiate an enterprise software product inquiry, request a sandbox trial, or submit an operational bottleneck to Krynex Labs engineering headquarters in Ahmedabad, India.",
  alternates: {
    canonical: "https://www.krynexlabs.in/contact",
  },
};

interface ContactPageProps {
  searchParams?: {
    product?: string;
  };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const initialProduct = searchParams?.product;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
            <span>PRODUCT &amp; PARTNERSHIP INQUIRIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Initiate Product Dialogue.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Whether you are evaluating a software product trial, exploring subscription onboarding, or submitting an unsolved industry problem for our R&amp;D team to investigate, our software architects respond within 1–2 business days.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-20 bg-[#030303]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Contacts & Credibility */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[#080808] border border-white/[0.08] space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Direct Messaging &amp; Inquiries
                  </div>
                  <a
                    href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20an%20industry%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1.5 text-white hover:text-zinc-300 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg group-hover:underline">
                        +91 9879418569
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400 w-fit">
                      Direct Messaging (WhatsApp Business) &bull; Scheduled Calls via Portal
                    </span>
                  </a>
                  <p className="text-xs text-zinc-400 mt-2">
                    Direct executive messaging for urgent technical inquiries and project briefs. Scheduled voice/video calls arranged upon inquiry review.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Corporate Email
                  </div>
                  <a
                    href="mailto:support@krynexlabs.in"
                    className="font-mono text-sm text-white hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span>support@krynexlabs.in</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Engineering Headquarters
                  </div>
                  <div className="flex items-start gap-2 text-xs text-zinc-300">
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="font-mono font-medium text-white leading-relaxed">
                      Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidentiality & Review Standards Card */}
              <div className="p-6 rounded-3xl bg-[#080808] border border-white/[0.08] space-y-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-white" />
                  <span>Confidentiality &amp; Data Privacy</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  Inquiries and operational challenges submitted through this portal are treated as strictly confidential business communications under our{" "}
                  <Link href="/privacy" className="underline hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  . Formal bilateral NDAs are executed prior to deep architectural discovery or enterprise software deployment.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>Standard Response Window: 1–2 Business Days</span>
                </div>
              </div>
            </div>

            {/* Right Column: Server-Rendered Inquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm initialProduct={initialProduct} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
