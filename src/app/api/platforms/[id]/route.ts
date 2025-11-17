import { NextResponse } from "next/server";
import { platformsDirectorySchema } from "@/schemas/platform.schema";
import platformsData from "@/data/platforms.json";

/**
 * GET /api/platforms/[id]
 * Fetches a single platform by ID (derived from trade_name)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
          message: `No platform found with ID: ${id}`,
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
