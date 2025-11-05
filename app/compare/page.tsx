"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { platforms } from "@/data/platforms";
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
import { ArrowLeft, ExternalLink, X } from "lucide-react";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const initialPlatforms = searchParams.get("platforms")?.split(",") || [];

  const [selectedPlatformIds, setSelectedPlatformIds] = useState<string[]>(
    initialPlatforms.slice(0, 3)
  );

  const selectedPlatforms = selectedPlatformIds
    .map((id) => platforms.find((p) => p.id === id))
    .filter(Boolean);

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
    (p) => !selectedPlatformIds.includes(p.id)
  );

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
          <p className="text-muted-foreground">
            Select up to 3 platforms to compare their features and pricing
          </p>
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
                  {availablePlatforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name} - {platform.category}
                    </SelectItem>
                  ))}
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
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedPlatforms.length}, 1fr)` }}>
                {selectedPlatforms.map((platform) => (
                  platform && (
                    <Card key={platform.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => handleRemovePlatform(platform.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <CardHeader>
                        <CardTitle className="text-2xl pr-8">
                          {platform.name}
                        </CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          {platform.category}
                        </Badge>
                        {platform.rating && (
                          <div className="text-sm">
                            <span className="font-semibold">
                              {platform.rating}/5.0
                            </span>{" "}
                            <span className="text-muted-foreground">
                              ({platform.reviewCount} reviews)
                            </span>
                          </div>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Description */}
                        <div>
                          <h3 className="font-semibold mb-2">Description</h3>
                          <p className="text-sm text-muted-foreground">
                            {platform.description}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div>
                          <h3 className="font-semibold mb-2">Pricing</h3>
                          <div className="space-y-2">
                            {platform.pricing.map((tier) => (
                              <div
                                key={tier.name}
                                className="border rounded-lg p-3"
                              >
                                <div className="font-medium">{tier.name}</div>
                                <div className="text-lg font-bold text-primary">
                                  {tier.price}
                                  {tier.billingPeriod && (
                                    <span className="text-sm font-normal text-muted-foreground">
                                      {" "}
                                      {tier.billingPeriod}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h3 className="font-semibold mb-2">Key Features</h3>
                          <ul className="space-y-1 text-sm">
                            {platform.features.map((feature) => (
                              <li key={feature} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Best For */}
                        <div>
                          <h3 className="font-semibold mb-2">Best For</h3>
                          <div className="flex flex-wrap gap-1">
                            {platform.bestFor.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Integrations */}
                        <div>
                          <h3 className="font-semibold mb-2">Integrations</h3>
                          <div className="flex flex-wrap gap-1">
                            {platform.integrations.slice(0, 6).map((int) => (
                              <Badge key={int} variant="secondary" className="text-xs">
                                {int}
                              </Badge>
                            ))}
                            {platform.integrations.length > 6 && (
                              <Badge variant="secondary" className="text-xs">
                                +{platform.integrations.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-4">
                          <Button asChild className="w-full">
                            <Link href={`/platform/${platform.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={platform.website}
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
                  )
                ))}
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
