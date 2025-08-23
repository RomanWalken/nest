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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    create(createCourseDto, req) {
        return this.coursesService.create(createCourseDto, req.user.id, req.user.companyId);
    }
    findAll(paginationDto, req) {
        const companyId = req.user?.companyId;
        return this.coursesService.findAll(paginationDto, companyId);
    }
    findPublished(req) {
        const companyId = req.user?.companyId;
        return this.coursesService.findPublished(companyId);
    }
    findOne(id) {
        return this.coursesService.findOne(id);
    }
    update(id, updateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }
    remove(id) {
        return this.coursesService.remove(id);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый курс',
        description: 'Создает новый курс в системе. Доступно только модераторам, администраторам и супер-администраторам. Курс создается в рамках компании пользователя.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Курс успешно создан',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Основы фитнеса для начинающих',
                slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                description: 'Комплексный курс по фитнесу...',
                type: 'fitness',
                difficulty: 'beginner',
                isPublished: false,
                isFeatured: false,
                companyId: '507f1f77bcf86cd799439012',
                authorId: '507f1f77bcf86cd799439013',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные или валидация не пройдена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для создания курса' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Курс с таким slug уже существует в компании' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список курсов',
        description: 'Возвращает список курсов с пагинацией. Для авторизованных пользователей показываются курсы их компании, для анонимных - только опубликованные курсы.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество курсов на странице (по умолчанию 10)', example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список курсов получен',
        schema: {
            example: {
                data: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        title: 'Основы фитнеса для начинающих',
                        slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                        type: 'fitness',
                        difficulty: 'beginner',
                        isPublished: true,
                        isFeatured: false,
                        authorId: {
                            _id: '507f1f77bcf86cd799439013',
                            firstName: 'Иван',
                            lastName: 'Петров',
                            email: 'ivan.petrov@example.com'
                        },
                        companyId: {
                            _id: '507f1f77bcf86cd799439012',
                            name: 'Fitness Academy Pro',
                            slug: 'fitness-academy-pro'
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
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('published'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список опубликованных курсов',
        description: 'Возвращает только опубликованные курсы. Для авторизованных пользователей показываются курсы их компании, для анонимных - все опубликованные курсы.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список опубликованных курсов получен',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    title: 'Основы фитнеса для начинающих',
                    slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                    type: 'fitness',
                    difficulty: 'beginner',
                    isPublished: true,
                    isFeatured: false
                }
            ]
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findPublished", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить курс по ID',
        description: 'Возвращает полную информацию о курсе по его уникальному идентификатору. Включает данные об авторе и компании.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Курс найден',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Основы фитнеса для начинающих',
                slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                description: 'Комплексный курс по фитнесу...',
                type: 'fitness',
                difficulty: 'beginner',
                isPublished: true,
                isFeatured: false,
                authorId: {
                    _id: '507f1f77bcf86cd799439013',
                    firstName: 'Иван',
                    lastName: 'Петров',
                    email: 'ivan.petrov@example.com'
                },
                companyId: {
                    _id: '507f1f77bcf86cd799439012',
                    name: 'Fitness Academy Pro',
                    slug: 'fitness-academy-pro'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Курс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.MODERATOR, types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить курс',
        description: 'Обновляет существующий курс. Доступно только модераторам, администраторам и супер-администраторам. Можно обновить любые поля курса.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Курс успешно обновлен',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                title: 'Основы фитнеса для начинающих (обновлено)',
                slug: 'osnovy-fitnesa-dlya-nachinayushchih',
                description: 'Обновленное описание курса...',
                isPublished: true
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для обновления курса' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Курс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить курс',
        description: 'Полностью удаляет курс из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Курс успешно удален',
        schema: {
            example: {
                message: 'Курс успешно удален',
                deletedCourseId: '507f1f77bcf86cd799439011'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Недостаточно прав для удаления курса' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Курс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "remove", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('courses'),
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map