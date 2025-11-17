import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { generateSEOMetadata } from "@/lib/metadata";

export const metadata = generateSEOMetadata({
  title: "About Customer Service Directory - Your Guide to Support Platforms",
  description:
    "Learn how Customer Service Directory helps businesses compare and choose the best AI-powered customer service platforms. Unbiased reviews, detailed comparisons, and up-to-date pricing for enterprise support solutions.",
  path: "/about",
  keywords: [
    "customer service directory",
    "help desk comparison",
    "customer service platform reviews",
    "support software guide",
    "AI customer service comparison",
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
              Your Guide to Customer Service Excellence
            </h1>
            <p className="text-xl text-muted-foreground">
              We help businesses find and compare the best customer service platforms to enhance their customer support experience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Finding the right customer service platform can be overwhelming with so many options available. Our mission is to simplify this process by providing comprehensive, unbiased comparisons of the leading customer service platforms in the market.
              </p>
              <p className="text-muted-foreground">
                We believe that excellent customer service is the backbone of successful businesses, and the right tools can make all the difference in delivering exceptional customer experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Comprehensive Comparisons</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed side-by-side comparisons of features, pricing, and capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Unbiased Reviews</h3>
                    <p className="text-sm text-muted-foreground">
                      Honest assessments based on real features and user experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Up-to-Date Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular updates to ensure pricing and features are current
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Easy Navigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple, intuitive interface to find exactly what you need
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Browse Platforms</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our curated list of customer service platforms, filtered by category or features you need.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Compare Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Select up to 3 platforms and compare them side-by-side to see which one fits your needs best.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Make Your Choice</h3>
                    <p className="text-sm text-muted-foreground">
                      Review detailed information about pricing, features, pros, and cons to make an informed decision.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
              <CardDescription>
                Have questions or suggestions? We&apos;d love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visit our{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact page
                </a>{" "}
                to get in touch with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
