import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/communityData";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.domain;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
