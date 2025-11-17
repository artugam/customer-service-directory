import Link from "next/link";
import Image from "next/image";
import { Platform } from "@/types/platform";
import { generatePlatformId } from "@/lib/platforms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Award, Users, TrendingUp } from "lucide-react";

interface PlatformCardProps {
  platform: Platform;
}

export function PlatformCard({ platform }: PlatformCardProps) {
  const platformId = generatePlatformId(platform.trade_name);

  // Get lowest price plan
  const getLowestPrice = () => {
    if (platform.pricing.free_plan) return "Free Plan Available";
    if (platform.pricing.plans.length === 0) return "Contact Sales";

    const firstPlan = platform.pricing.plans[0];
    if (firstPlan.price === "$0/agent/month" || firstPlan.price === "$0/month") {
      return "Free Plan Available";
    }

    return `From ${firstPlan.price || firstPlan.price_annual || "Contact Sales"}`;
  };

  const lowestPrice = getLowestPrice();

  // Display G2 rating
  const displayRating = platform.reputation.g2_rating;
  const displayReviewCount = platform.reputation.g2_reviews_count;

  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 group">
      <CardHeader className="pb-4">
        {/* Logo and Badge Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {platform.logo_url && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <Image
                  src={platform.logo_url}
                  alt={`${platform.trade_name} logo`}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {platform.trade_name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {platform.company_name}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs whitespace-nowrap">
            {platform.category_primary.split("/")[0].trim()}
          </Badge>
        </div>

        {/* Tagline */}
        <p className="text-xs italic text-muted-foreground border-l-2 border-primary/30 pl-3 py-1">
          &quot;{platform.tagline}&quot;
        </p>

        {/* Description */}
        <CardDescription className="text-sm line-clamp-3 mt-2">
          {platform.description}
        </CardDescription>

        {/* Rating & Stats */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
          {displayRating && (
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{displayRating}</span>
              <span className="text-xs text-muted-foreground">
                ({displayReviewCount.toLocaleString()})
              </span>
            </div>
          )}
          {platform.reputation.awards && platform.reputation.awards.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>{platform.reputation.awards.length} Awards</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Pricing */}
        <div className="bg-muted/50 rounded-lg p-3 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Pricing
              </h4>
              <p className="text-lg font-bold text-primary">{lowestPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {platform.pricing.plans.length} plan{platform.pricing.plans.length !== 1 ? "s" : ""}
              </p>
              {platform.pricing.free_trial && (
                <Badge variant="outline" className="text-xs mt-1">
                  Free Trial
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
            <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium line-clamp-2">
                {platform.statistics.customer_count.split(";")[0]}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
            <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium">
                Founded {platform.founded_year}
              </p>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Best For
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {platform.target_audience.slice(0, 2).map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item.split(" ").slice(0, 4).join(" ")}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Key Features
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {platform.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-xs">
                <span className="mr-2 text-primary font-bold">→</span>
                <span className="line-clamp-1">{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild className="flex-1 group-hover:shadow-md transition-shadow">
          <Link href={`/platform/${platformId}`}>
            View Full Details
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a
            href={platform.website_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${platform.trade_name} website`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
