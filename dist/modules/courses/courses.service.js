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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./schemas/course.schema");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async create(createCourseDto, authorId, companyId) {
        const existingCourse = await this.courseModel.findOne({
            slug: createCourseDto.slug,
            companyId: new mongoose_2.Types.ObjectId(companyId),
        });
        if (existingCourse) {
            throw new common_1.ConflictException('Курс с таким slug уже существует в этой компании');
        }
        const course = new this.courseModel({
            ...createCourseDto,
            authorId: new mongoose_2.Types.ObjectId(authorId),
            companyId: new mongoose_2.Types.ObjectId(companyId),
        });
        return course.save();
    }
    async findAll(paginationDto = {}, companyId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        const [courses, total] = await Promise.all([
            this.courseModel
                .find(filter)
                .populate('authorId', 'firstName lastName email')
                .populate('companyId', 'name slug')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.courseModel.countDocuments(filter),
        ]);
        return {
            data: courses,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const course = await this.courseModel
            .findById(id)
            .populate('authorId', 'firstName lastName email')
            .populate('companyId', 'name slug')
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        return course;
    }
    async findBySlug(slug, companyId) {
        const course = await this.courseModel
            .findOne({ slug, companyId: new mongoose_2.Types.ObjectId(companyId) })
            .populate('authorId', 'firstName lastName email')
            .populate('companyId', 'name slug')
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.courseModel
            .findByIdAndUpdate(id, updateCourseDto, { new: true })
            .populate('authorId', 'firstName lastName email')
            .populate('companyId', 'name slug')
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        return course;
    }
    async remove(id) {
        const result = await this.courseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Курс не найден');
        }
    }
    async findByCompany(companyId) {
        return this.courseModel
            .find({ companyId: new mongoose_2.Types.ObjectId(companyId) })
            .populate('authorId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findPublished(companyId) {
        const filter = { isPublished: true };
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        return this.courseModel
            .find(filter)
            .populate('authorId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map