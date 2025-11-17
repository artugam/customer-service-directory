/**
 * Type definitions for Platform Finder Wizard
 */

// Company size options
export type CompanySize = "1-10" | "11-50" | "51-200" | "201-1000" | "1001+";

// Industry options
export type Industry =
  | "All"
  | "Healthcare"
  | "Finance"
  | "Retail"
  | "E-commerce"
  | "SaaS"
  | "Technology"
  | "Education"
  | "Manufacturing"
  | "Professional Services"
  | "Other";

// Support volume options
export type SupportVolume = "<100" | "100-1K" | "1K-10K" | "10K+";

// Budget range options
export type BudgetRange =
  | "<$500"
  | "$500-$2K"
  | "$2K-$10K"
  | "$10K-$50K"
  | "$50K+";

// Support channels
export type SupportChannel =
  | "Email"
  | "Live Chat"
  | "Phone"
  | "Social Media"
  | "SMS"
  | "WhatsApp"
  | "Mobile App";

// AI capabilities
export type AICapability =
  | "AI Chatbot"
  | "Smart Routing"
  | "Sentiment Analysis"
  | "Predictive Analytics"
  | "Auto-responses"
  | "Knowledge Base AI";

// Deployment preference
export type DeploymentType = "Cloud Only" | "On-Premise" | "Hybrid";

// Security certifications
export type SecurityCert =
  | "SOC 2"
  | "ISO 27001"
  | "HIPAA"
  | "PCI-DSS"
  | "GDPR Compliant"
  | "None Required";

// Implementation timeline
export type ImplementationTimeline =
  | "<1 week"
  | "1-4 weeks"
  | "1-3 months"
  | "3+ months";

// Priority ranking
export type Priority = "Price" | "Features" | "Ease of Use" | "Integrations" | "Support";

// Deal breakers
export type DealBreaker =
  | "No Free Trial"
  | "No Phone Support"
  | "No API Access"
  | "Annual Contract Required"
  | "No Integration with [Tool]";

// Step 1: Company Context
export interface WizardStep1 {
  companySize: CompanySize;
  industry: Industry;
  supportVolume: SupportVolume;
  channels: SupportChannel[];
  teamSize: string; // number input
  budget: BudgetRange;
}

// Step 2: Requirements
export interface WizardStep2 {
  requiredIntegrations: string[]; // e.g., ["Salesforce", "Slack"]
  aiCapabilities: AICapability[];
  deployment: DeploymentType;
  securityCerts: SecurityCert[];
  implementationTimeline: ImplementationTimeline;
}

// Step 3: Priorities
export interface WizardStep3 {
  priorities: Priority[]; // ranked list
  dealBreakers: string[];
  similarCompanies?: boolean; // show peer insights
}

// Combined wizard answers
export interface WizardAnswers extends WizardStep1, WizardStep2, WizardStep3 {}

// Platform match result
export interface PlatformMatch {
  platformId: string;
  tradeName: string;
  score: number; // 0-100
  matchReasons: string[]; // why it matched
  concerns: string[]; // potential issues
  pricing: {
    estimatedMonthly: number;
    tier: string;
  };
}

// Wizard results
export interface WizardResults {
  answers: WizardAnswers;
  matches: PlatformMatch[];
  timestamp: string;
  shortlistId?: string; // for saving/sharing
}

// Wizard step metadata
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

// Export wizard configuration
export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: "Company Context",
    description: "Tell us about your business and support needs",
    fields: [
      "companySize",
      "industry",
      "supportVolume",
      "channels",
      "teamSize",
      "budget",
    ],
  },
  {
    id: 2,
    title: "Requirements",
    description: "What features and capabilities do you need?",
    fields: [
      "requiredIntegrations",
      "aiCapabilities",
      "deployment",
      "securityCerts",
      "implementationTimeline",
    ],
  },
  {
    id: 3,
    title: "Priorities",
    description: "What matters most to you?",
    fields: ["priorities", "dealBreakers", "similarCompanies"],
  },
];

// Integration options (common ones)
export const COMMON_INTEGRATIONS = [
  "Salesforce",
  "HubSpot",
  "Slack",
  "Microsoft Teams",
  "Shopify",
  "WooCommerce",
  "Jira",
  "Google Workspace",
  "Microsoft 365",
  "Zoom",
  "Zapier",
] as const;

export type CommonIntegration = (typeof COMMON_INTEGRATIONS)[number];
