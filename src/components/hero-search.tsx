"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Platform } from "@/schemas/platform.schema";


interface HeroSearchProps {
    platforms: Platform[];
    onSearch: (query: string, filtered: Platform[]) => void;
}

export function HeroSearch({ platforms, onSearch }: HeroSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter platforms based on search query
    const filteredPlatforms = useMemo(() => {
        if (!searchQuery) {
            return platforms;
        }

        const query = searchQuery.toLowerCase();
        return platforms.filter(
            (p) =>
                p.trade_name.toLowerCase().includes(query) ||
                p.company_name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tagline.toLowerCase().includes(query) ||
                p.seo_metadata.keywords.some((k) => k.toLowerCase().includes(query))
        );
    }, [searchQuery, platforms]);

    // Notify parent component of search changes
    useEffect(() => {
        onSearch(searchQuery, filteredPlatforms);
    }, [searchQuery, filteredPlatforms, onSearch]);

    // Handle Enter key to scroll to results
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            e.preventDefault();
            const platformsSection = document.getElementById("platforms");
            if (platformsSection) {
                platformsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto pt-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Search for tools like Zendesk, Intercom, or browse by category..."
                    aria-label="Search customer service tools and platforms"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-14 pl-12 pr-6 text-base border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>
            {searchQuery && (
                <p className="text-sm text-muted-foreground mt-3">
                    Found {filteredPlatforms.length} {filteredPlatforms.length === 1 ? 'tool' : 'tools'}
                </p>
            )}
        </div>
    );
}
