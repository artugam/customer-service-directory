/**
 * TCO (Total Cost of Ownership) Calculator
 * Calculates true costs including hidden fees and projections
 */

import type { Platform } from "@/types/platform";
import type { TCOInputs, TCOBreakdown, TCOWarning } from "@/types/tco";

/**
 * Calculate Total Cost of Ownership for a platform
 */
export function calculateTCO(
  platform: Platform,
  inputs: TCOInputs
): TCOBreakdown {
  const warnings: TCOWarning[] = [];

  // 1. Base Subscription Cost
  const baseSubscription = calculateBaseSubscription(
    platform,
    inputs.selectedPlan,
    inputs.numberOfAgents
  );

  // 2. Add-On Features
  const addOnFeatures = calculateAddOns(platform, inputs);

  // 3. Integration Costs
  const integrationCosts = calculateIntegrationCosts(
    platform,
    inputs.integrations
  );

  // 4. API Usage Costs
  const apiUsage = calculateAPIUsage(platform, inputs.expectedTickets);

  // 5. Data Storage Costs
  const dataStorage = calculateStorageCosts(platform, inputs.numberOfAgents);

  // 6. Premium Support
  const premiumSupport = inputs.includePremiumSupport
    ? estimatePremiumSupport(baseSubscription)
    : 0;

  // Monthly Total
  const monthlyTotal =
    baseSubscription +
    addOnFeatures +
    integrationCosts +
    apiUsage +
    dataStorage +
    premiumSupport;

  // 7. One-Time Costs
  const implementationFee = inputs.implementationSupport
    ? platform.pricing.hidden_costs?.implementation_fee?.max || 0
    : platform.pricing.hidden_costs?.implementation_fee?.min || 0;

  const migrationCost =
    ((platform.pricing.hidden_costs?.migration_estimate?.min || 0) +
      (platform.pricing.hidden_costs?.migration_estimate?.max || 0)) / 2;

  const customization = inputs.implementationSupport ? 2000 : 0; // estimate

  const oneTimeTotal = implementationFee + migrationCost + customization;

  // 8. Training Costs
  const trainingHours = inputs.trainingRequired
    ? platform.pricing.hidden_costs?.training_hours_estimate || 20
    : 0;
  const trainingCostPerHour =
    platform.pricing.hidden_costs?.training_cost_per_hour || 0;
  const trainingCost = trainingHours * trainingCostPerHour;

  // 9. Year Projections (with 5% annual increase)
  const year1Total = monthlyTotal * 12 + oneTimeTotal + trainingCost;
  const year2Total = monthlyTotal * 12 * 1.05; // 5% increase
  const year3Total = monthlyTotal * 12 * 1.1; // 10% cumulative
  const threeYearTotal = year1Total + year2Total + year3Total;

  // 10. Per-Ticket Cost
  const annualTickets = inputs.expectedTickets * 12;
  const costPerTicket = annualTickets > 0 ? year1Total / annualTickets : 0;

  // 11. Generate Warnings
  generateWarnings(warnings, {
    baseSubscription,
    integrationCosts,
    implementationFee,
    platform,
    inputs,
  });

  return {
    baseSubscription,
    addOnFeatures,
    integrationCosts,
    apiUsage,
    dataStorage,
    premiumSupport,
    monthlyTotal,
    implementationFee,
    migrationCost,
    customization,
    oneTimeTotal,
    trainingHours,
    trainingCost,
    year1Total,
    year2Total,
    year3Total,
    threeYearTotal,
    costPerTicket,
    warnings,
  };
}

/**
 * Calculate base subscription cost
 */
function calculateBaseSubscription(
  platform: Platform,
  planName: string,
  agents: number
): number {
  const plan = platform.pricing.plans.find(
    (p) => p.name.toLowerCase() === planName.toLowerCase()
  );

  if (!plan) {
    // Fallback to first plan
    const fallbackPlan = platform.pricing.plans[0];
    const price = extractPrice(
      fallbackPlan.price_annual ||
      fallbackPlan.price_monthly ||
      fallbackPlan.price ||
      "0"
    );
    return price * agents;
  }

  // Prefer annual pricing (usually cheaper)
  const priceStr =
    plan.price_annual || plan.price_monthly || plan.price || "0";
  const pricePerAgent = extractPrice(priceStr);

  return pricePerAgent * agents;
}

/**
 * Calculate add-on feature costs
 */
function calculateAddOns(platform: Platform, inputs: TCOInputs): number {
  let total = 0;

  // AI features add-on
  if (platform.pricing.add_ons?.freddy_ai_agent) {
    // Estimate AI usage based on ticket volume
    if (inputs.expectedTickets > 500) {
      // Parse AI pricing (e.g., "$49 per 100 sessions")
      const aiCost = 49; // simplification
      total += aiCost;
    }
  }

  return total;
}

/**
 * Calculate integration costs
 */
function calculateIntegrationCosts(
  platform: Platform,
  integrations: string[]
): number {
  let total = 0;

  if (!platform.pricing.hidden_costs?.premium_integrations) {
    return 0;
  }

  integrations.forEach((integration) => {
    const premiumIntegration =
      platform.pricing.hidden_costs?.premium_integrations?.find((pi) =>
        pi.name.toLowerCase().includes(integration.toLowerCase())
      );

    if (premiumIntegration && premiumIntegration.cost) {
      const costValue = extractPrice(premiumIntegration.cost);
      if (premiumIntegration.per === "month") {
        total += costValue;
      } else if (premiumIntegration.per === "year") {
        total += costValue / 12;
      }
    }
  });

  return total;
}

/**
 * Calculate API usage costs
 */
function calculateAPIUsage(platform: Platform, monthlyTickets: number): number {
  const limits = platform.pricing.hidden_costs?.api_limits;
  if (!limits) return 0;

  // Estimate API calls (assume 10 calls per ticket)
  const estimatedCalls = monthlyTickets * 10;

  const includedCalls = limits.included_calls || 0;
  const overageCost = limits.overage_per_10k || 0;

  if (estimatedCalls > includedCalls) {
    const overageCalls = estimatedCalls - includedCalls;
    const overageBlocks = Math.ceil(overageCalls / 10000);
    return overageBlocks * overageCost;
  }

  return 0;
}

/**
 * Calculate storage costs
 */
function calculateStorageCosts(platform: Platform, agents: number): number {
  const limits = platform.pricing.hidden_costs?.data_storage_limits;
  if (!limits) return 0;

  // Estimate storage (assume 2GB per agent)
  const estimatedStorage = agents * 2;

  const includedGB = limits.included_gb || 0;
  const overageCost = limits.overage_per_gb || 0;

  if (estimatedStorage > includedGB) {
    const overageGB = estimatedStorage - includedGB;
    return overageGB * overageCost;
  }

  return 0;
}

/**
 * Estimate premium support cost (typically 15-20% of base)
 */
function estimatePremiumSupport(baseSubscription: number): number {
  return baseSubscription * 0.15; // 15% premium
}

/**
 * Extract numeric price from string
 */
function extractPrice(priceStr: string): number {
  const match = priceStr.replace(/[^0-9.]/g, "");
  return parseFloat(match) || 0;
}

/**
 * Generate cost warnings
 */
function generateWarnings(
  warnings: TCOWarning[],
  data: {
    baseSubscription: number;
    integrationCosts: number;
    implementationFee: number;
    platform: Platform;
    inputs: TCOInputs;
  }
): void {
  // High integration costs
  if (data.integrationCosts > 200) {
    warnings.push({
      type: "high",
      message: "Premium integrations add significant monthly costs",
      impact: `+$${data.integrationCosts.toFixed(0)}/month`,
    });
  }

  // High implementation fee
  if (data.implementationFee > 5000) {
    warnings.push({
      type: "high",
      message: "Implementation and setup fees are substantial",
      impact: `$${data.implementationFee.toFixed(0)} one-time`,
    });
  }

  // API limits warning
  if (data.platform.pricing.hidden_costs?.api_limits) {
    const limits = data.platform.pricing.hidden_costs.api_limits;
    const estimatedCalls = data.inputs.expectedTickets * 10;

    const includedCalls = limits.included_calls || 0;

    if (estimatedCalls > includedCalls * 0.8) {
      warnings.push({
        type: "medium",
        message: "You may exceed API limits with current ticket volume",
        impact: `Potential overage charges`,
      });
    }
  }

  // Annual price increase
  warnings.push({
    type: "low",
    message: "Pricing typically increases 5-10% annually",
    impact: "Built into projections",
  });

  // Hidden training costs
  if (
    data.platform.pricing.hidden_costs?.training_cost_per_hour &&
    data.platform.pricing.hidden_costs.training_cost_per_hour > 0
  ) {
    warnings.push({
      type: "medium",
      message: "Training is not included - requires paid hours",
      impact: `$${data.platform.pricing.hidden_costs.training_cost_per_hour}/hour`,
    });
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get available plans for a platform
 */
export function getAvailablePlans(platform: Platform): string[] {
  return platform.pricing.plans.map((p) => p.name);
}
