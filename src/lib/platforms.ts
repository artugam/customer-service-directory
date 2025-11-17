/**
 * Platform data fetching utilities
 * Provides type-safe functions to fetch platform data from API
 */

import type { Platform } from "@/schemas/platform.schema";

/**
 * Fetches all platforms from the API
 * @returns Promise<Platform[]> - Array of validated platform objects
 */
export async function getPlatforms(): Promise<Platform[]> {
  try {
    const response = await fetch("/api/platforms", {
      cache: "no-store", // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch platforms: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch platforms");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
}

/**
 * Fetches a single platform by ID
 * @param id - Platform ID (derived from trade_name)
 * @returns Promise<Platform | null> - Platform object or null if not found
 */
export async function getPlatformById(id: string): Promise<Platform | null> {
  try {
    const response = await fetch(`/api/platforms/${id}`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch platform: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch platform");
    }

    return result.data;
  } catch (error) {
    console.error(`Error fetching platform ${id}:`, error);
    throw error;
  }
}

/**
 * Generates a platform ID from trade name
 * @param tradeName - Platform trade name
 * @returns string - Slugified ID
 */
export function generatePlatformId(tradeName: string): string {
  return tradeName.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Server-side function to get platforms directly from JSON
 * Use this in server components for better performance
 */
export async function getPlatformsServer(): Promise<Platform[]> {
  const { platformsDirectorySchema } = await import(
    "@/schemas/platform.schema"
  );
  const platformsData = await import("@/data/platforms.json");

  const validatedData = platformsDirectorySchema.parse(platformsData);
  return validatedData.systems;
}

/**
 * Server-side function to get a single platform directly from JSON
 * Use this in server components for better performance
 */
export async function getPlatformByIdServer(
  id: string
): Promise<Platform | null> {
  const platforms = await getPlatformsServer();
  return platforms.find((p) => generatePlatformId(p.trade_name) === id) || null;
}
