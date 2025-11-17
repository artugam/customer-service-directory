import { Metadata } from "next";
import PlatformWizard from "@/components/platform-wizard";

export const metadata: Metadata = {
  title: "Platform Finder Wizard | Customer Service Directory",
  description:
    "Find the perfect customer service platform for your business in minutes. Answer a few questions and get personalized recommendations based on your specific needs.",
  openGraph: {
    title: "Platform Finder Wizard | Customer Service Directory",
    description:
      "Find the perfect customer service platform for your business in minutes.",
  },
};

export default function FindPlatformPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Answer a few questions and we'll recommend the best customer service
            platforms for your specific needs. Takes less than 3 minutes.
          </p>
        </div>

        {/* Wizard Component */}
        <PlatformWizard />
      </div>
    </div>
  );
}
