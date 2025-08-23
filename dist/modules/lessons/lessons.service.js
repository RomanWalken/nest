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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lesson_schema_1 = require("./schemas/lesson.schema");
let LessonsService = class LessonsService {
    constructor(lessonModel) {
        this.lessonModel = lessonModel;
    }
    async create(createLessonDto) {
        const lesson = new this.lessonModel({
            ...createLessonDto,
            moduleId: new mongoose_2.Types.ObjectId(createLessonDto.moduleId),
        });
        return lesson.save();
    }
    async findAll(paginationDto = {}, moduleId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (moduleId) {
            filter.moduleId = new mongoose_2.Types.ObjectId(moduleId);
        }
        const [lessons, total] = await Promise.all([
            this.lessonModel
                .find(filter)
                .populate('moduleId', 'title order')
                .skip(skip)
                .limit(limit)
                .sort({ order: 1 })
                .exec(),
            this.lessonModel.countDocuments(filter),
        ]);
        return {
            data: lessons,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const lesson = await this.lessonModel
            .findById(id)
            .populate('moduleId', 'title order')
            .exec();
        if (!lesson) {
            throw new common_1.NotFoundException('Урок не найден');
        }
        return lesson;
    }
    async findByModule(moduleId) {
        return this.lessonModel
            .find({ moduleId: new mongoose_2.Types.ObjectId(moduleId) })
            .sort({ order: 1 })
            .exec();
    }
    async update(id, updateLessonDto) {
        const updateData = { ...updateLessonDto };
        if (updateLessonDto.moduleId) {
            updateData.moduleId = new mongoose_2.Types.ObjectId(updateLessonDto.moduleId);
        }
        const lesson = await this.lessonModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('moduleId', 'title order')
            .exec();
        if (!lesson) {
            throw new common_1.NotFoundException('Урок не найден');
        }
        return lesson;
    }
    async remove(id) {
        const result = await this.lessonModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Урок не найден');
        }
    }
    async reorderLessons(moduleId, lessonIds) {
        const updatePromises = lessonIds.map((lessonId, index) => this.lessonModel.findByIdAndUpdate(lessonId, { order: index + 1 }, { new: true }));
        await Promise.all(updatePromises);
        return this.findByModule(moduleId);
    }
    async getFreeContent(moduleId) {
        const filter = { isFree: true };
        if (moduleId) {
            filter.moduleId = new mongoose_2.Types.ObjectId(moduleId);
        }
        return this.lessonModel
            .find(filter)
            .populate('moduleId', 'title order')
            .sort({ order: 1 })
            .exec();
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lesson_schema_1.Lesson.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map