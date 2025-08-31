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
exports.CreateExerciseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateExerciseDto {
}
exports.CreateExerciseDto = CreateExerciseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название упражнения',
        example: 'Приседания с собственным весом',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание упражнения',
        example: 'Базовое упражнение для развития мышц ног',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL видео упражнения',
        example: 'https://bunny.net/video/squats.mp4',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Количество повторений',
        example: 15,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "repetitions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Подробное объяснение выполнения упражнения',
        example: 'Встаньте прямо, ноги на ширине плеч...',
        maxLength: 2000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID необходимого оборудования',
        example: ['507f1f77bcf86cd799439011'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateExerciseDto.prototype, "equipment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Мускулы, над которыми ведется работа',
        example: ['квадрицепсы', 'ягодичные мышцы', 'икроножные мышцы'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateExerciseDto.prototype, "targetMuscles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Продолжительность упражнения в секундах',
        example: 30,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Количество подходов',
        example: 3,
        minimum: 1,
        default: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Время отдыха между подходами в секундах',
        example: 60,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "restTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID пользователя, для которого настроено упражнение (для модераторов)',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "customUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные упражнения',
        example: {
            difficulty: 'beginner',
            calories: 50,
            tips: ['Держите спину прямой', 'Не отрывайте пятки от пола'],
            variations: ['с гантелями', 'на одной ноге']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateExerciseDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-exercise.dto.js.map