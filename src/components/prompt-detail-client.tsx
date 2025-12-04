"use client";

import { useState } from "react";
import Link from "next/link";
import { Prompt } from "@/schemas/prompts.schema";
import { PromptForm } from "@/components/prompt-form";
import { PromptPreview } from "@/components/prompt-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getDefaultFieldValues } from "@/lib/prompt-generator";

interface PromptDetailClientProps {
    prompt: Prompt;
}

/**
 * Client component for prompt detail page
 * Two-column layout: form (left) and live preview (right)
 */
export function PromptDetailClient({ prompt }: PromptDetailClientProps) {
    const [fieldValues, setFieldValues] = useState<Record<string, string | number>>(
        getDefaultFieldValues(prompt)
    );

    const handleFieldChange = (name: string, value: string | number) => {
        setFieldValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-muted/20">
                <div className="container mx-auto px-6 md:px-8 py-6">
                    {/* Breadcrumb */}
                    <nav className="mb-4" aria-label="Breadcrumb">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/prompts" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Prompts
                            </Link>
                        </Button>
                    </nav>

                    {/* Page Title */}
                    <div className="space-y-3">
                        <h1 className="text-2xl md:text-3xl font-bold">{prompt.title}</h1>
                        <p className="text-muted-foreground">{prompt.description}</p>

                        {/* Tags */}
                        {prompt.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content - Two Column Layout */}
            <main className="container mx-auto px-6 md:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Form */}
                    <div className="order-2 lg:order-1">
                        <PromptForm
                            prompt={prompt}
                            fieldValues={fieldValues}
                            onFieldChange={handleFieldChange}
                        />
                    </div>

                    {/* Right Column: Preview (Sticky on desktop) */}
                    <div className="order-1 lg:order-2">
                        <div className="lg:sticky lg:top-8">
                            <PromptPreview prompt={prompt} fieldValues={fieldValues} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
