import { z } from "zod";

/**
 * Zod schema for Feature Momentum Tracker data
 * Validates feature release data from customer service platforms
 */

// Feature Category Enum
export const featureCategorySchema = z.enum([
  "AI",
  "Automation",
  "Integration",
  "Reporting",
]);

// Single Feature Schema
export const systemFeatureSchema = z.object({
  feature_name: z.string().min(1),
  release_date: z.string(), // ISO date string format: YYYY-MM-DD
  description: z.string(),
  category: featureCategorySchema,
  key_capabilities: z.array(z.string()),
  target_users: z.string(),
});

// System Features Schema (features for a single company/tool)
export const systemFeaturesSchema = z.object({
  company_name: z.string().min(1),
  last_updated: z.string(),
  search_period: z.string(),
  features: z.array(systemFeatureSchema),
});

// Main Features Directory Schema
export const featuresMomentumDirectorySchema = z.object({
  features_by_system: z.array(systemFeaturesSchema),
});

// Derived types for use throughout the application
export type FeatureCategory = z.infer<typeof featureCategorySchema>;
export type SystemFeature = z.infer<typeof systemFeatureSchema>;
export type SystemFeatures = z.infer<typeof systemFeaturesSchema>;
export type FeaturesMomentumDirectory = z.infer<typeof featuresMomentumDirectorySchema>;

// Computed types for the tracker UI
export interface ToolFeatureCount {
  toolName: string;
  count: number;
  features: SystemFeature[];
  trend: "trending" | "stable" | "slowing";
  sparklineData: number[];
}

export interface CategoryDistribution {
  category: FeatureCategory;
  count: number;
  percentage: number;
  color: string;
}

export interface VelocityScore {
  toolName: string;
  score: number;
  trend: "trending" | "stable" | "slowing";
  recentCount: number;
  previousCount: number;
}

export interface TimelineDataPoint {
  date: string;
  count: number;
  features: {
    toolName: string;
    featureName: string;
    category: FeatureCategory;
  }[];
}

export interface MomentumTrackerData {
  toolFeatureCounts: ToolFeatureCount[];
  categoryDistribution: CategoryDistribution[];
  fastestGrowingTools: VelocityScore[];
  timelineData: TimelineDataPoint[];
  dateRange: {
    start: Date;
    end: Date;
    days: number;
  };
}
