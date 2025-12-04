"use client";

import Link from "next/link";
import { Prompt } from "@/schemas/prompts.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Tag } from "lucide-react";

interface PromptCardProps {
    prompt: Prompt;
}

/**
 * Card component for displaying individual prompts in lists
 * Used in homepage preview and prompts list page
 */
export function PromptCard({ prompt }: PromptCardProps) {
    return (
        <Link href={`/prompts/${prompt.id}`} className="block h-full">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 cursor-pointer group">
                <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {prompt.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                        {prompt.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            <span>{prompt.requiredFields.length} fields</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Tag className="h-4 w-4" />
                            <span>{prompt.tags.length} tags</span>
                        </div>
                    </div>

                    {/* Tags Preview */}
                    {prompt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {prompt.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {prompt.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{prompt.tags.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

