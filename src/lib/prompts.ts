import { readFileSync } from "fs";
import { join } from "path";
import {
    PromptsDataSchema,
    type PromptsData,
    type Prompt,
    type PromptCategory,
    type PromptSubcategory,
} from "@/schemas/prompts.schema";

/**
 * Load and validate prompts data from JSON file
 */
export function getPromptsData(): PromptsData {
    const filePath = join(process.cwd(), "src", "data", "prompts.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return PromptsDataSchema.parse(data);
}

/**
 * Get all prompts flattened into a single array
 */
export function getAllPrompts(): Prompt[] {
    const data = getPromptsData();
    const prompts: Prompt[] = [];

    data.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
            prompts.push(...subcategory.prompts);
        });
    });

    return prompts;
}

/**
 * Find a specific prompt by ID
 */
export function getPromptById(id: string): Prompt | null {
    const prompts = getAllPrompts();
    return prompts.find((prompt) => prompt.id === id) || null;
}

/**
 * Get all prompts for a specific category
 */
export function getPromptsByCategory(categoryId: string): Prompt[] {
    const data = getPromptsData();
    const category = data.categories.find((cat) => cat.id === categoryId);

    if (!category) return [];

    const prompts: Prompt[] = [];
    category.subcategories.forEach((subcategory) => {
        prompts.push(...subcategory.prompts);
    });

    return prompts;
}

/**
 * Get all prompts for a specific subcategory
 */
export function getPromptsBySubcategory(
    categoryId: string,
    subcategoryId: string
): Prompt[] {
    const data = getPromptsData();
    const category = data.categories.find((cat) => cat.id === categoryId);

    if (!category) return [];

    const subcategory = category.subcategories.find(
        (sub) => sub.id === subcategoryId
    );

    return subcategory?.prompts || [];
}

/**
 * Get one prompt from each subcategory in a category (for homepage preview)
 */
export function getOnePromptPerSubcategory(categoryId: string): Prompt[] {
    const data = getPromptsData();
    const category = data.categories.find((cat) => cat.id === categoryId);

    if (!category) return [];

    return category.subcategories
        .map((subcategory) => subcategory.prompts[0])
        .filter(Boolean);
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): PromptCategory | null {
    const data = getPromptsData();
    return data.categories.find((cat) => cat.id === categoryId) || null;
}

/**
 * Get all categories
 */
export function getAllCategories(): PromptCategory[] {
    const data = getPromptsData();
    return data.categories;
}
