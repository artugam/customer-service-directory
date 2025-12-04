import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptById, getAllPrompts } from "@/lib/prompts";
import { generateJSONLD } from "@/lib/metadata";
import { PromptDetailClient } from "@/components/prompt-detail-client";

interface PromptPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: PromptPageProps): Promise<Metadata> {
    const { id } = await params;
    const prompt = getPromptById(id);

    if (!prompt) {
        return {
            title: "Prompt Not Found",
        };
    }

    return {
        title: `${prompt.title} | Customer Service Prompts`,
        description: prompt.description,
        openGraph: {
            title: prompt.title,
            description: prompt.description,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    const prompts = getAllPrompts();
    return prompts.map((prompt) => ({
        id: prompt.id,
    }));
}

export default async function PromptPage({ params }: PromptPageProps) {
    const { id } = await params;
    const prompt = getPromptById(id);

    if (!prompt) {
        notFound();
    }

    // JSON-LD for prompt page
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: prompt.title,
        description: prompt.description,
        step: prompt.requiredFields.map((field, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: field.description,
            text: field.placeholder,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD(jsonLd)}
            />
            <PromptDetailClient prompt={prompt} />
        </>
    );
}
