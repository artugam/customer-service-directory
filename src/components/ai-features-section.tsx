import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, Zap, MessageSquare, BarChart3, Shield } from "lucide-react";

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Autonomous AI agents that resolve customer queries 24/7 without human intervention. Leading platforms achieve 50-80% resolution rates.",
    badge: "Most Popular",
  },
  {
    icon: Sparkles,
    title: "AI Copilots for Agents",
    description:
      "Real-time AI assistance that suggests responses, summarizes tickets, and provides context to help human agents work faster and smarter.",
    badge: "Productivity",
  },
  {
    icon: MessageSquare,
    title: "Intelligent Chatbots",
    description:
      "Context-aware chatbots with natural language understanding, sentiment analysis, and seamless escalation to human agents when needed.",
    badge: "Customer Facing",
  },
  {
    icon: Zap,
    title: "Smart Routing & Prioritization",
    description:
      "AI-powered ticket routing based on content, urgency, sentiment, and agent expertise. Ensures issues reach the right specialist instantly.",
    badge: "Efficiency",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Machine learning models that predict ticket volume, identify trends, detect anomalies, and provide proactive insights for better planning.",
    badge: "Strategic",
  },
  {
    icon: Shield,
    title: "AI-Powered Quality Assurance",
    description:
      "Automated quality checks, compliance monitoring, and performance analysis to maintain consistent service standards across all interactions.",
    badge: "Compliance",
  },
];

export function AIFeaturesSection() {
  return (
    <section className="border-y bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-6">
            <Bot className="h-4 w-4 text-primary" />
            <span>AI-Powered Customer Service</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future of Customer Support is AI-First
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Modern customer service platforms leverage artificial intelligence to automate routine tasks,
            enhance agent productivity, and deliver exceptional customer experiences at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg border text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Industry Insight:</span> According to
            Gartner, by 2026, conversational AI will reduce contact center agent labor costs by $80
            billion. Organizations implementing AI-powered customer service see an average of 40%
            reduction in response times and 35% increase in customer satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
}
