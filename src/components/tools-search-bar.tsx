"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ToolsSearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    resultCount: number;
}

/**
 * Search bar component for support tools directory
 * Updates URL params and filters results in real-time
 */
export function ToolsSearchBar({
    searchQuery,
    onSearchChange,
    resultCount,
}: ToolsSearchBarProps) {
    return (
        <div className="max-w-2xl">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Search by name, category, or features..."
                    aria-label="Search support tools"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-12 pl-12 pr-6 text-base border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
                {searchQuery ? (
                    <>
                        Found <span className="font-semibold">{resultCount}</span>{" "}
                        {resultCount === 1 ? "tool" : "tools"}
                    </>
                ) : (
                    <>
                        Showing all <span className="font-semibold">{resultCount}</span> tools
                    </>
                )}
            </p>
        </div>
    );
}
