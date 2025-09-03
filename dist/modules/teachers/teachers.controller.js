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
    findAll(query) {
        return this.teachersService.findAll(query);
    }
    findOne(id) {
        return this.teachersService.findOne(id);
    }
    update(id, updateTeacherDto) {
        return this.teachersService.update(id, updateTeacherDto);
    }
    remove(id) {
        return this.teachersService.remove(id);
    }
    addCourse(id, courseId) {
        return this.teachersService.addCourse(id, courseId);
    }
    removeCourse(id, courseId) {
        return this.teachersService.removeCourse(id, courseId);
    }
    updatePassword(id, newPassword) {
        return this.teachersService.updatePassword(id, newPassword);
    }
    verifyEmail(id) {
        return this.teachersService.verifyEmail(id);
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
        description: 'Возвращает список преподавателей с пагинацией и фильтрацией.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество элементов на странице', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Поиск по имени, фамилии или email', example: 'Анна' }),
    (0, swagger_1.ApiQuery)({ name: 'specialization', required: false, description: 'Фильтр по специализации', example: 'Фитнес-тренер' }),
    (0, swagger_1.ApiQuery)({ name: 'skills', required: false, description: 'Фильтр по навыкам', example: 'йога,пилатес' }),
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
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_teacher_dto_1.QueryTeacherDto]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить преподавателя по ID',
        description: 'Возвращает информацию о конкретном преподавателе по его ID.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Преподаватель найден',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                firstName: 'Анна',
                lastName: 'Петрова',
                email: 'teacher@example.com',
                specialization: 'Фитнес-тренер',
                skills: ['персональные тренировки', 'групповые занятия', 'йога'],
                experience: 5,
                bio: 'Опытный фитнес-тренер с 5-летним стажем работы',
                languages: ['русский', 'английский'],
                isActive: true,
                courses: [
                    {
                        _id: '507f1f77bcf86cd799439012',
                        title: 'Основы фитнеса для начинающих'
                    }
                ]
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить преподавателя',
        description: 'Обновляет информацию о существующем преподавателе. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Преподаватель успешно обновлен',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                firstName: 'Анна',
                lastName: 'Петрова',
                email: 'teacher@example.com',
                specialization: 'Фитнес-тренер и инструктор по йоге',
                skills: ['персональные тренировки', 'групповые занятия', 'йога', 'пилатес'],
                experience: 6,
                updatedAt: '2024-01-02T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Неверные данные или преподаватель с таким email уже существует'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для обновления преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить преподавателя',
        description: 'Удаляет преподавателя из системы. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Преподаватель успешно удален'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для удаления преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/courses/:courseId'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить курс к преподавателю',
        description: 'Добавляет курс к списку курсов преподавателя. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiParam)({
        name: 'courseId',
        description: 'ID курса (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Курс успешно добавлен к преподавателю'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель или курс не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID или курс уже добавлен'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для выполнения операции'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Delete)(':id/courses/:courseId'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать курс у преподавателя',
        description: 'Убирает курс из списка курсов преподавателя. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiParam)({
        name: 'courseId',
        description: 'ID курса (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Курс успешно убран у преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для выполнения операции'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "removeCourse", null);
__decorate([
    (0, common_1.Patch)(':id/password'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Изменить пароль преподавателя',
        description: 'Изменяет пароль преподавателя. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Пароль успешно изменен'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для изменения пароля'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)(':id/verify-email'),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Подтвердить email преподавателя',
        description: 'Отмечает email преподавателя как подтвержденный. Доступно только администраторам и выше.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID преподавателя (24-символьная hex строка)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Email успешно подтвержден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Преподаватель не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Невалидный ID преподавателя'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Недостаточно прав для подтверждения email'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Пользователь не авторизован'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeachersController.prototype, "verifyEmail", null);
exports.TeachersController = TeachersController = __decorate([
    (0, swagger_1.ApiTags)('Преподаватели'),
    (0, common_1.Controller)('teachers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [teachers_service_1.TeachersService])
], TeachersController);
//# sourceMappingURL=teachers.controller.js.map