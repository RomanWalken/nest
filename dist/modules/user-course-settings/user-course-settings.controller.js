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
exports.UserCourseSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_course_settings_service_1 = require("./user-course-settings.service");
const create_user_course_settings_dto_1 = require("./dto/create-user-course-settings.dto");
const update_user_course_settings_dto_1 = require("./dto/update-user-course-settings.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
const mongoose_1 = require("mongoose");
let UserCourseSettingsController = class UserCourseSettingsController {
    constructor(userCourseSettingsService) {
        this.userCourseSettingsService = userCourseSettingsService;
    }
    create(createUserCourseSettingsDto, req) {
        createUserCourseSettingsDto.createdBy = req.user.id;
        return this.userCourseSettingsService.create(createUserCourseSettingsDto);
    }
    findAll(paginationDto, courseId, userId, isActive) {
        return this.userCourseSettingsService.findAll(paginationDto, courseId, userId, isActive);
    }
    getMySettings(courseId, req) {
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}`);
        }
        return this.userCourseSettingsService.getMergedSettings(req.user.id, courseId);
    }
    findByCourse(courseId) {
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}`);
        }
        return this.userCourseSettingsService.findByCourse(courseId);
    }
    findByUser(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException(`Невалидный ID пользователя: ${userId}`);
        }
        return this.userCourseSettingsService.findByUser(userId);
    }
    findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID настроек: ${id}`);
        }
        return this.userCourseSettingsService.findOne(id);
    }
    update(id, updateUserCourseSettingsDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID настроек: ${id}`);
        }
        return this.userCourseSettingsService.update(id, updateUserCourseSettingsDto);
    }
    remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID настроек: ${id}`);
        }
        return this.userCourseSettingsService.remove(id);
    }
    addWorkoutOverride(id, workoutOverride) {
        return this.userCourseSettingsService.addWorkoutOverride(id, workoutOverride);
    }
    updateWorkoutOverride(id, workoutId, updateData) {
        return this.userCourseSettingsService.updateWorkoutOverride(id, workoutId, updateData);
    }
    removeWorkoutOverride(id, workoutId) {
        return this.userCourseSettingsService.removeWorkoutOverride(id, workoutId);
    }
    addExerciseOverride(id, exerciseOverride) {
        return this.userCourseSettingsService.addExerciseOverride(id, exerciseOverride);
    }
    updateExerciseOverride(id, exerciseId, updateData) {
        return this.userCourseSettingsService.updateExerciseOverride(id, exerciseId, updateData);
    }
    removeExerciseOverride(id, exerciseId) {
        return this.userCourseSettingsService.removeExerciseOverride(id, exerciseId);
    }
    addLessonOverride(id, lessonOverride) {
        return this.userCourseSettingsService.addLessonOverride(id, lessonOverride);
    }
    updateLessonOverride(id, lessonId, updateData) {
        return this.userCourseSettingsService.updateLessonOverride(id, lessonId, updateData);
    }
    removeLessonOverride(id, lessonId) {
        return this.userCourseSettingsService.removeLessonOverride(id, lessonId);
    }
};
exports.UserCourseSettingsController = UserCourseSettingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать персональные настройки курса для студента',
        description: 'Создает индивидуальные настройки курса для конкретного студента. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Настройки успешно созданы',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                userId: {
                    _id: '507f1f77bcf86cd799439012',
                    firstName: 'Иван',
                    lastName: 'Петров',
                    email: 'ivan@example.com'
                },
                courseId: {
                    _id: '507f1f77bcf86cd799439013',
                    title: 'Основы фитнеса',
                    slug: 'osnovy-fitnesa',
                    kind: 'fitness'
                },
                isActive: true,
                workoutOverrides: [],
                exerciseOverrides: [],
                lessonOverrides: [],
                courseSettings: {
                    difficulty: 'beginner',
                    pace: 'normal',
                    notifications: true,
                    reminders: true
                },
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или настройки уже существуют' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для создания настроек' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_course_settings_dto_1.CreateUserCourseSettingsDto, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список персональных настроек',
        description: 'Возвращает список персональных настроек курсов с пагинацией и фильтрацией. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество записей на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, description: 'ID пользователя для фильтрации', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Фильтр по активным настройкам', example: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список настроек получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        userId: {
                            _id: '507f1f77bcf86cd799439012',
                            firstName: 'Иван',
                            lastName: 'Петров',
                            email: 'ivan@example.com'
                        },
                        courseId: {
                            _id: '507f1f77bcf86cd799439013',
                            title: 'Основы фитнеса',
                            slug: 'osnovy-fitnesa'
                        },
                        isActive: true,
                        lastModified: '2024-01-15T10:30:00.000Z'
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
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-settings/:courseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить мои настройки для курса',
        description: 'Возвращает персональные настройки текущего пользователя для указанного курса.'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Настройки пользователя получены',
        schema: {
            example: {
                hasPersonalSettings: true,
                settings: {
                    _id: '507f1f77bcf86cd799439011',
                    userId: '507f1f77bcf86cd799439012',
                    courseId: '507f1f77bcf86cd799439013',
                    isActive: true,
                    workoutOverrides: [],
                    exerciseOverrides: [],
                    lessonOverrides: [],
                    courseSettings: {
                        difficulty: 'beginner',
                        pace: 'normal'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID курса' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "getMySettings", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить настройки всех студентов курса',
        description: 'Возвращает персональные настройки всех студентов для указанного курса. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список настроек студентов курса получен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID курса' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить настройки студента по всем курсам',
        description: 'Возвращает персональные настройки указанного студента по всем курсам. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID пользователя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список настроек студента получен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить настройки по ID',
        description: 'Возвращает детальную информацию о персональных настройках. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Настройки найдены' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить персональные настройки',
        description: 'Обновляет персональные настройки курса для студента. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Настройки успешно обновлены' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления настроек' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_course_settings_dto_1.UpdateUserCourseSettingsDto]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить персональные настройки',
        description: 'Удаляет персональные настройки курса для студента. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Настройки успешно удалены' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления настроек' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/workout-overrides'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить переопределение тренировки',
        description: 'Добавляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение тренировки успешно добавлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "addWorkoutOverride", null);
__decorate([
    (0, common_1.Patch)(':id/workout-overrides/:workoutId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить переопределение тренировки',
        description: 'Обновляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'workoutId', description: 'ID тренировки', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение тренировки успешно обновлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки или переопределение не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('workoutId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "updateWorkoutOverride", null);
__decorate([
    (0, common_1.Delete)(':id/workout-overrides/:workoutId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить переопределение тренировки',
        description: 'Удаляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'workoutId', description: 'ID тренировки', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение тренировки успешно удалено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('workoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "removeWorkoutOverride", null);
__decorate([
    (0, common_1.Post)(':id/exercise-overrides'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить переопределение упражнения',
        description: 'Добавляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение упражнения успешно добавлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "addExerciseOverride", null);
__decorate([
    (0, common_1.Patch)(':id/exercise-overrides/:exerciseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить переопределение упражнения',
        description: 'Обновляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение упражнения успешно обновлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки или переопределение не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "updateExerciseOverride", null);
__decorate([
    (0, common_1.Delete)(':id/exercise-overrides/:exerciseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить переопределение упражнения',
        description: 'Удаляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение упражнения успешно удалено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "removeExerciseOverride", null);
__decorate([
    (0, common_1.Post)(':id/lesson-overrides'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить переопределение урока',
        description: 'Добавляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение урока успешно добавлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "addLessonOverride", null);
__decorate([
    (0, common_1.Patch)(':id/lesson-overrides/:lessonId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить переопределение урока',
        description: 'Обновляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'lessonId', description: 'ID урока', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение урока успешно обновлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или урока' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки или переопределение не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "updateLessonOverride", null);
__decorate([
    (0, common_1.Delete)(':id/lesson-overrides/:lessonId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить переопределение урока',
        description: 'Удаляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'lessonId', description: 'ID урока', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Переопределение урока успешно удалено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID настроек или урока' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Настройки не найдены' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserCourseSettingsController.prototype, "removeLessonOverride", null);
exports.UserCourseSettingsController = UserCourseSettingsController = __decorate([
    (0, swagger_1.ApiTags)('user-course-settings'),
    (0, common_1.Controller)('user-course-settings'),
    __metadata("design:paramtypes", [user_course_settings_service_1.UserCourseSettingsService])
], UserCourseSettingsController);
//# sourceMappingURL=user-course-settings.controller.js.map