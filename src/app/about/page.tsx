import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { generateSEOMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = generateSEOMetadata({
  title: "About Customer Service Directory - Your Guide to Support Platforms",
  description:
    "Learn how Customer Service Directory helps businesses compare and choose the best AI-powered customer service platforms. Smart matching, TCO calculator, and business case generation tools.",
  path: "/about",
  keywords: [
    "customer service directory",
    "help desk comparison",
    "customer service platform reviews",
    "support software guide",
    "AI customer service comparison",
    "platform finder wizard",
    "TCO calculator",
  ],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect Customer Service Platform in Minutes
            </h1>
            <p className="text-xl text-muted-foreground">
              We're not just another directory. We're your decision partner with smart tools
              that accelerate software selection from months to days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/find-platform">Try Platform Finder →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/compare">Compare Platforms</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="border-2 border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-600" />
                The Problem We Solve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Choosing customer service software is overwhelming. With 200+ platforms,
                pricing pages that hide true costs, and decisions involving 5-10 stakeholders,
                the average B2B software purchase takes <strong>11.5 months</strong> and
                <strong>86% stall</strong> at some point.
              </p>
              <div className="grid gap-3 md:grid-cols-2 mt-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-orange-600">✗</div>
                  <p className="text-sm">Choice paralysis with 200+ options</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-orange-600">✗</div>
                  <p className="text-sm">Hidden costs lead to budget surprises</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-orange-600">✗</div>
                  <p className="text-sm">Hard to build business cases for stakeholders</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-orange-600">✗</div>
                  <p className="text-sm">Decisions take 6-12 months on average</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Solution */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Our Unique Approach</h2>
            <p className="text-lg text-muted-foreground">
              We built three powerful tools that transform how businesses choose customer service platforms
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2">
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Platform Finder Wizard</CardTitle>
                <CardDescription>200 platforms → 5 matches in 2 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Answer a few questions about your business. Our smart algorithm scores
                  every platform and shows you the top 5 matches with reasons why.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/find-platform">Try It Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>TCO Calculator</CardTitle>
                <CardDescription>See the REAL costs, not just pricing pages</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate 3-year total cost including implementation, training, integrations,
                  API limits, and hidden fees. No surprises.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/#platforms">Browse Platforms</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Business Case Generator</CardTitle>
                <CardDescription>Get stakeholder buy-in faster</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export comparison matrices, executive summaries, and TCO reports.
                  Everything you need for budget approval meetings.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/compare">Start Comparing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* What You Get */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What You Get</CardTitle>
              <CardDescription>
                Everything you need to make confident, fast decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Smart Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered algorithm matches platforms to your specific needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Honest Pricing</h3>
                    <p className="text-sm text-muted-foreground">
                      True cost transparency with TCO calculations and hidden fee alerts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      See common complaints, switching difficulty, and mitigation strategies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Export Everything</h3>
                    <p className="text-sm text-muted-foreground">
                      CSV, executive summaries, comparison matrices - ready for stakeholders
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
              <CardDescription>
                Find, evaluate, and decide in 3 simple steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Find Your Matches</h3>
                    <p className="text-sm text-muted-foreground">
                      Use the Platform Finder to answer 6 questions. Get your top 5 personalized
                      recommendations with match scores and reasoning.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Calculate True Costs</h3>
                    <p className="text-sm text-muted-foreground">
                      For each platform, run the TCO Calculator with your team size and volume.
                      See 3-year projections including all hidden fees.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Get Stakeholder Buy-In</h3>
                    <p className="text-sm text-muted-foreground">
                      Export comparison matrices and executive summaries. Present to your team
                      with professional, data-backed recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="py-12 text-center space-y-4">
              <h2 className="text-3xl font-bold">Ready to Find Your Perfect Platform?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join businesses who reduced their decision time from months to days
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/find-platform">Start Platform Finder</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
