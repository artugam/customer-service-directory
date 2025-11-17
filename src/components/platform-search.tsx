"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Platform } from "@/schemas/platform.schema";

interface PlatformSearchProps {
  platforms: Platform[];
  onFilteredPlatformsChange: (filtered: Platform[]) => void;
}

export function PlatformSearch({
  platforms,
  onFilteredPlatformsChange,
}: PlatformSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [hasFreeTrial, setHasFreeTrial] = useState<boolean | null>(null);
  const [hasAI, setHasAI] = useState<boolean | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(platforms.map((p) => p.category_primary));
    return ["all", ...Array.from(cats)];
  }, [platforms]);

  // Filter platforms
  const filteredPlatforms = useMemo(() => {
    let filtered = [...platforms];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.trade_name.toLowerCase().includes(query) ||
          p.company_name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.seo_metadata.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category_primary === selectedCategory);
    }

    // Price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter((p) => {
        const prices = p.pricing.plans
          .map((plan) => {
            const priceStr = plan.price_annual || plan.price_monthly || plan.price || "";
            const match = priceStr.match(/\$(\d+)/);
            return match ? parseInt(match[1]) : 0;
          })
          .filter((price) => price > 0);

        const minPrice = Math.min(...prices);

        if (priceRange === "free") return p.pricing.free_plan || minPrice === 0;
        if (priceRange === "0-50") return minPrice <= 50;
        if (priceRange === "50-100") return minPrice > 50 && minPrice <= 100;
        if (priceRange === "100+") return minPrice > 100;

        return true;
      });
    }

    // Free trial filter
    if (hasFreeTrial !== null) {
      filtered = filtered.filter((p) => p.pricing.free_trial === hasFreeTrial);
    }

    // AI features filter
    if (hasAI !== null) {
      filtered = filtered.filter((p) => {
        const hasAIFeatures = p.features.some(
          (f) =>
            f.name.toLowerCase().includes("ai") ||
            f.description.toLowerCase().includes("ai") ||
            f.name.toLowerCase().includes("automation")
        ) || p.categories_secondary.some((c) => c.toLowerCase().includes("ai"));
        return hasAIFeatures === hasAI;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, hasFreeTrial, hasAI, platforms]);

  // Update parent component
  useMemo(() => {
    onFilteredPlatformsChange(filteredPlatforms);
  }, [filteredPlatforms, onFilteredPlatformsChange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange("all");
    setHasFreeTrial(null);
    setHasAI(null);
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0) +
    (hasFreeTrial !== null ? 1 : 0) +
    (hasAI !== null ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms, features, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Category */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[200px] h-11">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-full lg:w-[160px] h-11">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free Plan</SelectItem>
            <SelectItem value="0-50">$0 - $50/mo</SelectItem>
            <SelectItem value="50-100">$50 - $100/mo</SelectItem>
            <SelectItem value="100+">$100+/mo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        <Button
          variant={hasFreeTrial === true ? "default" : "outline"}
          size="sm"
          onClick={() =>
            setHasFreeTrial(hasFreeTrial === true ? null : true)
          }
        >
          Free Trial
        </Button>

        <Button
          variant={hasAI === true ? "default" : "outline"}
          size="sm"
          onClick={() => setHasAI(hasAI === true ? null : true)}
        >
          AI Features
        </Button>

        {activeFiltersCount > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All ({activeFiltersCount})
            </Button>
          </>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredPlatforms.length}</span>{" "}
          of {platforms.length} platforms
        </p>
      </div>
    </div>
  );
}
