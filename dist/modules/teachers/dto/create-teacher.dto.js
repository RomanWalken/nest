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
exports.CreateTeacherDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTeacherDto {
}
exports.CreateTeacherDto = CreateTeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email преподавателя (уникальный в рамках компании)',
        example: 'teacher@example.com',
        format: 'email'
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пароль преподавателя (минимум 8 символов)',
        example: 'SecurePass123!',
        minLength: 8,
        format: 'password'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Имя преподавателя',
        example: 'Анна',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Фамилия преподавателя',
        example: 'Петрова',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL аватара преподавателя',
        example: 'https://example.com/avatars/anna-petrova.jpg',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Номер телефона в международном формате',
        example: '+380501234567',
        format: 'phone'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID компании, к которой привязан преподаватель',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Специализация преподавателя',
        example: 'Фитнес-тренер',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Навыки преподавателя',
        example: ['персональные тренировки', 'групповые занятия', 'йога', 'пилатес'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTeacherDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Сертификаты преподавателя',
        example: ['сертификат фитнес-тренера', 'сертификат инструктора по йоге'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTeacherDto.prototype, "certificates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Опыт работы в годах',
        example: 5,
        minimum: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTeacherDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Биография преподавателя',
        example: 'Опытный фитнес-тренер с 5-летним стажем работы. Специализируюсь на персональных тренировках и групповых занятиях.',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Языки, на которых преподает',
        example: ['русский', 'английский'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTeacherDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Расписание работы преподавателя',
        example: {
            monday: { start: '09:00', end: '18:00' },
            tuesday: { start: '09:00', end: '18:00' },
            wednesday: { start: '09:00', end: '18:00' },
            thursday: { start: '09:00', end: '18:00' },
            friday: { start: '09:00', end: '18:00' }
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTeacherDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные данные профиля',
        example: {
            education: 'Киевский национальный университет физического воспитания и спорта',
            achievements: ['Победитель конкурса "Лучший тренер года 2023"'],
            socialLinks: {
                instagram: '@anna_fitness',
                linkedin: 'linkedin.com/in/annapetrova'
            }
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTeacherDto.prototype, "profile", void 0);
//# sourceMappingURL=create-teacher.dto.js.map