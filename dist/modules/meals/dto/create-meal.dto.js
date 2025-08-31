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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMealDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../common/types");
class CreateMealDto {
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название плана питания',
        example: 'Завтрак для похудения',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateMealDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание плана питания',
        example: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateMealDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Калорийность блюда',
        example: 350,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Содержание белков в граммах',
        example: 25,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "proteins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Содержание жиров в граммах',
        example: 12,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "fats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Содержание углеводов в граммах',
        example: 45,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "carbohydrates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Содержание клетчатки в граммах',
        example: 8,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "fiber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Содержание сахара в граммах',
        example: 15,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "sugar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Содержание натрия в миллиграммах',
        example: 450,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "sodium", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL изображения блюда',
        example: 'https://uploadthings.io/images/breakfast-bowl.jpg',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Рецепт приготовления',
        example: '1. Смешайте овсянку с молоком...',
        maxLength: 5000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], CreateMealDto.prototype, "recipe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Время приготовления в минутах',
        example: 15,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "preparationTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Сложность приготовления',
        example: 'easy',
        enum: ['easy', 'medium', 'hard']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Список ингредиентов',
        example: [
            { name: 'Овсянка', amount: 50, unit: 'г' },
            { name: 'Молоко', amount: 200, unit: 'мл' },
            { name: 'Банан', amount: 1, unit: 'шт' }
        ]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "ingredients", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Диетические ограничения',
        example: ['vegetarian', 'gluten-free'],
        enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'low-carb', 'high-protein']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "dietaryRestrictions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Категория питания',
        enum: types_1.DietaryCategory,
        example: types_1.DietaryCategory.VEGETARIAN
    }),
    (0, class_validator_1.IsEnum)(types_1.DietaryCategory),
    __metadata("design:type", String)
], CreateMealDto.prototype, "dietaryCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса, к которому относится план питания',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID тарифов, к которым привязан meal',
        example: ['507f1f77bcf86cd799439012'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "tariffs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID пользователя, для которого настроен meal (для модераторов)',
        example: '507f1f77bcf86cd799439013'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "customUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            mealType: 'breakfast',
            season: 'all',
            cuisine: 'international',
            tags: ['healthy', 'quick', 'budget-friendly']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateMealDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-meal.dto.js.map