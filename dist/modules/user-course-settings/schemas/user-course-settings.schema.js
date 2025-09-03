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
exports.UserCourseSettingsSchema = exports.UserCourseSettings = exports.CourseSettings = exports.LessonOverride = exports.ExerciseOverride = exports.WorkoutOverride = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WorkoutOverride = class WorkoutOverride {
};
exports.WorkoutOverride = WorkoutOverride;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Workout', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], WorkoutOverride.prototype, "workoutId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], WorkoutOverride.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], WorkoutOverride.prototype, "isEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], WorkoutOverride.prototype, "customOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], WorkoutOverride.prototype, "customSchedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], WorkoutOverride.prototype, "metadata", void 0);
exports.WorkoutOverride = WorkoutOverride = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WorkoutOverride);
let ExerciseOverride = class ExerciseOverride {
};
exports.ExerciseOverride = ExerciseOverride;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Exercise', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ExerciseOverride.prototype, "exerciseId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseOverride.prototype, "repetitions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseOverride.prototype, "sets", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseOverride.prototype, "restTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ExerciseOverride.prototype, "isEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], ExerciseOverride.prototype, "metadata", void 0);
exports.ExerciseOverride = ExerciseOverride = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ExerciseOverride);
let LessonOverride = class LessonOverride {
};
exports.LessonOverride = LessonOverride;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Lesson', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LessonOverride.prototype, "lessonId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], LessonOverride.prototype, "isUnlocked", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LessonOverride.prototype, "customOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], LessonOverride.prototype, "isRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], LessonOverride.prototype, "metadata", void 0);
exports.LessonOverride = LessonOverride = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LessonOverride);
let CourseSettings = class CourseSettings {
};
exports.CourseSettings = CourseSettings;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CourseSettings.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CourseSettings.prototype, "pace", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CourseSettings.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CourseSettings.prototype, "reminders", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], CourseSettings.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], CourseSettings.prototype, "targetCompletionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], CourseSettings.prototype, "metadata", void 0);
exports.CourseSettings = CourseSettings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CourseSettings);
let UserCourseSettings = class UserCourseSettings {
};
exports.UserCourseSettings = UserCourseSettings;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserCourseSettings.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserCourseSettings.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], UserCourseSettings.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [WorkoutOverride], default: [] }),
    __metadata("design:type", Array)
], UserCourseSettings.prototype, "workoutOverrides", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ExerciseOverride], default: [] }),
    __metadata("design:type", Array)
], UserCourseSettings.prototype, "exerciseOverrides", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [LessonOverride], default: [] }),
    __metadata("design:type", Array)
], UserCourseSettings.prototype, "lessonOverrides", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: CourseSettings, default: {} }),
    __metadata("design:type", CourseSettings)
], UserCourseSettings.prototype, "courseSettings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserCourseSettings.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UserCourseSettings.prototype, "lastModified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserCourseSettings.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], UserCourseSettings.prototype, "metadata", void 0);
exports.UserCourseSettings = UserCourseSettings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserCourseSettings);
exports.UserCourseSettingsSchema = mongoose_1.SchemaFactory.createForClass(UserCourseSettings);
exports.UserCourseSettingsSchema.index({ userId: 1, courseId: 1 }, { unique: true });
exports.UserCourseSettingsSchema.index({ userId: 1 });
exports.UserCourseSettingsSchema.index({ courseId: 1 });
exports.UserCourseSettingsSchema.index({ isActive: 1 });
exports.UserCourseSettingsSchema.index({ createdBy: 1 });
exports.UserCourseSettingsSchema.index({ 'workoutOverrides.workoutId': 1 });
exports.UserCourseSettingsSchema.index({ 'exerciseOverrides.exerciseId': 1 });
exports.UserCourseSettingsSchema.index({ 'lessonOverrides.lessonId': 1 });
//# sourceMappingURL=user-course-settings.schema.js.map