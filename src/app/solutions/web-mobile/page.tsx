import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Web & Mobile Application Engineering | Krynex Labs",
  description:
    "Sub-100ms full-stack web platforms, offline-first mobile apps, and interactive enterprise data visualizations built with Next.js and React Native.",
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/web-mobile",
  },
};

export default function WebMobileSolutionPage() {
  const solution = SOLUTIONS_DATA["web-mobile"];
  if (!solution) return notFound();
  return <SolutionDetailView solution={solution} />;
}
