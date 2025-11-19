"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { WizardStep3, Priority } from "@/types/wizard";

interface Step3Props {
  initialData?: Partial<WizardStep3>;
  onComplete: (data: WizardStep3) => void;
  onBack: () => void;
}

export default function WizardStep3({
  initialData,
  onComplete,
  onBack,
}: Step3Props) {
  const [formData, setFormData] = useState<Partial<WizardStep3>>({
    priorities: initialData?.priorities || [],
    dealBreakers: initialData?.dealBreakers || [],
    similarCompanies: initialData?.similarCompanies ?? true,
  });

  const [customDealBreaker, setCustomDealBreaker] = useState("");

  const priorityOptions: Priority[] = [
    "Price",
    "Features",
    "Ease of Use",
    "Integrations",
    "Support",
  ];

  const commonDealBreakers = [
    "No Free Trial",
    "No Phone Support",
    "No API Access",
    "Annual Contract Required",
    "No Mobile App",
  ];

  const togglePriority = (priority: Priority) => {
    setFormData((prev) => {
      const priorities = prev.priorities || [];
      if (priorities.includes(priority)) {
        return {
          ...prev,
          priorities: priorities.filter((p) => p !== priority),
        };
      } else {
        // Limit to 3 priorities
        if (priorities.length >= 3) {
          alert("You can select up to 3 priorities");
          return prev;
        }
        return { ...prev, priorities: [...priorities, priority] };
      }
    });
  };

  const toggleDealBreaker = (dealBreaker: string) => {
    setFormData((prev) => {
      const dealBreakers = prev.dealBreakers || [];
      if (dealBreakers.includes(dealBreaker)) {
        return {
          ...prev,
          dealBreakers: dealBreakers.filter((d) => d !== dealBreaker),
        };
      } else {
        return { ...prev, dealBreakers: [...dealBreakers, dealBreaker] };
      }
    });
  };

  const addCustomDealBreaker = () => {
    if (customDealBreaker.trim()) {
      setFormData((prev) => ({
        ...prev,
        dealBreakers: [...(prev.dealBreakers || []), customDealBreaker.trim()],
      }));
      setCustomDealBreaker("");
    }
  };

  const getPriorityRank = (priority: Priority): number => {
    const index = formData.priorities?.indexOf(priority);
    return index !== undefined && index >= 0 ? index + 1 : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.priorities?.length === 0) {
      alert("Please select at least one priority");
      return;
    }

    onComplete(formData as WizardStep3);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Priorities</h2>
        <p className="text-muted-foreground">
          What matters most to you? (Select up to 3 in order of importance)
        </p>
      </div>

      {/* Priority Selection */}
      <div className="space-y-2">
        <Label>
          Top Priorities <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          Select up to 3 priorities. The order matters - first selected is most
          important.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {priorityOptions.map((priority) => {
            const rank = getPriorityRank(priority);
            const isSelected = rank > 0;

            return (
              <Button
                key={priority}
                type="button"
                variant="outline"
                onClick={() => togglePriority(priority)}
                className={`p-4 h-auto text-left transition-all relative ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : ""
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                    {rank}
                  </div>
                )}
                <div className="font-medium">{priority}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {priority === "Price" &&
                    "Cost-effectiveness and value for money"}
                  {priority === "Features" &&
                    "Rich feature set and capabilities"}
                  {priority === "Ease of Use" &&
                    "Intuitive interface and simple setup"}
                  {priority === "Integrations" &&
                    "Connects with your existing tools"}
                  {priority === "Support" &&
                    "Quality customer support and documentation"}
                </div>
              </Button>
            );
          })}
        </div>
        {formData.priorities && formData.priorities.length > 0 && (
          <p className="text-sm text-primary">
            Selected: {formData.priorities.join(" → ")}
          </p>
        )}
      </div>

      {/* Deal Breakers */}
      <div className="space-y-2">
        <Label>
          Deal Breakers (Optional)
        </Label>
        <p className="text-xs text-muted-foreground">
          Select any features or conditions that would disqualify a platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commonDealBreakers.map((dealBreaker) => (
            <Button
              key={dealBreaker}
              type="button"
              variant="outline"
              onClick={() => toggleDealBreaker(dealBreaker)}
              className={`p-3 h-auto text-sm text-left transition-all ${
                formData.dealBreakers?.includes(dealBreaker)
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : ""
              }`}
            >
              {dealBreaker}
            </Button>
          ))}
        </div>

        {/* Custom Deal Breaker Input */}
        <div className="flex gap-2 mt-3">
          <Input
            type="text"
            placeholder="Add custom deal breaker..."
            value={customDealBreaker}
            onChange={(e) => setCustomDealBreaker(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomDealBreaker();
              }
            }}
          />
          <Button
            type="button"
            onClick={addCustomDealBreaker}
            variant="outline"
          >
            Add
          </Button>
        </div>

        {/* Display custom deal breakers */}
        {formData.dealBreakers
          ?.filter((d) => !commonDealBreakers.includes(d))
          .map((dealBreaker) => (
            <Badge
              key={dealBreaker}
              variant="destructive"
              className="mr-2 cursor-pointer"
              onClick={() => toggleDealBreaker(dealBreaker)}
            >
              {dealBreaker}
              <span className="ml-2">×</span>
            </Badge>
          ))}
      </div>

      {/* Show Peer Insights */}
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            id="similar-companies"
            checked={formData.similarCompanies}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                similarCompanies: checked === true,
              }))
            }
          />
          <div>
            <div className="text-sm font-medium">
              Show what similar companies use
            </div>
            <div className="text-xs text-muted-foreground">
              See insights from companies in your industry and size
            </div>
          </div>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button type="button" onClick={onBack} variant="outline" size="lg">
          ← Back
        </Button>
        <Button type="submit" size="lg">
          Find My Platform! 🎯
        </Button>
      </div>
    </form>
  );
}
