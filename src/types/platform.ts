/**
 * Platform types
 *
 * This file re-exports types from the Zod schema for use across the codebase.
 * All types are inferred from the Zod schema to ensure type safety and validation.
 *
 * For the complete type definitions, see: @/schemas/platform.schema.ts
 */

export type {
  Platform,
  PlatformsDirectory,
  PricingPlan,
  AdditionalCost,
  Pricing,
  Statistics,
  Feature,
  Integrations,
  Reputation,
  SecurityCompliance,
  SEOMetadata,
  FounderInformation,
  FundingHistory,
  CompanyInfo,
  MarketPresence,
  AdditionalInfo,
  DataSources,
  Suitability,
  HiddenCosts,
  RiskAssessment,
} from "@/schemas/platform.schema";

// Legacy types for backward compatibility (deprecated)
export type PlatformCategory =
  | "Help Desk"
  | "Live Chat"
  | "Chatbot"
  | "Knowledge Base"
  | "Ticketing System"
  | "All-in-One";

/**
 * @deprecated Use PricingPlan from @/schemas/platform.schema instead
 */
export interface PricingTier {
  name: string;
  price: string;
  billingPeriod?: string;
  features: string[];
}

/**
 * @deprecated This is the legacy Platform interface. Use Platform from @/schemas/platform.schema instead
 */
export interface LegacyPlatform {
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
