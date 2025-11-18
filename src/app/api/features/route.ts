import { NextResponse } from "next/server";
import { featuresMomentumDirectorySchema } from "@/schemas/feature-momentum.schema";
import featuresData from "@/data/features-by-system.json";

/**
 * GET /api/features
 * Fetches and validates all feature momentum data
 * Returns validated feature data with proper typing
 */
export async function GET() {
  try {
    // Validate the data against the schema
    const validatedData = featuresMomentumDirectorySchema.parse(featuresData);

    return NextResponse.json({
      success: true,
      data: validatedData.features_by_system,
      meta: {
        total_systems: validatedData.features_by_system.length,
        total_features: validatedData.features_by_system.reduce(
          (acc, system) => acc + system.features.length,
          0
        ),
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Feature data validation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to validate feature data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
