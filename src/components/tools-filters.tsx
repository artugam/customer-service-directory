"use client";

import { useMemo } from "react";
import { Platform } from "@/schemas/platform.schema";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";

interface ToolsFiltersProps {
    platforms: Platform[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    priceRange: string;
    setPriceRange: (range: string) => void;
    hasFreeTrial: boolean | null;
    setHasFreeTrial: (value: boolean | null) => void;
    hasAI: boolean | null;
    setHasAI: (value: boolean | null) => void;
    activeFiltersCount: number;
    onClearFilters: () => void;
}

/**
 * Filter controls for support tools directory
 * Includes category, price range, and feature filters
 */
export function ToolsFilters({
    platforms,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    hasFreeTrial,
    setHasFreeTrial,
    hasAI,
    setHasAI,
    activeFiltersCount,
    onClearFilters,
}: ToolsFiltersProps) {
    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(platforms.map((p) => p.category_primary));
        return ["all", ...Array.from(cats)];
    }, [platforms]);

    return (
        <div className="space-y-4">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="text-muted-foreground">
                            ({activeFiltersCount} active)
                        </span>
                    )}
                </div>
                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-muted-foreground"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-[220px] h-11">
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

                {/* Price Range Filter */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-full lg:w-[180px] h-11">
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

                {/* Feature Filters */}
                <div className="flex gap-2 flex-wrap">
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
                </div>
            </div>
        </div>
    );
}
