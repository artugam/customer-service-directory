import { getPlatformsServer, getFeaturedPlatforms } from "@/lib/platforms";
import { getOnePromptPerSubcategory } from "@/lib/prompts";
import { generateJSONLD } from "@/lib/metadata";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  const platforms = await getPlatformsServer();
  const featuredPlatforms = await getFeaturedPlatforms();
  const previewPrompts = getOnePromptPerSubcategory("refund_request");

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(jsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(faqJsonLd)}
      />
      <HomeClient
        platforms={platforms}
        featuredPlatforms={featuredPlatforms}
        previewPrompts={previewPrompts}
        faqs={faqs}
      />
    </>
  );
}
