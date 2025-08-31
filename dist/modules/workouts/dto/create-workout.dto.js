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
exports.CreateWorkoutDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateWorkoutDto {
}
exports.CreateWorkoutDto = CreateWorkoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название тренировки',
        example: 'Кардио тренировка для начинающих',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateWorkoutDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание тренировки',
        example: 'Интенсивная кардио тренировка для сжигания жира',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateWorkoutDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Продолжительность тренировки в минутах',
        example: 45,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkoutDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Порядковый номер тренировки',
        example: 1,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Является ли тренировка бесплатной',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkoutDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса, к которому относится тренировка',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateWorkoutDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID тарифов, к которым привязана тренировка',
        example: ['507f1f77bcf86cd799439012'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateWorkoutDto.prototype, "tariffs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID упражнений в тренировке',
        example: ['507f1f77bcf86cd799439013'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateWorkoutDto.prototype, "exercises", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Месяц (1-12)',
        example: 1,
        minimum: 1,
        maximum: 12
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Неделя в месяце (1-5)',
        example: 1,
        minimum: 1,
        maximum: 5
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutDto.prototype, "week", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'День недели (1-7)',
        example: 1,
        minimum: 1,
        maximum: 7
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID пользователя, для которого настроена тренировка (для модераторов)',
        example: '507f1f77bcf86cd799439014'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateWorkoutDto.prototype, "customUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные тренировки',
        example: {
            difficulty: 'beginner',
            targetMuscles: ['ноги', 'руки', 'корпус'],
            calories: 300,
            equipment: ['коврик', 'гантели']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateWorkoutDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-workout.dto.js.map