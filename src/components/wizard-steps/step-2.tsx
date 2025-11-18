"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type {
  WizardStep2,
  AICapability,
  DeploymentType,
  SecurityCert,
  ImplementationTimeline,
} from "@/types/wizard";
import { COMMON_INTEGRATIONS } from "@/types/wizard";

interface Step2Props {
  initialData?: Partial<WizardStep2>;
  onComplete: (data: WizardStep2) => void;
  onBack: () => void;
}

export default function WizardStep2({
  initialData,
  onComplete,
  onBack,
}: Step2Props) {
  const [formData, setFormData] = useState<Partial<WizardStep2>>({
    requiredIntegrations: initialData?.requiredIntegrations || [],
    aiCapabilities: initialData?.aiCapabilities || [],
    deployment: initialData?.deployment || undefined,
    securityCerts: initialData?.securityCerts || [],
    implementationTimeline: initialData?.implementationTimeline || undefined,
  });

  const [customIntegration, setCustomIntegration] = useState("");

  const aiOptions: AICapability[] = [
    "AI Chatbot",
    "Smart Routing",
    "Sentiment Analysis",
    "Predictive Analytics",
    "Auto-responses",
    "Knowledge Base AI",
  ];

  const securityOptions: SecurityCert[] = [
    "SOC 2",
    "ISO 27001",
    "HIPAA",
    "PCI-DSS",
    "GDPR Compliant",
    "None Required",
  ];

  const toggleIntegration = (integration: string) => {
    setFormData((prev) => {
      const integrations = prev.requiredIntegrations || [];
      if (integrations.includes(integration)) {
        return {
          ...prev,
          requiredIntegrations: integrations.filter((i) => i !== integration),
        };
      } else {
        return {
          ...prev,
          requiredIntegrations: [...integrations, integration],
        };
      }
    });
  };

  const addCustomIntegration = () => {
    if (customIntegration.trim()) {
      setFormData((prev) => ({
        ...prev,
        requiredIntegrations: [
          ...(prev.requiredIntegrations || []),
          customIntegration.trim(),
        ],
      }));
      setCustomIntegration("");
    }
  };

  const toggleAI = (capability: AICapability) => {
    setFormData((prev) => {
      const capabilities = prev.aiCapabilities || [];
      if (capabilities.includes(capability)) {
        return {
          ...prev,
          aiCapabilities: capabilities.filter((c) => c !== capability),
        };
      } else {
        return { ...prev, aiCapabilities: [...capabilities, capability] };
      }
    });
  };

  const toggleSecurity = (cert: SecurityCert) => {
    setFormData((prev) => {
      const certs = prev.securityCerts || [];

      // If "None Required" is selected, clear others
      if (cert === "None Required") {
        return { ...prev, securityCerts: ["None Required"] };
      }

      // If selecting another cert, remove "None Required"
      const filtered = certs.filter((c) => c !== "None Required");

      if (filtered.includes(cert)) {
        return { ...prev, securityCerts: filtered.filter((c) => c !== cert) };
      } else {
        return { ...prev, securityCerts: [...filtered, cert] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.deployment ||
      !formData.implementationTimeline ||
      formData.securityCerts?.length === 0
    ) {
      alert("Please fill out all required fields");
      return;
    }

    onComplete(formData as WizardStep2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Requirements</h2>
        <p className="text-muted-foreground">
          What features and capabilities do you need?
        </p>
      </div>

      {/* Required Integrations */}
      <div className="space-y-2">
        <Label>
          Required Integrations (Optional)
        </Label>
        <p className="text-xs text-muted-foreground">
          Select the tools your platform must integrate with
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {COMMON_INTEGRATIONS.map((integration) => (
            <Button
              key={integration}
              type="button"
              variant="outline"
              onClick={() => toggleIntegration(integration)}
              className={`p-2 h-auto text-sm transition-all ${
                formData.requiredIntegrations?.includes(integration)
                  ? "border-primary bg-primary/10 text-primary"
                  : ""
              }`}
            >
              {integration}
            </Button>
          ))}
        </div>

        {/* Custom Integration Input */}
        <div className="flex gap-2 mt-3">
          <Input
            type="text"
            placeholder="Add custom integration..."
            value={customIntegration}
            onChange={(e) => setCustomIntegration(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomIntegration();
              }
            }}
          />
          <Button type="button" onClick={addCustomIntegration} variant="outline">
            Add
          </Button>
        </div>

        {/* Display custom integrations */}
        {formData.requiredIntegrations
          ?.filter((i) => !COMMON_INTEGRATIONS.includes(i as any))
          .map((integration) => (
            <Badge
              key={integration}
              variant="secondary"
              className="mr-2 cursor-pointer"
              onClick={() => toggleIntegration(integration)}
            >
              {integration}
              <span className="ml-2">×</span>
            </Badge>
          ))}
      </div>

      {/* AI Capabilities */}
      <div className="space-y-2">
        <Label>AI Capabilities (Optional)</Label>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {aiOptions.map((capability) => (
            <Button
              key={capability}
              type="button"
              variant="outline"
              onClick={() => toggleAI(capability)}
              className={`p-2 h-auto text-sm transition-all ${
                formData.aiCapabilities?.includes(capability)
                  ? "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  : ""
              }`}
            >
              {capability}
            </Button>
          ))}
        </div>
      </div>

      {/* Deployment Preference */}
      <div className="space-y-2">
        <Label htmlFor="deployment">
          Deployment Preference <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.deployment}
          onValueChange={(value: DeploymentType) =>
            setFormData((prev) => ({ ...prev, deployment: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select deployment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cloud Only">Cloud Only (SaaS)</SelectItem>
            <SelectItem value="On-Premise">On-Premise</SelectItem>
            <SelectItem value="Hybrid">Hybrid (Cloud + On-Premise)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Security Certifications */}
      <div className="space-y-2">
        <Label>
          Security & Compliance Requirements <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {securityOptions.map((cert) => (
            <Button
              key={cert}
              type="button"
              variant="outline"
              onClick={() => toggleSecurity(cert)}
              className={`p-2 h-auto text-sm transition-all ${
                formData.securityCerts?.includes(cert)
                  ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
                  : ""
              }`}
            >
              {cert}
            </Button>
          ))}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="space-y-2">
        <Label htmlFor="implementation-timeline">
          Implementation Timeline <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.implementationTimeline}
          onValueChange={(value: ImplementationTimeline) =>
            setFormData((prev) => ({ ...prev, implementationTimeline: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="When do you need to be live?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<1 week">Less than 1 week</SelectItem>
            <SelectItem value="1-4 weeks">1-4 weeks</SelectItem>
            <SelectItem value="1-3 months">1-3 months</SelectItem>
            <SelectItem value="3+ months">3+ months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button type="button" onClick={onBack} variant="outline" size="lg">
          ← Back
        </Button>
        <Button type="submit" size="lg">
          Next: Priorities →
        </Button>
      </div>
    </form>
  );
}
