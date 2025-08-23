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
exports.CreateCompanyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCompanyDto {
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название компании',
        example: 'Fitness Academy Pro',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL-идентификатор компании (slug)',
        example: 'fitness-academy-pro',
        pattern: '^[a-z0-9-]+$',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-z0-9-]+$/, { message: 'Slug может содержать только строчные буквы, цифры и дефисы' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Подробное описание компании',
        example: 'Ведущая платформа для онлайн-обучения фитнесу и здоровому образу жизни. Предоставляем качественные курсы от экспертов индустрии.',
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL логотипа компании',
        example: 'https://example.com/logos/fitness-academy-logo.png',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Домен компании для мультитенантности',
        example: 'fitness-academy.example.com',
        pattern: '^[a-zA-Z0-9.-]+$',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9.-]+$/, { message: 'Домен может содержать только буквы, цифры, точки и дефисы' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Настройки платформы компании',
        example: {
            theme: {
                primaryColor: '#007bff',
                secondaryColor: '#6c757d',
                logoPosition: 'left'
            },
            features: {
                enableChat: true,
                enableCertificates: true,
                enableProgressTracking: true,
                maxUsers: 1000,
                maxCourses: 50
            },
            branding: {
                companyName: 'Fitness Academy Pro',
                tagline: 'Ваш путь к здоровью начинается здесь',
                contactEmail: 'info@fitness-academy.com'
            }
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCompanyDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Статус активности компании (неактивные компании не могут создавать новые курсы и привлекать пользователей)',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCompanyDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-company.dto.js.map