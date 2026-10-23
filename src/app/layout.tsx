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
    default: "Krynex Labs | AI & Software Engineering Studio",
    template: "%s | Krynex Labs",
  },
  description:
    "Krynex Labs designs custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks.",
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
    title: "Krynex Labs | AI & Software Engineering Studio",
    description:
      "Krynex Labs designs custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krynex Labs | AI & Software Engineering Studio",
    description:
      "Krynex Labs designs custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks.",
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
        "System & ERP Integration",
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
      description: "AI & Custom Enterprise Software Engineering Studio",
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
            text: "Krynex Labs engineers custom AI solutions, predictive machine learning models, bespoke enterprise web and mobile applications, ERP integrations, and resilient cloud infrastructure.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Krynex Labs located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Krynex Labs is headquartered at Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat, India.",
          },
        },
        {
          "@type": "Question",
          name: "How can businesses start a project with Krynex Labs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enterprises can reach out via our contact portal or message our engineering team directly on WhatsApp at +91 9879418569.",
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
        {/* Google tag (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KZCMWZSRFN"
        />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-KZCMWZSRFN');
            `,
          }}
        />

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

