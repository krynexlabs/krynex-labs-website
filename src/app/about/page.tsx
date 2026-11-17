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
  Cpu,
  Server,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Problem-First Software Product Company",
  description:
    "Krynex Labs develops intelligent software products that help businesses simplify operations, improve productivity and manage complex workflows through modern technology. Headquartered in Ahmedabad, India.",
  keywords: [
    "About Krynex Labs",
    "Software Product Company Ahmedabad",
    "SaaS Company India",
    "Software Rental Subscription Model",
    "SolarOps Solar Software",
    "Krynex LawOS Legal Tech",
    "Enterprise Software Products",
    "Industrial Automation India",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/about",
  },
  openGraph: {
    title: "About Us | Problem-First Software Product Company",
    description:
      "Krynex Labs develops intelligent software products that help businesses simplify operations, improve productivity and manage complex workflows through modern technology. Headquartered in Ahmedabad, India.",
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
      "Krynex Labs develops intelligent software products that help businesses simplify operations, improve productivity and manage complex workflows through modern technology. Headquartered in Ahmedabad, India.",
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
        "Krynex Labs develops intelligent software products that help businesses simplify operations, improve productivity and manage complex workflows through modern technology.",
      isPartOf: {
        "@id": "https://www.krynexlabs.in/#website",
      },
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
  const { guidingPrinciples, vision, businessModel, approachPrinciples, governanceAndStandards } = ABOUT_DATA;
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
        "Krynex Labs was established with a singular focus: to operate as an independent software product company identifying real industry bottlenecks across commercial and industrial sectors.",
    },
    {
      period: "Field Research & Discovery",
      title: "Direct Operational Investigations",
      description:
        "Our engineering teams spent months observing day-to-day operations across regional solar installation sites and advocate conveyancing chambers to uncover where clerical latency and manual processes leak business value.",
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

      {/* 01. ABOUT KRYNEX LABS (Hero Section) */}
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

            {/* Exactly One H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Building Intelligent Software for Real-World Industries.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              Krynex Labs develops intelligent software products that help businesses simplify operations, improve productivity and manage complex workflows through modern technology.
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

      {/* 02. COMPANY OVERVIEW */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>02 // COMPANY OVERVIEW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Dedicated to Independent Software Products.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
              Headquartered in Ahmedabad, India, Krynex Labs operates primarily as a software product company. We identify real operational bottlenecks across commercial sectors, engineer focused applications, and provide ongoing access through predictable subscription models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-6">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  Problem-Driven Products
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  We do not build technology for its own sake or chase speculative trends. Every product starts with deep operational observation of actual industry friction points.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                FIRST-PRINCIPLES RESEARCH
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-6">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  Product, Not Custom Agency
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  We are not an IT body shop or staffing agency selling billable hours. We build, own, maintain, and continuously refine our own software applications.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                STANDALONE SAAS PLATFORMS
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-6">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  Compounding Value
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  Recurring subscription partnerships directly fund regular software enhancements, speed optimizations, security patches, and responsive technical support.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                CONTINUOUS EVOLUTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. MISSION & VISION */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                  03.1 // OUR MISSION
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
            <div className="p-6 sm:p-10 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                  03.2 // OUR VISION
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

      {/* 04. PRODUCT PHILOSOPHY */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <span>04 // PRODUCT PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              The Principles That Guide Us.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Every architectural decision, interface, and feature we build follows five core company commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidingPrinciples.map((item, idx) => (
              <div
                key={item.number}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
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

      {/* 05. PRODUCTS & TARGET INDUSTRIES */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>05 // PRODUCTS &amp; TARGET INDUSTRIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Approved Commercial Product Portfolio.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              We concentrate our software development on solving operational friction in two specific vertical industries: solar energy operations and legal document management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((prod) => (
              <div
                key={prod.slug}
                className="p-6 sm:p-10 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10">
                      {prod.status}
                    </span>
                    <span className="text-zinc-500">{prod.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    {prod.shortTagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                    {prod.summary}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-white/[0.04] mb-6">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Target Users:</div>
                    {prod.targetCustomers.slice(0, 3).map((cust, idx) => (
                      <div key={idx} className="text-xs text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>{cust}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-[#F5F5F5] text-[#050505] font-semibold text-xs hover:bg-white transition-all shadow-md"
                  >
                    <span>Explore {prod.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. ENGINEERING APPROACH */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Workflow className="w-3.5 h-3.5" />
              <span>06 // ENGINEERING APPROACH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Disciplined Product Lifecycle.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Our engineering lifecycle transforms operational friction into dependable software products through four disciplined phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachPrinciples.map((item) => (
              <div
                key={item.step}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div>
                  <div className="text-xs font-mono font-bold text-zinc-300 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 inline-block mb-6">
                    STAGE {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
                  PHASE {item.step} VERIFIED
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. SECURITY & RESPONSIBILITY */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>07 // SECURITY &amp; RESPONSIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Enterprise Protection &amp; Data Sovereignty.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              We design security, tenant isolation, and strict data governance into our software architectures from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governanceAndStandards.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
                  STANDARD // ZERO-COMPROMISE
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. COMPANY JOURNEY & VERIFIED MILESTONES */}
      <section className="py-24 border-b border-white/[0.08] bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>08 // COMPANY JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Our Journey &amp; Milestones.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              A transparent timeline of how Krynex Labs evolved from field observation into an active software product company.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((ms, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
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

      {/* 09. CONTACT INFORMATION */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5" />
            <span>09 // CONNECT WITH KRYNEX LABS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Get in Touch with Our Team.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8 font-sans">
            Headquartered in Ahmedabad, India. We welcome inquiries from prospective business customers, pilot partners, and enterprise collaborators.
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
              className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[44px] rounded-full bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
