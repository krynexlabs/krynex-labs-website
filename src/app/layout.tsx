import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
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
    "Krynex Labs identifies real-world industry problems and develops software products, web applications, mobile apps, and SaaS platforms that businesses subscribe to and use.",
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
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.krynexlabs.in",
    siteName: "Krynex Labs",
    title: "Krynex Labs | Problem-Driven Software & SaaS Products",
    description:
      "Krynex Labs identifies real-world industry problems and develops software products, web applications, mobile apps, and SaaS platforms that businesses subscribe to and use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | Problem-Driven Software & SaaS Products",
    description:
      "Krynex Labs identifies real-world industry problems and develops software products, web applications, mobile apps, and SaaS platforms that businesses subscribe to and use.",
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

// Rich Snippets / JSON-LD Knowledge Graph
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.krynexlabs.in/#organization",
      name: "Krynex Labs",
      url: "https://www.krynexlabs.in",
      logo: "https://www.krynexlabs.in/opengraph-image",
      image: "https://www.krynexlabs.in/opengraph-image",
      email: "support@krynexlabs.in",
      telephone: "+91-98794-18569",
      currenciesAccepted: "INR, USD",
      priceRange: "₹1,499 - ₹18,500+",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sindhu Bhavan Road (SBR)",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380054",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "23.0225",
        longitude: "72.5714",
      },
      knowsAbout: [
        "Applied Artificial Intelligence",
        "Machine Learning",
        "Enterprise Software Architecture",
        "SaaS Product Development",
        "Cloud & Data Infrastructure",
        "Industrial Computer Vision",
        "Deterministic Legal Tech",
        "Zero-Trust Security",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-98794-18569",
          contactType: "customer support",
          email: "support@krynexlabs.in",
          areaServed: "IN",
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
      publisher: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.krynexlabs.in/products/krynex-lexis#software",
      name: "Krynex Lexis",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud SaaS, Web-based",
      description: "Bilingual Gujarati and English AI legal drafting and statutory conveyancing platform with deterministic revenue record integration.",
      offers: {
        "@type": "Offer",
        price: "1499",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.krynexlabs.in/products/krynex-flow#software",
      name: "Krynex Flow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud, Hybrid, On-Premise",
      description: "Enterprise workflow orchestrator and event middleware with deterministic state isolation and real-time ledger synchronization.",
      offers: {
        "@type": "Offer",
        price: "7999",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.krynexlabs.in/products/krynex-vision#software",
      name: "Krynex Vision",
      applicationCategory: "IndustrialApplication",
      operatingSystem: "Embedded Linux, NVIDIA Jetson, Industrial PC",
      description: "Sub-15ms edge computer vision and real-time telemetry inspection platform for zero-defect manufacturing lines.",
      offers: {
        "@type": "Offer",
        price: "18500",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
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
            text: "Krynex Labs operates on a problem-driven software rental model (Build → Launch → Subscribe → Maintain → Improve). Businesses pay a predictable monthly or annual recurring subscription to access production software, eliminating upfront capital expenditure while receiving continuous feature evolution, security patches, and 99.9% availability SLA.",
          },
        },
        {
          "@type": "Question",
          name: "Can Krynex software products operate on-premise without cloud latency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Products like Krynex Vision operate 100% offline at the factory edge using industrial computers (NVIDIA Jetson / IPC) with sub-15ms inference latency and local PLC pneumatic actuation. Products handling confidential corporate records, such as Krynex Lexis, feature zero-retention KMS envelope encryption.",
          },
        },
        {
          "@type": "Question",
          name: "How can businesses in Gujarat schedule a live demonstration or sandbox trial?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enterprises can request an executive walkthrough via our online contact portal or connect directly with our engineering team on WhatsApp at +91 9879418569 from our Ahmedabad headquarters on Sindhu Bhavan Road (SBR).",
          },
        },
        {
          "@type": "Question",
          name: "What industries does Krynex Labs build software products for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs investigates operational friction across Continuous Manufacturing & Precision Fabrication, LegalTech & Real Estate Conveyancing, Multimodal Logistics & Port Telematics, FinTech Banking Infrastructure, and Diagnostic Healthcare Systems.",
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

        {/* Floating WhatsApp Quick Action Button */}
        <WhatsAppButton />

        {/* Global Privacy & Cookie Consent */}
        <CookieBanner />
      </body>
    </html>
  );
}

