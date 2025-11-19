"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WizardStep1, CompanySize, Industry, SupportVolume, BudgetRange, SupportChannel } from "@/types/wizard";

interface Step1Props {
  initialData?: Partial<WizardStep1>;
  onComplete: (data: WizardStep1) => void;
}

export default function WizardStep1({ initialData, onComplete }: Step1Props) {
  const [formData, setFormData] = useState<Partial<WizardStep1>>({
    companySize: initialData?.companySize || undefined,
    industry: initialData?.industry || undefined,
    supportVolume: initialData?.supportVolume || undefined,
    channels: initialData?.channels || [],
    teamSize: initialData?.teamSize || "",
    budget: initialData?.budget || undefined,
  });

  const channelOptions: SupportChannel[] = [
    "Email",
    "Live Chat",
    "Phone",
    "Social Media",
    "SMS",
    "WhatsApp",
    "Mobile App",
  ];

  const toggleChannel = (channel: SupportChannel) => {
    setFormData((prev) => {
      const channels = prev.channels || [];
      if (channels.includes(channel)) {
        return { ...prev, channels: channels.filter((c) => c !== channel) };
      } else {
        return { ...prev, channels: [...channels, channel] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.companySize ||
      !formData.industry ||
      !formData.supportVolume ||
      !formData.teamSize ||
      !formData.budget ||
      formData.channels?.length === 0
    ) {
      alert("Please fill out all fields");
      return;
    }

    onComplete(formData as WizardStep1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Company Context</h2>
        <p className="text-muted-foreground">
          Tell us about your business and support needs
        </p>
      </div>

      {/* Company Size */}
      <div className="space-y-2">
        <Label htmlFor="company-size">
          Company Size (Employees) <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.companySize}
          onValueChange={(value: CompanySize) =>
            setFormData((prev) => ({ ...prev, companySize: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-1000">201-1000 employees</SelectItem>
            <SelectItem value="1001+">1001+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry">
          Industry <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.industry}
          onValueChange={(value: Industry) =>
            setFormData((prev) => ({ ...prev, industry: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">General / Multiple Industries</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Finance">Finance & Banking</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="E-commerce">E-commerce</SelectItem>
            <SelectItem value="SaaS">SaaS / Software</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Professional Services">
              Professional Services
            </SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Support Volume */}
      <div className="space-y-2">
        <Label htmlFor="support-volume">
          Monthly Support Volume (Tickets) <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.supportVolume}
          onValueChange={(value: SupportVolume) =>
            setFormData((prev) => ({ ...prev, supportVolume: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ticket volume" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<100">Less than 100 tickets/month</SelectItem>
            <SelectItem value="100-1K">100-1,000 tickets/month</SelectItem>
            <SelectItem value="1K-10K">1,000-10,000 tickets/month</SelectItem>
            <SelectItem value="10K+">10,000+ tickets/month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Support Channels */}
      <div className="space-y-2">
        <Label>
          Support Channels Needed <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {channelOptions.map((channel) => (
            <Button
              key={channel}
              type="button"
              variant="outline"
              onClick={() => toggleChannel(channel)}
              className={`p-3 h-auto text-sm transition-all ${
                formData.channels?.includes(channel)
                  ? "border-primary bg-primary/10 text-primary"
                  : ""
              }`}
            >
              {channel}
            </Button>
          ))}
        </div>
      </div>

      {/* Team Size */}
      <div className="space-y-2">
        <Label htmlFor="team-size">
          Support Team Size (Number of Agents) <span className="text-destructive">*</span>
        </Label>
        <Input
          type="number"
          min="1"
          placeholder="e.g., 5"
          value={formData.teamSize}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, teamSize: e.target.value }))
          }
        />
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <Label htmlFor="budget">
          Monthly Budget Range <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.budget}
          onValueChange={(value: BudgetRange) =>
            setFormData((prev) => ({ ...prev, budget: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<$500">Less than $500/month</SelectItem>
            <SelectItem value="$500-$2K">$500 - $2,000/month</SelectItem>
            <SelectItem value="$2K-$10K">$2,000 - $10,000/month</SelectItem>
            <SelectItem value="$10K-$50K">$10,000 - $50,000/month</SelectItem>
            <SelectItem value="$50K+">$50,000+/month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">
          Next: Requirements →
        </Button>
      </div>
    </form>
  );
}
