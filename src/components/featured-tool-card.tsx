import Link from "next/link";
import Image from "next/image";
import { Platform } from "@/schemas/platform.schema";
import { generatePlatformId } from "@/lib/platforms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

    return (
        <Card className="group hover:shadow-md hover:border-primary/30 transition-all duration-500 ease-out h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Logo and Category */}
                <div className="flex items-start justify-between mb-4">
                    {platform.logo_url && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                            <Image
                                src={platform.logo_url}
                                alt={`${platform.trade_name} logo`}
                                width={48}
                                height={48}
                                className="object-contain p-1"
                            />
                        </div>
                    )}
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 ml-2 font-normal">
                        {primaryCategory}
                    </Badge>
                </div>

                {/* Platform Name */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {platform.trade_name}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {platform.tagline}
                </p>

                {/* CTA Button */}
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                    <Link href={`/platform/${platformId}`} className="flex items-center justify-center gap-2">
                        View
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
