import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.krynexlabs.in";
  const lastReleaseDate = new Date("2026-10-18");

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/products", priority: 0.95 },
    { path: "/products/krynex-lexis", priority: 0.9 },
    { path: "/products/krynex-flow", priority: 0.9 },
    { path: "/products/krynex-vision", priority: 0.9 },
    { path: "/solutions", priority: 0.9 },
    { path: "/solutions/ai-ml", priority: 0.85 },
    { path: "/solutions/cloud-data", priority: 0.85 },
    { path: "/solutions/enterprise-software", priority: 0.85 },
    { path: "/solutions/web-mobile", priority: 0.85 },
    { path: "/industries", priority: 0.85 },
    { path: "/approach", priority: 0.85 },
    { path: "/research", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.7 },
    { path: "/terms", priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: lastReleaseDate,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
