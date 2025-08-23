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
exports.CourseModulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const modules_service_1 = require("./modules.service");
const create_module_dto_1 = require("./dto/create-module.dto");
const update_module_dto_1 = require("./dto/update-module.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let CourseModulesController = class CourseModulesController {
    constructor(modulesService) {
        this.modulesService = modulesService;
    }
    create(createModuleDto, req) {
        return this.modulesService.create(createModuleDto);
    }
    findAll(paginationDto, courseId) {
        return this.modulesService.findAll(paginationDto, courseId);
    }
    findByCourse(courseId) {
        return this.modulesService.findByCourse(courseId);
    }
    findOne(id) {
        return this.modulesService.findOne(id);
    }
    update(id, updateModuleDto) {
        return this.modulesService.update(id, updateModuleDto);
    }
    remove(id) {
        return this.modulesService.remove(id);
    }
};
exports.CourseModulesController = CourseModulesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый модуль курса',
        description: 'Создает новый модуль в рамках курса. Модули структурируют контент курса и могут содержать несколько уроков.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Модуль успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Введение в фитнес',
                description: 'Базовые принципы фитнеса и здорового образа жизни',
                order: 1,
                isFree: false,
                courseId: '507f1f77bcf86cd799439012',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto, Object]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список модулей курса',
        description: 'Возвращает список модулей с пагинацией. Можно фильтровать по конкретному курсу.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество модулей на странице', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список модулей получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        title: 'Введение в фитнес',
                        order: 1,
                        isFree: false,
                        courseId: {
                            _id: '507f1f77bcf86cd799439012',
                            title: 'Основы фитнеса',
                            slug: 'osnovy-fitnesa'
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
], CourseModulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все модули курса',
        description: 'Возвращает все модули конкретного курса, отсортированные по порядку.'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Модули курса получены',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    title: 'Введение в фитнес',
                    order: 1,
                    isFree: false
                },
                {
                    _id: '507f1f77bcf86cd799439013',
                    title: 'Базовые упражнения',
                    order: 2,
                    isFree: false
                }
            ]
        }
    }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить модуль по ID',
        description: 'Возвращает детальную информацию о модуле курса.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Модуль найден',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Введение в фитнес',
                description: 'Базовые принципы фитнеса и здорового образа жизни',
                order: 1,
                isFree: false,
                courseId: {
                    _id: '507f1f77bcf86cd799439012',
                    title: 'Основы фитнеса',
                    slug: 'osnovy-fitnesa'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Модуль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить модуль',
        description: 'Обновляет существующий модуль курса.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Модуль успешно обновлен'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Модуль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить модуль',
        description: 'Удаляет модуль курса. Операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Модуль успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Модуль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "remove", null);
exports.CourseModulesController = CourseModulesController = __decorate([
    (0, swagger_1.ApiTags)('course-modules'),
    (0, common_1.Controller)('course-modules'),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], CourseModulesController);
//# sourceMappingURL=modules.controller.js.map