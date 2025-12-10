"use client";

import Link from "next/link";
import { Prompt } from "@/schemas/prompts.schema";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface PromptsPreviewSectionProps {
    prompts: Prompt[];
}

/**
 * Prompts preview section for homepage
 * Displays one prompt from each subcategory in a grid layout
 */
export function PromptsPreviewSection({ prompts }: PromptsPreviewSectionProps) {
    if (prompts.length === 0) return null;

    return (
        <section className="border-t bg-background">
            <div className="container mx-auto px-6 md:px-8 py-16">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Customer Service Prompts</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Ready-to-use prompts for handling customer requests
                            </p>
                        </div>
                    </div>

                    {/* View All Button - Desktop */}
                    <Button asChild variant="outline" className="hidden md:flex">
                        <Link href="/prompts" className="flex items-center gap-2">
                            View All Prompts
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* Prompts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                    {prompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="flex justify-center md:hidden">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/prompts" className="flex items-center gap-2">
                            View All Prompts
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
