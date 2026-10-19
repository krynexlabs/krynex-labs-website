import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientTelemetry from "@/components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
    default: "Krynex Labs | Building What Comes Next.",
    template: "%s | Krynex Labs",
  },
  description:
    "Krynex Labs architects and engineers enterprise software systems, Applied AI architectures, and resilient technology solutions. Building What Comes Next.",
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
    title: "Krynex Labs | Building What Comes Next.",
    description:
      "Krynex Labs architects and engineers enterprise software systems, Applied AI architectures, and resilient technology solutions. Building What Comes Next.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | Building What Comes Next.",
    description:
      "Krynex Labs architects and engineers enterprise software systems, Applied AI architectures, and resilient technology solutions. Building What Comes Next.",
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
  themeColor: "#07090D",
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
        "Cloud & Data Infrastructure",
        "Industrial Computer Vision",
        "Zero-Trust Security",
        "Web & Mobile Application Engineering",
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
      description: "Custom Enterprise Software & Applied AI Engineering",
      publisher: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.krynexlabs.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does Krynex Labs provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs provides custom enterprise software engineering, Applied AI & neural architectures, modern web and mobile application engineering, and zero-trust cloud data infrastructure.",
          },
        },
        {
          "@type": "Question",
          name: "Can Krynex systems operate on-premise without cloud latency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Krynex engineers edge computer vision and local inference systems designed to run entirely on-premise on edge hardware without external cloud latency, protected by KMS envelope encryption.",
          },
        },
        {
          "@type": "Question",
          name: "How can businesses contact Krynex Labs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enterprises can submit an inquiry via our online contact portal or connect directly on WhatsApp at +91 9879418569 from our Ahmedabad headquarters on Sindhu Bhavan Road (SBR).",
          },
        },
        {
          "@type": "Question",
          name: "What industries does Krynex Labs investigate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs investigates operational friction across Manufacturing & Industrial IoT, LegalTech, Multimodal Logistics & Supply Chain, FinTech Banking Infrastructure, and Healthcare.",
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
        className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} bg-[#07090D] font-sans antialiased text-[#F5F7FA] min-h-screen selection:bg-[#00E5FF] selection:text-[#07090D] overflow-x-hidden max-w-[100vw] w-full`}
      >
        {/* Internal Diagnostic Telemetry Tracker */}
        <ClientTelemetry />

        {/* Vercel Speed Insights Performance Metrics */}
        <SpeedInsights />

        {/* Vercel Web Analytics */}
        <VercelAnalytics />

        {/* Atmospheric Cinematic Lighting & Background Grid */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-tech opacity-40" />
          {/* Subtle Electric-Cyan Atmospheric Bloom */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
          {/* Subtle Electric-Blue Horizon Atmospheric Shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[500px] bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(71,120,255,0.06),transparent_70%)] pointer-events-none" />
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
