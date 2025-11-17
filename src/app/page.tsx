import { getPlatformsServer } from "@/lib/platforms";
import { generateJSONLD } from "@/lib/metadata";
import { PlatformsList } from "@/components/platforms-list";
import { AIFeaturesSection } from "@/components/ai-features-section";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, Bot, Star } from "lucide-react";

export default async function Home() {
  const platforms = await getPlatformsServer();

  // FAQs for SEO
  const faqs = [
    {
      question: "What is AI-powered customer service software?",
      answer:
        "AI-powered customer service software uses artificial intelligence and machine learning to automate customer support tasks, provide intelligent routing, offer AI chatbots, and assist human agents with real-time suggestions. Modern platforms like Zendesk, Intercom, and Freshdesk integrate AI agents that can resolve 50-80% of routine queries autonomously, dramatically reducing response times and operational costs.",
    },
    {
      question: "How much does customer service software cost?",
      answer:
        "Customer service software pricing varies widely based on features and scale. Basic plans start at $0-15 per agent/month (Freshdesk Free, Zoho Desk), mid-tier plans range from $49-100 per agent/month, and enterprise solutions cost $115-220+ per agent/month. Most platforms offer free trials, and AI features may incur additional usage-based costs ($0.99-1.00 per AI resolution).",
    },
    {
      question: "Which customer service platform is best for small businesses?",
      answer:
        "For small businesses, Freshdesk and Zoho Desk offer the best value with free plans for up to 2-3 agents and affordable paid tiers starting at $15/month. HubSpot Service Hub is ideal if you need CRM integration. These platforms provide essential features like ticketing, knowledge bases, and basic automation without enterprise complexity.",
    },
    {
      question: "What's the difference between a help desk and customer service software?",
      answer:
        "Help desk software primarily focuses on ticket management and internal IT support, while customer service software encompasses broader customer engagement including live chat, omnichannel support, knowledge bases, and customer feedback tools. Modern platforms like Zendesk and Intercom combine both capabilities into unified customer service suites.",
    },
    {
      question: "Do I need AI features in my customer service platform?",
      answer:
        "AI features are increasingly essential for competitive customer service. They enable 24/7 automated support, reduce agent workload by 40-60%, provide instant responses, and scale support without proportional cost increases. Even small teams benefit from AI chatbots, smart routing, and agent copilots that improve efficiency and customer satisfaction.",
    },
    {
      question: "How do I choose between Zendesk, Freshdesk, and Intercom?",
      answer:
        "Choose Zendesk for enterprise scalability and the most comprehensive feature set (best for 50+ agents). Select Freshdesk for affordability and ease of use with strong AI capabilities (ideal for 10-50 agents). Pick Intercom for SaaS businesses prioritizing conversational support and the most advanced AI agent (Fin AI). Consider your team size, budget, required integrations, and whether you prioritize ticketing vs. messaging-first support.",
    },
  ];

  // JSON-LD for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Customer Service Directory",
    description:
      "Compare top AI-powered customer service platforms. Find the perfect help desk, live chat, and ticketing solution for your business.",
    url: "https://customer-service-directory.com",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(jsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(faqJsonLd)}
      />
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 via-background to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <Bot className="h-4 w-4 text-primary" />
              <span>AI-Powered Customer Service Solutions 2025</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Find Your Perfect Customer Service Platform
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Compare AI-powered help desks, live chat, and ticketing systems. Make data-driven decisions with detailed pricing, features, and verified reviews.
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
                <Bot className="h-4 w-4 text-primary" />
                <span>AI Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span>15K+ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Updated 2025</span>
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
            Compare Customer Service Platforms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Find the perfect AI-powered help desk, live chat, and ticketing solution for your business
          </p>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} • {platforms.length} verified platforms
          </div>
        </div>

        <PlatformsList platforms={platforms} />
      </section>

      {/* AI Features Section */}
      <AIFeaturesSection />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

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
