import { MetadataRoute } from "next";
import { getPlatformsServer, generatePlatformId } from "@/lib/platforms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const platforms = await getPlatformsServer();
  const baseUrl = "https://customer-service-directory.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-customer-service`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  // Platform pages
  const platformPages: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: `${baseUrl}/platform/${generatePlatformId(platform.trade_name)}`,
    lastModified: new Date(platform.last_verified || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Category pages
  const categories = new Set(platforms.map((p) => p.category_primary));
  const categoryPages: MetadataRoute.Sitemap = Array.from(categories).map(
    (category) => ({
      url: `${baseUrl}/category/${category
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  return [...staticPages, ...platformPages, ...categoryPages];
}
