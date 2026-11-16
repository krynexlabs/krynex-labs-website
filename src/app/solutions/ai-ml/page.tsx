import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Applied AI & Neural Architectures | Enterprise AI Solutions",
  description:
    "Custom neural architectures, LLM fine-tuning, deterministic RAG, and edge computer vision engineered for zero-error enterprise execution.",
  keywords: [
    "Applied AI Solutions",
    "Enterprise Neural Architectures",
    "Domain-Adapted LLMs",
    "Deterministic RAG India",
    "Edge Computer Vision Ahmedabad",
    "Machine Learning Engineering",
  ],
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/ai-ml",
  },
  openGraph: {
    title: "Applied AI & Neural Architectures | Enterprise AI Solutions | Krynex Labs",
    description:
      "Custom neural architectures, LLM fine-tuning, deterministic RAG, and edge computer vision engineered for zero-error enterprise execution.",
    url: "https://www.krynexlabs.in/solutions/ai-ml",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Applied AI & Neural Architectures - Krynex Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied AI & Neural Architectures | Enterprise AI Solutions | Krynex Labs",
    description:
      "Custom neural architectures, LLM fine-tuning, deterministic RAG, and edge computer vision engineered for zero-error enterprise execution.",
    images: ["/opengraph-image"],
  },
};

const solutionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
      "@type": "BreadcrumbList",
      "@id": "https://www.krynexlabs.in/solutions/ai-ml#breadcrumb",
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
          name: "Applied AI & Neural Architectures",
          item: "https://www.krynexlabs.in/solutions/ai-ml",
        },
      ],
    },
  ],
};

export default function AiMlSolutionPage() {
  const solution = SOLUTIONS_DATA["ai-ml"];
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
