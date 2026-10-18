import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/data/solutions-data";
import SolutionDetailView from "@/components/SolutionDetailView";

export const metadata: Metadata = {
  title: "Custom Enterprise Software & Modernization | Krynex Labs",
  description:
    "Event-driven microservices, legacy monolith refactoring, and high-availability database engineering built for mission-critical enterprise throughput.",
  alternates: {
    canonical: "https://www.krynexlabs.in/solutions/enterprise-software",
  },
};

export default function EnterpriseSoftwareSolutionPage() {
  const solution = SOLUTIONS_DATA["enterprise-software"];
  if (!solution) return notFound();
  return <SolutionDetailView solution={solution} />;
}
