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
exports.CreateTariffDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../common/types");
class CreateTariffDto {
}
exports.CreateTariffDto = CreateTariffDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название тарифа',
        example: 'Базовый доступ на 30 дней',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Подробное описание тарифа и что в него входит',
        example: 'Доступ ко всем базовым урокам курса на 30 дней. Включает видео-уроки, материалы для скачивания и поддержку в чате.',
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL изображения тарифа',
        example: 'https://uploadthings.io/images/basic-tariff.jpg',
        format: 'uri'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Старая цена тарифа (для отображения скидки)',
        example: 49.99,
        minimum: 0,
        maximum: 9999.99
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(9999.99),
    __metadata("design:type", Number)
], CreateTariffDto.prototype, "oldPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Новая цена тарифа (основная цена для оплаты)',
        example: 29.99,
        minimum: 0,
        maximum: 9999.99
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(9999.99),
    __metadata("design:type", Number)
], CreateTariffDto.prototype, "newPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Валюта тарифа',
        example: 'USD',
        default: 'USD',
        enum: ['USD', 'EUR', 'UAH', 'RUB']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Длительность тарифа в днях (0 = бессрочный доступ, максимальное значение - 10 лет)',
        example: 30,
        minimum: 0,
        maximum: 3650
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(3650),
    __metadata("design:type", Number)
], CreateTariffDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Статус тарифа',
        enum: types_1.TariffStatus,
        example: types_1.TariffStatus.ACTIVE,
        default: types_1.TariffStatus.ACTIVE
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса, к которому относится тариф',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID уроков, доступных по данному тарифу (для обычных курсов)',
        example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateTariffDto.prototype, "lessonIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID тренировок, доступных по данному тарифу (для фитнес-курсов)',
        example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateTariffDto.prototype, "workoutIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Преимущества тарифа',
        example: ['Доступ ко всем урокам', 'Сертификат по окончании', 'Поддержка в чате'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTariffDto.prototype, "advantages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Включает ли тариф доктора',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTariffDto.prototype, "includesDoctor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные возможности и особенности тарифа',
        example: {
            includesCertificates: true,
            prioritySupport: false,
            groupChats: true,
            personalCoach: false,
            bonusMaterials: ['чек-листы', 'шаблоны', 'дополнительные видео']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTariffDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID цены в Stripe (автоматически создается при интеграции)',
        example: 'price_1N8xKjLv3vJZqXyZ1234567890'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "stripePriceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID продукта в Stripe (автоматически создается при интеграции)',
        example: 'prod_1N8xKjLv3vJZqXyZ1234567890'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "stripeProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID продукта в WayForPay (автоматически создается при интеграции)',
        example: 'WFP_PRODUCT_123456'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "wayforpayProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Универсальный внешний ID для интеграций',
        example: 'TARIFF_001'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTariffDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Метаданные для Stripe (ключ-значение строки)',
        example: {
            course_type: 'fitness',
            difficulty: 'beginner',
            category: 'yoga'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTariffDto.prototype, "stripeMetadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Метаданные для WayForPay',
        example: {
            productType: 'course',
            courseId: '507f1f77bcf86cd799439011',
            features: ['video', 'materials', 'support']
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTariffDto.prototype, "wayforpayMetadata", void 0);
//# sourceMappingURL=create-tariff.dto.js.map