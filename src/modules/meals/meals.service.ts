import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Meal, MealDocument } from './schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<MealDocument>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const meal = new this.mealModel({
      ...createMealDto,
      courseId: new Types.ObjectId(createMealDto.courseId),
    });

    return meal.save();
  }

  async findAll(paginationDto: PaginationDto = {}, courseId?: string): Promise<{ data: Meal[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    const [meals, total] = await Promise.all([
      this.mealModel
        .find(filter)
        .populate('courseId', 'title slug')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.mealModel.countDocuments(filter),
    ]);

    return {
      data: meals,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Meal> {
    const meal = await this.mealModel
      .findById(id)
      .populate('courseId', 'title slug')
      .exec();

    if (!meal) {
      throw new NotFoundException('План питания не найден');
    }

    return meal;
  }

  async findByCourse(courseId: string): Promise<Meal[]> {
    return this.mealModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    const updateData: any = { ...updateMealDto };
    
    if (updateMealDto.courseId) {
      updateData.courseId = new Types.ObjectId(updateMealDto.courseId);
    }

    const meal = await this.mealModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('courseId', 'title slug')
      .exec();

    if (!meal) {
      throw new NotFoundException('План питания не найден');
    }

    return meal;
  }

  async remove(id: string): Promise<void> {
    const result = await this.mealModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('План питания не найден');
    }
  }

  async findByCalorieRange(minCalories: number, maxCalories: number, courseId?: string): Promise<Meal[]> {
    const filter: any = {
      calories: { $gte: minCalories, $lte: maxCalories }
    };
    
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    return this.mealModel
      .find(filter)
      .populate('courseId', 'title slug')
      .sort({ calories: 1 })
      .exec();
  }

  async searchByIngredients(ingredients: string[], courseId?: string): Promise<Meal[]> {
    const filter: any = {
      'ingredients.name': { $in: ingredients }
    };
    
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    return this.mealModel
      .find(filter)
      .populate('courseId', 'title slug')
      .exec();
  }

  async getMealsByNutrition(nutrition: {
    minProteins?: number;
    maxProteins?: number;
    minFats?: number;
    maxFats?: number;
    minCarbohydrates?: number;
    maxCarbohydrates?: number;
  }, courseId?: string): Promise<Meal[]> {
    const filter: any = {};
    
    if (nutrition.minProteins !== undefined) {
      filter.proteins = { ...filter.proteins, $gte: nutrition.minProteins };
    }
    if (nutrition.maxProteins !== undefined) {
      filter.proteins = { ...filter.proteins, $lte: nutrition.maxProteins };
    }
    if (nutrition.minFats !== undefined) {
      filter.fats = { ...filter.fats, $gte: nutrition.minFats };
    }
    if (nutrition.maxFats !== undefined) {
      filter.fats = { ...filter.fats, $lte: nutrition.maxFats };
    }
    if (nutrition.minCarbohydrates !== undefined) {
      filter.carbohydrates = { ...filter.carbohydrates, $gte: nutrition.minCarbohydrates };
    }
    if (nutrition.maxCarbohydrates !== undefined) {
      filter.carbohydrates = { ...filter.carbohydrates, $lte: nutrition.maxCarbohydrates };
    }
    
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    return this.mealModel
      .find(filter)
      .populate('courseId', 'title slug')
      .sort({ calories: 1 })
      .exec();
  }
} 