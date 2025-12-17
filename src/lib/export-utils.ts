/**
 * Export Utilities for Comparison Data
 * Generates CSV, executive summaries, and business cases
 */

import type { Platform } from "@/types/platform";
import type { TCOBreakdown } from "@/types/tco";

/**
 * Export comparison data as CSV
 */
export function exportComparisonToCSV(platforms: Platform[]): string {
  if (platforms.length === 0) return "";

  // CSV Headers
  const headers = [
    "Platform Name",
    "Category",
    "Tagline",
    "Founded",
    "Customers",
    "G2 Rating",
    "G2 Reviews",
    "Free Trial",
    "Free Plan",
    "Starting Price",
    "Top Plan Price",
    "Integrations",
    "Top Features",
    "Best For",
    "Website",
  ];

  // CSV Rows
  const rows = platforms.map((platform) => {
    const startingPrice = platform.pricing.plans[0]?.price_annual ||
      platform.pricing.plans[0]?.price_monthly ||
      platform.pricing.plans[0]?.price ||
      "Contact Sales";

    const topPrice = platform.pricing.plans[platform.pricing.plans.length - 1]
      ?.price_annual ||
      platform.pricing.plans[platform.pricing.plans.length - 1]
        ?.price_monthly ||
      platform.pricing.plans[platform.pricing.plans.length - 1]?.price ||
      "Contact Sales";

    const topFeatures = platform.features
      .slice(0, 5)
      .map((f) => f.name)
      .join("; ");

    const bestFor = platform.target_audience.slice(0, 3).join("; ");

    return [
      platform.trade_name,
      platform.category_primary,
      `"${platform.tagline}"`,
      platform.founded_year.toString(),
      platform.statistics.customer_count?.split(/[;,:]/)[0].trim(),
      platform.reputation.g2_rating?.toString() ?? "N/A",
      platform.reputation.g2_reviews_count?.toString() ?? "0",
      platform.pricing.free_trial ? "Yes" : "No",
      platform.pricing.free_plan ? "Yes" : "No",
      startingPrice,
      topPrice,
      platform.integrations.total_integrations?.toString(),
      `"${topFeatures}"`,
      `"${bestFor}"`,
      platform.website_url,
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
}

/**
 * Generate executive summary for a platform
 */
export function generateExecutiveSummary(
  platform: Platform,
  tcoBreakdown?: TCOBreakdown
): string {
  const summary = `
# Executive Summary: ${platform.trade_name}

## Overview
${platform.description}

## Key Statistics
- **Founded**: ${platform.founded_year}
- **Customers**: ${platform.statistics.customer_count}
- **G2 Rating**: ${platform.reputation.g2_rating ?? "N/A"}/5 (${platform.reputation.g2_reviews_count ?? 0} reviews)
- **Integrations**: ${platform.integrations.total_integrations}+

## Pricing
**Model**: ${platform.pricing.model}
**Free Trial**: ${platform.pricing.free_trial ? `Yes (${platform.pricing.free_trial_duration || "Available"})` : "No"}
**Free Plan**: ${platform.pricing.free_plan ? "Yes" : "No"}

**Pricing Tiers** (${platform.pricing.plans.length} plans):
${platform.pricing.plans.map((plan) => {
    const price = plan.price_annual || plan.price_monthly || plan.price || "Contact Sales";
    return `- **${plan.name}**: ${price}`;
  }).join("\n")}

${tcoBreakdown ? `
## Total Cost of Ownership (3-Year Projection)
- **Year 1**: $${tcoBreakdown.year1Total.toLocaleString()} (includes setup costs)
- **Year 2**: $${tcoBreakdown.year2Total.toLocaleString()}
- **Year 3**: $${tcoBreakdown.year3Total.toLocaleString()}
- **3-Year Total**: $${tcoBreakdown.threeYearTotal.toLocaleString()}
- **Cost Per Ticket**: $${tcoBreakdown.costPerTicket.toFixed(2)}
` : ""}

## Top Features
${platform.features.slice(0, 8).map((f, i) => `${i + 1}. **${f.name}**: ${f.description}`).join("\n")}

## Unique Selling Points
${platform.unique_selling_points.map((usp, i) => `${i + 1}. ${usp}`).join("\n")}

## Best For
${platform.target_audience.slice(0, 5).map((ta, i) => `- ${ta}`).join("\n")}

${platform.suitability ? `
## Ideal Fit
**Company Sizes**: ${platform.suitability.company_size.join(", ")}
**Industries**: ${platform.suitability.industries.slice(0, 5).join(", ")}
**Support Volume**: ${platform.suitability.support_volume.join(", ")} tickets/month
**Implementation Time**: ~${platform.suitability.implementation_time_days} days
**Complexity Score**: ${platform.suitability.complexity_score}/10
` : ""}

## Top Integrations
${platform.integrations.top_integrations.slice(0, 10).join(", ")}

## Security & Compliance
${platform.security_compliance ? platform.security_compliance.certifications.join(", ") : "Standard security features"}

## Awards & Recognition
${(platform.reputation.awards ?? []).slice(0, 5).map((award) => `- ${award}`).join("\n")}

${platform.risk_assessment ? `
## Important Considerations
**Contract Flexibility**: ${platform.risk_assessment.contract_flexibility}
**Switching Difficulty**: ${platform.risk_assessment.switching_difficulty}
**Data Export**: ${platform.risk_assessment.data_export}

**Common Feedback**:
${platform.risk_assessment.common_complaints.slice(0, 3).map((complaint) => `- ${complaint}`).join("\n")}

**Mitigations**:
${platform.risk_assessment.mitigation.slice(0, 3).map((mit) => `- ${mit}`).join("\n")}
` : ""}

## Recommendation
${platform.trade_name} is recommended for ${platform.target_audience[0] || "organizations"} seeking ${platform.unique_selling_points[0] || "comprehensive customer service capabilities"}.

## Next Steps
1. Schedule a demo: ${platform.website_url}
2. ${platform.pricing.free_trial ? `Start free trial (${platform.pricing.free_trial_duration || "available"})` : "Request pricing details"}
3. Review integration compatibility
4. Plan implementation timeline
5. Prepare stakeholder presentation

---
*Generated by Customer Service Directory | ${new Date().toLocaleDateString()}*
`;

  return summary.trim();
}

/**
 * Generate comparison matrix as markdown
 */
export function generateComparisonMatrix(platforms: Platform[]): string {
  if (platforms.length === 0) return "";

  const matrix = `
# Platform Comparison Matrix

| Feature | ${platforms.map((p) => p.trade_name).join(" | ")} |
|---------|${platforms.map(() => "-------").join("|")}|
| **Category** | ${platforms.map((p) => p.category_primary).join(" | ")} |
| **Founded** | ${platforms.map((p) => p.founded_year).join(" | ")} |
| **Customers** | ${platforms.map((p) => p.statistics.customer_count?.split(/[;,:]/)[0].trim()).join(" | ")} |
| **G2 Rating** | ${platforms.map((p) => `${p.reputation.g2_rating ?? "N/A"}/5 (${p.reputation.g2_reviews_count ?? 0} reviews)`).join(" | ")} |
| **Free Trial** | ${platforms.map((p) => p.pricing.free_trial ? "✅ Yes" : "❌ No").join(" | ")} |
| **Free Plan** | ${platforms.map((p) => p.pricing.free_plan ? "✅ Yes" : "❌ No").join(" | ")} |
| **Starting Price** | ${platforms.map((p) => {
    const price = p.pricing.plans[0]?.price_annual ||
      p.pricing.plans[0]?.price_monthly ||
      p.pricing.plans[0]?.price ||
      "Contact";
    return price;
  }).join(" | ")} |
| **# of Plans** | ${platforms.map((p) => p.pricing.plans.length).join(" | ")} |
| **Integrations** | ${platforms.map((p) => `${p.integrations.total_integrations}+`).join(" | ")} |
| **# of Features** | ${platforms.map((p) => p.features.length).join(" | ")} |
| **API Available** | ${platforms.map((p) => p.integrations.has_api ? "✅ Yes" : "❌ No").join(" | ")} |
${platforms[0].security_compliance ? `| **Security Certs** | ${platforms.map((p) => p.security_compliance?.certifications.length || 0).join(" | ")} |` : ""}
${platforms[0].suitability ? `| **Complexity** | ${platforms.map((p) => p.suitability ? `${p.suitability.complexity_score}/10` : "N/A").join(" | ")} |` : ""}
${platforms[0].suitability ? `| **Implementation** | ${platforms.map((p) => p.suitability ? `${p.suitability.implementation_time_days} days` : "N/A").join(" | ")} |` : ""}
| **Website** | ${platforms.map((p) => `[Visit](${p.website_url})`).join(" | ")} |

## Feature Comparison

${platforms[0].features.slice(0, 10).map((_, index) => {
    const featureName = platforms[0].features[index]?.name || "";
    return `| **${featureName}** | ${platforms.map((p) => {
      const hasFeature = p.features.some((f) => f.name.toLowerCase().includes(featureName.toLowerCase()));
      return hasFeature ? "✅" : "❌";
    }).join(" | ")} |`;
  }).join("\n")}

---
*Generated by Customer Service Directory | ${new Date().toLocaleDateString()}*
`;

  return matrix.trim();
}

/**
 * Download file utility
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export comparison as CSV file
 */
export function downloadComparisonCSV(platforms: Platform[]) {
  const csv = exportComparisonToCSV(platforms);
  const filename = `platform-comparison-${Date.now()}.csv`;
  downloadFile(csv, filename, "text/csv");
}

/**
 * Export executive summary as markdown file
 */
export function downloadExecutiveSummary(
  platform: Platform,
  tcoBreakdown?: TCOBreakdown
) {
  const summary = generateExecutiveSummary(platform, tcoBreakdown);
  const filename = `${platform.trade_name.toLowerCase().replace(/\s+/g, "-")}-summary-${Date.now()}.md`;
  downloadFile(summary, filename, "text/markdown");
}

/**
 * Export comparison matrix as markdown file
 */
export function downloadComparisonMatrix(platforms: Platform[]) {
  const matrix = generateComparisonMatrix(platforms);
  const filename = `platform-comparison-matrix-${Date.now()}.md`;
  downloadFile(matrix, filename, "text/markdown");
}
