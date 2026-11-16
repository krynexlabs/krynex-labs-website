import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ABOUT_DATA } from "@/data/about-data";
import { PRODUCTS_DATA } from "@/data/products-data";
import {
  Shield,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
  Compass,
  Quote,
  Target,
  Clock,
  Lock,
  Lightbulb,
  Building2,
  ChevronRight,
  Workflow,
  Sun,
  Scale,
  Mail,
  Calendar,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Problem-First Software Product Company",
  description:
    "Learn about Krynex Labs: Software Product and SaaS Company headquartered in Ahmedabad, India. Founded by D Patel to build intelligent technology solving real-world industry problems.",
  keywords: [
    "About Krynex Labs",
    "D Patel Krynex Labs",
    "Founder Krynex Labs",
    "Software Product Company Ahmedabad",
    "SaaS Company India",
    "Software Rental Subscription Model",
    "SolarOps Solar Software",
    "Krynex LawOS Legal Tech",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/about",
  },
  openGraph: {
    title: "About Us | Problem-First Software Product Company",
    description:
      "Learn about Krynex Labs: Software Product and SaaS Company headquartered in Ahmedabad, India. Founded by D Patel to build intelligent technology solving real-world industry problems.",
    url: "https://www.krynexlabs.in/about",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About Krynex Labs - Software Product & SaaS Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Problem-First Software Product Company",
    description:
      "Learn about Krynex Labs: Software Product and SaaS Company headquartered in Ahmedabad, India. Founded by D Patel to build intelligent technology solving real-world industry problems.",
    images: ["/opengraph-image"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.krynexlabs.in/about#webpage",
      url: "https://www.krynexlabs.in/about",
      name: "About Krynex Labs | Problem-First Software Product Company",
      description:
        "Learn about Krynex Labs: Software Product and SaaS Company headquartered in Ahmedabad, India. Founded by D Patel.",
      isPartOf: {
        "@id": "https://www.krynexlabs.in/#website",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.krynexlabs.in/#founder",
      name: "D Patel",
      jobTitle: "Founder",
      worksFor: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
      description:
        "Founder of Krynex Labs, building intelligent technology to solve real-world industry problems.",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/about#breadcrumb",
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
          name: "About",
          item: "https://www.krynexlabs.in/about",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  const { founder, guidingPrinciples, vision, businessModel } = ABOUT_DATA;
  const products = [
    PRODUCTS_DATA["solarops"],
    PRODUCTS_DATA["krynex-lawos"],
  ].filter(Boolean);

  const principleIcons = [
    <Compass key="1" className="w-5 h-5 text-zinc-300" />,
    <Lightbulb key="2" className="w-5 h-5 text-zinc-300" />,
    <Lock key="3" className="w-5 h-5 text-zinc-300" />,
    <Target key="4" className="w-5 h-5 text-zinc-300" />,
    <Clock key="5" className="w-5 h-5 text-zinc-300" />,
  ];

  const milestones = [
    {
      period: "Foundational Phase",
      title: "Establishment in Ahmedabad",
      description:
        "Krynex Labs was established with a singular focus: to operate as a product-first software company identifying real industry bottlenecks in western India's manufacturing and commerce hubs.",
    },
    {
      period: "Field Research & Discovery",
      title: "Direct Operational Investigations",
      description:
        "Our engineering teams spent months observing day-to-day operations across regional solar installation sites and advocate conveyancing chambers to uncover where clerical latency leaks business revenue.",
    },
    {
      period: "Product Engineering",
      title: "LawOS & SolarOps Architecture",
      description:
        "Engineered the core engines for Krynex LawOS (bilingual statutory deed compilation) and SolarOps (solar project execution and IoT generation telemetry).",
    },
    {
      period: "Current Stage",
      title: "Private Beta & Enterprise Pilots",
      description:
        "Actively working with early adopters and pilot customers in solar energy and legal practice to refine workflows, ensure zero-error reliability, and continuously improve our platforms.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#FFFFFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />

      {/* 1. ABOUT KRYNEX LABS (Hero Section) */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                </li>
                <li className="text-white">About</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>01 // ABOUT KRYNEX LABS</span>
            </div>

            {/* EXACTLY ONE H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Building Intelligent Software for Real-World Industries.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              Krynex Labs develops intelligent software products that help businesses simplify complex operations, improve productivity and manage their work more efficiently. Headquartered in Ahmedabad, India, we identify genuine industry challenges and transform them into practical, dependable software applications.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                <span>Software Product &amp; SaaS Company</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                <span>Predictable Subscription Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. COMPANY MISSION & VISION */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                  02 // OUR MISSION
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  Solve Real Challenges with Thoughtful Engineering
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  To identify operational bottlenecks across industries and engineer practical, intelligent, and reliable software products that reduce administrative burden, eliminate clerical errors, and create lasting business value.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
                PRACTICAL AUTOMATION // PROBLEM-FIRST MINDSET
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                  03 // OUR VISION
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  Make Advanced Software Practically Accessible
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  &ldquo;{vision.statement}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
                {vision.tagline}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. FOUNDER D. PATEL & FOUNDER'S MESSAGE */}
      <section id="founder" className="py-24 border-b border-white/[0.08] bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <Building2 className="w-3.5 h-3.5" />
            <span>04 &amp; 05 // LEADERSHIP &amp; FOUNDER&apos;S MESSAGE</span>
          </div>

          {/* Founder Identity Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-12">
            <div className="flex items-center gap-5">
              {/* Premium DP Monogram */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/20 flex items-center justify-center text-white font-mono font-bold text-2xl tracking-tight shadow-inner shrink-0">
                <span>DP</span>
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Founder
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  D. PATEL
                </h2>
                <div className="text-sm font-mono text-zinc-400 mt-1">
                  Founder, Krynex Labs
                </div>
              </div>
            </div>

            <div className="sm:text-right max-w-xs">
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {founder.tagline}
              </p>
              <div className="mt-1 text-[11px] font-mono text-zinc-500">
                AHMEDABAD, GUJARAT, INDIA
              </div>
            </div>
          </div>

          {/* Executive Message Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-8">
              <Quote className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
              A Message from the Founder
            </h3>

            <div className="space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans border-l-2 border-white/30 pl-6 sm:pl-8">
              <p className="text-base sm:text-lg text-white font-medium">
                &ldquo;Technology should solve real problems, simplify complex processes and create meaningful value.
              </p>
              <p>
                I believe the future belongs to software that is built around people&apos;s actual needs rather than technology for its own sake.
              </p>
              <p>
                At Krynex Labs, our focus is to identify challenges across industries and transform them into practical, intelligent and reliable software products.
              </p>
              <p>
                We are committed to building solutions that combine thoughtful engineering, modern technology, security and continuous innovation.
              </p>
              <p>
                Our journey is driven by a long-term vision: to build technology products that businesses can trust and depend on.
              </p>
              <p>
                We believe great software is not defined by how complicated it is, but by how effectively it solves problems.
              </p>
              <p>
                Thank you for being part of the Krynex Labs journey.&rdquo;
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <div>
                &mdash; <span className="text-white font-semibold">D. Patel</span>, Founder, Krynex Labs
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>EXECUTIVE DESK // AHMEDABAD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCTS BEING DEVELOPED */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <span>06 // PRODUCTS BEING DEVELOPED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Our Active Software Products
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We focus our development efforts on solving operational bottlenecks for solar project management and legal document automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((prod) => (
              <div
                key={prod.slug}
                className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10">
                      {prod.status}
                    </span>
                    <span className="text-zinc-500">{prod.category}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    {prod.shortTagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                    {prod.summary}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-white/[0.04] mb-6">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Target Users:</div>
                    {prod.targetCustomers.slice(0, 3).map((cust, idx) => (
                      <div key={idx} className="text-xs text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>{cust}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#F5F5F5] text-[#050505] font-semibold text-xs hover:bg-white transition-all shadow-md"
                  >
                    <span>View Product Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT PHILOSOPHY (The 5 Guiding Principles) */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <span>07 // PRODUCT PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every decision we make follows five core engineering and product commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidingPrinciples.map((item, idx) => (
              <div
                key={item.number}
                className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-zinc-300 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                      {item.number}
                    </span>
                    <div className="p-2 rounded-xl bg-white/[0.03] text-zinc-300">
                      {principleIcons[idx]}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
                  KRYNEX GUIDING PRINCIPLE #{item.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPANY JOURNEY & VERIFIED MILESTONES */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>08 // COMPANY JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Our Journey &amp; Milestones
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              A transparent timeline of how Krynex Labs evolved from field observation into an active software product company.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((ms, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="sm:max-w-xs shrink-0">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    PHASE 0{idx + 1}
                  </span>
                  <div className="text-lg font-bold text-white font-mono">
                    {ms.period}
                  </div>
                </div>

                <div className="flex-1 sm:pl-8 sm:border-l sm:border-white/[0.08]">
                  <h3 className="text-base font-bold text-white mb-2">
                    {ms.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {ms.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT INFORMATION */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5" />
            <span>09 // CONNECT WITH KRYNEX LABS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Get in Touch with Our Team
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
            Headquartered in Ahmedabad, India. We welcome inquiries from potential business customers, pilot partners, and enterprise collaborators.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#111111] border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 px-4">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>Ahmedabad, Gujarat, India (380015)</span>
            </div>
            <div className="hidden sm:block text-zinc-600">|</div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 px-4">
              <Mail className="w-4 h-4 text-zinc-400" />
              <a href="mailto:support@krynexlabs.in" className="hover:underline">
                support@krynexlabs.in
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Visit Online Contact Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
