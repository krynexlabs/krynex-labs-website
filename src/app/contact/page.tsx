import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Krynex Labs",
  description:
    "Get personal, reliable engineering from people who understand your architecture. Reach out to Krynex Labs in Ahmedabad, India.",
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

      {/* Resend-Style Hero & Centered Form Section */}
      <section className="relative pt-32 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
        {/* Soft Monochromatic Silk Drapery Highlights (Resend brand visual) */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),rgba(255,255,255,0.02)_40%,transparent_70%)] pointer-events-none blur-2xl" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none blur-3xl" />
        {/* Top Center Specular Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Business Hours Text (Exact Resend format) */}
          <p className="text-xs sm:text-sm text-zinc-400 font-normal mb-5">
            Business Hours: 9:30 AM to 6:30 PM IST • Ahmedabad, India
          </p>

          {/* Large Bold Editorial Headline (Exact Resend treatment) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.08]">
            <span className="text-white block">Experience better</span>
            <span className="bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent block">support today</span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-12">
            Get personal, reliable support from people who know your setup and care about your success.
          </p>

          {/* Centered Minimalist Form */}
          <div className="text-left mb-16">
            <ContactForm initialProduct={initialProduct} />
          </div>

          {/* Subtle Direct Contact Badges Below Form */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono pt-8 border-t border-white/[0.06] max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <a href="mailto:support@krynexlabs.in" className="hover:text-white transition-colors underline underline-offset-2">
                support@krynexlabs.in
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Ahmedabad, India</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Response: 1–2 Business Days</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
