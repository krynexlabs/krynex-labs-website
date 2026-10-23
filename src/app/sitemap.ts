import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.krynexlabs.in";
  const lastReleaseDate = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/solutions", priority: 0.9, changeFrequency: "weekly" },
    { path: "/industries", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: lastReleaseDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
