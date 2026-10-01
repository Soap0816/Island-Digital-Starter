import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

/** Add new routes here as the project grows (or generate them from a CMS). */
const routes = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route, siteConfig.seo.siteUrl),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.5,
  }));
}
