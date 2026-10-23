export interface IndustryItem {
  slug: string;
  name: string;
  problem: string;
  solution: string;
  focus: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    problem:
      "High-speed production lines suffer from undetected micro-defects and unplanned machinery downtime.",
    solution:
      "Automated edge quality inspection, machine telemetry monitoring, and real-time production tracking without cloud latency.",
    focus: "Automated quality inspection, equipment monitoring, and real-time production tracking.",
  },
  {
    slug: "fintech",
    name: "FinTech & Financial Services",
    problem:
      "Manual client document verification slows onboarding, creates compliance bottlenecks, and increases human error.",
    solution:
      "Automated document verification, secure transaction workflows, audit-ready data pipelines, and executive dashboards.",
    focus: "Automated document verification, secure transaction workflows, and fast reporting dashboards.",
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    problem:
      "Paper manifests, mismatched freight records, and delayed route updates cause delivery friction and demurrage costs.",
    solution:
      "Smart shipping document processing, connected freight telemetry, and automated delivery tracking.",
    focus: "Smart shipping document processing, fleet tracking, and route optimization.",
  },
  {
    slug: "enterprise",
    name: "Corporate & Enterprise Operations",
    problem:
      "Siloed departments waste thousands of manual hours re-entering data across accounting, CRM, and legacy ERP tools.",
    solution:
      "Connected internal tools, automated cross-departmental data bridges, and intelligent workflow assistants.",
    focus: "Eliminating repetitive data entry across departments with connected internal tools and AI workflows.",
  },
];
