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

/**
 * Get sample prompts for homepage preview
 * Returns 10 prompts with at least 1 from each category/subcategory
 */
export function getSamplePromptsForPreview(targetCount: number = 10): Prompt[] {
    const data = getPromptsData();
    const selectedPrompts: Prompt[] = [];
    const allSubcategories: { category: PromptCategory; subcategory: PromptSubcategory }[] = [];

    // Collect all subcategories from all categories
    data.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
            allSubcategories.push({ category, subcategory });
        });
    });

    // First pass: Get one prompt from each subcategory
    allSubcategories.forEach(({ subcategory }) => {
        if (subcategory.prompts.length > 0 && selectedPrompts.length < targetCount) {
            selectedPrompts.push(subcategory.prompts[0]);
        }
    });

    // Second pass: Fill remaining slots with additional prompts
    if (selectedPrompts.length < targetCount) {
        let currentIndex = 0;
        while (selectedPrompts.length < targetCount && currentIndex < allSubcategories.length) {
            const { subcategory } = allSubcategories[currentIndex];
            // Get the second prompt if available
            if (subcategory.prompts.length > 1) {
                const secondPrompt = subcategory.prompts[1];
                if (!selectedPrompts.find(p => p.id === secondPrompt.id)) {
                    selectedPrompts.push(secondPrompt);
                }
            }
            currentIndex++;
        }
    }

    return selectedPrompts.slice(0, targetCount);
}
