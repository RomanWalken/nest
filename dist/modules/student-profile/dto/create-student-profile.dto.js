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
exports.CreateStudentProfileDto = exports.CreateFitnessGoalsDto = exports.CreateBodyMeasurementsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateBodyMeasurementsDto {
}
exports.CreateBodyMeasurementsDto = CreateBodyMeasurementsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата измерения',
        example: '2024-01-15T00:00:00.000Z',
        format: 'date-time'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBodyMeasurementsDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Вес в кг',
        example: 70.5,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Рост в см',
        example: 175,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Процент жира',
        example: 15.5,
        minimum: 0,
        maximum: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "bodyFat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Мышечная масса в кг',
        example: 45.2,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "muscleMass", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Процент воды в организме',
        example: 60.5,
        minimum: 0,
        maximum: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "waterPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват груди в см',
        example: 95,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "chest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват талии в см',
        example: 80,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "waist", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват бедер в см',
        example: 100,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "hips", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват бицепса в см',
        example: 35,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "biceps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват бедра в см',
        example: 55,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "thigh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Обхват шеи в см',
        example: 38,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "neck", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Индекс массы тела',
        example: 22.5,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "bmi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Базальный метаболизм',
        example: 1600,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "bmr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Общий дневной расход энергии',
        example: 2200,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBodyMeasurementsDto.prototype, "tdee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URLs фотографий прогресса',
        example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBodyMeasurementsDto.prototype, "progressPhotos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Заметки к измерениям',
        example: 'Измерения после тренировки',
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBodyMeasurementsDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            measurementDevice: 'smart_scale',
            timeOfDay: 'morning'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateBodyMeasurementsDto.prototype, "metadata", void 0);
class CreateFitnessGoalsDto {
}
exports.CreateFitnessGoalsDto = CreateFitnessGoalsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Основная цель',
        example: 'weight_loss',
        enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'general_fitness']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['weight_loss', 'muscle_gain', 'endurance', 'strength', 'general_fitness']),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "primaryGoal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные цели',
        example: ['improve_posture', 'increase_flexibility'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFitnessGoalsDto.prototype, "secondaryGoals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевой вес в кг',
        example: 65,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetWeight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевой процент жира',
        example: 12,
        minimum: 0,
        maximum: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetBodyFat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевая мышечная масса в кг',
        example: 50,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetMuscleMass", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевой обхват груди в см',
        example: 100,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetChest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевой обхват талии в см',
        example: 75,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetWaist", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевой обхват бедер в см',
        example: 95,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "targetHips", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Целевая дата достижения',
        example: '2024-06-15T00:00:00.000Z',
        format: 'date-time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "targetDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Продолжительность в неделях',
        example: 12,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "durationWeeks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Уровень активности',
        example: 'moderate',
        enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['sedentary', 'light', 'moderate', 'active', 'very_active']),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "activityLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Уровень опыта тренировок',
        example: 'beginner',
        enum: ['beginner', 'intermediate', 'advanced']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['beginner', 'intermediate', 'advanced']),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ограничения',
        example: ['back_injury', 'time_constraints'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFitnessGoalsDto.prototype, "limitations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Предпочтения',
        example: ['home_workouts', 'cardio'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFitnessGoalsDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Доступное оборудование',
        example: ['dumbbells', 'yoga_mat'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFitnessGoalsDto.prototype, "availableEquipment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Максимальное время тренировки в минутах',
        example: 45,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "maxWorkoutTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Количество тренировок в неделю',
        example: 3,
        minimum: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateFitnessGoalsDto.prototype, "workoutsPerWeek", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Мотивация студента',
        example: 'Хочу чувствовать себя более энергичным и здоровым',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "motivation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Предыдущий опыт',
        example: 'Занимался в спортзале 2 года назад',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "previousExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Текущие вызовы',
        example: 'Не хватает времени на тренировки',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "currentChallenges", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Статус целей',
        example: 'active',
        enum: ['active', 'paused', 'completed', 'cancelled'],
        default: 'active'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['active', 'paused', 'completed', 'cancelled']),
    __metadata("design:type", String)
], CreateFitnessGoalsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            priority: 'high',
            difficulty: 'medium'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateFitnessGoalsDto.prototype, "metadata", void 0);
class CreateStudentProfileDto {
}
exports.CreateStudentProfileDto = CreateStudentProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID пользователя',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дата рождения',
        example: '1990-05-15T00:00:00.000Z',
        format: 'date-time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Пол',
        example: 'male',
        enum: ['male', 'female', 'other']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['male', 'female', 'other']),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Телефон',
        example: '+380501234567',
        maxLength: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Контакт для экстренных случаев',
        example: '+380501234568',
        maxLength: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Медицинские состояния',
        example: ['diabetes', 'hypertension'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateStudentProfileDto.prototype, "medicalConditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Лекарства',
        example: ['insulin', 'metformin'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateStudentProfileDto.prototype, "medications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Аллергии',
        example: ['peanuts', 'shellfish'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateStudentProfileDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Контакт врача',
        example: 'Dr. Smith, +380501234569',
        maxLength: 200
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "doctorContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Цели фитнеса',
        type: CreateFitnessGoalsDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateFitnessGoalsDto),
    __metadata("design:type", CreateFitnessGoalsDto)
], CreateStudentProfileDto.prototype, "fitnessGoals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Текущие измерения тела',
        type: CreateBodyMeasurementsDto
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBodyMeasurementsDto),
    __metadata("design:type", CreateBodyMeasurementsDto)
], CreateStudentProfileDto.prototype, "currentMeasurements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Публичный ли профиль',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentProfileDto.prototype, "isPublic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Разрешить делиться прогрессом',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentProfileDto.prototype, "allowProgressSharing", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Получать мотивационные сообщения',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentProfileDto.prototype, "receiveMotivationalMessages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Завершен ли начальный квиз',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentProfileDto.prototype, "hasCompletedInitialQuiz", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Заметки тренера',
        example: 'Студент мотивирован, нужна поддержка в начале',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "trainerNotes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            source: 'initial_quiz',
            version: '1.0'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateStudentProfileDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-student-profile.dto.js.map