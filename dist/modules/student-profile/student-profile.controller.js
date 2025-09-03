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
exports.StudentProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const student_profile_service_1 = require("./student-profile.service");
const create_student_profile_dto_1 = require("./dto/create-student-profile.dto");
const update_student_profile_dto_1 = require("./dto/update-student-profile.dto");
const add_body_measurements_dto_1 = require("./dto/add-body-measurements.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
const mongoose_1 = require("mongoose");
let StudentProfileController = class StudentProfileController {
    constructor(studentProfileService) {
        this.studentProfileService = studentProfileService;
    }
    create(createStudentProfileDto, req) {
        createStudentProfileDto.userId = req.user.id;
        return this.studentProfileService.create(createStudentProfileDto);
    }
    findAll(paginationDto, hasCompletedQuiz, experienceLevel, primaryGoal) {
        return this.studentProfileService.findAll(paginationDto, hasCompletedQuiz, experienceLevel, primaryGoal);
    }
    getMyProfile(req) {
        return this.studentProfileService.findByUserId(req.user.id);
    }
    getStudentsByGoal(goal) {
        return this.studentProfileService.getStudentsByGoal(goal);
    }
    getStudentsByExperienceLevel(level) {
        return this.studentProfileService.getStudentsByExperienceLevel(level);
    }
    findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.findOne(id);
    }
    update(id, updateStudentProfileDto, req) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        updateStudentProfileDto.metadata = {
            ...updateStudentProfileDto.metadata,
            updatedBy: req.user.id
        };
        return this.studentProfileService.update(id, updateStudentProfileDto);
    }
    remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.remove(id);
    }
    addBodyMeasurements(id, measurementsDto, req) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        measurementsDto.metadata = {
            ...measurementsDto.metadata,
            updatedBy: req.user.id
        };
        return this.studentProfileService.addBodyMeasurements(id, measurementsDto);
    }
    getBodyMeasurementsHistory(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.getBodyMeasurementsHistory(id);
    }
    getProgressStats(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.getProgressStats(id);
    }
    updateFitnessGoals(id, goalsUpdate) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.updateFitnessGoals(id, goalsUpdate);
    }
    markQuizCompleted(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.markQuizCompleted(id);
    }
    addAchievement(id, body) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        return this.studentProfileService.addAchievement(id, body.achievement);
    }
    enrollInFitnessCourse(id, courseId) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}`);
        }
        return this.studentProfileService.enrollInFitnessCourse(id, courseId);
    }
    unenrollFromFitnessCourse(id, courseId) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID профиля: ${id}`);
        }
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}`);
        }
        return this.studentProfileService.unenrollFromFitnessCourse(id, courseId);
    }
};
exports.StudentProfileController = StudentProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать профиль студента',
        description: 'Создает профиль студента с целями фитнеса и начальными измерениями. Автоматически отмечает квиз как завершенный.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Профиль студента успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                userId: {
                    _id: '507f1f77bcf86cd799439012',
                    firstName: 'Иван',
                    lastName: 'Петров',
                    email: 'ivan@example.com'
                },
                fitnessGoals: {
                    primaryGoal: 'weight_loss',
                    targetWeight: 65,
                    activityLevel: 'moderate',
                    experienceLevel: 'beginner'
                },
                hasCompletedInitialQuiz: true,
                quizCompletedAt: '2024-01-15T10:30:00.000Z',
                createdAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или профиль уже существует' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_profile_dto_1.CreateStudentProfileDto, Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список профилей студентов',
        description: 'Возвращает список профилей студентов с пагинацией и фильтрацией. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество записей на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'hasCompletedQuiz', required: false, description: 'Фильтр по завершенному квизу', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'experienceLevel', required: false, description: 'Фильтр по уровню опыта', example: 'beginner' }),
    (0, swagger_1.ApiQuery)({ name: 'primaryGoal', required: false, description: 'Фильтр по основной цели', example: 'weight_loss' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список профилей получен',
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
                        fitnessGoals: {
                            primaryGoal: 'weight_loss',
                            experienceLevel: 'beginner'
                        },
                        hasCompletedInitialQuiz: true
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
    __param(1, (0, common_1.Query)('hasCompletedQuiz')),
    __param(2, (0, common_1.Query)('experienceLevel')),
    __param(3, (0, common_1.Query)('primaryGoal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, String, String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить мой профиль',
        description: 'Возвращает профиль текущего пользователя.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Профиль пользователя получен',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                userId: '507f1f77bcf86cd799439012',
                fitnessGoals: {
                    primaryGoal: 'weight_loss',
                    targetWeight: 65,
                    activityLevel: 'moderate',
                    experienceLevel: 'beginner'
                },
                currentMeasurements: {
                    weight: 70,
                    height: 175,
                    bodyFat: 20
                },
                hasCompletedInitialQuiz: true
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)('by-goal/:goal'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить студентов по цели',
        description: 'Возвращает список студентов с определенной основной целью. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'goal', description: 'Основная цель', example: 'weight_loss' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список студентов по цели получен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Param)('goal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "getStudentsByGoal", null);
__decorate([
    (0, common_1.Get)('by-experience/:level'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить студентов по уровню опыта',
        description: 'Возвращает список студентов с определенным уровнем опыта. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'level', description: 'Уровень опыта', example: 'beginner' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список студентов по уровню опыта получен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Param)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "getStudentsByExperienceLevel", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить профиль по ID',
        description: 'Возвращает детальную информацию о профиле студента. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль найден' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить профиль студента',
        description: 'Обновляет профиль студента. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль успешно обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления профиля' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_profile_dto_1.UpdateStudentProfileDto, Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить профиль студента',
        description: 'Удаляет профиль студента. Требует права MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления профиля' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/measurements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить измерения тела',
        description: 'Добавляет новые измерения тела к профилю студента.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Измерения успешно добавлены' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_body_measurements_dto_1.AddBodyMeasurementsDto, Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "addBodyMeasurements", null);
__decorate([
    (0, common_1.Get)(':id/measurements/history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить историю измерений',
        description: 'Возвращает историю всех измерений тела студента.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'История измерений получена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "getBodyMeasurementsHistory", null);
__decorate([
    (0, common_1.Get)(':id/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить статистику прогресса',
        description: 'Возвращает детальную статистику прогресса студента на основе измерений.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Статистика прогресса получена',
        schema: {
            example: {
                hasProgress: true,
                period: {
                    start: '2024-01-01T00:00:00.000Z',
                    end: '2024-01-15T00:00:00.000Z',
                    days: 14
                },
                weight: {
                    start: 75,
                    current: 72,
                    change: -3,
                    changePercent: '-4.00'
                },
                bodyFat: {
                    start: 20,
                    current: 18,
                    change: -2,
                    changePercent: '-10.00'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "getProgressStats", null);
__decorate([
    (0, common_1.Patch)(':id/fitness-goals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить цели фитнеса',
        description: 'Обновляет цели фитнеса студента.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Цели фитнеса успешно обновлены' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "updateFitnessGoals", null);
__decorate([
    (0, common_1.Post)(':id/complete-quiz'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Отметить квиз как завершенный',
        description: 'Отмечает начальный квиз как завершенный.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Квиз отмечен как завершенный' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "markQuizCompleted", null);
__decorate([
    (0, common_1.Post)(':id/achievements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить достижение',
        description: 'Добавляет достижение студенту. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Достижение успешно добавлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "addAchievement", null);
__decorate([
    (0, common_1.Post)(':id/enroll/:courseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Записать студента на фитнес-курс',
        description: 'Записывает студента на фитнес-курс. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Студент успешно записан на курс' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля или курса' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "enrollInFitnessCourse", null);
__decorate([
    (0, common_1.Delete)(':id/enroll/:courseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Отписать студента от фитнес-курса',
        description: 'Отписывает студента от фитнес-курса. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Студент успешно отписан от курса' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID профиля или курса' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Профиль не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StudentProfileController.prototype, "unenrollFromFitnessCourse", null);
exports.StudentProfileController = StudentProfileController = __decorate([
    (0, swagger_1.ApiTags)('student-profile'),
    (0, common_1.Controller)('student-profile'),
    __metadata("design:paramtypes", [student_profile_service_1.StudentProfileService])
], StudentProfileController);
//# sourceMappingURL=student-profile.controller.js.map