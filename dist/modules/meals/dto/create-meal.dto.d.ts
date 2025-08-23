export declare class CreateMealDto {
    name: string;
    description?: string;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    image?: string;
    recipe?: string;
    preparationTime?: number;
    difficulty?: string;
    ingredients?: Array<{
        name: string;
        amount: number;
        unit: string;
    }>;
    dietaryRestrictions?: string[];
    courseId: string;
    metadata?: Record<string, any>;
}
