"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/**
 * Hero search component for homepage
 * Redirects to /support-tools page with search query on submit
 */
export function HeroSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // Handle Enter key or form submit to navigate to support tools page
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/support-tools?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/support-tools");
        }
    };

    return (
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto pt-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Search for tools like Zendesk, Intercom, or browse by category..."
                    aria-label="Search customer service tools and platforms"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-6 text-base border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to search or browse all tools
            </p>
        </form>
    );
}
