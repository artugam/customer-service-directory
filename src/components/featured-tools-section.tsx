import Link from "next/link";
import { Platform } from "@/schemas/platform.schema";
import { FeaturedToolCard } from "@/components/featured-tool-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench } from "lucide-react";

interface FeaturedToolsSectionProps {
    platforms: Platform[];
}

/**
 * Featured tools section for homepage
 * Displays 4-5 tools in a horizontal scrollable layout
 * Similar to "Featured jobs" on cursor.directory
 */
export function FeaturedToolsSection({ platforms }: FeaturedToolsSectionProps) {
    return (
        <section className="border-t bg-muted/20">
            <div className="container mx-auto px-6 md:px-8 py-16">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Customer Service Tools</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Top-rated customer service platforms trusted by thousands
                            </p>
                        </div>
                    </div>

                    {/* View All Button */}
                    <Button asChild variant="outline" className="hidden md:flex">
                        <Link href="/support-tools" className="flex items-center gap-2">
                            View All Tools
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* Customer Service Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                    {platforms.map((platform) => (
                        <FeaturedToolCard key={platform.trade_name} platform={platform} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="flex justify-center md:hidden">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/support-tools" className="flex items-center gap-2">
                            View All Tools
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
