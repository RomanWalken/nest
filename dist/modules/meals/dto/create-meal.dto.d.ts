import { DietaryCategory } from '@/common/types';
export declare class CreateMealDto {
    title: string;
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
    dietaryCategory: DietaryCategory;
    courseId: string;
    tariffs?: string[];
    customUserId?: string;
    metadata?: Record<string, any>;
}
