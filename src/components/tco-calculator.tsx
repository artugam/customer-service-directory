"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Platform } from "@/types/platform";
import type { TCOInputs, TCOBreakdown } from "@/types/tco";
import { calculateTCO, formatCurrency, getAvailablePlans } from "@/lib/tco-calculator";
import { COMMON_INTEGRATIONS } from "@/types/wizard";

interface TCOCalculatorProps {
  platform: Platform;
}

export default function TCOCalculator({ platform }: TCOCalculatorProps) {
  const [inputs, setInputs] = useState<TCOInputs>({
    numberOfAgents: 5,
    expectedTickets: 500,
    selectedPlan: getAvailablePlans(platform)[1] || getAvailablePlans(platform)[0] || "",
    channels: ["Email", "Live Chat"],
    integrations: [],
    includePremiumSupport: false,
    implementationSupport: false,
    trainingRequired: true,
  });

  const [results, setResults] = useState<TCOBreakdown | null>(null);
  const [showResults, setShowResults] = useState(false);

  const availablePlans = getAvailablePlans(platform);

  const toggleIntegration = (integration: string) => {
    setInputs((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter((i) => i !== integration)
        : [...prev.integrations, integration],
    }));
  };

  const handleCalculate = () => {
    const tcoResults = calculateTCO(platform, inputs);
    setResults(tcoResults);
    setShowResults(true);
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert("PDF export coming soon!");
  };

  return (
    <div className="space-y-6">
      {/* Calculator Inputs */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">
            💰 Total Cost of Ownership Calculator
          </h3>
          <p className="text-muted-foreground">
            Calculate the TRUE cost including hidden fees, integrations, training, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Number of Agents */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Number of Support Agents
            </label>
            <Input
              type="number"
              min="1"
              value={inputs.numberOfAgents}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  numberOfAgents: parseInt(e.target.value) || 1,
                }))
              }
            />
          </div>

          {/* Expected Tickets */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Monthly Ticket Volume
            </label>
            <Input
              type="number"
              min="0"
              value={inputs.expectedTickets}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  expectedTickets: parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>

          {/* Plan Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Plan</label>
            <Select
              value={inputs.selectedPlan}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, selectedPlan: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent>
                {availablePlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Integrations */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Required Integrations (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_INTEGRATIONS.slice(0, 6).map((integration) => (
                <button
                  key={integration}
                  type="button"
                  onClick={() => toggleIntegration(integration)}
                  className={`px-3 py-1 text-xs border-2 rounded-full transition-all ${
                    inputs.integrations.includes(integration)
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {integration}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.includePremiumSupport}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  includePremiumSupport: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <div>
              <div className="text-sm font-medium">Premium Support</div>
              <div className="text-xs text-muted-foreground">
                Dedicated account manager, priority response times
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.implementationSupport}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  implementationSupport: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <div>
              <div className="text-sm font-medium">
                Professional Implementation Services
              </div>
              <div className="text-xs text-muted-foreground">
                Expert help with setup, migration, and customization
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.trainingRequired}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  trainingRequired: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <div>
              <div className="text-sm font-medium">Team Training</div>
              <div className="text-xs text-muted-foreground">
                Onboarding sessions for your support team
              </div>
            </div>
          </label>
        </div>

        {/* Calculate Button */}
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full">
            Calculate Total Cost
          </Button>
        </div>
      </Card>

      {/* Results */}
      {showResults && results && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your True Cost Breakdown</h3>
              <p className="text-muted-foreground">
                Here's what you'll actually pay - no surprises
              </p>
            </div>
            <Button onClick={handleExportPDF} variant="outline" size="sm">
              📄 Export PDF
            </Button>
          </div>

          {/* Monthly Costs */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-4">Monthly Recurring Costs</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Subscription</span>
                <span className="font-semibold">
                  {formatCurrency(results.baseSubscription)}
                </span>
              </div>
              {results.addOnFeatures > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Add-On Features</span>
                  <span className="font-semibold">
                    {formatCurrency(results.addOnFeatures)}
                  </span>
                </div>
              )}
              {results.integrationCosts > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Premium Integrations
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(results.integrationCosts)}
                  </span>
                </div>
              )}
              {results.apiUsage > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Usage (est.)</span>
                  <span className="font-semibold">
                    {formatCurrency(results.apiUsage)}
                  </span>
                </div>
              )}
              {results.dataStorage > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Data Storage (est.)
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(results.dataStorage)}
                  </span>
                </div>
              )}
              {results.premiumSupport > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium Support</span>
                  <span className="font-semibold">
                    {formatCurrency(results.premiumSupport)}
                  </span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Monthly Total</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(results.monthlyTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* One-Time Costs */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-4">One-Time Costs</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Implementation Fee</span>
                <span className="font-semibold">
                  {formatCurrency(results.implementationFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Data Migration (est.)
                </span>
                <span className="font-semibold">
                  {formatCurrency(results.migrationCost)}
                </span>
              </div>
              {results.customization > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customization</span>
                  <span className="font-semibold">
                    {formatCurrency(results.customization)}
                  </span>
                </div>
              )}
              {results.trainingCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Training ({results.trainingHours} hours)
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(results.trainingCost)}
                  </span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">One-Time Total</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(results.oneTimeTotal + results.trainingCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Year Projections */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-4">3-Year Cost Projection</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Year 1</div>
                  <div className="text-xs text-muted-foreground">
                    Includes one-time costs
                  </div>
                </div>
                <span className="text-xl font-bold">
                  {formatCurrency(results.year1Total)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Year 2</div>
                  <div className="text-xs text-muted-foreground">
                    ~5% price increase
                  </div>
                </div>
                <span className="text-xl font-bold">
                  {formatCurrency(results.year2Total)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Year 3</div>
                  <div className="text-xs text-muted-foreground">
                    ~10% cumulative increase
                  </div>
                </div>
                <span className="text-xl font-bold">
                  {formatCurrency(results.year3Total)}
                </span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-xl">
                  <span className="font-bold">3-Year Total</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(results.threeYearTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-4">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Cost Per Ticket
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(results.costPerTicket)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Cost Per Agent/Month
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(results.monthlyTotal / inputs.numberOfAgents)}
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                ⚠️ Important Considerations
              </h4>
              <div className="space-y-3">
                {results.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge
                      variant={
                        warning.type === "high"
                          ? "destructive"
                          : warning.type === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="mt-1"
                    >
                      {warning.type}
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium">{warning.message}</div>
                      <div className="text-sm text-muted-foreground">
                        {warning.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Button onClick={handleExportPDF} className="flex-1">
              📄 Export Full Report
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href={`mailto:?subject=TCO for ${platform.trade_name}`}>
                📧 Email to Team
              </a>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
