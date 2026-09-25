import type { MetadataRoute } from "next";

/** robots.txt : tout le site est ouvert aux moteurs de recherche. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://jonathanjegard.com/sitemap.xml",
  };
}
