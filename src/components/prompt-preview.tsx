"use client";

import { useState } from "react";
import { Prompt } from "@/schemas/prompts.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { generatePromptText } from "@/lib/prompt-generator";

interface PromptPreviewProps {
    prompt: Prompt;
    fieldValues: Record<string, string | number>;
}

/**
 * Live preview component with copy-to-clipboard functionality
 * Updates in real-time as user fills the form
 */
export function PromptPreview({ prompt, fieldValues }: PromptPreviewProps) {
    const [copied, setCopied] = useState(false);
    const generatedPrompt = generatePromptText(prompt, fieldValues);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>
                            Your customized prompt will appear here
                        </CardDescription>
                    </div>
                    <Button
                        onClick={handleCopy}
                        variant={copied ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Copy
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap font-mono">
                        {generatedPrompt}
                    </pre>

                    {/* Empty state hint */}
                    {Object.keys(fieldValues).length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-lg">
                            <p className="text-sm text-muted-foreground text-center px-4">
                                Fill in the form fields to see your customized prompt
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
