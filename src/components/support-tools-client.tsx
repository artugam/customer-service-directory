"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Platform } from "@/schemas/platform.schema";
import { PlatformCard } from "@/components/platform-card";
import { ToolsSearchBar } from "@/components/tools-search-bar";
import { ToolsFilters } from "@/components/tools-filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

interface SupportToolsClientProps {
    platforms: Platform[];
    initialQuery: string;
}

// Internal component that uses useSearchParams
function SupportToolsContent({
    platforms,
    initialQuery,
}: SupportToolsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<string>("all");
    const [hasFreeTrial, setHasFreeTrial] = useState<boolean | null>(null);
    const [hasAI, setHasAI] = useState<boolean | null>(null);

    // Update search query from URL params
    useEffect(() => {
        const query = searchParams.get("q") || "";
        setSearchQuery(query);
    }, [searchParams]);

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

    // Update URL when search changes
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            router.push(`/support-tools?q=${encodeURIComponent(query.trim())}`, {
                scroll: false,
            });
        } else {
            router.push("/support-tools", { scroll: false });
        }
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setPriceRange("all");
        setHasFreeTrial(null);
        setHasAI(null);
        router.push("/support-tools", { scroll: false });
    };

    const activeFiltersCount =
        (selectedCategory !== "all" ? 1 : 0) +
        (priceRange !== "all" ? 1 : 0) +
        (hasFreeTrial !== null ? 1 : 0) +
        (hasAI !== null ? 1 : 0) +
        (searchQuery ? 1 : 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <header className="border-b bg-muted/20">
                <div className="container mx-auto px-6 md:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6" aria-label="Breadcrumb">
                        <Button asChild variant="ghost" size="sm" className="mb-4">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </nav>

                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Support Tools Directory
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Browse and compare customer service platforms. Find the perfect solution for your business.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <ToolsSearchBar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        resultCount={filteredPlatforms.length}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-8 py-8">
                {/* Filters */}
                <ToolsFilters
                    platforms={platforms}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    hasFreeTrial={hasFreeTrial}
                    setHasFreeTrial={setHasFreeTrial}
                    hasAI={hasAI}
                    setHasAI={setHasAI}
                    activeFiltersCount={activeFiltersCount}
                    onClearFilters={clearFilters}
                />

                {/* Results Grid */}
                {filteredPlatforms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {filteredPlatforms.map((platform) => (
                            <PlatformCard key={platform.trade_name} platform={platform} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <SearchIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">No tools found</h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            We couldn't find any platforms matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <Button onClick={clearFilters} variant="outline">
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

// Main export with Suspense boundary
export function SupportToolsClient(props: SupportToolsClientProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background">
                <header className="border-b bg-muted/20">
                    <div className="container mx-auto px-6 md:px-8 py-8">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Support Tools Directory
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Loading...
                            </p>
                        </div>
                    </div>
                </header>
            </div>
        }>
            <SupportToolsContent {...props} />
        </Suspense>
    );
}
