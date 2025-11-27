import { getPlatformsServer } from "@/lib/platforms";
import { generateJSONLD } from "@/lib/metadata";
import { SupportToolsClient } from "@/components/support-tools-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Support Tools Directory | Customer Service Platforms",
    description:
        "Browse and compare customer service tools, help desk software, and AI support platforms. Find the perfect solution for your business with advanced search and filtering.",
    keywords: [
        "customer service tools",
        "help desk software",
        "support platforms",
        "AI customer service",
        "live chat software",
        "ticketing system",
        "customer support software",
    ],
    openGraph: {
        title: "Support Tools Directory | Customer Service Platforms",
        description:
            "Browse and compare customer service tools, help desk software, and AI support platforms.",
        type: "website",
    },
};

export default async function SupportToolsPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const platforms = await getPlatformsServer();
    const initialQuery = searchParams.q || "";

    // JSON-LD for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Support Tools Directory",
        description:
            "Comprehensive directory of customer service tools and platforms. Compare features, pricing, and reviews to find the best solution for your business.",
        url: "https://customer-service-directory.com/support-tools",
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://customer-service-directory.com",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Support Tools",
                    item: "https://customer-service-directory.com/support-tools",
                },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD(jsonLd)}
            />
            <SupportToolsClient platforms={platforms} initialQuery={initialQuery} />
        </>
    );
}
