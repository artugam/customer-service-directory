"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WizardStep1 from "@/components/wizard-steps/step-1";
import WizardStep2 from "@/components/wizard-steps/step-2";
import WizardStep3 from "@/components/wizard-steps/step-3";
import type {
  WizardAnswers,
  WizardStep1 as Step1Data,
  WizardStep2 as Step2Data,
  WizardStep3 as Step3Data,
} from "@/types/wizard";

export default function PlatformWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({});

  // Handle step 1 completion
  const handleStep1Complete = (data: Step1Data) => {
    setAnswers((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  // Handle step 2 completion
  const handleStep2Complete = (data: Step2Data) => {
    setAnswers((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  // Handle step 3 completion (final step)
  const handleStep3Complete = (data: Step3Data) => {
    const finalAnswers: WizardAnswers = {
      ...(answers as Omit<WizardAnswers, keyof Step3Data>),
      ...data,
    };

    // Save to session storage for results page
    sessionStorage.setItem("wizardAnswers", JSON.stringify(finalAnswers));

    // Navigate to results page
    router.push("/find-platform/results");
  };

  // Handle going back
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Progress indicator
  const progress = (currentStep / 3) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep === step
                  ? "border-blue-600 bg-blue-600 text-white"
                  : currentStep > step
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {currentStep > step ? "✓" : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  currentStep > step ? "bg-green-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Wizard Card */}
      <Card className="p-6">
        {/* Step 1: Company Context */}
        {currentStep === 1 && (
          <WizardStep1
            initialData={answers as Partial<Step1Data>}
            onComplete={handleStep1Complete}
          />
        )}

        {/* Step 2: Requirements */}
        {currentStep === 2 && (
          <WizardStep2
            initialData={answers as Partial<Step2Data>}
            onComplete={handleStep2Complete}
            onBack={handleBack}
          />
        )}

        {/* Step 3: Priorities */}
        {currentStep === 3 && (
          <WizardStep3
            initialData={answers as Partial<Step3Data>}
            onComplete={handleStep3Complete}
            onBack={handleBack}
          />
        )}
      </Card>

      {/* Helper Text */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Step {currentStep} of 3 • Your data is private and not stored on our
          servers
        </p>
      </div>
    </div>
  );
}
