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
    default: "Krynex Labs | Custom Enterprise Software & Applied AI",
    template: "%s | Krynex Labs",
  },
  description:
    "Krynex Labs identifies real-world industry problems and engineers custom enterprise software, Applied AI architectures, and resilient web/mobile platforms.",
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
    title: "Krynex Labs | Custom Enterprise Software & Applied AI",
    description:
      "Krynex Labs identifies real-world industry problems and engineers custom enterprise software, Applied AI architectures, and resilient web/mobile platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | Custom Enterprise Software & Applied AI",
    description:
      "Krynex Labs identifies real-world industry problems and engineers custom enterprise software, Applied AI architectures, and resilient web/mobile platforms.",
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
