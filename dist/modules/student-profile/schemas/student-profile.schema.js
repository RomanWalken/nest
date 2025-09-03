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
exports.StudentProfileSchema = exports.StudentProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const body_measurements_schema_1 = require("./body-measurements.schema");
const fitness_goals_schema_1 = require("./fitness-goals.schema");
let StudentProfile = class StudentProfile {
};
exports.StudentProfile = StudentProfile;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StudentProfile.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StudentProfile.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "emergencyContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "medicalConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "medications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "allergies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "doctorContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: fitness_goals_schema_1.FitnessGoalsSchema, default: {} }),
    __metadata("design:type", fitness_goals_schema_1.FitnessGoals)
], StudentProfile.prototype, "fitnessGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [body_measurements_schema_1.BodyMeasurementsSchema], default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "bodyMeasurements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: body_measurements_schema_1.BodyMeasurementsSchema }),
    __metadata("design:type", body_measurements_schema_1.BodyMeasurements)
], StudentProfile.prototype, "currentMeasurements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], StudentProfile.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], StudentProfile.prototype, "allowProgressSharing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], StudentProfile.prototype, "receiveMotivationalMessages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StudentProfile.prototype, "hasCompletedInitialQuiz", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StudentProfile.prototype, "quizCompletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], StudentProfile.prototype, "lastQuizUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Course', default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "enrolledFitnessCourses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "achievements", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "trainerNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StudentProfile.prototype, "lastUpdatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], StudentProfile.prototype, "metadata", void 0);
exports.StudentProfile = StudentProfile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], StudentProfile);
exports.StudentProfileSchema = mongoose_1.SchemaFactory.createForClass(StudentProfile);
exports.StudentProfileSchema.index({ userId: 1 }, { unique: true });
exports.StudentProfileSchema.index({ 'fitnessGoals.primaryGoal': 1 });
exports.StudentProfileSchema.index({ 'fitnessGoals.status': 1 });
exports.StudentProfileSchema.index({ hasCompletedInitialQuiz: 1 });
exports.StudentProfileSchema.index({ 'bodyMeasurements.date': -1 });
exports.StudentProfileSchema.index({ enrolledFitnessCourses: 1 });
//# sourceMappingURL=student-profile.schema.js.map