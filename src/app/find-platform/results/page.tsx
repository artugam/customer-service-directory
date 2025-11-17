"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPlatforms } from "@/lib/platforms";
import { findTopMatches } from "@/lib/matching-algorithm";
import type { WizardAnswers, PlatformMatch } from "@/types/wizard";
import type { Platform } from "@/types/platform";

export default function ResultsPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<PlatformMatch[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [answers, setAnswers] = useState<WizardAnswers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      // Get wizard answers from session storage
      const answersJson = sessionStorage.getItem("wizardAnswers");
      if (!answersJson) {
        router.push("/find-platform");
        return;
      }

      const wizardAnswers: WizardAnswers = JSON.parse(answersJson);
      setAnswers(wizardAnswers);

      // Fetch platforms
      const platformData = await getPlatforms();
      setPlatforms(platformData);

      // Calculate matches
      const topMatches = findTopMatches(platformData, wizardAnswers, 5);
      setMatches(topMatches);
      setLoading(false);
    }

    loadResults();
  }, [router]);

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert("PDF export coming soon!");
  };

  const handleCompareAll = () => {
    // Navigate to comparison page with top matches
    if (matches.length > 0) {
      const platformIds = matches.slice(0, 3).map((m) => m.platformId);
      router.push(`/compare?platforms=${platformIds.join(",")}`);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("wizardAnswers");
    router.push("/find-platform");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No Matches Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find platforms matching your exact criteria. Try adjusting
          your requirements.
        </p>
        <Button onClick={handleStartOver}>Start Over</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Top Recommendations</h1>
          <p className="text-lg text-muted-foreground">
            Based on your answers, here are the {matches.length} best platforms
            for your needs
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={handleExportPDF} variant="outline">
            📄 Export as PDF
          </Button>
          <Button onClick={handleCompareAll} variant="outline">
            ⚖️ Compare Top 3
          </Button>
          <Button onClick={handleStartOver} variant="outline">
            🔄 Start Over
          </Button>
        </div>

        {/* Your Criteria Summary */}
        {answers && (
          <Card className="p-6 mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold mb-4">Your Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-muted-foreground">
                  Company Size
                </div>
                <div>{answers.companySize} employees</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Industry
                </div>
                <div>{answers.industry}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Support Volume
                </div>
                <div>{answers.supportVolume} tickets/month</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Team Size
                </div>
                <div>{answers.teamSize} agents</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Budget</div>
                <div>{answers.budget}/month</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">
                  Top Priority
                </div>
                <div>{answers.priorities[0] || "N/A"}</div>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        <div className="space-y-6">
          {matches.map((match, index) => {
            const platform = platforms.find(
              (p) => p.trade_name === match.tradeName
            );
            if (!platform) return null;

            const isTopPick = index === 0;

            return (
              <Card
                key={match.platformId}
                className={`p-6 relative ${
                  isTopPick
                    ? "border-2 border-green-500 shadow-lg"
                    : ""
                }`}
              >
                {isTopPick && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-green-600 text-white">
                      🏆 Top Pick
                    </Badge>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Platform Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          {platform.logo_url ? (
                            <img
                              src={platform.logo_url}
                              alt={platform.trade_name}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <span className="text-2xl font-bold">
                              {platform.trade_name[0]}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">
                            {platform.trade_name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {match.score}% Match
                            </Badge>
                            <div className="flex items-center text-sm">
                              ⭐ {platform.reputation.g2_rating}/5
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {platform.tagline}
                        </p>

                        {/* Match Reasons */}
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">
                            ✅ Why it's a great fit:
                          </div>
                          <ul className="space-y-1">
                            {match.matchReasons.map((reason, i) => (
                              <li
                                key={i}
                                className="text-sm text-green-700 dark:text-green-400"
                              >
                                • {reason}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Concerns */}
                        {match.concerns.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-2">
                              ⚠️ Things to consider:
                            </div>
                            <ul className="space-y-1">
                              {match.concerns.map((concern, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-orange-700 dark:text-orange-400"
                                >
                                  • {concern}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">
                            ${match.pricing.estimatedMonthly.toFixed(0)}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                          <span className="text-sm text-muted-foreground">
                            ({match.pricing.tier} tier)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-3 md:w-48">
                    <Link href={`/platform/${match.platformId}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                    <a
                      href={platform.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        Visit Website →
                      </Button>
                    </a>
                    {platform.pricing.free_trial && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 justify-center">
                        Free Trial Available
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Next Steps */}
        <Card className="p-6 mt-8 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-xl font-bold mb-4">Next Steps</h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li>Review the detailed pages for each recommended platform</li>
            <li>Compare your top 2-3 choices side-by-side</li>
            <li>Sign up for free trials to test them hands-on</li>
            <li>Use our TCO Calculator to understand true costs</li>
            <li>Generate a business case to present to stakeholders</li>
          </ol>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Need help making your final decision?
          </p>
          <Link href="/contact">
            <Button variant="outline">Get Expert Advice</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
