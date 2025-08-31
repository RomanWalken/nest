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
exports.WorkoutSchema = exports.Workout = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Workout = class Workout {
};
exports.Workout = Workout;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Workout.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Workout.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Workout.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], Workout.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Workout.prototype, "isFree", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Workout.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Tariff', default: [] }),
    __metadata("design:type", Array)
], Workout.prototype, "tariffs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Exercise', default: [] }),
    __metadata("design:type", Array)
], Workout.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Workout.prototype, "month", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Workout.prototype, "week", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Workout.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Workout.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Workout.prototype, "customUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Workout.prototype, "isCustom", void 0);
exports.Workout = Workout = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Workout);
exports.WorkoutSchema = mongoose_1.SchemaFactory.createForClass(Workout);
exports.WorkoutSchema.index({ courseId: 1 });
exports.WorkoutSchema.index({ month: 1, week: 1, day: 1 });
exports.WorkoutSchema.index({ isFree: 1 });
exports.WorkoutSchema.index({ tariffs: 1 });
exports.WorkoutSchema.index({ customUserId: 1 });
exports.WorkoutSchema.index({ isCustom: 1 });
//# sourceMappingURL=workout.schema.js.map