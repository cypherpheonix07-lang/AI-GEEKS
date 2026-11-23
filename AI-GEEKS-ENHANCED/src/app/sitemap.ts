import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/communityData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const routes = [
    "",
    "/about",
    "/events",
    "/past-speakers",
    "/team",
    "/sponsor",
    "/socials",
    "/code-of-conduct",
    "/coc",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
