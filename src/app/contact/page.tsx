import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MapPin, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Engineering & Enterprise Briefings",
  description:
    "Connect with Krynex Labs for enterprise software architectures, subscription licensing, industry problem proposals, or partnership inquiries. Headquartered in Ahmedabad, India.",
  keywords: [
    "Contact Krynex Labs",
    "Enterprise Software Consultation Ahmedabad",
    "Software Product Subscription Inquiry",
    "Software Architecture Briefing India",
    "Krynex Labs Support",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/contact",
  },
  openGraph: {
    title: "Contact Engineering & Enterprise Briefings | Krynex Labs",
    description:
      "Connect with Krynex Labs for enterprise software architectures, subscription licensing, industry problem proposals, or partnership inquiries. Headquartered in Ahmedabad, India.",
    url: "https://www.krynexlabs.in/contact",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact Krynex Labs - Engineering & Enterprise Briefings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Engineering & Enterprise Briefings | Krynex Labs",
    description:
      "Connect with Krynex Labs for enterprise software architectures, subscription licensing, industry problem proposals, or partnership inquiries. Headquartered in Ahmedabad, India.",
    images: ["/opengraph-image"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.krynexlabs.in/contact#webpage",
      url: "https://www.krynexlabs.in/contact",
      name: "Contact Engineering & Enterprise Briefings | Krynex Labs",
      description:
        "Connect with Krynex Labs for enterprise software architectures, subscription licensing, industry problem proposals, or partnership inquiries.",
      isPartOf: {
        "@id": "https://www.krynexlabs.in/#website",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/contact#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.krynexlabs.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://www.krynexlabs.in/contact",
        },
      ],
    },
  ],
};

interface ContactPageProps {
  searchParams?: {
    product?: string;
  };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const initialProduct = searchParams?.product;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Navbar />

      {/* Resend-Style Hero & Centered Form Section with Silk Drapery Backdrop */}
      <section className="relative pt-32 pb-24 sm:pt-36 sm:pb-32 overflow-hidden min-h-[92vh] flex items-center justify-center">
        {/* Resend 3D Silk Drapery Photographic Backdrop (Exact authentic visual) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/static/background-auth.jpg"
            alt="Krynex Labs enterprise inquiry portal backdrop"
            fill
            priority
            quality={100}
            className="object-cover object-top opacity-60 sm:opacity-85"
          />
          {/* Contrast and Vignette Mask: Keeps center form ultra crisp while silk shines on periphery */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_65%,rgba(0,0,0,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

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

      <Footer hideInquirySection={true} />
    </main>
  );
}
