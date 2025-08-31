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
exports.TeacherSchema = exports.Teacher = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../common/types");
let Teacher = class Teacher {
};
exports.Teacher = Teacher;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Teacher.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Teacher.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Teacher.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.UserRole, default: types_1.UserRole.TEACHER }),
    __metadata("design:type", String)
], Teacher.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Company', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Teacher.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "emailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Teacher.prototype, "authProviders", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Teacher.prototype, "lastLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Teacher.prototype, "specialization", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Teacher.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Teacher.prototype, "certificates", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Teacher.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Teacher.prototype, "languages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Teacher.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Course', default: [] }),
    __metadata("design:type", Array)
], Teacher.prototype, "courses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Teacher.prototype, "profile", void 0);
exports.Teacher = Teacher = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Teacher);
exports.TeacherSchema = mongoose_1.SchemaFactory.createForClass(Teacher);
exports.TeacherSchema.index({ email: 1 }, { unique: true });
exports.TeacherSchema.index({ companyId: 1 });
exports.TeacherSchema.index({ role: 1 });
exports.TeacherSchema.index({ isActive: 1 });
exports.TeacherSchema.index({ specialization: 1 });
exports.TeacherSchema.index({ skills: 1 });
exports.TeacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.TeacherSchema.set('toJSON', { virtuals: true });
exports.TeacherSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=teacher.schema.js.map