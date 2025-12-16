/**
 * Platform Matching Algorithm
 * Scores platforms based on wizard answers to provide top recommendations
 */

import type { Platform } from "@/types/platform";
import type { WizardAnswers, PlatformMatch } from "@/types/wizard";

/**
 * Calculate match score for a platform based on wizard answers
 * Score range: 0-100
 */
export function calculateMatchScore(
  platform: Platform,
  answers: WizardAnswers
): number {
  let score = 0;
  const weights = {
    companySize: 25,
    industry: 20,
    budget: 20,
    integrations: 15,
    supportVolume: 10,
    aiCapabilities: 5,
    deployment: 3,
    security: 2,
  };

  // 1. Company Size Match (25 points)
  if (platform.suitability?.company_size) {
    if (platform.suitability.company_size.includes(answers.companySize)) {
      score += weights.companySize;
    } else {
      // Partial match for adjacent sizes
      const sizeOrder = ["1-10", "11-50", "51-200", "201-1000", "1001+"];
      const answerIndex = sizeOrder.indexOf(answers.companySize);
      const platformSizes = platform.suitability.company_size.map((size) =>
        sizeOrder.indexOf(size)
      );

      const closestDistance = Math.min(
        ...platformSizes.map((pIndex) => Math.abs(pIndex - answerIndex))
      );

      if (closestDistance === 1) {
        score += weights.companySize * 0.5; // 50% for adjacent size
      } else if (closestDistance === 2) {
        score += weights.companySize * 0.25; // 25% for one size away
      }
    }
  }

  // 2. Industry Match (20 points)
  if (platform.suitability?.industries) {
    if (
      platform.suitability.industries.includes(answers.industry) ||
      platform.suitability.industries.includes("All")
    ) {
      score += weights.industry;
    }
  }

  // 3. Budget Match (20 points)
  const estimatedCost = estimateMonthlyCost(platform, answers.teamSize);
  const budgetMatch = isBudgetMatch(estimatedCost, answers.budget);

  if (budgetMatch === "exact") {
    score += weights.budget;
  } else if (budgetMatch === "close") {
    score += weights.budget * 0.5;
  }

  // 4. Integration Requirements (15 points) - CRITICAL
  if (answers.requiredIntegrations.length > 0) {
    const hasAllIntegrations = answers.requiredIntegrations.every(
      (required) => {
        const platformIntegrations =
          platform.integrations.top_integrations || [];
        return platformIntegrations.some((pi) =>
          pi.toLowerCase().includes(required.toLowerCase())
        );
      }
    );

    if (hasAllIntegrations) {
      score += weights.integrations;
    } else {
      // Heavy penalty for missing required integrations
      score -= 50;
    }
  } else {
    // No specific integrations required - give full points
    score += weights.integrations;
  }

  // 5. Support Volume Match (10 points)
  if (platform.suitability?.support_volume) {
    if (platform.suitability.support_volume.includes(answers.supportVolume)) {
      score += weights.supportVolume;
    }
  }

  // 6. AI Capabilities Match (5 points)
  if (answers.aiCapabilities.length > 0) {
    const hasAIFeatures = platform.features.some(
      (f) =>
        f.name.toLowerCase().includes("ai") ||
        f.description.toLowerCase().includes("ai") ||
        f.description.toLowerCase().includes("artificial intelligence")
    );

    if (hasAIFeatures) {
      score += weights.aiCapabilities;
    }
  } else {
    score += weights.aiCapabilities; // No AI required, give points
  }

  // 7. Deployment Type Match (3 points)
  // Most platforms are cloud-based; on-premise is rare
  if (answers.deployment === "Cloud Only") {
    score += weights.deployment; // Most platforms support this
  } else if (answers.deployment === "On-Premise") {
    // Check if platform mentions on-premise
    const supportsOnPremise =
      platform.description.toLowerCase().includes("on-premise") ||
      platform.description.toLowerCase().includes("self-hosted");
    if (supportsOnPremise) {
      score += weights.deployment;
    }
  } else {
    // Hybrid - give partial points
    score += weights.deployment * 0.5;
  }

  // 8. Security Certifications Match (2 points)
  if (answers.securityCerts.length > 0 && platform.security_compliance) {
    const hasRequiredCerts = answers.securityCerts.every((cert) => {
      if (cert === "None Required") return true;
      return platform.security_compliance?.certifications.some((pc) =>
        pc.toLowerCase().includes(cert.toLowerCase())
      );
    });

    if (hasRequiredCerts) {
      score += weights.security;
    }
  } else if (answers.securityCerts.includes("None Required")) {
    score += weights.security;
  }

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
}

/**
 * Estimate monthly cost for a platform based on team size
 */
function estimateMonthlyCost(platform: Platform, teamSize: string): number {
  const agents = parseInt(teamSize) || 5;

  // Find a suitable plan (prefer mid-tier for estimation)
  const plans = platform.pricing.plans;
  if (plans.length === 0) return 0;

  // Try to find a "Professional" or "Growth" plan
  let selectedPlan =
    plans.find(
      (p) =>
        p.name.toLowerCase().includes("professional") ||
        p.name.toLowerCase().includes("growth") ||
        p.name.toLowerCase().includes("pro")
    ) || plans[Math.floor(plans.length / 2)]; // or mid-tier

  // Extract price
  const priceStr =
    selectedPlan.price_annual ||
    selectedPlan.price_monthly ||
    selectedPlan.price ||
    "0";

  const pricePerAgent = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;

  return pricePerAgent * agents;
}

/**
 * Check if estimated cost matches budget range
 */
function isBudgetMatch(
  cost: number,
  budget: string
): "exact" | "close" | "none" {
  const ranges: Record<string, { min: number; max: number }> = {
    "<$500": { min: 0, max: 500 },
    "$500-$2K": { min: 500, max: 2000 },
    "$2K-$10K": { min: 2000, max: 10000 },
    "$10K-$50K": { min: 10000, max: 50000 },
    "$50K+": { min: 50000, max: Infinity },
  };

  const range = ranges[budget];
  if (!range) return "none";

  if (cost >= range.min && cost <= range.max) {
    return "exact";
  }

  // Check if close (within 20%)
  const margin = (range.max - range.min) * 0.2;
  if (cost >= range.min - margin && cost <= range.max + margin) {
    return "close";
  }

  return "none";
}

/**
 * Generate match reasons explaining why a platform was recommended
 */
export function generateMatchReasons(
  platform: Platform,
  answers: WizardAnswers,
  score: number
): string[] {
  const reasons: string[] = [];

  // Company size
  if (
    platform.suitability?.company_size?.includes(answers.companySize)
  ) {
    reasons.push(
      `Perfect fit for ${answers.companySize} employee companies`
    );
  }

  // Industry
  if (
    platform.suitability?.industries?.includes(answers.industry) ||
    platform.suitability?.industries?.includes("All")
  ) {
    if (answers.industry !== "All") {
      reasons.push(`Proven track record in ${answers.industry} industry`);
    }
  }

  // AI capabilities
  if (answers.aiCapabilities.length > 0) {
    const hasAI = platform.features.some((f) =>
      f.name.toLowerCase().includes("ai")
    );
    if (hasAI) {
      reasons.push("Strong AI capabilities match your requirements");
    }
  }

  // Integration support
  if (answers.requiredIntegrations.length > 0) {
    const matchedIntegrations = answers.requiredIntegrations.filter(
      (required) => {
        const platformIntegrations =
          platform.integrations.top_integrations || [];
        return platformIntegrations.some((pi) =>
          pi.toLowerCase().includes(required.toLowerCase())
        );
      }
    );

    if (matchedIntegrations.length > 0) {
      reasons.push(
        `Integrates with ${matchedIntegrations.join(", ")}`
      );
    }
  }

  // Support volume
  if (
    platform.suitability?.support_volume?.includes(answers.supportVolume)
  ) {
    reasons.push(`Handles ${answers.supportVolume} tickets/month efficiently`);
  }

  // Implementation time
  if (
    platform.suitability?.implementation_time_days &&
    answers.implementationTimeline
  ) {
    const days = platform.suitability.implementation_time_days;
    const timeline = answers.implementationTimeline;

    const matches =
      (timeline === "<1 week" && days <= 7) ||
      (timeline === "1-4 weeks" && days <= 30) ||
      (timeline === "1-3 months" && days <= 90);

    if (matches) {
      reasons.push(`Quick implementation (${days} days typical)`);
    }
  }

  // Free trial
  if (platform.pricing.free_trial) {
    reasons.push(
      `Free trial available (${platform.pricing.free_trial_duration || "available"})`
    );
  }

  // High rating
  if ((platform.reputation.g2_rating ?? 0) >= 4.5) {
    reasons.push(
      `Highly rated (${platform.reputation.g2_rating ?? "N/A"}/5 on G2)`
    );
  }

  return reasons.slice(0, 5); // Return top 5 reasons
}

/**
 * Generate potential concerns about a platform
 */
export function generateConcerns(
  platform: Platform,
  answers: WizardAnswers
): string[] {
  const concerns: string[] = [];

  // Budget concerns
  const estimatedCost = estimateMonthlyCost(platform, answers.teamSize);
  const budgetMatch = isBudgetMatch(estimatedCost, answers.budget);

  if (budgetMatch === "none") {
    concerns.push(
      `Estimated cost ($${estimatedCost.toFixed(0)}/mo) may exceed your budget`
    );
  }

  // Implementation complexity
  if (
    platform.suitability?.complexity_score &&
    platform.suitability.complexity_score >= 7
  ) {
    concerns.push(
      "Higher complexity - may require technical expertise to set up"
    );
  }

  // Implementation time
  if (
    platform.suitability?.implementation_time_days &&
    platform.suitability.implementation_time_days > 30 &&
    answers.implementationTimeline === "<1 week"
  ) {
    concerns.push(
      `Implementation typically takes ${platform.suitability.implementation_time_days} days`
    );
  }

  // Common complaints from risk assessment
  if (
    platform.risk_assessment?.common_complaints &&
    platform.risk_assessment.common_complaints.length > 0
  ) {
    concerns.push(...platform.risk_assessment.common_complaints.slice(0, 2));
  }

  return concerns.slice(0, 3); // Return top 3 concerns
}

/**
 * Find top matching platforms
 */
export function findTopMatches(
  platforms: Platform[],
  answers: WizardAnswers,
  limit: number = 5
): PlatformMatch[] {
  const scoredPlatforms = platforms
    .map((platform) => {
      const score = calculateMatchScore(platform, answers);
      const matchReasons = generateMatchReasons(platform, answers, score);
      const concerns = generateConcerns(platform, answers);
      const estimatedCost = estimateMonthlyCost(platform, answers.teamSize);

      // Determine pricing tier
      const plans = platform.pricing.plans;
      const tier =
        plans.find(
          (p) =>
            p.name.toLowerCase().includes("professional") ||
            p.name.toLowerCase().includes("pro")
        )?.name || plans[0]?.name || "Standard";

      return {
        platformId: platform.trade_name.toLowerCase().replace(/\s+/g, "-"),
        tradeName: platform.trade_name,
        score,
        matchReasons,
        concerns,
        pricing: {
          estimatedMonthly: estimatedCost,
          tier,
        },
      };
    })
    .filter((match) => match.score > 0) // Only show platforms with positive scores
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit); // Take top N

  return scoredPlatforms;
}
