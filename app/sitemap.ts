import type { MetadataRoute } from "next";

/** sitemap.xml : les deux pages du site, pour aider Google à les trouver. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://jonathanjegard.com/vexi", changeFrequency: "weekly", priority: 1 },
    { url: "https://jonathanjegard.com/portfolio", changeFrequency: "monthly", priority: 0.8 },
  ];
}
