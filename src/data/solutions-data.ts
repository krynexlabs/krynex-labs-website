export interface SolutionItem {
  slug: string;
  title: string;
  description: string;
  features: string[];
}

export const SOLUTIONS_DATA: Record<string, SolutionItem> = {
  "ai-ml": {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Predictive analytics, computer vision for quality checks, and smart AI assistants trained on your business data.",
    features: [
      "Domain-tuned language models",
      "Edge computer vision & defect detection",
      "Predictive analytics & forecasting",
    ],
  },
  "web-mobile": {
    slug: "web-mobile",
    title: "Custom Web & Mobile Platforms",
    description:
      "Fast, intuitive applications and executive portals engineered for daily operational use.",
    features: [
      "Executive dashboards & web portals",
      "Cross-platform iOS and Android apps",
      "Responsive, high-throughput interfaces",
    ],
  },
  "enterprise-software": {
    slug: "enterprise-software",
    title: "System & ERP Integration",
    description:
      "Connecting legacy databases, accounting tools, and modern cloud apps so your data flows automatically without manual re-entry.",
    features: [
      "SAP, Oracle, and Tally connectors",
      "Automated cross-system ETL pipelines",
      "Real-time data synchronization",
    ],
  },
  "cloud-data": {
    slug: "cloud-data",
    title: "Cloud Infrastructure & DevOps",
    description:
      "Reliable cloud setup, automated deployments, and secure architecture on AWS and modern cloud platforms.",
    features: [
      "High-availability cloud architecture (> 99.9% uptime target)",
      "Automated CI/CD pipelines",
      "Zero-trust VPC security & backups",
    ],
  },
};
