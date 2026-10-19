import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.krynexlabs.in";
  const lastReleaseDate = new Date("2026-10-19");

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/solutions", priority: 0.95, changeFrequency: "weekly" },
    { path: "/solutions/ai-ml", priority: 0.9, changeFrequency: "weekly" },
    { path: "/solutions/enterprise-software", priority: 0.9, changeFrequency: "weekly" },
    { path: "/solutions/web-mobile", priority: 0.9, changeFrequency: "weekly" },
    { path: "/solutions/cloud-data", priority: 0.9, changeFrequency: "weekly" },
    { path: "/industries", priority: 0.85, changeFrequency: "weekly" },
    { path: "/approach", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/research", priority: 0.8, changeFrequency: "weekly" },
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
