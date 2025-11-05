import { notFound } from "next/navigation";
import Link from "next/link";
import { platforms } from "@/data/platforms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle } from "lucide-react";

export function generateStaticParams() {
  return platforms.map((platform) => ({
    id: platform.id,
  }));
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const platform = platforms.find((p) => p.id === id);

  if (!platform) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{platform.name}</h1>
              <p className="text-xl text-muted-foreground">
                {platform.description}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {platform.category}
            </Badge>
          </div>

          {platform.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold">{platform.rating}</span>
                <span className="text-muted-foreground ml-2">
                  / 5.0 ({platform.reviewCount} reviews)
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button asChild size="lg">
              <a
                href={platform.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/compare?platforms=${platform.id}`}>
                Compare with Others
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pricing Plans */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
              <div className="grid gap-4">
                {platform.pricing.map((tier) => (
                  <Card key={tier.name}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{tier.name}</CardTitle>
                          <CardDescription>
                            <span className="text-2xl font-bold text-foreground">
                              {tier.price}
                            </span>
                            {tier.billingPeriod && (
                              <span className="text-sm">
                                {" "}
                                {tier.billingPeriod}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
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
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {platform.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Pros and Cons */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Pros & Cons</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {platform.pros.map((pro) => (
                        <li key={pro} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {platform.cons.map((con) => (
                        <li key={con} className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Best For */}
            <Card>
              <CardHeader>
                <CardTitle>Best For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {platform.bestFor.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  {platform.integrations.length} integrations available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {platform.integrations.map((integration) => (
                    <Badge key={integration} variant="outline">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Visit {platform.name} to learn more and start your free trial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full" size="lg">
                  <a
                    href={platform.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {platform.name}
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
