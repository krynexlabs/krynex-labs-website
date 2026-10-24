import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ClientTelemetry from "@/components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.krynexlabs.in"),
  title: {
    default: "Krynex Labs | Problem-Driven Software & SaaS Products",
    template: "%s | Krynex Labs",
  },
  description:
    "Krynex Labs identifies real industry problems to engineer software products, web apps, mobile apps, and SaaS platforms businesses subscribe to and rely on.",
  keywords: [
    "Software Product Company Ahmedabad",
    "SaaS Products India",
    "Enterprise Software Engineering",
    "Applied AI Solutions",
    "Machine Learning Engineering",
    "Cloud Architecture & Data Engineering",
    "Web and Mobile App Development India",
    "Industrial Automation Software",
    "Deterministic Legal Tech",
    "Software Rental Subscription",
    "Krynex Labs Ahmedabad",
    "Krynex Labs",
  ],
  authors: [{ name: "Krynex Labs" }],
  creator: "Krynex Labs",
  publisher: "Krynex Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.krynexlabs.in",
    languages: {
      "en-IN": "https://www.krynexlabs.in",
      "en": "https://www.krynexlabs.in",
      "x-default": "https://www.krynexlabs.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.krynexlabs.in",
    siteName: "Krynex Labs",
    title: "Krynex Labs | Problem-Driven Software & SaaS Products",
    description:
      "Krynex Labs identifies real industry problems to engineer software products, web apps, mobile apps, and SaaS platforms businesses subscribe to and rely on.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | Problem-Driven Software & SaaS Products",
    description:
      "Krynex Labs identifies real industry problems to engineer software products, web apps, mobile apps, and SaaS platforms businesses subscribe to and rely on.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Rich Snippets / JSON-LD Knowledge Graph (Enterprise Schema 2.0)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Corporation", "ProfessionalService"],
      "@id": "https://www.krynexlabs.in/#organization",
      name: "Krynex Labs",
      legalName: "Krynex Labs",
      url: "https://www.krynexlabs.in",
      logo: "https://www.krynexlabs.in/opengraph-image",
      image: "https://www.krynexlabs.in/opengraph-image",
      email: "support@krynexlabs.in",
      slogan: "Architecting Intelligence for Industry.",
      currenciesAccepted: "INR, USD",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
        postalCode: "380015",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "23.0225",
        longitude: "72.5714",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:30",
          closes: "18:30",
        },
      ],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Ahmedabad" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Global" },
      ],
      knowsAbout: [
        "Applied Artificial Intelligence",
        "Machine Learning & Neural Architectures",
        "Enterprise Software Architecture",
        "SaaS Product Development",
        "Cloud & Data Infrastructure",
        "Industrial Computer Vision",
        "Zero-Trust Security & Cryptography",
        "High-Throughput Distributed Systems",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "technical support & executive briefing",
          email: "support@krynexlabs.in",
          areaServed: ["IN", "US", "GB", "AE", "SG"],
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
      sameAs: [
        "https://www.krynexlabs.in",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.krynexlabs.in/#website",
      url: "https://www.krynexlabs.in",
      name: "Krynex Labs",
      description: "Problem-Driven Software Products and SaaS Company",
      inLanguage: "en-IN",
      publisher: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.krynexlabs.in/solutions/ai-ml#service",
      name: "Applied AI & Neural Architectures",
      serviceType: "Artificial Intelligence & Machine Learning Engineering",
      provider: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
      url: "https://www.krynexlabs.in/solutions/ai-ml",
      description:
        "Custom neural architectures, LLM fine-tuning, deterministic RAG, and edge computer vision engineered for zero-error enterprise execution.",
      areaServed: "India, Global",
    },
    {
      "@type": "Service",
      "@id": "https://www.krynexlabs.in/solutions/enterprise-software#service",
      name: "Custom Enterprise Software & Architecture",
      serviceType: "Enterprise Software Engineering & Modernization",
      provider: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
      url: "https://www.krynexlabs.in/solutions/enterprise-software",
      description:
        "Event-driven microservices, legacy monolith refactoring, and high-availability database engineering built for mission-critical enterprise throughput.",
      areaServed: "India, Global",
    },
    {
      "@type": "Service",
      "@id": "https://www.krynexlabs.in/solutions/cloud-data#service",
      name: "Cloud Infrastructure, Data & Zero-Trust Security",
      serviceType: "Cloud Architecture & Data Engineering",
      provider: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
      url: "https://www.krynexlabs.in/solutions/cloud-data",
      description:
        "Zero-trust cloud infrastructure, real-time streaming data pipelines (Kafka/Flink), and KMS cryptographic key management engineered for sovereign data isolation.",
      areaServed: "India, Global",
    },
    {
      "@type": "Service",
      "@id": "https://www.krynexlabs.in/solutions/web-mobile#service",
      name: "Web Platforms & Mission-Critical Mobile Systems",
      serviceType: "Web & Mobile Platforms",
      provider: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
      url: "https://www.krynexlabs.in/solutions/web-mobile",
      description:
        "High-performance Next.js and React native/hybrid mobile engineering with offline-first synchronization and sub-100ms transactional responsiveness.",
      areaServed: "India, Global",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.krynexlabs.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Krynex Labs' software rental and subscription access model?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs operates on a problem-driven software rental model (Build → Launch → Subscribe → Maintain → Improve). Businesses pay a predictable monthly or annual recurring subscription to access production software, eliminating upfront capital expenditure while receiving continuous feature evolution, security patches, and high-availability enterprise infrastructure.",
          },
        },
        {
          "@type": "Question",
          name: "Can Krynex software systems operate on-premise without cloud latency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Krynex engineering systems can be containerized to operate air-gapped at the enterprise edge or on-premise data center using local hardware with low-latency inference targets and zero-retention KMS envelope encryption.",
          },
        },
        {
          "@type": "Question",
          name: "How can businesses in Ahmedabad or globally schedule an engineering briefing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enterprises can request an executive walkthrough via our online contact portal or connect directly with our engineering team via support@krynexlabs.in from our Ahmedabad (India) headquarters.",
          },
        },
        {
          "@type": "Question",
          name: "What industries does Krynex Labs build software products for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs investigates operational friction across Continuous Manufacturing & Precision Fabrication, LegalTech & Statutory Compliance, Multimodal Logistics & Telematics, FinTech Banking Infrastructure, and Diagnostic Healthcare Systems.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden max-w-[100vw]">
      <head>
        {/* Geo Audit & Local Search Optimization (Ahmedabad, Gujarat, India) */}
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad, Gujarat, India" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />

        {/* Schema.org Knowledge Graph Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-black font-sans antialiased text-zinc-100 min-h-screen selection:bg-white selection:text-black overflow-x-hidden max-w-[100vw] w-full`}
      >
        {/* Internal Diagnostic Telemetry Tracker */}
        <ClientTelemetry />

        {/* Vercel Speed Insights Performance Metrics */}
        <SpeedInsights />

        {/* Vercel Web Analytics */}
        <VercelAnalytics />

        {/* Background Grid & Spotlights */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-tech opacity-60" />
          {/* Exact Resend Top Silver/White Radial Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full overflow-x-hidden">{children}</div>

        {/* Global Privacy & Cookie Consent */}
        <CookieBanner />

        {/* Google Consent Mode v2 - Default Denial prior to Google Tag Loading (SEC-003) */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* Google tag (gtag.js) - Non-render-blocking via next/script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KZCMWZSRFN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-KZCMWZSRFN');
          `}
        </Script>
      </body>
    </html>
  );
}

