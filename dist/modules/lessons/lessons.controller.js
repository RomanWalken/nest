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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lessons_service_1 = require("./lessons.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let LessonsController = class LessonsController {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    create(createLessonDto, req) {
        return this.lessonsService.create(createLessonDto);
    }
    findAll(paginationDto, moduleId) {
        return this.lessonsService.findAll(paginationDto, moduleId);
    }
    findByModule(moduleId) {
        return this.lessonsService.findByModule(moduleId);
    }
    getFreeContent(moduleId) {
        return this.lessonsService.getFreeContent(moduleId);
    }
    findOne(id) {
        return this.lessonsService.findOne(id);
    }
    update(id, updateLessonDto) {
        return this.lessonsService.update(id, updateLessonDto);
    }
    remove(id) {
        return this.lessonsService.remove(id);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый урок',
        description: 'Создает новый урок в рамках модуля курса. Урок может содержать текст, видео и прикрепленные файлы.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Урок успешно создан'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto, Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список уроков',
        description: 'Возвращает список уроков с пагинацией. Можно фильтровать по модулю.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество уроков на странице', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'moduleId', required: false, description: 'ID модуля для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список уроков получен'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('module/:moduleId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все уроки модуля',
        description: 'Возвращает все уроки конкретного модуля, отсортированные по порядку.'
    }),
    (0, swagger_1.ApiParam)({ name: 'moduleId', description: 'ID модуля', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Уроки модуля получены'
    }),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findByModule", null);
__decorate([
    (0, common_1.Get)('free'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить бесплатные уроки',
        description: 'Возвращает все бесплатные уроки для предварительного просмотра.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'moduleId', required: false, description: 'ID модуля для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Бесплатные уроки получены'
    }),
    __param(0, (0, common_1.Query)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "getFreeContent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить урок по ID',
        description: 'Возвращает детальную информацию об уроке.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Урок найден'
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить урок',
        description: 'Обновляет существующий урок.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Урок успешно обновлен'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить урок',
        description: 'Удаляет урок. Операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Урок успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Урок не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "remove", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('lessons'),
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map