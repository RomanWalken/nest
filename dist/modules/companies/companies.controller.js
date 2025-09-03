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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const companies_service_1 = require("./companies.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
const mongoose_1 = require("mongoose");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    create(createCompanyDto, req) {
        return this.companiesService.create(createCompanyDto, req.user.id);
    }
    findAll(paginationDto) {
        return this.companiesService.findAll(paginationDto);
    }
    findBySlug(slug) {
        return this.companiesService.findBySlug(slug);
    }
    findByDomain(domain) {
        return this.companiesService.findByDomain(domain);
    }
    findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        return this.companiesService.findOne(id);
    }
    update(id, updateCompanyDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        return this.companiesService.update(id, updateCompanyDto);
    }
    remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        return this.companiesService.remove(id);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую компанию' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Компания успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Компания с таким slug или domain уже существует' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список компаний' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список компаний получен' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить компанию по slug' }),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'Slug компании', example: 'fitness-academy' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания найдена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('domain/:domain'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить компанию по domain' }),
    (0, swagger_1.ApiParam)({ name: 'domain', description: 'Домен компании', example: 'fitness.example.com' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания найдена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    __param(0, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findByDomain", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить компанию по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания найдена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID компании' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить компанию' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID компании' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить компанию' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID компании' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, swagger_1.ApiTags)('companies'),
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map