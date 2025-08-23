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
exports.CreatePurchaseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../common/types");
class CreatePurchaseDto {
}
exports.CreatePurchaseDto = CreatePurchaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса для покупки',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID тарифа, по которому совершается покупка',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "tariffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Сумма покупки в указанной валюте',
        example: 29.99,
        minimum: 0,
        maximum: 9999.99
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(9999.99),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Валюта покупки',
        example: 'USD',
        enum: ['USD', 'EUR', 'UAH', 'RUB']
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Метод оплаты (wayforpay - украинская система, stripe - международная система)',
        enum: types_1.PaymentMethod,
        example: types_1.PaymentMethod.STRIPE
    }),
    (0, class_validator_1.IsEnum)(types_1.PaymentMethod),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Длительность тарифа в днях для расчета срока действия доступа (используется для автоматического расчета accessExpiresAt)',
        example: 30,
        minimum: 0,
        maximum: 3650
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(3650),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "tariffDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID транзакции от платежной системы (может быть предоставлен сразу или позже при подтверждении платежа)',
        example: 'txn_1234567890abcdef'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "transactionId", void 0);
//# sourceMappingURL=create-purchase.dto.js.map