"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlatformCategory } from "@/types/platform";
import { Search } from "lucide-react";

interface PlatformFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: PlatformCategory | "All";
  onCategoryChange: (category: PlatformCategory | "All") => void;
}

const categories: (PlatformCategory | "All")[] = [
  "All",
  "All-in-One",
  "Help Desk",
  "Live Chat",
  "Chatbot",
  "Ticketing System",
  "Knowledge Base",
];

export function PlatformFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: PlatformFiltersProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search platforms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
