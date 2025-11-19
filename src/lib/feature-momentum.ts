import { featuresMomentumDirectorySchema } from "@/schemas/feature-momentum.schema";
import type {
  FeaturesMomentumDirectory,
  SystemFeatures,
  SystemFeature,
  ToolFeatureCount,
  CategoryDistribution,
  VelocityScore,
  TimelineDataPoint,
  MomentumTrackerData,
  FeatureCategory,
} from "@/schemas/feature-momentum.schema";
import featuresData from "@/data/features-by-system.json";

/**
 * Server-side function to get validated features data
 * Preferred for Server Components - no API round-trip
 */
export function getFeaturesServer(): FeaturesMomentumDirectory {
  const validatedData = featuresMomentumDirectorySchema.parse(featuresData);
  return validatedData;
}

/**
 * Client-side function to get features data via API
 */
export async function getFeatures(): Promise<SystemFeatures[]> {
  const response = await fetch("/api/features");
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error || "Failed to fetch features");
  }

  return json.data;
}

/**
 * Parse release date string to Date object
 */
function parseReleaseDate(dateString: string): Date {
  return new Date(dateString);
}

/**
 * Check if a date falls within a given range
 */
function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Get features within a date range for a specific system
 */
function getFeaturesInRange(
  features: SystemFeature[],
  startDate: Date,
  endDate: Date
): SystemFeature[] {
  return features.filter((feature) => {
    const releaseDate = parseReleaseDate(feature.release_date);
    return isDateInRange(releaseDate, startDate, endDate);
  });
}

/**
 * Category color mapping for enterprise UI
 */
export const CATEGORY_COLORS: Record<FeatureCategory, string> = {
  AI: "bg-blue-500",
  Automation: "bg-emerald-500",
  Integration: "bg-purple-500",
  Reporting: "bg-orange-500",
};

export const CATEGORY_TEXT_COLORS: Record<FeatureCategory, string> = {
  AI: "text-blue-500",
  Automation: "text-emerald-500",
  Integration: "text-purple-500",
  Reporting: "text-orange-500",
};

/**
 * Generate sparkline data (weekly feature counts for last N weeks)
 */
function generateSparklineData(
  features: SystemFeature[],
  endDate: Date,
  weeks: number = 12
): number[] {
  const data: number[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const weekEnd = new Date(endDate);
    weekEnd.setDate(weekEnd.getDate() - i * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 7);

    const count = features.filter((feature) => {
      const releaseDate = parseReleaseDate(feature.release_date);
      return isDateInRange(releaseDate, weekStart, weekEnd);
    }).length;

    data.push(count);
  }

  return data;
}

/**
 * Determine trend based on recent vs previous period counts
 */
function determineTrend(
  recentCount: number,
  previousCount: number
): "trending" | "stable" | "slowing" {
  if (previousCount === 0) {
    return recentCount > 0 ? "trending" : "stable";
  }

  const ratio = recentCount / previousCount;

  if (ratio > 1.2) return "trending";
  if (ratio < 0.8) return "slowing";
  return "stable";
}

/**
 * Calculate velocity score (growth rate percentage)
 */
function calculateVelocityScore(
  recentCount: number,
  previousCount: number
): number {
  if (previousCount === 0) {
    return recentCount > 0 ? 100 : 0;
  }

  return Math.round(((recentCount - previousCount) / previousCount) * 100);
}

/**
 * Calculate feature counts per tool within a date range
 */
export function calculateToolFeatureCounts(
  systems: SystemFeatures[],
  startDate: Date,
  endDate: Date
): ToolFeatureCount[] {
  const midDate = new Date(
    (startDate.getTime() + endDate.getTime()) / 2
  );

  return systems.map((system) => {
    const recentFeatures = getFeaturesInRange(system.features, midDate, endDate);
    const previousFeatures = getFeaturesInRange(system.features, startDate, midDate);
    const allFeatures = getFeaturesInRange(system.features, startDate, endDate);

    const trend = determineTrend(recentFeatures.length, previousFeatures.length);
    const sparklineData = generateSparklineData(system.features, endDate);

    return {
      toolName: system.company_name,
      count: allFeatures.length,
      features: allFeatures,
      trend,
      sparklineData,
    };
  }).sort((a, b) => b.count - a.count);
}

/**
 * Calculate category distribution across all features
 */
export function calculateCategoryDistribution(
  systems: SystemFeatures[],
  startDate: Date,
  endDate: Date
): CategoryDistribution[] {
  const categoryCounts: Record<FeatureCategory, number> = {
    AI: 0,
    Automation: 0,
    Integration: 0,
    Reporting: 0,
  };

  let totalFeatures = 0;

  systems.forEach((system) => {
    const featuresInRange = getFeaturesInRange(system.features, startDate, endDate);

    featuresInRange.forEach((feature) => {
      categoryCounts[feature.category]++;
      totalFeatures++;
    });
  });

  return (Object.keys(categoryCounts) as FeatureCategory[]).map((category) => ({
    category,
    count: categoryCounts[category],
    percentage: totalFeatures > 0
      ? Math.round((categoryCounts[category] / totalFeatures) * 100)
      : 0,
    color: CATEGORY_COLORS[category],
  })).sort((a, b) => b.count - a.count);
}

/**
 * Calculate fastest growing tools by velocity score
 */
export function calculateFastestGrowingTools(
  systems: SystemFeatures[],
  startDate: Date,
  endDate: Date
): VelocityScore[] {
  const midDate = new Date(
    (startDate.getTime() + endDate.getTime()) / 2
  );

  return systems.map((system) => {
    const recentFeatures = getFeaturesInRange(system.features, midDate, endDate);
    const previousFeatures = getFeaturesInRange(system.features, startDate, midDate);

    const score = calculateVelocityScore(
      recentFeatures.length,
      previousFeatures.length
    );

    const trend = determineTrend(recentFeatures.length, previousFeatures.length);

    return {
      toolName: system.company_name,
      score,
      trend,
      recentCount: recentFeatures.length,
      previousCount: previousFeatures.length,
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Generate timeline data for chart visualization
 */
export function generateTimelineData(
  systems: SystemFeatures[],
  startDate: Date,
  endDate: Date
): TimelineDataPoint[] {
  const dateMap = new Map<string, TimelineDataPoint>();

  systems.forEach((system) => {
    const featuresInRange = getFeaturesInRange(system.features, startDate, endDate);

    featuresInRange.forEach((feature) => {
      const dateKey = feature.release_date;

      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          count: 0,
          features: [],
        });
      }

      const dataPoint = dateMap.get(dateKey)!;
      dataPoint.count++;
      dataPoint.features.push({
        toolName: system.company_name,
        featureName: feature.feature_name,
        category: feature.category,
      });
    });
  });

  return Array.from(dateMap.values())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Main function to calculate all momentum tracker data
 */
export function calculateMomentumData(
  systems: SystemFeatures[],
  days: number = 90
): MomentumTrackerData {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return {
    toolFeatureCounts: calculateToolFeatureCounts(systems, startDate, endDate),
    categoryDistribution: calculateCategoryDistribution(systems, startDate, endDate),
    fastestGrowingTools: calculateFastestGrowingTools(systems, startDate, endDate),
    timelineData: generateTimelineData(systems, startDate, endDate),
    dateRange: {
      start: startDate,
      end: endDate,
      days,
    },
  };
}

/**
 * Server-side helper to get momentum data directly
 */
export function getMomentumDataServer(days: number = 90): MomentumTrackerData {
  const { features_by_system } = getFeaturesServer();
  return calculateMomentumData(features_by_system, days);
}
