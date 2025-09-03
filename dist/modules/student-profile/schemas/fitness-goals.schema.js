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
exports.FitnessGoalsSchema = exports.FitnessGoals = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let FitnessGoals = class FitnessGoals {
};
exports.FitnessGoals = FitnessGoals;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FitnessGoals.prototype, "primaryGoal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], FitnessGoals.prototype, "secondaryGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetWeight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetBodyFat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetMuscleMass", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetChest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetWaist", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "targetHips", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], FitnessGoals.prototype, "targetDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 1 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "durationWeeks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FitnessGoals.prototype, "activityLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FitnessGoals.prototype, "experienceLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], FitnessGoals.prototype, "limitations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], FitnessGoals.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], FitnessGoals.prototype, "availableEquipment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "maxWorkoutTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 1 }),
    __metadata("design:type", Number)
], FitnessGoals.prototype, "workoutsPerWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FitnessGoals.prototype, "motivation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FitnessGoals.prototype, "previousExperience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FitnessGoals.prototype, "currentChallenges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active' }),
    __metadata("design:type", String)
], FitnessGoals.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], FitnessGoals.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], FitnessGoals.prototype, "metadata", void 0);
exports.FitnessGoals = FitnessGoals = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FitnessGoals);
exports.FitnessGoalsSchema = mongoose_1.SchemaFactory.createForClass(FitnessGoals);
exports.FitnessGoalsSchema.index({ primaryGoal: 1 });
exports.FitnessGoalsSchema.index({ status: 1 });
exports.FitnessGoalsSchema.index({ targetDate: 1 });
exports.FitnessGoalsSchema.index({ experienceLevel: 1 });
//# sourceMappingURL=fitness-goals.schema.js.map