import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: "https://www.krynexlabs.in/sitemap.xml",
    host: "https://www.krynexlabs.in",
  };
}
