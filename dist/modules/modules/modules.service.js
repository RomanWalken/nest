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
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const module_schema_1 = require("./schemas/module.schema");
let ModulesService = class ModulesService {
    constructor(moduleModel) {
        this.moduleModel = moduleModel;
    }
    async create(createModuleDto) {
        const module = new this.moduleModel({
            ...createModuleDto,
            courseId: new mongoose_2.Types.ObjectId(createModuleDto.courseId),
        });
        return module.save();
    }
    async findAll(paginationDto = {}, courseId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (courseId) {
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
        }
        const [modules, total] = await Promise.all([
            this.moduleModel
                .find(filter)
                .populate('courseId', 'title slug')
                .skip(skip)
                .limit(limit)
                .sort({ order: 1 })
                .exec(),
            this.moduleModel.countDocuments(filter),
        ]);
        return {
            data: modules,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const module = await this.moduleModel
            .findById(id)
            .populate('courseId', 'title slug')
            .exec();
        if (!module) {
            throw new common_1.NotFoundException('Модуль не найден');
        }
        return module;
    }
    async findByCourse(courseId) {
        return this.moduleModel
            .find({ courseId: new mongoose_2.Types.ObjectId(courseId) })
            .sort({ order: 1 })
            .exec();
    }
    async update(id, updateModuleDto) {
        const updateData = { ...updateModuleDto };
        if (updateModuleDto.courseId) {
            updateData.courseId = new mongoose_2.Types.ObjectId(updateModuleDto.courseId);
        }
        const module = await this.moduleModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('courseId', 'title slug')
            .exec();
        if (!module) {
            throw new common_1.NotFoundException('Модуль не найден');
        }
        return module;
    }
    async remove(id) {
        const result = await this.moduleModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Модуль не найден');
        }
    }
    async reorderModules(courseId, moduleIds) {
        const updatePromises = moduleIds.map((moduleId, index) => this.moduleModel.findByIdAndUpdate(moduleId, { order: index + 1 }, { new: true }));
        await Promise.all(updatePromises);
        return this.findByCourse(courseId);
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(module_schema_1.Module.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ModulesService);
//# sourceMappingURL=modules.service.js.map