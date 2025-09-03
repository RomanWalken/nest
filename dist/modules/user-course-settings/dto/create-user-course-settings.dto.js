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
exports.CreateUserCourseSettingsDto = exports.CreateCourseSettingsDto = exports.CreateLessonOverrideDto = exports.CreateExerciseOverrideDto = exports.CreateWorkoutOverrideDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateWorkoutOverrideDto {
}
exports.CreateWorkoutOverrideDto = CreateWorkoutOverrideDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID тренировки',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateWorkoutOverrideDto.prototype, "workoutId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональная длительность тренировки в минутах',
        example: 30,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkoutOverrideDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Включена ли тренировка',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkoutOverrideDto.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональный порядок тренировки',
        example: 1,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkoutOverrideDto.prototype, "customOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональное расписание тренировки',
        example: {
            month: 1,
            week: 1,
            day: 1
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateWorkoutOverrideDto.prototype, "customSchedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные тренировки',
        example: {
            notes: 'Увеличить интенсивность',
            modifications: ['добавить разминку', 'убрать кардио']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateWorkoutOverrideDto.prototype, "metadata", void 0);
class CreateExerciseOverrideDto {
}
exports.CreateExerciseOverrideDto = CreateExerciseOverrideDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID упражнения',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateExerciseOverrideDto.prototype, "exerciseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональные повторения',
        example: 10,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExerciseOverrideDto.prototype, "repetitions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональные подходы',
        example: 2,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExerciseOverrideDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональное время отдыха в секундах',
        example: 45,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExerciseOverrideDto.prototype, "restTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Включено ли упражнение',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateExerciseOverrideDto.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные упражнения',
        example: {
            notes: 'Уменьшить нагрузку',
            alternatives: ['упрощенная версия', 'с поддержкой']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateExerciseOverrideDto.prototype, "metadata", void 0);
class CreateLessonOverrideDto {
}
exports.CreateLessonOverrideDto = CreateLessonOverrideDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID урока',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateLessonOverrideDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Разблокирован ли урок',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLessonOverrideDto.prototype, "isUnlocked", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональный порядок урока',
        example: 1,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLessonOverrideDto.prototype, "customOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обязателен ли урок',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLessonOverrideDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные урока',
        example: {
            notes: 'Пропустить до изучения основ',
            prerequisites: ['урок 1', 'урок 2']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLessonOverrideDto.prototype, "metadata", void 0);
class CreateCourseSettingsDto {
}
exports.CreateCourseSettingsDto = CreateCourseSettingsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Персональная сложность курса',
        example: 'beginner',
        enum: ['beginner', 'intermediate', 'advanced']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseSettingsDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Темп прохождения курса',
        example: 'normal',
        enum: ['slow', 'normal', 'fast']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseSettingsDto.prototype, "pace", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Включить уведомления',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseSettingsDto.prototype, "notifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Включить напоминания',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseSettingsDto.prototype, "reminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дата начала курса для студента',
        example: '2024-01-15T00:00:00.000Z',
        format: 'date-time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCourseSettingsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевая дата завершения курса',
        example: '2024-03-15T00:00:00.000Z',
        format: 'date-time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCourseSettingsDto.prototype, "targetCompletionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные настройки курса',
        example: {
            weeklyGoal: '3 тренировки в неделю',
            preferredTime: 'утро',
            equipment: ['гантели', 'коврик']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCourseSettingsDto.prototype, "metadata", void 0);
class CreateUserCourseSettingsDto {
}
exports.CreateUserCourseSettingsDto = CreateUserCourseSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID пользователя (студента)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateUserCourseSettingsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateUserCourseSettingsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Активен ли доступ к курсу',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserCourseSettingsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Переопределения для тренировок (для фитнес-курсов)',
        type: [CreateWorkoutOverrideDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWorkoutOverrideDto),
    __metadata("design:type", Array)
], CreateUserCourseSettingsDto.prototype, "workoutOverrides", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Переопределения для упражнений',
        type: [CreateExerciseOverrideDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateExerciseOverrideDto),
    __metadata("design:type", Array)
], CreateUserCourseSettingsDto.prototype, "exerciseOverrides", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Переопределения для уроков (для обычных курсов)',
        type: [CreateLessonOverrideDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateLessonOverrideDto),
    __metadata("design:type", Array)
], CreateUserCourseSettingsDto.prototype, "lessonOverrides", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Общие настройки курса',
        type: CreateCourseSettingsDto
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateCourseSettingsDto),
    __metadata("design:type", CreateCourseSettingsDto)
], CreateUserCourseSettingsDto.prototype, "courseSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID пользователя, который создал настройки (тренер/модератор)',
        example: '507f1f77bcf86cd799439013'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateUserCourseSettingsDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Заметки тренера о настройках',
        example: 'Студент начинающий, нужна адаптация под его уровень',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserCourseSettingsDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            source: 'manual',
            template: 'beginner',
            lastReview: '2024-01-15T10:30:00.000Z'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateUserCourseSettingsDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-user-course-settings.dto.js.map