import { Metadata } from "next";
import { Platform } from "@/schemas/platform.schema";

const baseUrl = "https://customer-service-directory.com";
const siteName = "Customer Service Directory";

export function generateSEOMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: { url: string; alt: string }[];
}): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = `${baseUrl}${path}`;

  const defaultImage = {
    url: `${baseUrl}/og-image.png`,
    width: 1200,
    height: 630,
    alt: siteName,
  };

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: images.length > 0
        ? images.map((img) => ({
            url: img.url,
            alt: img.alt,
          }))
        : [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.length > 0 ? [images[0].url] : [defaultImage.url],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generatePlatformMetadata(platform: Platform, path: string): Metadata {
  const keywords = [
    ...platform.seo_metadata.keywords,
    platform.trade_name,
    platform.company_name,
    "customer service software",
    "AI customer support",
    "help desk platform",
    "enterprise support solution",
  ];

  // Extract price info
  const lowestPrice = platform.pricing.plans
    .filter((p) => p.price_annual || p.price_monthly || p.price)
    .map((p) => {
      const price = p.price_annual || p.price_monthly || p.price || "";
      const match = price.match(/\$(\d+)/);
      return match ? parseInt(match[1]) : Infinity;
    })
    .sort((a, b) => a - b)[0];

  const priceText = lowestPrice !== Infinity ? ` - From $${lowestPrice}/month` : "";

  const description = `${platform.tagline} ${platform.description.slice(0, 150)}...${priceText} ${platform.pricing.free_trial ? "Free trial available." : ""} Compare features, pricing, and reviews.`;

  return generateSEOMetadata({
    title: `${platform.trade_name} Review 2025: Features, Pricing & Alternatives`,
    description,
    path,
    keywords,
    images: platform.logo_url
      ? [{ url: platform.logo_url, alt: `${platform.trade_name} logo` }]
      : [],
  });
}

export function generateJSONLD(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
