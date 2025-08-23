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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const purchases_service_1 = require("./purchases.service");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const update_purchase_dto_1 = require("./dto/update-purchase.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let PurchasesController = class PurchasesController {
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }
    create(createPurchaseDto, req) {
        return this.purchasesService.create(createPurchaseDto, req.user.id);
    }
    findAll(paginationDto, req) {
        return this.purchasesService.findAll(paginationDto, req.user.id);
    }
    findMyPurchases(req) {
        return this.purchasesService.findUserPurchases(req.user.id);
    }
    findOne(id, req) {
        return this.purchasesService.findOne(id);
    }
    update(id, updatePurchaseDto) {
        return this.purchasesService.update(id, updatePurchaseDto);
    }
    remove(id) {
        return this.purchasesService.remove(id);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новую покупку',
        description: 'Создает новую покупку курса пользователем. Система автоматически проверяет, не имеет ли пользователь уже доступ к курсу, и рассчитывает срок действия доступа на основе тарифа.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Покупка успешно создана',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                userId: '507f1f77bcf86cd799439012',
                courseId: '507f1f77bcf86cd799439013',
                tariffId: '507f1f77bcf86cd799439014',
                amount: 29.99,
                currency: 'USD',
                paymentMethod: 'stripe',
                paymentStatus: 'pending',
                accessExpiresAt: '2024-02-14T10:30:00.000Z',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или валидация не пройдена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Пользователь уже имеет доступ к курсу' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.CreatePurchaseDto, Object]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список покупок пользователя',
        description: 'Возвращает список покупок текущего авторизованного пользователя с пагинацией. Включает информацию о курсах и тарифах.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество покупок на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список покупок получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        amount: 29.99,
                        currency: 'USD',
                        paymentMethod: 'stripe',
                        paymentStatus: 'completed',
                        accessExpiresAt: '2024-02-14T10:30:00.000Z',
                        courseId: {
                            _id: '507f1f77bcf86cd799439013',
                            title: 'Основы фитнеса для начинающих',
                            slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                            thumbnail: 'https://example.com/thumbnails/fitness.jpg'
                        },
                        tariffId: {
                            _id: '507f1f77bcf86cd799439014',
                            name: 'Базовый доступ на 30 дней',
                            price: 29.99,
                            currency: 'USD',
                            duration: 30
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
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-purchases'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все покупки пользователя',
        description: 'Возвращает все завершенные покупки текущего пользователя без пагинации. Полезно для отображения списка доступных курсов.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список покупок пользователя получен',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    amount: 29.99,
                    currency: 'USD',
                    paymentStatus: 'completed',
                    courseId: {
                        _id: '507f1f77bcf86cd799439013',
                        title: 'Основы фитнеса для начинающих',
                        slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                        thumbnail: 'https://example.com/thumbnails/fitness.jpg'
                    },
                    tariffId: {
                        _id: '507f1f77bcf86cd799439014',
                        name: 'Базовый доступ на 30 дней',
                        price: 29.99,
                        currency: 'USD',
                        duration: 30
                    }
                }
            ]
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findMyPurchases", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить покупку по ID',
        description: 'Возвращает детальную информацию о конкретной покупке. Пользователь может получить только свои покупки.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Покупка найдена',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                userId: {
                    _id: '507f1f77bcf86cd799439012',
                    firstName: 'Иван',
                    lastName: 'Петров',
                    email: 'ivan.petrov@example.com'
                },
                amount: 29.99,
                currency: 'USD',
                paymentMethod: 'stripe',
                paymentStatus: 'completed',
                accessExpiresAt: '2024-02-14T10:30:00.000Z',
                courseId: {
                    _id: '507f1f77bcf86cd799439013',
                    title: 'Основы фитнеса для начинающих',
                    slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                    thumbnail: 'https://example.com/thumbnails/fitness.jpg'
                },
                tariffId: {
                    _id: '507f1f77bcf86cd799439014',
                    name: 'Базовый доступ на 30 дней',
                    price: 29.99,
                    currency: 'USD',
                    duration: 30
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Покупка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить покупку',
        description: 'Обновляет существующую покупку. Доступно только администраторам и супер-администраторам. Обычно используется для обновления статуса платежа.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Покупка успешно обновлена',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                paymentStatus: 'completed',
                transactionId: 'txn_1234567890abcdef'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления покупки' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Покупка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_dto_1.UpdatePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить покупку',
        description: 'Полностью удаляет покупку из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Покупка успешно удалена',
        schema: {
            example: {
                message: 'Покупка успешно удалена',
                deletedPurchaseId: '507f1f77bcf86cd799439011'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления покупки' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Покупка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "remove", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, swagger_1.ApiTags)('purchases'),
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map