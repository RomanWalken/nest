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
exports.WorkoutsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workouts_service_1 = require("./workouts.service");
const create_workout_dto_1 = require("./dto/create-workout.dto");
const update_workout_dto_1 = require("./dto/update-workout.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
const mongoose_1 = require("mongoose");
let WorkoutsController = class WorkoutsController {
    constructor(workoutsService) {
        this.workoutsService = workoutsService;
    }
    create(createWorkoutDto) {
        return this.workoutsService.create(createWorkoutDto);
    }
    findAll(paginationDto, courseId, isFree) {
        return this.workoutsService.findAll(paginationDto, courseId, isFree);
    }
    findByCourse(courseId) {
        if (!mongoose_1.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}`);
        }
        return this.workoutsService.findByCourse(courseId);
    }
    findBySchedule(month, week, day, courseId) {
        return this.workoutsService.findBySchedule(month, week, day, courseId);
    }
    findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID тренировки: ${id}`);
        }
        return this.workoutsService.findOne(id);
    }
    update(id, updateWorkoutDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID тренировки: ${id}`);
        }
        return this.workoutsService.update(id, updateWorkoutDto);
    }
    remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID тренировки: ${id}`);
        }
        return this.workoutsService.remove(id);
    }
    addExercise(id, exerciseId) {
        return this.workoutsService.addExercise(id, exerciseId);
    }
    removeExercise(id, exerciseId) {
        return this.workoutsService.removeExercise(id, exerciseId);
    }
    addTariff(id, tariffId) {
        return this.workoutsService.addTariff(id, tariffId);
    }
    removeTariff(id, tariffId) {
        return this.workoutsService.removeTariff(id, tariffId);
    }
};
exports.WorkoutsController = WorkoutsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новую тренировку',
        description: 'Создает новую тренировку для фитнес-курса. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Тренировка успешно создана',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Кардио тренировка для начинающих',
                description: 'Интенсивная кардио тренировка для сжигания жира',
                duration: 45,
                order: 1,
                isFree: false,
                courseId: '507f1f77bcf86cd799439012',
                month: 1,
                week: 1,
                day: 1,
                exercises: [],
                tariffs: [],
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или валидация не пройдена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для создания тренировки' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_dto_1.CreateWorkoutDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список тренировок',
        description: 'Возвращает список тренировок с пагинацией. Поддерживает фильтрацию по курсу и статусу бесплатности.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество тренировок на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiQuery)({ name: 'isFree', required: false, description: 'Фильтр по бесплатным тренировкам', example: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список тренировок получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        title: 'Кардио тренировка для начинающих',
                        duration: 45,
                        order: 1,
                        isFree: false,
                        courseId: {
                            _id: '507f1f77bcf86cd799439012',
                            title: 'Основы фитнеса',
                            slug: 'osnovy-fitnesa'
                        },
                        exercises: [],
                        tariffs: []
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
    __param(2, (0, common_1.Query)('isFree')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить тренировки по курсу',
        description: 'Возвращает все тренировки для указанного курса, отсортированные по порядку.'
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список тренировок курса получен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID курса' }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)('schedule'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить тренировки по расписанию',
        description: 'Возвращает тренировки для указанной даты (месяц, неделя, день).'
    }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true, description: 'Месяц (1-12)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'week', required: true, description: 'Неделя в месяце (1-5)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'day', required: true, description: 'День недели (1-7)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список тренировок по расписанию получен' }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('week')),
    __param(2, (0, common_1.Query)('day')),
    __param(3, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findBySchedule", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить тренировку по ID',
        description: 'Возвращает детальную информацию о тренировке, включая упражнения и тарифы.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Тренировка найдена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить тренировку',
        description: 'Обновляет информацию о тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Тренировка успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workout_dto_1.UpdateWorkoutDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить тренировку',
        description: 'Удаляет тренировку. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Тренировка успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/exercises/:exerciseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить упражнение к тренировке',
        description: 'Добавляет упражнение к тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Упражнение успешно добавлено к тренировке' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки или упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "addExercise", null);
__decorate([
    (0, common_1.Delete)(':id/exercises/:exerciseId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать упражнение из тренировки',
        description: 'Убирает упражнение из тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Упражнение успешно убрано из тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки или упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "removeExercise", null);
__decorate([
    (0, common_1.Post)(':id/tariffs/:tariffId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить тариф к тренировке',
        description: 'Добавляет тариф к тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'tariffId', description: 'ID тарифа', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Тариф успешно добавлен к тренировке' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки или тарифа' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('tariffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "addTariff", null);
__decorate([
    (0, common_1.Delete)(':id/tariffs/:tariffId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать тариф из тренировки',
        description: 'Убирает тариф из тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'tariffId', description: 'ID тарифа', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Тариф успешно убран из тренировки' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID тренировки или тарифа' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Тренировка не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('tariffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "removeTariff", null);
exports.WorkoutsController = WorkoutsController = __decorate([
    (0, swagger_1.ApiTags)('workouts'),
    (0, common_1.Controller)('workouts'),
    __metadata("design:paramtypes", [workouts_service_1.WorkoutsService])
], WorkoutsController);
//# sourceMappingURL=workouts.controller.js.map