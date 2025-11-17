import { getPlatformsServer } from "@/lib/platforms";
import { generateSEOMetadata, generateJSONLD } from "@/lib/metadata";
import { PlatformCard } from "@/components/platform-card";
import { AIFeaturesSection } from "@/components/ai-features-section";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
} from "lucide-react";

export const metadata = generateSEOMetadata({
  title: "AI Customer Service Software 2025 - Best AI-Powered Support Platforms",
  description:
    "Discover the best AI-powered customer service platforms. Compare AI chatbots, automation, and intelligent routing from Zendesk, Intercom, Freshdesk & more. Save 40-60% on support costs with AI agents.",
  path: "/ai-customer-service",
  keywords: [
    "AI customer service",
    "AI customer support software",
    "AI chatbot platform",
    "automated customer service",
    "AI agent customer support",
    "conversational AI",
    "AI-powered help desk",
    "intelligent customer service",
    "customer service automation",
    "AI copilot",
    "machine learning customer support",
  ],
});

export default async function AICustomerServicePage() {
  const platforms = await getPlatformsServer();

  // Filter platforms with strong AI capabilities
  const aiPlatforms = platforms.filter((p) =>
    p.features.some(
      (f) =>
        f.name.toLowerCase().includes("ai") ||
        f.description.toLowerCase().includes("ai agent") ||
        f.description.toLowerCase().includes("copilot")
    )
  );

  const faqs = [
    {
      question: "What is AI customer service?",
      answer:
        "AI customer service uses artificial intelligence and machine learning to automate support tasks, provide intelligent responses, and assist human agents. It includes AI chatbots that handle routine queries 24/7, AI copilots that help agents respond faster, smart routing based on content analysis, and predictive analytics. Leading platforms achieve 50-80% automation rates, dramatically reducing costs while improving response times.",
    },
    {
      question: "How much can AI reduce customer service costs?",
      answer:
        "According to industry research, AI-powered customer service can reduce support costs by 40-60% on average. Gartner predicts AI will reduce contact center agent labor costs by $80 billion by 2026. Organizations report 32-40% faster response times, 50-80% of routine queries resolved autonomously, and the ability to handle 3-5x ticket volume without proportional staff increases.",
    },
    {
      question: "What's the difference between AI agents and AI copilots?",
      answer:
        "AI agents (like Intercom's Fin or Zendesk AI Agents) autonomously handle customer conversations without human intervention, resolving routine queries 24/7. AI copilots (like Zendesk AI Copilot or Freshdesk Freddy AI Copilot) assist human agents by suggesting responses, summarizing tickets, providing context, and offering real-time guidance—augmenting rather than replacing human support.",
    },
    {
      question: "Which platform has the best AI for customer service?",
      answer:
        "Intercom's Fin AI leads with 65%+ resolution rates and proprietary conversational AI. Zendesk offers the most comprehensive AI suite with autonomous agents and copilots powered by 5 billion annual interactions. Freshdesk provides excellent AI value with 80% deflection rates at lower price points. The best choice depends on your use case: Intercom for SaaS/conversational support, Zendesk for enterprise scale, Freshdesk for cost-effectiveness.",
    },
    {
      question: "Do I need technical skills to implement AI customer service?",
      answer:
        "Modern AI customer service platforms require minimal technical expertise. Most offer no-code AI agent builders, pre-built workflows, and automated training from your existing knowledge base. Setup typically takes hours to days, not weeks. Technical integration is only needed for complex custom workflows or enterprise SSO requirements. All major platforms provide implementation support and onboarding.",
    },
    {
      question: "Can AI customer service work for small businesses?",
      answer:
        "Absolutely. Platforms like Freshdesk and HubSpot offer AI features at accessible price points ($15-49/month), with some providing free plans including basic AI. Small businesses often benefit most from AI, as it enables 24/7 support without hiring night shifts, handles volume spikes automatically, and allows small teams to deliver enterprise-level service. ROI is typically achieved within 3-6 months.",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "40% Faster Response Times",
      description:
        "AI agents respond instantly to customer queries, eliminating wait times and providing 24/7 support across all time zones.",
    },
    {
      icon: DollarSign,
      title: "60% Cost Reduction",
      description:
        "Automate 50-80% of routine queries, reducing agent workload and enabling teams to scale support without proportional hiring.",
    },
    {
      icon: Users,
      title: "3-5x Capacity Increase",
      description:
        "Handle massive ticket volume spikes without degrading service quality or overwhelming your support team.",
    },
    {
      icon: TrendingUp,
      title: "35% Higher CSAT",
      description:
        "Faster resolutions, consistent quality, and always-available support drive significant customer satisfaction improvements.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Customer Service Software 2025 - Best AI-Powered Support Platforms",
    description:
      "Comprehensive guide to AI-powered customer service platforms with comparison of features, pricing, and capabilities.",
    author: {
      "@type": "Organization",
      name: "Customer Service Directory",
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString(),
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
      <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>The Future of Customer Support</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              AI-Powered Customer Service Platforms
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Automate 50-80% of support queries with AI agents. Reduce costs by 60% while
              delivering faster, smarter customer service with machine learning and automation.
            </p>

            <div className="flex gap-4 justify-center pt-6 flex-wrap">
              <Button asChild size="lg" className="text-base px-8 h-12">
                <Link href="#ai-platforms">
                  Compare AI Platforms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <Link href="/compare">Feature Comparison</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why AI Customer Service is Essential in 2025
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organizations implementing AI-powered customer service see transformative results across
            all key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-8 bg-muted/50 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Industry Research</h3>
              <p className="text-muted-foreground">
                According to Gartner, by 2026, conversational AI will reduce contact center agent
                labor costs by $80 billion. Forrester reports that organizations using AI customer
                service see average ROI of 337% over three years. McKinsey found that AI can handle
                70% of customer interactions autonomously when properly implemented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Deep Dive */}
      <AIFeaturesSection />

      {/* AI Platforms */}
      <section id="ai-platforms" className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top AI-Powered Customer Service Platforms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare platforms with advanced AI agents, copilots, and automation capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {aiPlatforms.map((platform) => (
            <PlatformCard key={platform.trade_name} platform={platform} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/#platforms">
              View All Platforms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Key Features to Look For */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Essential AI Features to Evaluate
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "Autonomous AI Agents",
                description:
                  "Look for platforms with AI agents that can resolve customer queries end-to-end without human intervention. Target 50%+ resolution rates.",
              },
              {
                title: "AI Copilots for Human Agents",
                description:
                  "Agent assistance features like reply suggestions, ticket summaries, sentiment analysis, and real-time guidance improve productivity by 30-40%.",
              },
              {
                title: "Natural Language Understanding (NLU)",
                description:
                  "Advanced NLU enables AI to understand context, intent, and sentiment across 60+ languages, providing relevant responses even to complex queries.",
              },
              {
                title: "Knowledge Base Integration",
                description:
                  "AI should learn from your existing documentation, help articles, and historical tickets to provide accurate, brand-consistent answers.",
              },
              {
                title: "Intelligent Routing & Prioritization",
                description:
                  "ML-powered routing analyzes content, urgency, sentiment, and agent expertise to ensure tickets reach the right specialist instantly.",
              },
              {
                title: "Predictive Analytics",
                description:
                  "Forecasting tools predict ticket volume, identify emerging issues, detect anomalies, and provide proactive insights for better planning.",
              },
              {
                title: "Seamless Escalation",
                description:
                  "When AI can't resolve an issue, it should transfer seamlessly to human agents with full context, ensuring a smooth customer experience.",
              },
              {
                title: "Continuous Learning",
                description:
                  "AI models should improve over time by learning from agent corrections, customer feedback, and new knowledge base content.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="AI Customer Service FAQs"
        description="Everything you need to know about implementing AI-powered customer support"
      />

      {/* CTA */}
      <section className="border-y bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-6">
              <Bot className="h-4 w-4 text-primary" />
              <span>Start Your AI Journey Today</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Compare AI-powered platforms, find the perfect solution for your needs, and join
              thousands of businesses delivering exceptional support with AI automation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="text-base px-8 h-12">
                <Link href="/#platforms">
                  Explore Platforms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <Link href="/compare">Compare Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
