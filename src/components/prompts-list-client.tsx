"use client";

import { useState } from "react";
import Link from "next/link";
import { PromptCategory } from "@/schemas/prompts.schema";
import { PromptCard } from "@/components/prompt-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare } from "lucide-react";

interface PromptsListClientProps {
    categories: PromptCategory[];
}

/**
 * Client component for prompts list page
 * Displays all prompts organized by category and subcategory
 */
export function PromptsListClient({ categories }: PromptsListClientProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(categories.map((cat) => cat.id))
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <header className="border-b bg-muted/20">
                <div className="container mx-auto px-6 md:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6" aria-label="Breadcrumb">
                        <Button asChild variant="ghost" size="sm" className="mb-4">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </nav>

                    {/* Page Title */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                            <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Customer Service Prompts
                            </h1>
                            <p className="text-lg text-muted-foreground mt-1">
                                Browse {categories.reduce((sum, cat) => sum + cat.promptCount, 0)} ready-to-use prompts for customer service
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-8 py-12">
                {categories.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">
                            No prompts available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map((category) => (
                            <section
                                key={category.id}
                                id={category.id}
                                className="scroll-mt-8"
                            >
                                {/* Category Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-4xl" aria-hidden="true">
                                            {category.icon}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h2 className="text-2xl md:text-3xl font-bold">
                                                    {category.name}
                                                </h2>
                                                <Badge variant="secondary">
                                                    {category.promptCount} prompts
                                                </Badge>
                                                {category.popularity === "high" && (
                                                    <Badge variant="default">Popular</Badge>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mt-2">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Subcategories */}
                                <div className="space-y-12">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id} className="space-y-6">
                                            {/* Subcategory Header */}
                                            <div className="border-l-4 border-primary pl-4">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-xl font-semibold">
                                                        {subcategory.name}
                                                    </h3>
                                                    <Badge variant="outline" className="text-xs">
                                                        {subcategory.promptCount} prompts
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {subcategory.description}
                                                </p>
                                            </div>

                                            {/* Prompts Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {subcategory.prompts.map((prompt) => (
                                                    <PromptCard key={prompt.id} prompt={prompt} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
