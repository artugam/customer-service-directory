"use client";

import { useState } from "react";
import { Platform } from "@/schemas/platform.schema";
import { PlatformCard } from "@/components/platform-card";
import { PlatformSearch } from "@/components/platform-search";

interface PlatformsListProps {
  platforms: Platform[];
}

export function PlatformsList({ platforms }: PlatformsListProps) {
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>(platforms);

  return (
    <div className="space-y-8">
      <PlatformSearch
        platforms={platforms}
        onFilteredPlatformsChange={setFilteredPlatforms}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlatforms.map((platform) => (
          <PlatformCard key={platform.trade_name} platform={platform} />
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No platforms found matching your criteria.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
