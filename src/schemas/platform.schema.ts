import { z } from "zod";

/**
 * Comprehensive Zod schema for Customer Service Platform data
 * This schema validates and types the entire platform directory structure
 */

// Pricing Plan Schema
export const pricingPlanSchema = z.object({
  name: z.string(),
  price: z.string().optional(),
  price_annual: z.string().optional(),
  price_monthly: z.string().optional(),
  billing_period: z.string().optional(),
  billing_unit: z.string().optional(),
  agents_included: z.string().optional(),
  lite_seats: z.number().optional(),
  key_features: z.array(z.string()),
});

// Additional Pricing Costs Schema
export const additionalCostSchema = z.object({
  name: z.string(),
  cost: z.string().optional(),
  cost_inbound: z.string().optional(),
  cost_call_recording: z.string().optional(),
  cost_outbound_us: z.string().optional(),
  applies_to: z.string(),
});

// Pricing Schema
export const pricingSchema = z.object({
  model: z.string(),
  free_trial: z.boolean(),
  free_trial_duration: z.string().optional(),
  free_plan: z.boolean(),
  currency: z.string().optional(),
  billing_period: z.string().optional(),
  plans: z.array(pricingPlanSchema),
  add_ons: z
    .object({
      freddy_ai_agent: z.string().optional(),
      note: z.string().optional(),
    })
    .optional(),
  additional_costs: z.array(additionalCostSchema).optional(),
  enterprise_custom: z.boolean().optional(),
  contact_sales_for_enterprise: z.boolean().optional(),
  hidden_costs: z.lazy(() => hiddenCostsSchema).optional(), // Forward reference
});

// Statistics Schema
export const statisticsSchema = z.object({
  customer_count: z.string(),
  customer_count_source: z.string().optional(),
  market_share: z.string().optional(),
  market_share_source: z.string().optional(),
  annual_resolutions: z.string().optional(),
  industries_served: z.string().optional(),
  notable_customers: z.string().optional(),
  market_position: z.string().optional(),
});

// Feature Schema
export const featureSchema = z.object({
  name: z.string(),
  description: z.string(),
  available_in_plans: z.array(z.string()),
  category: z.string().optional(),
});

// Integrations Schema
export const integrationsSchema = z.object({
  has_api: z.boolean(),
  api_docs_url: z.string().url().optional(),
  api_type: z.string().optional(),
  total_integrations: z.union([z.number(), z.string()]),
  total_integrations_source: z.string().optional(),
  app_store_topics: z.number().optional(),
  top_integrations: z.array(z.string()),
  integration_categories: z.array(z.string()).optional(),
  api_capabilities: z.string().optional(),
});

// Reputation Schema
export const reputationSchema = z.object({
  g2_rating: z.number().min(0).max(5),
  g2_rating_max: z.number().optional(),
  g2_reviews_count: z.number(),
  g2_url: z.string().url().optional(),
  g2_source: z.string().optional(),
  g2_rating_details: z.string().optional(),
  g2_leader_status: z.string().optional(),
  capterra_rating: z.number().min(0).max(5).optional(),
  capterra_rating_max: z.number().optional(),
  capterra_reviews_count: z.number().optional(),
  capterra_url: z.string().url().optional(),
  capterra_source: z.string().optional(),
  capterra_value_rating: z.number().optional(),
  trustradius_rating: z.number().optional(),
  trustradius_rating_max: z.number().optional(),
  trustradius_reviews_count: z.number().optional(),
  trustradius_url: z.string().url().optional(),
  trustradius_source: z.string().optional(),
  awards: z.array(z.string()),
});

// Security & Compliance Schema
export const securityComplianceSchema = z.object({
  certifications: z.array(z.string()),
  security_features: z.array(z.string()),
});

// SEO Metadata Schema
export const seoMetadataSchema = z.object({
  alternative_names: z.array(z.string()),
  main_competitors: z.array(z.string()),
  keywords: z.array(z.string()),
});

// Founder Information Schema
export const founderInformationSchema = z.object({
  founders: z.array(z.string()),
  origin_story: z.string().optional(),
  headquarters: z.string(),
  offices: z.array(z.string()).optional(),
});

// Funding History Schema
export const fundingHistorySchema = z.object({
  total_raised: z.string(),
  valuation: z.string(),
  funding_rounds: z.array(z.string()),
});

// Company Info Schema
export const companyInfoSchema = z.object({
  headquarters: z.string(),
  original_headquarters: z.string().optional(),
  founding_location: z.string().optional(),
  founders: z.array(z.string()).optional(),
  employees: z.union([z.number(), z.string()]).optional(),
  employee_count: z.string().optional(),
  nasdaq_listing: z.string().optional(),
  company_mission: z.string().optional(),
});

// Market Presence Schema
export const marketPresenceSchema = z.object({
  global_coverage: z.string().optional(),
  primary_market: z.string().optional(),
  traffic_source: z.string().optional(),
  global_ranking: z.string().optional(),
});

// Additional Info Schema
export const additionalInfoSchema = z.object({
  headquarters: z.string(),
  founding_location: z.string().optional(),
  employee_count: z.string(),
  global_presence: z.string(),
  acquisition_history: z.array(z.string()),
  mission: z.string(),
});

// Data Sources Schema
export const dataSourcesSchema = z.object({
  official_website: z.string().url(),
  g2_reviews: z.string().url().optional(),
  capterra_reviews: z.string().url().optional(),
  api_documentation: z.string().url().optional(),
  pricing_page: z.string().url().optional(),
  wikipedia: z.string().url().optional(),
});

// Suitability Schema (for Platform Finder Wizard)
export const suitabilitySchema = z.object({
  company_size: z.array(z.enum(["1-10", "11-50", "51-200", "201-1000", "1001+"])),
  industries: z.array(z.string()), // e.g., ["All", "Healthcare", "Finance", "Retail", "SaaS"]
  support_volume: z.array(z.enum(["<100", "100-1K", "1K-10K", "10K+"])),
  complexity_score: z.number().min(1).max(10), // 1 = simple, 10 = complex
  implementation_time_days: z.number().min(1).max(365), // typical implementation time
  best_for: z.array(z.string()), // target use cases
  not_ideal_for: z.array(z.string()), // scenarios where it's not recommended
});

// Hidden Costs Schema (for TCO Calculator)
export const hiddenCostsSchema = z.object({
  implementation_fee: z.object({
    min: z.number(),
    max: z.number(),
  }),
  training_hours_estimate: z.number(), // estimated hours needed for training
  training_cost_per_hour: z.number().optional(), // if platform offers paid training
  premium_integrations: z.array(z.object({
    name: z.string(),
    cost: z.number(),
    per: z.enum(["month", "year", "one-time"]),
  })).optional(),
  api_limits: z.object({
    included_calls: z.number(),
    overage_per_10k: z.number(), // cost per 10k additional API calls
  }).optional(),
  data_storage_limits: z.object({
    included_gb: z.number(),
    overage_per_gb: z.number(),
  }).optional(),
  migration_estimate: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

// Risk Assessment Schema (for decision confidence)
export const riskAssessmentSchema = z.object({
  switching_difficulty: z.enum(["Low", "Medium", "High"]),
  lock_in_risk: z.enum(["Low", "Medium", "High"]),
  contract_flexibility: z.string(), // e.g., "Month-to-month available"
  data_export: z.string(), // e.g., "Full export via API"
  common_complaints: z.array(z.string()), // top complaints from reviews
  mitigation: z.array(z.string()), // how to mitigate risks
});

// Main Platform Schema
export const platformSchema = z.object({
  company_name: z.string(),
  trade_name: z.string(),
  tagline: z.string(),
  description: z.string(),
  category_primary: z.string(),
  categories_secondary: z.array(z.string()),
  logo_url: z.string().url().optional(),
  website_url: z.string().url(),
  pricing_url: z.string().url().optional(),
  founded_year: z.number().min(1900).max(new Date().getFullYear()),
  statistics: statisticsSchema,
  pricing: pricingSchema,
  features: z.array(featureSchema),
  integrations: integrationsSchema,
  unique_selling_points: z.array(z.string()),
  target_audience: z.array(z.string()),
  reputation: reputationSchema,
  security_compliance: securityComplianceSchema.optional(),
  seo_metadata: seoMetadataSchema,
  founder_information: founderInformationSchema.optional(),
  funding_history: fundingHistorySchema.optional(),
  company_info: companyInfoSchema.optional(),
  market_presence: marketPresenceSchema.optional(),
  additional_info: additionalInfoSchema.optional(),
  data_sources: dataSourcesSchema.optional(),
  suitability: suitabilitySchema.optional(), // NEW: For Platform Finder Wizard
  risk_assessment: riskAssessmentSchema.optional(), // NEW: For decision confidence
  last_verified: z.string(),
});

// Platforms Directory Schema
export const platformsDirectorySchema = z.object({
  systems: z.array(platformSchema),
});

// Export inferred types
export type PricingPlan = z.infer<typeof pricingPlanSchema>;
export type AdditionalCost = z.infer<typeof additionalCostSchema>;
export type Pricing = z.infer<typeof pricingSchema>;
export type Statistics = z.infer<typeof statisticsSchema>;
export type Feature = z.infer<typeof featureSchema>;
export type Integrations = z.infer<typeof integrationsSchema>;
export type Reputation = z.infer<typeof reputationSchema>;
export type SecurityCompliance = z.infer<typeof securityComplianceSchema>;
export type SEOMetadata = z.infer<typeof seoMetadataSchema>;
export type FounderInformation = z.infer<typeof founderInformationSchema>;
export type FundingHistory = z.infer<typeof fundingHistorySchema>;
export type CompanyInfo = z.infer<typeof companyInfoSchema>;
export type MarketPresence = z.infer<typeof marketPresenceSchema>;
export type AdditionalInfo = z.infer<typeof additionalInfoSchema>;
export type DataSources = z.infer<typeof dataSourcesSchema>;
export type Suitability = z.infer<typeof suitabilitySchema>;
export type HiddenCosts = z.infer<typeof hiddenCostsSchema>;
export type RiskAssessment = z.infer<typeof riskAssessmentSchema>;
export type Platform = z.infer<typeof platformSchema>;
export type PlatformsDirectory = z.infer<typeof platformsDirectorySchema>;
