"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Platform } from "@/types/platform";
import { generatePlatformId } from "@/lib/platforms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ExternalLink, X, Star, Download, FileText } from "lucide-react";
import {
  downloadComparisonCSV,
  downloadComparisonMatrix,
} from "@/lib/export-utils";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const initialPlatforms = searchParams.get("platforms")?.split(",") || [];

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatformIds, setSelectedPlatformIds] = useState<string[]>(
    initialPlatforms.slice(0, 3)
  );

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch("/api/platforms");
        const result = await response.json();
        if (result.success) {
          setPlatforms(result.data);
        }
      } catch (error) {
        console.error("Error fetching platforms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatforms();
  }, []);

  const selectedPlatforms = selectedPlatformIds
    .map((id) => platforms.find((p) => generatePlatformId(p.trade_name) === id))
    .filter((p): p is Platform => p !== undefined);

  const handleAddPlatform = (platformId: string) => {
    if (
      platformId &&
      !selectedPlatformIds.includes(platformId) &&
      selectedPlatformIds.length < 3
    ) {
      setSelectedPlatformIds([...selectedPlatformIds, platformId]);
    }
  };

  const handleRemovePlatform = (platformId: string) => {
    setSelectedPlatformIds(
      selectedPlatformIds.filter((id) => id !== platformId)
    );
  };

  const availablePlatforms = platforms.filter(
    (p) => !selectedPlatformIds.includes(generatePlatformId(p.trade_name))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading platforms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Link>
          </Button>

          <h1 className="text-4xl font-bold mb-2">Compare Platforms</h1>
          <p className="text-muted-foreground mb-4">
            Select up to 3 platforms to compare their features and pricing
          </p>

          {/* Export Buttons */}
          {selectedPlatforms.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => downloadComparisonCSV(selectedPlatforms)}
                variant="outline"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
              <Button
                onClick={() => downloadComparisonMatrix(selectedPlatforms)}
                variant="outline"
                size="sm"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export as Matrix
              </Button>
            </div>
          )}
        </div>

        {/* Platform Selector */}
        {selectedPlatformIds.length < 3 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Platform to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={handleAddPlatform}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a platform..." />
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms.map((platform) => {
                    const platformId = generatePlatformId(platform.trade_name);
                    return (
                      <SelectItem key={platformId} value={platformId}>
                        {platform.trade_name} - {platform.category_primary.split("/")[0].trim()}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedPlatforms.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Select at least one platform to start comparing
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedPlatforms.length}, minmax(350px, 1fr))` }}>
                {selectedPlatforms.map((platform) => {
                  const platformId = generatePlatformId(platform.trade_name);
                  return (
                    <Card key={platformId} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10"
                        onClick={() => handleRemovePlatform(platformId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <CardHeader>
                        <CardTitle className="text-2xl pr-8">
                          {platform.trade_name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {platform.company_name}
                        </p>
                        <Badge variant="secondary" className="w-fit">
                          {platform.category_primary.split("/")[0].trim()}
                        </Badge>
                        <div className="flex items-center gap-2 pt-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">
                            {platform.reputation.g2_rating}/5.0
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({platform.reputation.g2_reviews_count} reviews)
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Tagline */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Tagline</h3>
                          <p className="text-sm italic border-l-2 border-primary/30 pl-3">
                            &quot;{platform.tagline}&quot;
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Description</h3>
                          <p className="text-sm text-muted-foreground">
                            {platform.description}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Pricing Plans</h3>
                          <div className="space-y-2">
                            {platform.pricing.plans.slice(0, 4).map((tier, index) => (
                              <div
                                key={`${tier.name}-${index}`}
                                className="border rounded-lg p-3 bg-muted/30"
                              >
                                <div className="font-medium text-sm">{tier.name}</div>
                                <div className="text-base font-bold text-primary">
                                  {tier.price || tier.price_annual || tier.price_monthly || "Contact Sales"}
                                </div>
                              </div>
                            ))}
                            {platform.pricing.plans.length > 4 && (
                              <p className="text-xs text-muted-foreground text-center pt-1">
                                +{platform.pricing.plans.length - 4} more plans
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Key Features</h3>
                          <ul className="space-y-1.5 text-sm">
                            {platform.features.slice(0, 5).map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-primary font-bold">→</span>
                                <span className="text-muted-foreground">{feature.name}</span>
                              </li>
                            ))}
                          </ul>
                          {platform.features.length > 5 && (
                            <p className="text-xs text-muted-foreground mt-2">
                              +{platform.features.length - 5} more features
                            </p>
                          )}
                        </div>

                        {/* Target Audience */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Best For</h3>
                          <div className="flex flex-wrap gap-1">
                            {platform.target_audience.slice(0, 3).map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item.split(" ").slice(0, 3).join(" ")}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Top Integrations */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">
                            Top Integrations ({platform.integrations.total_integrations}+)
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {platform.integrations.top_integrations.slice(0, 6).map((int, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {int}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase">Stats</h3>
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Founded:</span> {platform.founded_year}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Customers:</span>{" "}
                              {platform.statistics.customer_count.split(";")[0]}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-4 border-t">
                          <Button asChild className="w-full">
                            <Link href={`/platform/${platformId}`}>
                              View Full Details
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={platform.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
