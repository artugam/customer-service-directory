import { getFeaturesServer } from "@/lib/feature-momentum";
import { FeatureMomentumTracker } from "@/components/feature-momentum-tracker";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Zap, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Feature Momentum Tracker | Customer Service Directory",
  description:
    "Track feature releases and innovation velocity across customer service platforms. Analyze trends, compare category distributions, and identify fastest-growing tools.",
  keywords: [
    "feature tracker",
    "product updates",
    "customer service features",
    "platform comparison",
    "innovation velocity",
    "AI features",
    "automation updates",
  ],
};

export default async function FeatureMomentumPage() {
  const { features_by_system } = getFeaturesServer();

  // Calculate summary stats
  const totalFeatures = features_by_system.reduce(
    (sum, system) => sum + system.features.length,
    0
  );
  const totalPlatforms = features_by_system.length;

  // Count features by category
  const categoryStats = features_by_system.reduce(
    (acc, system) => {
      system.features.forEach((feature) => {
        acc[feature.category] = (acc[feature.category] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const topCategory = Object.entries(categoryStats).sort(
    ([, a], [, b]) => b - a
  )[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Enterprise Intelligence</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Feature Momentum Tracker
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Monitor innovation velocity across customer service platforms. Track
              feature releases, identify trends, and make informed decisions about
              platform investments.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border">
                <div className="p-2 rounded-md bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalFeatures}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Total Features
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border">
                <div className="p-2 rounded-md bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalPlatforms}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Platforms Tracked
                  </div>
                </div>
              </div>

              {topCategory && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border">
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{topCategory[0]}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Top Category ({topCategory[1]} features)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <FeatureMomentumTracker systems={features_by_system} />
      </section>

      {/* Footer CTA */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need More Detailed Analysis?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore individual platform pages for comprehensive feature
            documentation, pricing analysis, and implementation guides.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/#platforms">Browse Platforms</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/compare">Compare Solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
