import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Web Platforms & Mission-Critical Mobile Systems",
  description:
    "High-performance full-stack web platforms, offline-first mobile apps, and interactive enterprise data visualizations built with Next.js and React Native.",
  keywords: [
    "Web Application Development",
    "Mobile App Engineering Ahmedabad",
    "Next.js Development India",
    "Offline-First Mobile Systems",
    "React Native Enterprise Apps",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/web-mobile",
  },
  openGraph: {
    title: "Web Platforms & Mission-Critical Mobile Systems | Krynex Labs",
    description:
      "High-performance full-stack web platforms, offline-first mobile apps, and interactive enterprise data visualizations built with Next.js and React Native.",
    url: "https://www.krynexlabs.in/solutions/web-mobile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Web Platforms & Mission-Critical Mobile Systems - Krynex Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Platforms & Mission-Critical Mobile Systems | Krynex Labs",
    description:
      "High-performance full-stack web platforms, offline-first mobile apps, and interactive enterprise data visualizations built with Next.js and React Native.",
    images: ["/opengraph-image"],
  },
};

const solutionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/solutions/web-mobile#breadcrumb",
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
          name: "Solutions",
          item: "https://www.krynexlabs.in/solutions",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Web & Mobile Platforms",
          item: "https://www.krynexlabs.in/solutions/web-mobile",
        },
      ],
    },
  ],
};

export default function WebMobileSolutionPage() {
  const solution = SOLUTIONS_DATA["web-mobile"];
  if (!solution) return notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionJsonLd) }}
      />
      <SolutionDetailView solution={solution} />
    </>
  );
}
