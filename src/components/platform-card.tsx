import Link from "next/link";
import { Platform } from "@/types/platform";
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
import { ExternalLink, Star } from "lucide-react";

interface PlatformCardProps {
  platform: Platform;
}

export function PlatformCard({ platform }: PlatformCardProps) {
  const lowestPrice =
    platform.pricing.length > 0
      ? platform.pricing[0].price === "$0"
        ? "Free"
        : `From ${platform.pricing[0].price}${platform.pricing[0].billingPeriod ? "/" + platform.pricing[0].billingPeriod.split("/")[1] : ""}`
      : "Custom pricing";

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-2xl">{platform.name}</CardTitle>
          <Badge variant="secondary">{platform.category}</Badge>
        </div>
        <CardDescription className="text-sm">
          {platform.description}
        </CardDescription>
        {platform.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{platform.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({platform.reviewCount} reviews)
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm">Pricing:</h4>
            <p className="text-lg font-bold text-primary">{lowestPrice}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {platform.pricing.length} plan{platform.pricing.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm">Best For:</h4>
            <div className="flex flex-wrap gap-1">
              {platform.bestFor.slice(0, 3).map((item) => (
                <Badge key={item} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {platform.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/platform/${platform.id}`}>View Details</Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
