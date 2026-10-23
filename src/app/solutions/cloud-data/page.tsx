import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Cloud Infrastructure, Data & Zero-Trust Security",
  description:
    "Zero-trust cloud infrastructure, real-time streaming data pipelines (Kafka/Flink), and KMS cryptographic key management engineered for sovereign data isolation.",
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/cloud-data",
  },
};

export default function CloudDataSolutionPage() {
  const solution = SOLUTIONS_DATA["cloud-data"];
  if (!solution) return notFound();
  return <SolutionDetailView solution={solution} />;
}
