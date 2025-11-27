import Link from "next/link";
import Image from "next/image";
import { Platform } from "@/schemas/platform.schema";
import { generatePlatformId } from "@/lib/platforms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface FeaturedToolCardProps {
    platform: Platform;
}

/**
 * Compact card component for featured tools section
 * Displays minimal information in a clean, scannable format
 */
export function FeaturedToolCard({ platform }: FeaturedToolCardProps) {
    const platformId = generatePlatformId(platform.trade_name);
    const primaryCategory = platform.category_primary.split("/")[0].trim();
    const rating = platform.reputation.g2_rating;

    // Get pricing display
    const getPricingDisplay = () => {
        if (platform.pricing.free_plan) return "Free Plan Available";
        if (platform.pricing.free_trial) return "Free Trial Available";
        const lowestPlan = platform.pricing.plans?.[0];
        if (lowestPlan?.price) return `From ${lowestPlan.price}`;
        return "Custom Pricing";
    };

    return (
        <Card className="group hover:-translate-y-1 hover:shadow-lg border-muted hover:border-primary/30 transition-all duration-300 ease-out h-full flex flex-col bg-card/50 hover:bg-card">
            <CardContent className="p-5 flex flex-col h-full">
                {/* Header: Logo & Category */}
                <div className="flex items-start justify-between mb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 mr-16">
                        {platform.logo_url ? (
                            <Image
                                src={platform.logo_url}
                                alt={`${platform.trade_name} logo`}
                                width={48}
                                height={48}
                                className="object-contain p-1.5"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xl">
                                {platform.trade_name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-medium bg-secondary/50 text-secondary-foreground/80">
                        {primaryCategory}
                    </Badge>
                </div>

                {/* Body: Title, Rating, Tagline */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                        {platform.trade_name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-sm font-medium text-foreground/80">{rating}</span>
                        <span className="text-xs text-muted-foreground">/ 5</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {platform.tagline}
                    </p>
                </div>

                {/* Footer: Price & Action */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Starting at</span>
                        <span className="text-xs font-semibold text-foreground/90">{getPricingDisplay()}</span>
                    </div>

                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                        <Link href={`/platform/${platformId}`} className="flex items-center gap-1.5">
                            <span className="text-xs font-medium">View</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
