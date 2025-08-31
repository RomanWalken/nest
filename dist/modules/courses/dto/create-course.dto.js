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
exports.CreateCourseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../common/types");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название курса',
        example: 'Основы фитнеса для начинающих',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL-идентификатор курса (slug)',
        example: 'osnovy-fitnesa-dlya-nachinayushchih',
        pattern: '^[a-z0-9-]+$'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Подробное описание курса',
        example: 'Комплексный курс по фитнесу для людей, которые только начинают свой путь к здоровому образу жизни. Включает базовые упражнения, правильное питание и мотивацию.',
        maxLength: 2000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Вид курса (regular - обычный курс, fitness - фитнес курс)',
        enum: types_1.CourseKind,
        example: types_1.CourseKind.FITNESS
    }),
    (0, class_validator_1.IsEnum)(types_1.CourseKind),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Категория курса (видео, кулинария, фитнес-тренировки, йога и т.д.)',
        enum: types_1.CourseCategory,
        example: types_1.CourseCategory.FITNESS_TRAINING
    }),
    (0, class_validator_1.IsEnum)(types_1.CourseCategory),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL превью курса (изображение)',
        example: 'https://example.com/images/fitness-course-preview.jpg',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Общая продолжительность курса в минутах',
        example: 480,
        minimum: 0,
        maximum: 10000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Уровень сложности курса (beginner - начинающий, intermediate - средний, advanced - продвинутый)',
        enum: types_1.DifficultyLevel,
        example: types_1.DifficultyLevel.BEGINNER,
        default: types_1.DifficultyLevel.BEGINNER
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.DifficultyLevel),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Статус публикации курса',
        enum: types_1.CoursePublicationStatus,
        example: types_1.CoursePublicationStatus.DRAFT,
        default: types_1.CoursePublicationStatus.DRAFT
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.CoursePublicationStatus),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "publicationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Рекомендуемый курс. Рекомендуемые курсы отображаются в специальных разделах',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Платный или бесплатный курс',
        example: true,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Теги для поиска и категоризации (максимум 20 тегов)',
        example: ['фитнес', 'здоровье', 'для начинающих', 'домашние тренировки'],
        type: [String],
        maxItems: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные курса (целевая аудитория, оборудование, предварительные требования, цели)',
        example: {
            targetAudience: 'Мужчины и женщины 18-45 лет',
            equipment: ['коврик', 'гантели', 'резинки'],
            prerequisites: 'Базовое состояние здоровья',
            goals: ['похудение', 'увеличение силы', 'улучшение выносливости']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID приемов пищи (только для фитнес-курсов)',
        example: ['507f1f77bcf86cd799439011'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "meals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID преподавателей (только для фитнес-курсов)',
        example: ['507f1f77bcf86cd799439012'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "teachers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID тренировок (только для фитнес-курсов)',
        example: ['507f1f77bcf86cd799439013'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "workouts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Будет ли у курса meals (только для фитнес-курсов)',
        example: true,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "hasMeals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Будет ли у курса доктор',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "hasDoctor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID модулей (только для обычных курсов)',
        example: ['507f1f77bcf86cd799439014'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "modules", void 0);
//# sourceMappingURL=create-course.dto.js.map