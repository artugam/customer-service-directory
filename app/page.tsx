"use client";

import { useState } from "react";
import { platforms } from "@/data/platforms";
import { PlatformCard } from "@/components/platform-card";
import { PlatformFilters } from "@/components/platform-filters";
import { PlatformCategory } from "@/types/platform";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    PlatformCategory | "All"
  >("All");

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch =
      searchQuery === "" ||
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || platform.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Customer Service Platform Directory
            </h1>
            <p className="text-xl text-muted-foreground">
              Compare features, pricing, and find the perfect customer service
              solution for your business
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="#platforms">
                  Browse Platforms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/compare">Compare Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">
                {platforms.length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Platforms Listed
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">
                {new Set(platforms.map((p) => p.category)).size}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Categories
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">Free-$2.5K</div>
              <div className="text-sm text-muted-foreground mt-1">
                Price Range
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="container mx-auto px-4 py-12">
        <PlatformFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPlatforms.length} of {platforms.length} platforms
          </p>
        </div>

        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No platforms found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            Customer Service Platform Directory - Compare and choose the best
            customer service solution
          </p>
        </div>
      </footer>
    </div>
  );
}
