"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meal_schema_1 = require("./schemas/meal.schema");
let MealsService = class MealsService {
    constructor(mealModel) {
        this.mealModel = mealModel;
    }
    async create(createMealDto) {
        const meal = new this.mealModel({
            ...createMealDto,
            courseId: new mongoose_2.Types.ObjectId(createMealDto.courseId),
        });
        return meal.save();
    }
    async findAll(paginationDto = {}, courseId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (courseId) {
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
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
    async findOne(id) {
        const meal = await this.mealModel
            .findById(id)
            .populate('courseId', 'title slug')
            .exec();
        if (!meal) {
            throw new common_1.NotFoundException('План питания не найден');
        }
        return meal;
    }
    async findByCourse(courseId) {
        return this.mealModel
            .find({ courseId: new mongoose_2.Types.ObjectId(courseId) })
            .sort({ createdAt: -1 })
            .exec();
    }
    async update(id, updateMealDto) {
        const updateData = { ...updateMealDto };
        if (updateMealDto.courseId) {
            updateData.courseId = new mongoose_2.Types.ObjectId(updateMealDto.courseId);
        }
        const meal = await this.mealModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('courseId', 'title slug')
            .exec();
        if (!meal) {
            throw new common_1.NotFoundException('План питания не найден');
        }
        return meal;
    }
    async remove(id) {
        const result = await this.mealModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('План питания не найден');
        }
    }
    async findByCalorieRange(minCalories, maxCalories, courseId) {
        const filter = {
            calories: { $gte: minCalories, $lte: maxCalories }
        };
        if (courseId) {
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
        }
        return this.mealModel
            .find(filter)
            .populate('courseId', 'title slug')
            .sort({ calories: 1 })
            .exec();
    }
    async searchByIngredients(ingredients, courseId) {
        const filter = {
            'ingredients.name': { $in: ingredients }
        };
        if (courseId) {
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
        }
        return this.mealModel
            .find(filter)
            .populate('courseId', 'title slug')
            .exec();
    }
    async getMealsByNutrition(nutrition, courseId) {
        const filter = {};
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
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
        }
        return this.mealModel
            .find(filter)
            .populate('courseId', 'title slug')
            .sort({ calories: 1 })
            .exec();
    }
};
exports.MealsService = MealsService;
exports.MealsService = MealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meal_schema_1.Meal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MealsService);
//# sourceMappingURL=meals.service.js.map