import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPlatformsServer, generatePlatformId } from "@/lib/platforms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Star,
  Award,
  Users,
  Building2,
  Calendar,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

export async function generateStaticParams() {
  const platforms = await getPlatformsServer();
  return platforms.map((platform) => ({
    id: generatePlatformId(platform.trade_name),
  }));
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const platforms = await getPlatformsServer();
  const platform = platforms.find(
    (p) => generatePlatformId(p.trade_name) === id
  );

  if (!platform) {
    notFound();
  }

  const platformId = generatePlatformId(platform.trade_name);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>

        {/* Header Section */}
        <div className="mb-12 p-8 bg-gradient-to-br from-muted/50 to-background border rounded-2xl">
          <div className="flex items-start gap-6 mb-6">
            {platform.logo_url && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-background border-2 flex items-center justify-center flex-shrink-0">
                <Image
                  src={platform.logo_url}
                  alt={`${platform.trade_name} logo`}
                  width={96}
                  height={96}
                  className="object-contain p-2"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-5xl font-bold mb-2">
                    {platform.trade_name}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {platform.company_name}
                  </p>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {platform.category_primary.split("/")[0].trim()}
                </Badge>
              </div>

              <p className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 py-2 mb-4">
                "{platform.tagline}"
              </p>

              <p className="text-lg leading-relaxed mb-6">
                {platform.description}
              </p>

              {/* Rating & Stats Row */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">
                    {platform.reputation.g2_rating}
                  </span>
                  <span className="text-muted-foreground">
                    / 5.0 ({platform.reputation.g2_reviews_count.toLocaleString()}{" "}
                    reviews)
                  </span>
                </div>
                {platform.reputation.awards && platform.reputation.awards.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">
                      {platform.reputation.awards.length} Awards
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button asChild size="lg" className="text-base px-8 h-12">
              <a
                href={platform.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {platform.pricing_url && (
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <a
                  href={platform.pricing_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Pricing
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
              <Link href={`/compare?platforms=${platformId}`}>
                Compare
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">
                      {platform.founded_year}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      Founded
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">
                      {platform.statistics.customer_count.split(/[;,:]/)[0].trim().split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      Customers
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">
                      {typeof platform.integrations.total_integrations === 'number'
                        ? platform.integrations.total_integrations
                        : platform.integrations.total_integrations}+
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      Integrations
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">
                      {platform.pricing.free_trial ? "Yes" : "No"}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      Free Trial
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Pricing Plans */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Pricing Plans</h2>
                {platform.pricing.free_trial && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
                    <Zap className="h-4 w-4 mr-1.5" />
                    Free Trial Available
                  </Badge>
                )}
              </div>

              <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Pricing Model:</span>{" "}
                  {platform.pricing.model}
                </p>
                {platform.pricing.free_plan && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-semibold text-foreground">Free Plan:</span> Available
                  </p>
                )}
              </div>

              <div className="grid gap-4">
                {platform.pricing.plans.map((tier, index) => (
                  <Card key={`${tier.name}-${index}`} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-3">{tier.name}</CardTitle>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">
                              {tier.price || tier.price_annual || tier.price_monthly || "Custom"}
                            </span>
                            {(tier.billing_period || tier.billing_unit) && (
                              <span className="text-sm text-muted-foreground">
                                {tier.billing_unit || tier.billing_period}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        What's Included
                      </h4>
                      <ul className="space-y-2.5">
                        {tier.key_features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="space-y-4">
                {platform.features.map((feature, index) => (
                  <Card key={index} className="hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                        <span>{feature.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="pt-3 border-t">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Included in these plans:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {feature.available_in_plans.slice(0, 5).map((plan, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs font-normal">
                              {plan}
                            </Badge>
                          ))}
                          {feature.available_in_plans.length > 5 && (
                            <Badge variant="secondary" className="text-xs font-normal">
                              +{feature.available_in_plans.length - 5} more plans
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Unique Selling Points */}
            <section>
              <h2 className="text-3xl font-bold mb-6">What Makes It Stand Out</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {platform.unique_selling_points.map((usp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed pt-1">{usp}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Target Audience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Best For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {platform.target_audience.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Integrations
                </CardTitle>
                <CardDescription>
                  {platform.integrations.total_integrations}+ integrations available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {platform.integrations.top_integrations.map((integration, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {integration}
                    </Badge>
                  ))}
                </div>
                {platform.integrations.has_api && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      API Access Available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            {platform.additional_info && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Headquarters:</span>
                    <p className="text-muted-foreground">
                      {platform.additional_info.headquarters}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Employees:</span>
                    <p className="text-muted-foreground">
                      {platform.additional_info.employee_count}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Presence:</span>
                    <p className="text-muted-foreground">
                      {platform.additional_info.global_presence}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Awards */}
            {platform.reputation.awards && platform.reputation.awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Awards & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platform.reputation.awards.slice(0, 5).map((award, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Award className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{award}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground border-0">
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Visit {platform.trade_name} to learn more and explore their solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full" size="lg">
                  <a
                    href={platform.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {platform.trade_name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
