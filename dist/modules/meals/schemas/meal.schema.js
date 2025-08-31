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
exports.MealSchema = exports.Meal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../common/types");
let Meal = class Meal {
};
exports.Meal = Meal;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Meal.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Meal.prototype, "calories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Meal.prototype, "proteins", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Meal.prototype, "fats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Meal.prototype, "carbohydrates", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "recipe", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.DietaryCategory, required: true }),
    __metadata("design:type", String)
], Meal.prototype, "dietaryCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Meal.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Tariff', default: [] }),
    __metadata("design:type", Array)
], Meal.prototype, "tariffs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Meal.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Meal.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Meal.prototype, "customUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Meal.prototype, "isCustom", void 0);
exports.Meal = Meal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Meal);
exports.MealSchema = mongoose_1.SchemaFactory.createForClass(Meal);
exports.MealSchema.index({ courseId: 1 });
exports.MealSchema.index({ dietaryCategory: 1 });
exports.MealSchema.index({ calories: 1 });
exports.MealSchema.index({ proteins: 1 });
exports.MealSchema.index({ fats: 1 });
exports.MealSchema.index({ carbohydrates: 1 });
exports.MealSchema.index({ tariffs: 1 });
exports.MealSchema.index({ customUserId: 1 });
exports.MealSchema.index({ isCustom: 1 });
//# sourceMappingURL=meal.schema.js.map