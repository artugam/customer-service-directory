"use client";

import { Platform } from "@/schemas/platform.schema";
import { FeaturedToolsSection } from "@/components/featured-tools-section";
import { AIFeaturesSection } from "@/components/ai-features-section";
import { FAQSection } from "@/components/faq-section";
import { HeroSearch } from "@/components/hero-search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Package, FolderTree, Puzzle, Sparkles } from "lucide-react";


interface HomeClientProps {
    platforms: Platform[];
    featuredPlatforms: Platform[];
    faqs: Array<{ question: string; answer: string }>;
}

export function HomeClient({ platforms, featuredPlatforms, faqs }: HomeClientProps) {
    // Calculate stats
    const totalIntegrations = platforms.reduce((sum, p) => {
        const count = typeof p.integrations.total_integrations === 'number'
            ? p.integrations.total_integrations
            : 0;
        return sum + count;
    }, 0);

    const categoryCount = new Set(platforms.map((p) => p.category_primary)).size;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="border-b bg-gradient-to-b from-muted/50 via-background to-background relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

                <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative">
                    <div className="max-w-5xl mx-auto text-center space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>AI-Powered Customer Service Solutions 2025</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Directory of Customer Service Tools
                        </h1>

                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Find and compare helpdesk software, live chat platforms, chatbots, and knowledge base solutions. Browse verified tools with detailed pricing and features.
                        </p>

                        {/* Prominent Search - Main Focal Point */}
                        <HeroSearch />

                        {/* Compact Stats - inline display */}
                        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <Package className="h-3.5 w-3.5 text-primary" />
                                <span>{platforms.length} tools</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FolderTree className="h-3.5 w-3.5 text-primary" />
                                <span>{categoryCount} categories</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Puzzle className="h-3.5 w-3.5 text-primary" />
                                <span>{totalIntegrations}+ integrations</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                <span>24/7 AI support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Service Tools Section */}
            <FeaturedToolsSection platforms={featuredPlatforms} />

            {/* AI Features Section */}
            <AIFeaturesSection />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} />

            {/* CTA Section */}
            <section className="border-t bg-muted/30">
                <div className="container mx-auto px-6 md:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Need Help Choosing?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Our enterprise platform comparison tool helps you evaluate solutions based on your specific requirements
                    </p>
                    <Button asChild size="lg" className="text-base px-8 h-12">
                        <Link href="/compare">
                            Compare Platforms
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
