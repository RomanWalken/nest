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
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exercises_service_1 = require("./exercises.service");
const create_exercise_dto_1 = require("./dto/create-exercise.dto");
const update_exercise_dto_1 = require("./dto/update-exercise.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
const mongoose_1 = require("mongoose");
let ExercisesController = class ExercisesController {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    create(createExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }
    findAll(paginationDto, targetMuscles, equipment, customUserId) {
        const targetMusclesArray = targetMuscles ? targetMuscles.split(',') : undefined;
        const equipmentArray = equipment ? equipment.split(',') : undefined;
        return this.exercisesService.findAll(paginationDto, targetMusclesArray, equipmentArray, customUserId);
    }
    getAvailableTargetMuscles() {
        return this.exercisesService.getAvailableTargetMuscles();
    }
    findByTargetMuscles(muscles) {
        const musclesArray = muscles.split(',');
        return this.exercisesService.findByTargetMuscles(musclesArray);
    }
    findByEquipment(equipmentIds) {
        const equipmentArray = equipmentIds.split(',');
        return this.exercisesService.findByEquipment(equipmentArray);
    }
    findByCustomUser(customUserId) {
        if (!mongoose_1.Types.ObjectId.isValid(customUserId)) {
            throw new common_1.BadRequestException(`Невалидный ID пользователя: ${customUserId}`);
        }
        return this.exercisesService.findByCustomUser(customUserId);
    }
    findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID упражнения: ${id}`);
        }
        return this.exercisesService.findOne(id);
    }
    update(id, updateExerciseDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID упражнения: ${id}`);
        }
        return this.exercisesService.update(id, updateExerciseDto);
    }
    remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID упражнения: ${id}`);
        }
        return this.exercisesService.remove(id);
    }
    addEquipment(id, equipmentId) {
        return this.exercisesService.addEquipment(id, equipmentId);
    }
    removeEquipment(id, equipmentId) {
        return this.exercisesService.removeEquipment(id, equipmentId);
    }
    addTargetMuscle(id, muscle) {
        return this.exercisesService.addTargetMuscle(id, muscle);
    }
    removeTargetMuscle(id, muscle) {
        return this.exercisesService.removeTargetMuscle(id, muscle);
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новое упражнение',
        description: 'Создает новое упражнение для фитнес-курсов. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Упражнение успешно создано',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Приседания с собственным весом',
                description: 'Базовое упражнение для развития мышц ног',
                repetitions: 15,
                sets: 3,
                duration: 30,
                restTime: 60,
                targetMuscles: ['квадрицепсы', 'ягодичные мышцы'],
                equipment: [],
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или валидация не пройдена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для создания упражнения' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_dto_1.CreateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список упражнений',
        description: 'Возвращает список упражнений с пагинацией. Поддерживает фильтрацию по целевым мышцам, оборудованию и пользователю.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество упражнений на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'targetMuscles', required: false, description: 'Фильтр по целевым мышцам', example: 'квадрицепсы,ягодичные мышцы' }),
    (0, swagger_1.ApiQuery)({ name: 'equipment', required: false, description: 'Фильтр по оборудованию (ID через запятую)', example: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiQuery)({ name: 'customUserId', required: false, description: 'Фильтр по пользовательским упражнениям', example: '507f1f77bcf86cd799439013' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список упражнений получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        title: 'Приседания с собственным весом',
                        repetitions: 15,
                        sets: 3,
                        targetMuscles: ['квадрицепсы', 'ягодичные мышцы'],
                        equipment: []
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
    __param(1, (0, common_1.Query)('targetMuscles')),
    __param(2, (0, common_1.Query)('equipment')),
    __param(3, (0, common_1.Query)('customUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('target-muscles'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список доступных целевых мышц',
        description: 'Возвращает список всех уникальных целевых мышц из упражнений.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список целевых мышц получен',
        schema: {
            example: ['квадрицепсы', 'ягодичные мышцы', 'икроножные мышцы', 'бицепсы', 'трицепсы']
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getAvailableTargetMuscles", null);
__decorate([
    (0, common_1.Get)('by-target-muscles'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить упражнения по целевым мышцам',
        description: 'Возвращает упражнения, которые тренируют указанные мышцы.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'muscles', required: true, description: 'Целевые мышцы через запятую', example: 'квадрицепсы,ягодичные мышцы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список упражнений по целевым мышцам получен' }),
    __param(0, (0, common_1.Query)('muscles')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findByTargetMuscles", null);
__decorate([
    (0, common_1.Get)('by-equipment'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить упражнения по оборудованию',
        description: 'Возвращает упражнения, которые используют указанное оборудование.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'equipmentIds', required: true, description: 'ID оборудования через запятую', example: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список упражнений по оборудованию получен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID оборудования' }),
    __param(0, (0, common_1.Query)('equipmentIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findByEquipment", null);
__decorate([
    (0, common_1.Get)('custom/:customUserId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить пользовательские упражнения',
        description: 'Возвращает упражнения, созданные для конкретного пользователя.'
    }),
    (0, swagger_1.ApiParam)({ name: 'customUserId', description: 'ID пользователя', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список пользовательских упражнений получен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID пользователя' }),
    __param(0, (0, common_1.Param)('customUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findByCustomUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить упражнение по ID',
        description: 'Возвращает детальную информацию об упражнении, включая оборудование.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Упражнение найдено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить упражнение',
        description: 'Обновляет информацию об упражнении. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Упражнение успешно обновлено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exercise_dto_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить упражнение',
        description: 'Удаляет упражнение. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Упражнение успешно удалено' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/equipment/:equipmentId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить оборудование к упражнению',
        description: 'Добавляет оборудование к упражнению. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'equipmentId', description: 'ID оборудования', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Оборудование успешно добавлено к упражнению' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения или оборудования' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('equipmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "addEquipment", null);
__decorate([
    (0, common_1.Delete)(':id/equipment/:equipmentId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать оборудование из упражнения',
        description: 'Убирает оборудование из упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'equipmentId', description: 'ID оборудования', example: '507f1f77bcf86cd799439012' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Оборудование успешно убрано из упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения или оборудования' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('equipmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "removeEquipment", null);
__decorate([
    (0, common_1.Post)(':id/target-muscles/:muscle'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавить целевую мышцу к упражнению',
        description: 'Добавляет целевую мышцу к упражнению. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'muscle', description: 'Название целевой мышцы', example: 'квадрицепсы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Целевая мышца успешно добавлена к упражнению' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('muscle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "addTargetMuscle", null);
__decorate([
    (0, common_1.Delete)(':id/target-muscles/:muscle'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.TEACHER, types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Убрать целевую мышцу из упражнения',
        description: 'Убирает целевую мышцу из упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiParam)({ name: 'muscle', description: 'Название целевой мышцы', example: 'квадрицепсы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Целевая мышца успешно убрана из упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невалидный ID упражнения' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Упражнение не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('muscle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "removeTargetMuscle", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, swagger_1.ApiTags)('exercises'),
    (0, common_1.Controller)('exercises'),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map