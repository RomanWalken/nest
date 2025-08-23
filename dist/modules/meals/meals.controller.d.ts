import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { PaginationDto } from '@/common/types';
export declare class MealsController {
    private readonly mealsService;
    constructor(mealsService: MealsService);
    create(createMealDto: CreateMealDto, req: any): Promise<import("./schemas/meal.schema").Meal>;
    findAll(paginationDto: PaginationDto, courseId?: string): Promise<{
        data: import("./schemas/meal.schema").Meal[];
        meta: any;
    }>;
    findByCourse(courseId: string): Promise<import("./schemas/meal.schema").Meal[]>;
    findByCalorieRange(min: string, max: string, courseId?: string): Promise<import("./schemas/meal.schema").Meal[]>;
    searchByIngredients(ingredients: string, courseId?: string): Promise<import("./schemas/meal.schema").Meal[]>;
    getMealsByNutrition(nutrition: {
        minProteins?: string;
        maxProteins?: string;
        minFats?: string;
        maxFats?: string;
        minCarbohydrates?: string;
        maxCarbohydrates?: string;
    }, courseId?: string): Promise<import("./schemas/meal.schema").Meal[]>;
    findOne(id: string): Promise<import("./schemas/meal.schema").Meal>;
    update(id: string, updateMealDto: UpdateMealDto): Promise<import("./schemas/meal.schema").Meal>;
    remove(id: string): Promise<void>;
}
