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
exports.CreateDoctorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDoctorDto {
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID пользователя',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID курса',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Файлы, загруженные пользователем',
        example: ['https://uploadthings.io/files/medical-report.pdf'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateDoctorDto.prototype, "userFiles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Файлы, загруженные представителем курса',
        example: ['https://uploadthings.io/files/doctor-response.pdf'],
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateDoctorDto.prototype, "courseFiles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Активен ли доктор',
        example: true,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDoctorDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дополнительные метаданные',
        example: {
            consultationType: 'online',
            speciality: 'sports_medicine',
            notes: 'Специалист по спортивной медицине'
        }
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateDoctorDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-doctor.dto.js.map