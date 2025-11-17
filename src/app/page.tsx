import { getPlatformsServer } from "@/lib/platforms";
import { PlatformCard } from "@/components/platform-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";

export default async function Home() {
  const platforms = await getPlatformsServer();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 via-background to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <Shield className="h-4 w-4 text-primary" />
              <span>Enterprise-Grade Customer Service Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Customer Service Platform Directory
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Compare enterprise-ready customer service platforms. Find the perfect solution with detailed pricing, features, and expert insights.
            </p>

            <div className="flex gap-4 justify-center pt-6 flex-wrap">
              <Button asChild size="lg" className="text-base px-8 h-12">
                <Link href="#platforms">
                  Explore Platforms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <Link href="/compare">Compare Solutions</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>AI-Powered Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Verified Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="text-5xl font-bold text-primary mb-2">
                {platforms.length}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Enterprise Platforms
              </div>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="text-5xl font-bold text-primary mb-2">
                {new Set(platforms.map((p) => p.category_primary)).size}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Categories
              </div>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="text-5xl font-bold text-primary mb-2">
                {platforms.reduce((sum, p) => {
                  const count = typeof p.integrations.total_integrations === 'number'
                    ? p.integrations.total_integrations
                    : 0;
                  return sum + count;
                }, 0)}+
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Total Integrations
              </div>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border">
              <div className="text-5xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                AI-Powered Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise Customer Service Platforms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive comparison of leading customer service platforms trusted by Fortune 500 companies
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-medium">
            Showing {platforms.length} verified platforms
          </p>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <PlatformCard key={platform.trade_name} platform={platform} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our enterprise platform comparison tool helps you evaluate solutions based on your specific requirements
          </p>
          <Button asChild size="lg" className="text-base px-8 h-12">
            <Link href="/compare">
              Compare Platforms
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
