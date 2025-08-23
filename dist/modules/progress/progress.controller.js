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
exports.UserProgressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const types_1 = require("../../common/types");
let UserProgressController = class UserProgressController {
    constructor() { }
    create(createProgressDto, req) {
        return { message: 'Прогресс создан', data: createProgressDto };
    }
    findAll(paginationDto, req) {
        return { message: 'Прогресс пользователя', data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
    }
    findOne(id, req) {
        return { message: 'Прогресс найден', data: { id, progressPercentage: 0 } };
    }
    update(id, updateProgressDto, req) {
        return { message: 'Прогресс обновлен', data: { id, ...updateProgressDto } };
    }
    remove(id) {
        return { message: 'Прогресс удален', data: { id } };
    }
};
exports.UserProgressController = UserProgressController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать запись о прогрессе' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Прогресс успешно создан' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить прогресс пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Прогресс получен' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить прогресс по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Прогресс найден' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Прогресс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить прогресс' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Прогресс успешно обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Прогресс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить прогресс' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Прогресс успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Прогресс не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProgressController.prototype, "remove", null);
exports.UserProgressController = UserProgressController = __decorate([
    (0, swagger_1.ApiTags)('user-progress'),
    (0, common_1.Controller)('user-progress'),
    __metadata("design:paramtypes", [])
], UserProgressController);
//# sourceMappingURL=progress.controller.js.map