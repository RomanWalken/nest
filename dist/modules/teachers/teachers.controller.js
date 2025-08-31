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
exports.TeachersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teachers_service_1 = require("./teachers.service");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const update_teacher_dto_1 = require("./dto/update-teacher.dto");
const query_teacher_dto_1 = require("./dto/query-teacher.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let TeachersController = class TeachersController {
    constructor(teachersService) {
        this.teachersService = teachersService;
    }
    create(createTeacherDto) {
        return this.teachersService.create(createTeacherDto);
    }
    findAll(query, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.findAll(query, userCompanyId);
    }
    findByCompany(companyId) {
        return this.teachersService.findByCompany(companyId);
    }
    findBySpecialization(specialization, companyId) {
        return this.teachersService.findBySpecialization(specialization, companyId);
    }
    findOne(id, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.findOne(id, userCompanyId);
    }
    update(id, updateTeacherDto, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.update(id, updateTeacherDto, userCompanyId);
    }
    remove(id, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.remove(id, userCompanyId);
    }
    addCourse(id, courseId, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.addCourse(id, courseId, userCompanyId);
    }
    removeCourse(id, courseId, req) {
        const userCompanyId = req.user.role === types_1.UserRole.ADMIN || req.user.role === types_1.UserRole.SUPERADMIN
            ? undefined
            : req.user.companyId;
        return this.teachersService.removeCourse(id, courseId, userCompanyId);
    }
};
exports.TeachersController = TeachersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать нового преподавателя',
        description: 'Создает нового преподавателя в системе. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Преподаватель успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                email: 'teacher@example.com',
                firstName: 'Анна',
                lastName: 'Петрова',
                specialization: 'Фитнес-тренер',
                companyId: '507f1f77bcf86cd799439012',
                role: 'teacher',
                isActive: true,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Неверные данные или преподаватель с таким email уже существует'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для создания преподавателя'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список преподавателей',
        description: 'Возвращает список преподавателей с пагинацией и фильтрацией. Администраторы видят всех преподавателей, обычные пользователи - только своей компании.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество элементов на странице', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Поиск по имени, фамилии или email', example: 'Анна' }),
    (0, swagger_1.ApiQuery)({ name: 'specialization', required: false, description: 'Фильтр по специализации', example: 'Фитнес-тренер' }),
    (0, swagger_1.ApiQuery)({ name: 'skills', required: false, description: 'Фильтр по навыкам', example: 'йога,пилатес' }),
    (0, swagger_1.ApiQuery)({ name: 'companyId', required: false, description: 'Фильтр по компании', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Фильтр по статусу активности', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'languages', required: false, description: 'Фильтр по языкам', example: 'русский,английский' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Список преподавателей успешно получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        firstName: 'Анна',
                        lastName: 'Петрова',
                        email: 'teacher@example.com',
                        specialization: 'Фитнес-тренер',
                        skills: ['персональные тренировки', 'групповые занятия'],
                        experience: 5,
                        isActive: true
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
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_teacher_dto_1.QueryTeacherDto, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('company/:companyId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить преподавателей по компании',
        description: 'Возвращает список активных преподавателей конкретной компании'
    }),
    (0, swagger_1.ApiParam)({ name: 'companyId', description: 'ID компании', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Список преподавателей компании получен'
    }),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Get)('specialization/:specialization'),
    (0, swagger_1.ApiOperation)({
        summary: 'Найти преподавателей по специализации',
        description: 'Возвращает список преподавателей с определенной специализацией'
    }),
    (0, swagger_1.ApiParam)({ name: 'specialization', description: 'Специализация', example: 'Фитнес-тренер' }),
    (0, swagger_1.ApiQuery)({ name: 'companyId', required: false, description: 'ID компании для фильтрации' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Список преподавателей по специализации получен'
    }),
    __param(0, (0, common_1.Param)('specialization')),
    __param(1, (0, common_1.Query)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findBySpecialization", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить преподавателя по ID',
        description: 'Возвращает информацию о конкретном преподавателе'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Информация о преподавателе получена'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить преподавателя',
        description: 'Обновляет информацию о преподавателе. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Преподаватель успешно обновлен'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для обновления преподавателя'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teacher_dto_1.UpdateTeacherDto, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить преподавателя',
        description: 'Удаляет преподавателя из системы. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Преподаватель успешно удален'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для удаления преподавателя'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/courses/:courseId'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить курс преподавателю',
        description: 'Добавляет курс в список курсов преподавателя. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439013' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Курс успешно добавлен преподавателю'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Delete)(':id/courses/:courseId'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать курс у преподавателя',
        description: 'Убирает курс из списка курсов преподавателя. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439013' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Курс успешно убран у преподавателя'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "removeCourse", null);
exports.TeachersController = TeachersController = __decorate([
    (0, swagger_1.ApiTags)('Преподаватели'),
    (0, common_1.Controller)('teachers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [teachers_service_1.TeachersService])
], TeachersController);
//# sourceMappingURL=teachers.controller.js.map