"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  calculateMomentumData,
  CATEGORY_COLORS,
  CATEGORY_TEXT_COLORS,
} from "@/lib/feature-momentum";
import type {
  SystemFeatures,
  ToolFeatureCount,
  CategoryDistribution,
  VelocityScore,
  TimelineDataPoint,
  FeatureCategory,
} from "@/schemas/feature-momentum.schema";

interface FeatureMomentumTrackerProps {
  systems: SystemFeatures[];
  onToolSelect?: (toolName: string) => void;
}

// Mini Sparkline component
function Sparkline({ data, className }: { data: number[]; className?: string }) {
  if (data.length === 0) return null;

  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("h-8 w-20", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Trend Badge component
function TrendBadge({ trend }: { trend: "trending" | "stable" | "slowing" }) {
  const config = {
    trending: {
      label: "Trending",
      icon: "↑",
      variant: "default" as const,
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10",
    },
    stable: {
      label: "Stable",
      icon: "→",
      variant: "secondary" as const,
      className: "bg-slate-500/10 text-slate-600 border-slate-500/20 hover:bg-slate-500/10",
    },
    slowing: {
      label: "Slowing",
      icon: "↓",
      variant: "destructive" as const,
      className: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10",
    },
  };

  const { label, icon, className } = config[trend];

  return (
    <Badge variant="outline" className={cn("font-medium", className)}>
      <span className="mr-1">{icon}</span>
      {label}
    </Badge>
  );
}

// Timeline Chart component
function TimelineChart({ data }: { data: TimelineDataPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No feature releases in the selected period
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <TooltipProvider>
      <div className="h-64 flex items-end gap-1 px-2">
        {data.map((point, index) => {
          const height = (point.count / maxCount) * 100;
          const date = new Date(point.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <Tooltip key={point.date}>
              <TooltipTrigger asChild>
                <div
                  className="flex-1 min-w-[8px] max-w-[40px] bg-primary/80 hover:bg-primary transition-colors rounded-t cursor-pointer"
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold">{formattedDate}</p>
                  <p className="text-sm">
                    {point.count} feature{point.count !== 1 ? "s" : ""} released
                  </p>
                  <ul className="text-xs space-y-0.5 mt-2">
                    {point.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="truncate">
                        <span className={cn("font-medium", CATEGORY_TEXT_COLORS[feature.category])}>
                          {feature.toolName}:
                        </span>{" "}
                        {feature.featureName}
                      </li>
                    ))}
                    {point.features.length > 3 && (
                      <li className="text-muted-foreground">
                        +{point.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      {/* X-axis labels */}
      <div className="flex justify-between px-2 mt-2 text-xs text-muted-foreground">
        {data.length > 0 && (
          <>
            <span>
              {new Date(data[0].date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>
              {new Date(data[data.length - 1].date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}

// Feature Detail Modal/Drawer (simplified as a list view)
interface FeatureListProps {
  toolName: string;
  features: ToolFeatureCount["features"];
  onClose: () => void;
}

function FeatureList({ toolName, features, onClose }: FeatureListProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{toolName} Features</h3>
            <p className="text-sm text-muted-foreground">
              {features.length} feature{features.length !== 1 ? "s" : ""} in selected period
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium">{feature.feature_name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0",
                    CATEGORY_COLORS[feature.category].replace("bg-", "border-"),
                    CATEGORY_TEXT_COLORS[feature.category]
                  )}
                >
                  {feature.category}
                </Badge>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Released:{" "}
                {new Date(feature.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureMomentumTracker({
  systems,
  onToolSelect,
}: FeatureMomentumTrackerProps) {
  const [dateRange, setDateRange] = useState<"30" | "60" | "90">("90");
  const [selectedTool, setSelectedTool] = useState<{
    name: string;
    features: ToolFeatureCount["features"];
  } | null>(null);

  const momentumData = useMemo(() => {
    return calculateMomentumData(systems, parseInt(dateRange));
  }, [systems, dateRange]);

  const handleToolClick = (toolCount: ToolFeatureCount) => {
    setSelectedTool({
      name: toolCount.toolName,
      features: toolCount.features,
    });
    onToolSelect?.(toolCount.toolName);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with Date Range Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Feature Momentum Tracker
            </h2>
            <p className="text-muted-foreground">
              Track feature releases and innovation velocity across platforms
            </p>
          </div>
          <Select
            value={dateRange}
            onValueChange={(value) => setDateRange(value as "30" | "60" | "90")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="60">Last 60 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Features by Tool */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Features Last {dateRange} Days
              </CardTitle>
              <CardDescription>
                Feature count by platform with trend indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {momentumData.toolFeatureCounts.map((toolCount) => (
                  <Tooltip key={toolCount.toolName}>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleToolClick(toolCount)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{toolCount.toolName}</div>
                          <TrendBadge trend={toolCount.trend} />
                        </div>
                        <div className="flex items-center gap-3">
                          <Sparkline
                            data={toolCount.sparklineData}
                            className={cn(
                              toolCount.trend === "trending"
                                ? "text-emerald-500"
                                : toolCount.trend === "slowing"
                                ? "text-amber-500"
                                : "text-slate-400"
                            )}
                          />
                          <span className="font-bold text-lg tabular-nums">
                            {toolCount.count}
                          </span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to view {toolCount.toolName} features</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Category Distribution */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Feature Categories Distribution
              </CardTitle>
              <CardDescription>
                Breakdown by AI, Automation, Integration, Reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {momentumData.categoryDistribution.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            CATEGORY_COLORS[category.category]
                          )}
                        />
                        <span className="font-medium text-sm">
                          {category.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold tabular-nums">
                          {category.count}
                        </span>
                        <span className="text-muted-foreground">
                          ({category.percentage}%)
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={category.percentage}
                      className="h-2"
                      indicatorClassName={CATEGORY_COLORS[category.category]}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Fastest Growing Tools */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Fastest Growing Tools
              </CardTitle>
              <CardDescription>
                Top 3 platforms by innovation velocity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {momentumData.fastestGrowingTools.slice(0, 3).map((tool, index) => (
                  <div
                    key={tool.toolName}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-card to-accent/30"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg",
                        index === 0
                          ? "bg-yellow-500/20 text-yellow-600"
                          : index === 1
                          ? "bg-slate-500/20 text-slate-600"
                          : "bg-amber-700/20 text-amber-700"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{tool.toolName}</div>
                      <div className="text-sm text-muted-foreground">
                        {tool.recentCount} recent / {tool.previousCount} previous
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-xl font-bold tabular-nums",
                          tool.score > 0
                            ? "text-emerald-600"
                            : tool.score < 0
                            ? "text-red-600"
                            : "text-muted-foreground"
                        )}
                      >
                        {tool.score > 0 ? "+" : ""}
                        {tool.score}%
                      </div>
                      <TrendBadge trend={tool.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card 4: Timeline Chart - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Feature Release Timeline
            </CardTitle>
            <CardDescription>
              Chronological view of feature releases over the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TimelineChart data={momentumData.timelineData} />
          </CardContent>
        </Card>
      </div>

      {/* Feature Detail Modal */}
      {selectedTool && (
        <FeatureList
          toolName={selectedTool.name}
          features={selectedTool.features}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </TooltipProvider>
  );
}
