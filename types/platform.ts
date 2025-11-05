export type PlatformCategory =
  | "Help Desk"
  | "Live Chat"
  | "Chatbot"
  | "Knowledge Base"
  | "Ticketing System"
  | "All-in-One";

export interface PricingTier {
  name: string;
  price: string;
  billingPeriod?: string;
  features: string[];
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  category: PlatformCategory;
  logo?: string;
  website: string;
  pricing: PricingTier[];
  features: string[];
  integrations: string[];
  rating?: number;
  reviewCount?: number;
  bestFor: string[];
  pros: string[];
  cons: string[];
}
