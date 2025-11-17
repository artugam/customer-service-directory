/**
 * Total Cost of Ownership (TCO) Calculator Types
 */

// TCO Input Parameters
export interface TCOInputs {
  numberOfAgents: number;
  expectedTickets: number; // monthly
  selectedPlan: string; // plan name
  channels: string[]; // email, chat, phone, etc.
  integrations: string[]; // required integrations
  includePremiumSupport: boolean;
  implementationSupport: boolean; // professional services
  trainingRequired: boolean;
}

// TCO Cost Breakdown
export interface TCOBreakdown {
  // Recurring Costs (Monthly)
  baseSubscription: number; // base per-agent cost
  addOnFeatures: number; // additional features
  integrationCosts: number; // premium integrations
  apiUsage: number; // estimated API overage
  dataStorage: number; // storage overage
  premiumSupport: number; // if selected
  monthlyTotal: number;

  // One-Time Costs
  implementationFee: number;
  migrationCost: number;
  customization: number;
  oneTimeTotal: number;

  // Training Costs
  trainingHours: number;
  trainingCost: number;

  // Year Projections
  year1Total: number;
  year2Total: number;
  year3Total: number;
  threeYearTotal: number;

  // Per-Ticket Metrics
  costPerTicket: number; // monthly cost / expected tickets

  // Hidden Cost Alerts
  warnings: TCOWarning[];
}

export interface TCOWarning {
  type: "high" | "medium" | "low";
  message: string;
  impact: string; // dollar amount or percentage
}

// TCO Comparison (for multiple platforms)
export interface TCOComparison {
  platformName: string;
  year1: number;
  year2: number;
  year3: number;
  total3Year: number;
  costPerTicket: number;
}

// PDF Export Data
export interface TCOReportData {
  platformName: string;
  generatedDate: string;
  inputs: TCOInputs;
  breakdown: TCOBreakdown;
  assumptions: string[];
  recommendations: string[];
}
