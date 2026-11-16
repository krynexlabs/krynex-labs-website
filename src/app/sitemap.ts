import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.krynexlabs.in";
  const lastReleaseDate = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    // Core Institutional & Showcase
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },

    // Primary Product Directory & Dedicated Product Suites
    { path: "/products", priority: 0.95, changeFrequency: "weekly" },
    { path: "/products/solarops", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products/krynex-lawos", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products/dastaveg", priority: 0.85, changeFrequency: "weekly" },

    // Engineering Architecture & Technology
    { path: "/technology", priority: 0.85, changeFrequency: "weekly" },
    { path: "/approach", priority: 0.85, changeFrequency: "monthly" },
    { path: "/research", priority: 0.8, changeFrequency: "weekly" },

    // Industry Solutions & Domain Applications
    { path: "/industries", priority: 0.85, changeFrequency: "weekly" },
    { path: "/industries/solar", priority: 0.85, changeFrequency: "weekly" },
    { path: "/industries/legal", priority: 0.85, changeFrequency: "weekly" },

    // Technical Capabilities & Services
    { path: "/solutions", priority: 0.85, changeFrequency: "weekly" },
    { path: "/solutions/ai-ml", priority: 0.85, changeFrequency: "weekly" },
    { path: "/solutions/enterprise-software", priority: 0.85, changeFrequency: "weekly" },
    { path: "/solutions/web-mobile", priority: 0.85, changeFrequency: "weekly" },
    { path: "/solutions/cloud-data", priority: 0.85, changeFrequency: "weekly" },

    // Engineering Whitepapers & Resources
    { path: "/resources", priority: 0.85, changeFrequency: "weekly" },
    { path: "/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources/deterministic-statutory-conveyancing-bilingual-property-deeds", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources/product-led-saas-architecture-problem-first-engineering", priority: 0.8, changeFrequency: "monthly" },

    // Legal & Governance Framework
    { path: "/privacy", priority: 0.6, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.6, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: lastReleaseDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
