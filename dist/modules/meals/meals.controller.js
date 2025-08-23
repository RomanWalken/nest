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
exports.MealsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meals_service_1 = require("./meals.service");
const create_meal_dto_1 = require("./dto/create-meal.dto");
const update_meal_dto_1 = require("./dto/update-meal.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let MealsController = class MealsController {
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    create(createMealDto, req) {
        return this.mealsService.create(createMealDto);
    }
    findAll(paginationDto, courseId) {
        return this.mealsService.findAll(paginationDto, courseId);
    }
    findByCourse(courseId) {
        return this.mealsService.findByCourse(courseId);
    }
    findByCalorieRange(min, max, courseId) {
        return this.mealsService.findByCalorieRange(Number(min), Number(max), courseId);
    }
    searchByIngredients(ingredients, courseId) {
        const ingredientsList = ingredients.split(',').map(i => i.trim());
        return this.mealsService.searchByIngredients(ingredientsList, courseId);
    }
    getMealsByNutrition(nutrition, courseId) {
        const nutritionParams = {
            minProteins: nutrition.minProteins ? Number(nutrition.minProteins) : undefined,
            maxProteins: nutrition.maxProteins ? Number(nutrition.maxProteins) : undefined,
            minFats: nutrition.minFats ? Number(nutrition.minFats) : undefined,
            maxFats: nutrition.maxFats ? Number(nutrition.maxFats) : undefined,
            minCarbohydrates: nutrition.minCarbohydrates ? Number(nutrition.minCarbohydrates) : undefined,
            maxCarbohydrates: nutrition.maxCarbohydrates ? Number(nutrition.maxCarbohydrates) : undefined,
        };
        return this.mealsService.getMealsByNutrition(nutritionParams, courseId);
    }
    findOne(id) {
        return this.mealsService.findOne(id);
    }
    update(id, updateMealDto) {
        return this.mealsService.update(id, updateMealDto);
    }
    remove(id) {
        return this.mealsService.remove(id);
    }
};
exports.MealsController = MealsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый план питания',
        description: 'Создает новый план питания для wellness курсов. Включает детальную информацию о питательной ценности, рецепте и ингредиентах.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'План питания успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Завтрак для похудения',
                description: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
                calories: 350,
                proteins: 25,
                fats: 12,
                carbohydrates: 45,
                courseId: '507f1f77bcf86cd799439012',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_dto_1.CreateMealDto, Object]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список планов питания',
        description: 'Возвращает список планов питания с пагинацией. Можно фильтровать по курсу.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество планов на странице', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список планов питания получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        name: 'Завтрак для похудения',
                        calories: 350,
                        proteins: 25,
                        fats: 12,
                        carbohydrates: 45,
                        courseId: {
                            _id: '507f1f77bcf86cd799439012',
                            title: 'Основы здорового питания',
                            slug: 'osnovy-zdorovogo-pitaniya'
                        }
                    }
                ],
                meta: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1
                }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все планы питания курса',
        description: 'Возвращает все планы питания конкретного курса.'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Планы питания курса получены',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Завтрак для похудения',
                    calories: 350,
                    proteins: 25
                },
                {
                    _id: '507f1f77bcf86cd799439013',
                    name: 'Обед с куриной грудкой',
                    calories: 450,
                    proteins: 35
                }
            ]
        }
    }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)('calories/:min/:max'),
    (0, swagger_1.ApiOperation)({
        summary: 'Поиск планов питания по калорийности',
        description: 'Возвращает планы питания в заданном диапазоне калорий.'
    }),
    (0, swagger_1.ApiParam)({ name: 'min', description: 'Минимальная калорийность', example: 300 }),
    (0, swagger_1.ApiParam)({ name: 'max', description: 'Максимальная калорийность', example: 500 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Планы питания по калорийности найдены'
    }),
    __param(0, (0, common_1.Param)('min')),
    __param(1, (0, common_1.Param)('max')),
    __param(2, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "findByCalorieRange", null);
__decorate([
    (0, common_1.Get)('ingredients'),
    (0, swagger_1.ApiOperation)({
        summary: 'Поиск планов питания по ингредиентам',
        description: 'Возвращает планы питания, содержащие указанные ингредиенты.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'ingredients', required: true, description: 'Список ингредиентов через запятую', example: 'овсянка,молоко,банан' }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Планы питания по ингредиентам найдены'
    }),
    __param(0, (0, common_1.Query)('ingredients')),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "searchByIngredients", null);
__decorate([
    (0, common_1.Get)('nutrition'),
    (0, swagger_1.ApiOperation)({
        summary: 'Поиск планов питания по питательной ценности',
        description: 'Возвращает планы питания, соответствующие заданным критериям питательной ценности.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'minProteins', required: false, description: 'Минимальное количество белков', example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'maxProteins', required: false, description: 'Максимальное количество белков', example: 40 }),
    (0, swagger_1.ApiQuery)({ name: 'minFats', required: false, description: 'Минимальное количество жиров', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'maxFats', required: false, description: 'Максимальное количество жиров', example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'minCarbohydrates', required: false, description: 'Минимальное количество углеводов', example: 30 }),
    (0, swagger_1.ApiQuery)({ name: 'maxCarbohydrates', required: false, description: 'Максимальное количество углеводов', example: 60 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Планы питания по питательной ценности найдены'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "getMealsByNutrition", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить план питания по ID',
        description: 'Возвращает детальную информацию о плане питания.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'План питания найден',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Завтрак для похудения',
                description: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
                calories: 350,
                proteins: 25,
                fats: 12,
                carbohydrates: 45,
                fiber: 8,
                sugar: 15,
                sodium: 450,
                image: 'https://uploadthings.io/images/breakfast-bowl.jpg',
                recipe: '1. Смешайте овсянку с молоком...',
                preparationTime: 15,
                difficulty: 'easy',
                ingredients: [
                    { name: 'Овсянка', amount: 50, unit: 'г' },
                    { name: 'Молоко', amount: 200, unit: 'мл' },
                    { name: 'Банан', amount: 1, unit: 'шт' }
                ],
                dietaryRestrictions: ['vegetarian', 'gluten-free'],
                courseId: {
                    _id: '507f1f77bcf86cd799439012',
                    title: 'Основы здорового питания',
                    slug: 'osnovy-zdorovogo-pitaniya'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'План питания не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить план питания',
        description: 'Обновляет существующий план питания.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'План питания успешно обновлен'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'План питания не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить план питания',
        description: 'Удаляет план питания. Операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'План питания успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'План питания не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "remove", null);
exports.MealsController = MealsController = __decorate([
    (0, swagger_1.ApiTags)('meals'),
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsController);
//# sourceMappingURL=meals.controller.js.map