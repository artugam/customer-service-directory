import { Prompt } from "@/schemas/prompts.schema";

/**
 * Generate final prompt text from template and field values
 * Since promptText is empty in the JSON, we create a structured template
 * based on the prompt metadata and field values
 */
export function generatePromptText(
    prompt: Prompt,
    fieldValues: Record<string, string | number>
): string {
    // Start with the prompt title and description
    let text = `# ${prompt.title}\n\n`;
    text += `${prompt.description}\n\n`;
    text += `---\n\n`;

    // Add each field with its value or placeholder
    prompt.requiredFields.forEach((field) => {
        const value = fieldValues[field.name];
        const displayValue = value !== undefined && value !== ""
            ? value
            : `[${field.name.replace(/_/g, " ").toUpperCase()}]`;

        text += `**${field.description}:**\n${displayValue}\n\n`;
    });

    return text.trim();
}

/**
 * Check if all required fields are filled
 */
export function validatePromptFields(
    prompt: Prompt,
    fieldValues: Record<string, string | number>
): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    prompt.requiredFields.forEach((field) => {
        const value = fieldValues[field.name];

        // Check if field is empty
        if (value === undefined || value === "") {
            errors[field.name] = "This field is required";
            return;
        }

        // Validate number fields
        if (field.type === "number") {
            const numValue = typeof value === "string" ? parseFloat(value) : value;
            if (isNaN(numValue)) {
                errors[field.name] = "Please enter a valid number";
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

/**
 * Get default field values from prompt configuration
 */
export function getDefaultFieldValues(
    prompt: Prompt
): Record<string, string | number> {
    const defaults: Record<string, string | number> = {};

    prompt.requiredFields.forEach((field) => {
        if (field.default !== undefined) {
            defaults[field.name] = field.default;
        }
    });

    return defaults;
}
