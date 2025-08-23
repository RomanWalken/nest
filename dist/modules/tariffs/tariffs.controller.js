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
exports.TariffsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tariffs_service_1 = require("./tariffs.service");
const create_tariff_dto_1 = require("./dto/create-tariff.dto");
const update_tariff_dto_1 = require("./dto/update-tariff.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let TariffsController = class TariffsController {
    constructor(tariffsService) {
        this.tariffsService = tariffsService;
    }
    create(createTariffDto, req) {
        return this.tariffsService.create(createTariffDto);
    }
    findAll(paginationDto, courseId) {
        return this.tariffsService.findAll(paginationDto, courseId);
    }
    findByCourse(courseId) {
        return this.tariffsService.findByCourse(courseId);
    }
    findOne(id) {
        return this.tariffsService.findOne(id);
    }
    update(id, updateTariffDto) {
        return this.tariffsService.update(id, updateTariffDto);
    }
    remove(id) {
        return this.tariffsService.remove(id);
    }
};
exports.TariffsController = TariffsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый тариф',
        description: 'Создает новый тариф для курса. Доступно только администраторам и супер-администраторам. Тариф определяет стоимость и условия доступа к курсу.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Тариф успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Базовый доступ на 30 дней',
                description: 'Доступ ко всем базовым урокам курса на 30 дней',
                price: 29.99,
                currency: 'USD',
                duration: 30,
                isActive: true,
                courseId: '507f1f77bcf86cd799439012',
                lessonIds: [],
                features: {
                    includesCertificates: true,
                    prioritySupport: false
                },
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или валидация не пройдена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для создания тарифа' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tariff_dto_1.CreateTariffDto, Object]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список тарифов',
        description: 'Возвращает список тарифов с пагинацией. Можно фильтровать по конкретному курсу.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество тарифов на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список тарифов получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        name: 'Базовый доступ на 30 дней',
                        price: 29.99,
                        currency: 'USD',
                        duration: 30,
                        isActive: true,
                        courseId: {
                            _id: '507f1f77bcf86cd799439012',
                            title: 'Основы фитнеса для начинающих',
                            slug: 'osnovy-fitnesa-dlya-nachinayushchih'
                        }
                    }
                ],
                meta: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1
                }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить тарифы для курса',
        description: 'Возвращает все активные тарифы для конкретного курса, отсортированные по цене (от дешевых к дорогим).'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Тарифы для курса получены',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Базовый доступ на 30 дней',
                    price: 29.99,
                    currency: 'USD',
                    duration: 30,
                    isActive: true
                },
                {
                    _id: '507f1f77bcf86cd799439012',
                    name: 'Премиум доступ на 90 дней',
                    price: 79.99,
                    currency: 'USD',
                    duration: 90,
                    isActive: true
                }
            ]
        }
    }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить тариф по ID',
        description: 'Возвращает полную информацию о тарифе по его уникальному идентификатору. Включает данные о курсе и доступных уроках.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Тариф найден',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Базовый доступ на 30 дней',
                description: 'Доступ ко всем базовым урокам курса на 30 дней',
                price: 29.99,
                currency: 'USD',
                duration: 30,
                isActive: true,
                courseId: {
                    _id: '507f1f77bcf86cd799439012',
                    title: 'Основы фитнеса для начинающих',
                    slug: 'osnovy-fitnesa-dlya-nachinayushchih'
                },
                lessonIds: [
                    {
                        _id: '507f1f77bcf86cd799439013',
                        title: 'Введение в фитнес',
                        order: 1
                    }
                ]
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тариф не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить тариф',
        description: 'Обновляет существующий тариф. Доступно только администраторам и супер-администраторам. Можно изменить любые поля тарифа.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Тариф успешно обновлен',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                name: 'Базовый доступ на 30 дней (обновлено)',
                price: 24.99,
                duration: 45
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления тарифа' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тариф не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tariff_dto_1.UpdateTariffDto]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить тариф',
        description: 'Полностью удаляет тариф из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Тариф успешно удален',
        schema: {
            example: {
                message: 'Тариф успешно удален',
                deletedTariffId: '507f1f77bcf86cd799439011'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления тарифа' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тариф не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TariffsController.prototype, "remove", null);
exports.TariffsController = TariffsController = __decorate([
    (0, swagger_1.ApiTags)('tariffs'),
    (0, common_1.Controller)('tariffs'),
    __metadata("design:paramtypes", [tariffs_service_1.TariffsService])
], TariffsController);
//# sourceMappingURL=tariffs.controller.js.map