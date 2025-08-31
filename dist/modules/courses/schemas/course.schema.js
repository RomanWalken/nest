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
exports.CourseSchema = exports.Course = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../common/types");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.CourseKind, required: true }),
    __metadata("design:type", String)
], Course.prototype, "kind", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.CourseCategory, required: true }),
    __metadata("design:type", String)
], Course.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.DifficultyLevel, default: types_1.DifficultyLevel.BEGINNER }),
    __metadata("design:type", String)
], Course.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.CoursePublicationStatus, default: types_1.CoursePublicationStatus.DRAFT }),
    __metadata("design:type", String)
], Course.prototype, "publicationStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Company', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Course.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Course.prototype, "authorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Course.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Meal', default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "meals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Teacher', default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "teachers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Workout', default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "workouts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "hasMeals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "hasDoctor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Module', default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "modules", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Course);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
exports.CourseSchema.index({ slug: 1, companyId: 1 }, { unique: true });
exports.CourseSchema.index({ companyId: 1 });
exports.CourseSchema.index({ authorId: 1 });
exports.CourseSchema.index({ kind: 1 });
exports.CourseSchema.index({ category: 1 });
exports.CourseSchema.index({ publicationStatus: 1 });
exports.CourseSchema.index({ isPaid: 1 });
exports.CourseSchema.index({ isFeatured: 1 });
exports.CourseSchema.index({ tags: 1 });
exports.CourseSchema.virtual('isFitnessCourse').get(function () {
    return this.kind === types_1.CourseKind.FITNESS;
});
exports.CourseSchema.virtual('isRegularCourse').get(function () {
    return this.kind === types_1.CourseKind.REGULAR;
});
exports.CourseSchema.set('toJSON', { virtuals: true });
exports.CourseSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=course.schema.js.map