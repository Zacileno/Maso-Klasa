import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

// Public pages only; /admin is noindex and stays out.
const pages = ["/", "/kariera", "/kontakt"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Generated at build time, so lastmod = date of the last deployment.
  const lastModified = new Date();
  return pages.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));
}
