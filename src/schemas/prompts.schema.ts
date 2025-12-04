import { z } from "zod";

/**
 * Schema for individual prompt field configuration
 */
export const PromptFieldSchema = z.object({
    name: z.string(),
    type: z.enum(["text", "number", "select", "radio"]),
    description: z.string(),
    placeholder: z.string(),
    default: z.union([z.string(), z.number()]).optional(),
    options: z.array(z.string()).optional(), // For select/radio fields
});

/**
 * Schema for individual prompt
 */
export const PromptSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    requiredFields: z.array(PromptFieldSchema),
    promptText: z.string(),
    tags: z.array(z.string()),
});

/**
 * Schema for prompt subcategory
 */
export const PromptSubcategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    promptCount: z.number(),
    prompts: z.array(PromptSchema),
});

/**
 * Schema for prompt category
 */
export const PromptCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    promptCount: z.number(),
    popularity: z.string(),
    subcategories: z.array(PromptSubcategorySchema),
});

/**
 * Schema for the entire prompts data structure
 */
export const PromptsDataSchema = z.object({
    version: z.string(),
    lastUpdated: z.string(),
    categories: z.array(PromptCategorySchema),
});

// Export TypeScript types
export type PromptField = z.infer<typeof PromptFieldSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type PromptSubcategory = z.infer<typeof PromptSubcategorySchema>;
export type PromptCategory = z.infer<typeof PromptCategorySchema>;
export type PromptsData = z.infer<typeof PromptsDataSchema>;
