import { NextResponse } from "next/server";
import { platformsDirectorySchema } from "@/schemas/platform.schema";
import platformsData from "@/data/platforms.json";

/**
 * GET /api/platforms
 * Fetches and validates all customer service platforms
 * Returns validated platform data with proper typing
 */
export async function GET() {
  try {
    // Validate the data against the schema
    const validatedData = platformsDirectorySchema.parse(platformsData);

    return NextResponse.json({
      success: true,
      data: validatedData.systems,
      meta: {
        total: validatedData.systems.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Platform data validation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to validate platform data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/platforms?id=platform-id
 * Fetches a single platform by ID (derived from trade_name)
 */
export async function GET_BY_ID(id: string) {
  try {
    const validatedData = platformsDirectorySchema.parse(platformsData);

    // Generate ID from trade_name (lowercase, spaces to hyphens)
    const platform = validatedData.systems.find(
      (p) => p.trade_name.toLowerCase().replace(/\s+/g, "-") === id
    );

    if (!platform) {
      return NextResponse.json(
        {
          success: false,
          error: "Platform not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error("Platform fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch platform",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
