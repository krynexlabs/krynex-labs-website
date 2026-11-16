import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Cloud Infrastructure, Data & Zero-Trust Security",
  description:
    "Zero-trust cloud infrastructure, real-time streaming data pipelines (Kafka/Flink), and KMS cryptographic key management engineered for sovereign data isolation.",
  keywords: [
    "Cloud Data Infrastructure",
    "Zero-Trust Cloud Security",
    "Streaming Data Pipelines",
    "Kafka Flink Engineering India",
    "Enterprise Cloud Architecture Ahmedabad",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/cloud-data",
  },
  openGraph: {
    title: "Cloud Infrastructure, Data & Zero-Trust Security | Krynex Labs",
    description:
      "Zero-trust cloud infrastructure, real-time streaming data pipelines (Kafka/Flink), and KMS cryptographic key management engineered for sovereign data isolation.",
    url: "https://www.krynexlabs.in/solutions/cloud-data",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Cloud Infrastructure, Data & Zero-Trust Security - Krynex Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Infrastructure, Data & Zero-Trust Security | Krynex Labs",
    description:
      "Zero-trust cloud infrastructure, real-time streaming data pipelines (Kafka/Flink), and KMS cryptographic key management engineered for sovereign data isolation.",
    images: ["/opengraph-image"],
  },
};

const solutionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/solutions/cloud-data#breadcrumb",
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
          name: "Cloud Infrastructure & Data",
          item: "https://www.krynexlabs.in/solutions/cloud-data",
        },
      ],
    },
  ],
};

export default function CloudDataSolutionPage() {
  const solution = SOLUTIONS_DATA["cloud-data"];
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
