import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Custom Enterprise Software & Legacy Modernization",
  description:
    "Event-driven microservices, legacy monolith refactoring, and high-availability database engineering built for mission-critical enterprise throughput.",
  keywords: [
    "Custom Enterprise Software",
    "Legacy Modernization",
    "Microservices Architecture India",
    "High-Availability Database Engineering",
    "Enterprise Software Ahmedabad",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/enterprise-software",
  },
  openGraph: {
    title: "Custom Enterprise Software & Legacy Modernization | Krynex Labs",
    description:
      "Event-driven microservices, legacy monolith refactoring, and high-availability database engineering built for mission-critical enterprise throughput.",
    url: "https://www.krynexlabs.in/solutions/enterprise-software",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Custom Enterprise Software & Modernization - Krynex Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Enterprise Software & Legacy Modernization | Krynex Labs",
    description:
      "Event-driven microservices, legacy monolith refactoring, and high-availability database engineering built for mission-critical enterprise throughput.",
    images: ["/opengraph-image"],
  },
};

const solutionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.krynexlabs.in/solutions/enterprise-software#service",
      name: "Custom Enterprise Software & Modernization",
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
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/solutions/enterprise-software#breadcrumb",
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
          name: "Custom Enterprise Software",
          item: "https://www.krynexlabs.in/solutions/enterprise-software",
        },
      ],
    },
  ],
};

export default function EnterpriseSoftwareSolutionPage() {
  const solution = SOLUTIONS_DATA["enterprise-software"];
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
