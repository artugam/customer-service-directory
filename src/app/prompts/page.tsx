import { Metadata } from "next";
import { getAllCategories } from "@/lib/prompts";
import { generateJSONLD } from "@/lib/metadata";
import { PromptsListClient } from "@/components/prompts-list-client";

export const metadata: Metadata = {
    title: "Customer Service Prompts Library | Refund Requests & More",
    description:
        "Browse our comprehensive library of customer service prompts. Find ready-to-use templates for refund requests, customer support, and more. Streamline your customer service workflow.",
    openGraph: {
        title: "Customer Service Prompts Library",
        description:
            "Ready-to-use customer service prompts for refund requests and support workflows",
        type: "website",
    },
};

export default function PromptsPage() {
    const categories = getAllCategories();

    // JSON-LD for prompts page
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Customer Service Prompts Library",
        description:
            "Comprehensive library of customer service prompts for handling refund requests and customer support",
        url: "https://customer-service-directory.com/prompts",
        numberOfItems: categories.reduce(
            (sum, cat) => sum + cat.promptCount,
            0
        ),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD(jsonLd)}
            />
            <PromptsListClient categories={categories} />
        </>
    );
}
