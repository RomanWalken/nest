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
exports.BodyMeasurementsSchema = exports.BodyMeasurements = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let BodyMeasurements = class BodyMeasurements {
};
exports.BodyMeasurements = BodyMeasurements;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], BodyMeasurements.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "bodyFat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "muscleMass", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "waterPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "chest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "waist", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "hips", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "biceps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "thigh", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "neck", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "bmi", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "bmr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], BodyMeasurements.prototype, "tdee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], BodyMeasurements.prototype, "progressPhotos", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BodyMeasurements.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], BodyMeasurements.prototype, "metadata", void 0);
exports.BodyMeasurements = BodyMeasurements = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BodyMeasurements);
exports.BodyMeasurementsSchema = mongoose_1.SchemaFactory.createForClass(BodyMeasurements);
exports.BodyMeasurementsSchema.index({ date: -1 });
exports.BodyMeasurementsSchema.index({ weight: 1 });
exports.BodyMeasurementsSchema.index({ bodyFat: 1 });
//# sourceMappingURL=body-measurements.schema.js.map