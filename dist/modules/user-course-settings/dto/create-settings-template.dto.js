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
exports.CreateSettingsTemplateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSettingsTemplateDto {
}
exports.CreateSettingsTemplateDto = CreateSettingsTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название шаблона',
        example: 'Начинающий спортсмен',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSettingsTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание шаблона',
        example: 'Шаблон для начинающих спортсменов с пониженной интенсивностью',
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSettingsTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Категория шаблона',
        example: 'fitness',
        enum: ['fitness', 'regular', 'general']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['fitness', 'regular', 'general']),
    __metadata("design:type", String)
], CreateSettingsTemplateDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Является ли шаблоном по умолчанию',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSettingsTemplateDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Активен ли шаблон',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSettingsTemplateDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Настройки по умолчанию для тренировок',
        example: {
            durationMultiplier: 0.7,
            intensityLevel: 'low',
            restTimeMultiplier: 1.2,
            enabledByDefault: true
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSettingsTemplateDto.prototype, "workoutDefaults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Настройки по умолчанию для упражнений',
        example: {
            repetitionsMultiplier: 0.8,
            setsMultiplier: 0.9,
            restTimeMultiplier: 1.3,
            enabledByDefault: true
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSettingsTemplateDto.prototype, "exerciseDefaults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Настройки по умолчанию для уроков',
        example: {
            unlockAll: false,
            requiredByDefault: true,
            customOrder: false
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSettingsTemplateDto.prototype, "lessonDefaults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Общие настройки курса по умолчанию',
        example: {
            difficulty: 'beginner',
            pace: 'slow',
            notifications: true,
            reminders: true,
            weeklyGoal: '2 тренировки в неделю'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSettingsTemplateDto.prototype, "courseDefaults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID пользователя, который создал шаблон',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSettingsTemplateDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Теги для поиска шаблона',
        example: ['начинающий', 'фитнес', 'низкая интенсивность'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSettingsTemplateDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные шаблона',
        example: {
            targetAudience: 'новички',
            estimatedDuration: '3 месяца',
            prerequisites: ['базовая физическая подготовка']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSettingsTemplateDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-settings-template.dto.js.map