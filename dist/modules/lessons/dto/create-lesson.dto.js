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
exports.CreateLessonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../common/types");
class CreateLessonDto {
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название урока',
        example: 'Базовые упражнения для начинающих',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание урока',
        example: 'В этом уроке вы изучите основные упражнения для развития силы и выносливости',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Текстовое содержимое урока',
        example: 'Добро пожаловать в урок по базовым упражнениям. Сегодня мы изучим...',
        maxLength: 10000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10000),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Тип урока',
        enum: types_1.LessonType,
        example: types_1.LessonType.VIDEO
    }),
    (0, class_validator_1.IsEnum)(types_1.LessonType),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL видео урока (только для видео уроков)',
        example: 'https://bunny.net/video/lesson-basic-exercises.mp4',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Продолжительность урока в минутах',
        example: 25,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Порядковый номер урока в модуле',
        example: 1,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Является ли урок бесплатным',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLessonDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID модуля, к которому относится урок',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID тарифов, к которым привязан урок (если урок не бесплатный)',
        example: ['507f1f77bcf86cd799439012'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateLessonDto.prototype, "tariffs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Прикрепленные файлы к уроку',
        example: [
            {
                name: 'Руководство по упражнениям.pdf',
                url: 'https://uploadthings.io/files/guide.pdf',
                type: 'pdf'
            },
            {
                name: 'Чек-лист упражнений.docx',
                url: 'https://uploadthings.io/files/checklist.docx',
                type: 'document'
            }
        ]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateLessonDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Данные для опроса (только для уроков типа QUIZ)',
        example: {
            questions: [
                {
                    question: 'Какое упражнение лучше всего подходит для начинающих?',
                    options: ['Приседания', 'Отжимания', 'Планка'],
                    correctAnswer: 2
                }
            ]
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLessonDto.prototype, "quizData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Данные для презентации (только для уроков типа PRESENTATION)',
        example: {
            slides: [
                { title: 'Введение', content: 'Добро пожаловать в курс' },
                { title: 'Основы', content: 'Базовые принципы фитнеса' }
            ]
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLessonDto.prototype, "presentationData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные урока',
        example: {
            difficulty: 'beginner',
            equipment: ['коврик', 'гантели'],
            targetMuscles: ['ноги', 'руки'],
            calories: 150,
            prerequisites: []
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLessonDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-lesson.dto.js.map