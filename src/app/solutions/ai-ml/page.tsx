import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Applied AI & Neural Architectures",
  description:
    "Custom neural architectures, LLM fine-tuning, deterministic RAG, and edge computer vision engineered for zero-error enterprise execution.",
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/ai-ml",
  },
};

export default function AiMlSolutionPage() {
  const solution = SOLUTIONS_DATA["ai-ml"];
  if (!solution) return notFound();
  return <SolutionDetailView solution={solution} />;
}
