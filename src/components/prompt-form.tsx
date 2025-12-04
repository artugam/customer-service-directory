"use client";

import { Prompt } from "@/schemas/prompts.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PromptFormProps {
    prompt: Prompt;
    fieldValues: Record<string, string | number>;
    onFieldChange: (name: string, value: string | number) => void;
}

/**
 * Dynamic form component that renders fields based on prompt configuration
 * Supports text, number, and textarea inputs with validation
 */
export function PromptForm({ prompt, fieldValues, onFieldChange }: PromptFormProps) {
    const handleChange = (name: string, value: string, type: string) => {
        if (type === "number") {
            const numValue = value === "" ? "" : parseFloat(value);
            onFieldChange(name, numValue);
        } else {
            onFieldChange(name, value);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Configure Your Prompt</CardTitle>
                <CardDescription>
                    Fill in the fields below to customize your customer service response
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {prompt.requiredFields.map((field) => {
                    const isTextArea = field.type === "text" && field.name.includes("message");

                    return (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name} className="text-sm font-medium">
                                {field.description}
                                <span className="text-destructive ml-1">*</span>
                            </Label>

                            {isTextArea ? (
                                <Textarea
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    value={fieldValues[field.name] ?? ""}
                                    onChange={(e) => handleChange(field.name, e.target.value, field.type)}
                                    className="min-h-[120px] resize-y"
                                    aria-required="true"
                                    aria-describedby={`${field.name}-hint`}
                                />
                            ) : (
                                <Input
                                    id={field.name}
                                    type={field.type === "number" ? "number" : "text"}
                                    placeholder={field.placeholder}
                                    value={fieldValues[field.name] ?? ""}
                                    onChange={(e) => handleChange(field.name, e.target.value, field.type)}
                                    aria-required="true"
                                    aria-describedby={`${field.name}-hint`}
                                />
                            )}

                            <p
                                id={`${field.name}-hint`}
                                className="text-xs text-muted-foreground"
                            >
                                {field.placeholder}
                            </p>
                        </div>
                    );
                })}

                <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                        <span className="text-destructive">*</span> Required fields
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
