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
exports.TariffSchema = exports.Tariff = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../common/types");
let Tariff = class Tariff {
};
exports.Tariff = Tariff;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tariff.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tariff.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tariff.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Tariff.prototype, "oldPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Tariff.prototype, "newPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'USD' }),
    __metadata("design:type", String)
], Tariff.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Tariff.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.TariffStatus, default: types_1.TariffStatus.ACTIVE }),
    __metadata("design:type", String)
], Tariff.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Tariff.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Lesson', default: [] }),
    __metadata("design:type", Array)
], Tariff.prototype, "lessonIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Workout', default: [] }),
    __metadata("design:type", Array)
], Tariff.prototype, "workoutIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Tariff.prototype, "advantages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Tariff.prototype, "includesDoctor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Tariff.prototype, "features", void 0);
exports.Tariff = Tariff = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Tariff);
exports.TariffSchema = mongoose_1.SchemaFactory.createForClass(Tariff);
exports.TariffSchema.index({ courseId: 1 });
exports.TariffSchema.index({ status: 1 });
exports.TariffSchema.index({ newPrice: 1 });
exports.TariffSchema.index({ duration: 1 });
exports.TariffSchema.index({ lessonIds: 1 });
exports.TariffSchema.index({ workoutIds: 1 });
//# sourceMappingURL=tariff.schema.js.map