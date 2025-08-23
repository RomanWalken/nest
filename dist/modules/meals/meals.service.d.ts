import { Model } from 'mongoose';
import { Meal, MealDocument } from './schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { PaginationDto } from '@/common/types';
export declare class MealsService {
    private mealModel;
    constructor(mealModel: Model<MealDocument>);
    create(createMealDto: CreateMealDto): Promise<Meal>;
    findAll(paginationDto?: PaginationDto, courseId?: string): Promise<{
        data: Meal[];
        meta: any;
    }>;
    findOne(id: string): Promise<Meal>;
    findByCourse(courseId: string): Promise<Meal[]>;
    update(id: string, updateMealDto: UpdateMealDto): Promise<Meal>;
    remove(id: string): Promise<void>;
    findByCalorieRange(minCalories: number, maxCalories: number, courseId?: string): Promise<Meal[]>;
    searchByIngredients(ingredients: string[], courseId?: string): Promise<Meal[]>;
    getMealsByNutrition(nutrition: {
        minProteins?: number;
        maxProteins?: number;
        minFats?: number;
        maxFats?: number;
        minCarbohydrates?: number;
        maxCarbohydrates?: number;
    }, courseId?: string): Promise<Meal[]>;
}
