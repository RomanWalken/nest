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
exports.SettingsTemplateSchema = exports.SettingsTemplate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SettingsTemplate = class SettingsTemplate {
};
exports.SettingsTemplate = SettingsTemplate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SettingsTemplate.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SettingsTemplate.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SettingsTemplate.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], SettingsTemplate.prototype, "isDefault", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], SettingsTemplate.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SettingsTemplate.prototype, "workoutDefaults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SettingsTemplate.prototype, "exerciseDefaults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SettingsTemplate.prototype, "lessonDefaults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SettingsTemplate.prototype, "courseDefaults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SettingsTemplate.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], SettingsTemplate.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], SettingsTemplate.prototype, "metadata", void 0);
exports.SettingsTemplate = SettingsTemplate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SettingsTemplate);
exports.SettingsTemplateSchema = mongoose_1.SchemaFactory.createForClass(SettingsTemplate);
exports.SettingsTemplateSchema.index({ name: 1 });
exports.SettingsTemplateSchema.index({ category: 1 });
exports.SettingsTemplateSchema.index({ isDefault: 1 });
exports.SettingsTemplateSchema.index({ isActive: 1 });
exports.SettingsTemplateSchema.index({ tags: 1 });
//# sourceMappingURL=settings-template.schema.js.map