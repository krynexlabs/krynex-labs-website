import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";

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
    default: "Krynex Labs | Applied AI/ML & Enterprise IT Engineering Company",
    template: "%s | Krynex Labs (www.krynexlabs.in)",
  },
  description:
    "Krynex Labs is an elite Applied AI/ML and Enterprise Information Technology company headquartered at SBR, Ahmedabad, Gujarat, India. We identify critical industrial pain points and engineer custom neural architectures, automated workflows, and mission-critical cloud infrastructure.",
  keywords: [
    "Krynex Labs",
    "krynexlabs.in",
    "AI ML Company Ahmedabad",
    "IT Company SBR Ahmedabad",
    "Enterprise IT Company Gujarat",
    "Applied Artificial Intelligence India",
    "Custom Machine Learning Engineering",
    "Industrial Pain Point Automation",
    "Enterprise Software Architecture",
    "LLM Fine Tuning India",
    "Zero Trust Cloud Infrastructure",
    "B2B AI Research Lab",
  ],
  authors: [{ name: "Krynex Labs Corporate Engineering Division" }],
  creator: "Krynex Labs Inc.",
  publisher: "Krynex Labs Inc.",
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
    title: "Krynex Labs | Applied AI/ML & Enterprise IT Engineering Company",
    description:
      "Krynex Labs is an elite Applied AI/ML and Enterprise Information Technology company headquartered at SBR, Ahmedabad, Gujarat, India. We identify critical industrial pain points and engineer custom neural architectures, automated workflows, and mission-critical cloud infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | Applied AI/ML & Enterprise IT Engineering Company",
    description:
      "Krynex Labs is an elite Applied AI/ML and Enterprise Information Technology company headquartered at SBR, Ahmedabad, Gujarat, India.",
    creator: "@krynexlabs",
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
      "@type": ["Organization", "Corporation"],
      "@id": "https://www.krynexlabs.in/#organization",
      name: "Krynex Labs",
      alternateName: "Krynex Labs Inc.",
      url: "https://www.krynexlabs.in",
      logo: "https://www.krynexlabs.in/icon",
      email: "support@krynexlabs.in",
      telephone: "+91-98794-17569",
      address: {
        "@type": "PostalAddress",
        streetAddress: "SBR (Sindhu Bhavan Road)",
        addressLocality: "Ahmedabad",
        addressRegion: "GJ",
        postalCode: "380054",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "23.0415",
        longitude: "72.5085",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Enterprise Information Technology",
        "Cloud Architecture",
        "Industrial Automation",
        "Neural Networks",
        "Deterministic RAG Architecture",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-98794-17569",
          contactType: "customer support",
          email: "support@krynexlabs.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
      sameAs: [
        "https://twitter.com/krynexlabs",
        "https://www.linkedin.com/company/krynexlabs",
        "https://github.com/krynexlabs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.krynexlabs.in/#website",
      url: "https://www.krynexlabs.in",
      name: "Krynex Labs",
      description: "Applied AI/ML & Enterprise Information Technology Engineering",
      publisher: {
        "@id": "https://www.krynexlabs.in/#organization",
      },
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
        {/* Analytics Telemetry Tracker */}
        <Analytics />

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
      </body>
    </html>
  );
}
