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
const types_1 = require("../../common/types");
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
        if (createCourseDto.kind === types_1.CourseKind.FITNESS) {
        }
        else if (createCourseDto.kind === types_1.CourseKind.REGULAR) {
            if (createCourseDto.meals || createCourseDto.teachers || createCourseDto.workouts) {
                throw new common_1.BadRequestException('Обычные курсы не могут содержать meals, teachers и workouts');
            }
        }
        const course = new this.courseModel({
            ...createCourseDto,
            authorId: new mongoose_2.Types.ObjectId(authorId),
            companyId: new mongoose_2.Types.ObjectId(companyId),
        });
        return course.save();
    }
    async findAll(paginationDto = {}, companyId, kind) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        if (kind) {
            filter.kind = kind;
        }
        const [courses, total] = await Promise.all([
            this.courseModel
                .find(filter)
                .populate('authorId', 'firstName lastName email')
                .populate('companyId', 'name slug')
                .populate('meals', 'title calories')
                .populate('teachers', 'firstName lastName specialization')
                .populate('workouts', 'title duration')
                .populate('modules', 'title order')
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
            .populate('meals', 'title calories ingredients')
            .populate('teachers', 'firstName lastName specialization skills')
            .populate('workouts', 'title duration exercises')
            .populate('modules', 'title order')
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
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .populate('modules', 'title order')
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        return course;
    }
    async update(id, updateCourseDto) {
        if (updateCourseDto.kind) {
            const currentCourse = await this.courseModel.findById(id);
            if (!currentCourse) {
                throw new common_1.NotFoundException('Курс не найден');
            }
            if (updateCourseDto.kind === types_1.CourseKind.FITNESS) {
            }
            else if (updateCourseDto.kind === types_1.CourseKind.REGULAR) {
                if (updateCourseDto.meals || updateCourseDto.teachers || updateCourseDto.workouts) {
                    throw new common_1.BadRequestException('Обычные курсы не могут содержать meals, teachers и workouts');
                }
            }
        }
        const course = await this.courseModel
            .findByIdAndUpdate(id, updateCourseDto, { new: true })
            .populate('authorId', 'firstName lastName email')
            .populate('companyId', 'name slug')
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .populate('modules', 'title order')
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
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .populate('modules', 'title order')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findPublished(companyId) {
        const filter = { publicationStatus: 'published' };
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        return this.courseModel
            .find(filter)
            .populate('authorId', 'firstName lastName email')
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .populate('modules', 'title order')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findFitnessCourses(companyId) {
        const filter = { kind: types_1.CourseKind.FITNESS, publicationStatus: 'published' };
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        return this.courseModel
            .find(filter)
            .populate('authorId', 'firstName lastName email')
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findRegularCourses(companyId) {
        const filter = { kind: types_1.CourseKind.REGULAR, publicationStatus: 'published' };
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        return this.courseModel
            .find(filter)
            .populate('authorId', 'firstName lastName email')
            .populate('modules', 'title order')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByCategory(category, companyId) {
        const filter = { category, publicationStatus: 'published' };
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        return this.courseModel
            .find(filter)
            .populate('authorId', 'firstName lastName email')
            .populate('meals', 'title calories')
            .populate('teachers', 'firstName lastName specialization')
            .populate('workouts', 'title duration')
            .populate('modules', 'title order')
            .sort({ createdAt: -1 })
            .exec();
    }
    async addMealToCourse(courseId, mealId) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.kind !== types_1.CourseKind.FITNESS) {
            throw new common_1.BadRequestException('Можно добавлять приемы пищи только к фитнес-курсам');
        }
        if (!course.meals.includes(new mongoose_2.Types.ObjectId(mealId))) {
            course.meals.push(new mongoose_2.Types.ObjectId(mealId));
            return course.save();
        }
        return course;
    }
    async removeMealFromCourse(courseId, mealId) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.kind !== types_1.CourseKind.FITNESS) {
            throw new common_1.BadRequestException('Можно убирать приемы пищи только у фитнес-курсов');
        }
        course.meals = course.meals.filter(id => id.toString() !== mealId);
        return course.save();
    }
    async addTeacherToCourse(courseId, teacherId) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.kind !== types_1.CourseKind.FITNESS) {
            throw new common_1.BadRequestException('Можно добавлять преподавателей только к фитнес-курсам');
        }
        if (!course.teachers.includes(new mongoose_2.Types.ObjectId(teacherId))) {
            course.teachers.push(new mongoose_2.Types.ObjectId(teacherId));
            return course.save();
        }
        return course;
    }
    async removeTeacherFromCourse(courseId, teacherId) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.kind !== types_1.CourseKind.FITNESS) {
            throw new common_1.BadRequestException('Можно убирать преподавателей только у фитнес-курсов');
        }
        course.teachers = course.teachers.filter(id => id.toString() !== teacherId);
        return course.save();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map