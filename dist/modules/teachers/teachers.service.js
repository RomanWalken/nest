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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const teacher_schema_1 = require("./schemas/teacher.schema");
const bcrypt = require("bcryptjs");
let TeachersService = class TeachersService {
    constructor(teacherModel) {
        this.teacherModel = teacherModel;
    }
    async create(createTeacherDto) {
        const existingTeacher = await this.teacherModel.findOne({
            email: createTeacherDto.email,
        });
        if (existingTeacher) {
            throw new common_1.BadRequestException('Преподаватель с таким email уже существует');
        }
        const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);
        const createdTeacher = new this.teacherModel({
            ...createTeacherDto,
            password: hashedPassword,
            role: 'teacher',
        });
        return createdTeacher.save();
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, specialization, skills, isActive, languages } = query;
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        if (specialization) {
            filter.specialization = { $regex: specialization, $options: 'i' };
        }
        if (skills && skills.length > 0) {
            filter.skills = { $in: skills };
        }
        if (isActive !== undefined) {
            filter.isActive = isActive;
        }
        if (languages && languages.length > 0) {
            filter.languages = { $in: languages };
        }
        const [teachers, total] = await Promise.all([
            this.teacherModel
                .find(filter)
                .populate('courses', 'title')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.teacherModel.countDocuments(filter),
        ]);
        return {
            data: teachers,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        const teacher = await this.teacherModel
            .findById(id)
            .populate('courses', 'title')
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        return teacher;
    }
    async findByEmail(email) {
        return this.teacherModel.findOne({ email }).exec();
    }
    async update(id, updateTeacherDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        if (updateTeacherDto.email) {
            const existingTeacher = await this.teacherModel.findOne({
                email: updateTeacherDto.email,
                _id: { $ne: id },
            });
            if (existingTeacher) {
                throw new common_1.BadRequestException('Преподаватель с таким email уже существует');
            }
        }
        if (updateTeacherDto.password) {
            updateTeacherDto.password = await bcrypt.hash(updateTeacherDto.password, 10);
        }
        const updatedTeacher = await this.teacherModel
            .findByIdAndUpdate(id, updateTeacherDto, { new: true })
            .populate('courses', 'title')
            .exec();
        if (!updatedTeacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        return updatedTeacher;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        const result = await this.teacherModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
    }
    async addCourse(teacherId, courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${teacherId}. ID должен быть 24-символьной hex строкой.`);
        }
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}. ID должен быть 24-символьной hex строкой.`);
        }
        const teacher = await this.teacherModel.findById(teacherId).exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        if (teacher.courses.includes(new mongoose_2.Types.ObjectId(courseId))) {
            throw new common_1.BadRequestException('Курс уже добавлен к преподавателю');
        }
        teacher.courses.push(new mongoose_2.Types.ObjectId(courseId));
        return teacher.save();
    }
    async removeCourse(teacherId, courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${teacherId}. ID должен быть 24-символьной hex строкой.`);
        }
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException(`Невалидный ID курса: ${courseId}. ID должен быть 24-символьной hex строкой.`);
        }
        const teacher = await this.teacherModel.findById(teacherId).exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        teacher.courses = teacher.courses.filter(course => course.toString() !== courseId);
        return teacher.save();
    }
    async updatePassword(id, newPassword) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await this.teacherModel.findByIdAndUpdate(id, {
            password: hashedPassword,
        }).exec();
        if (!result) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
    }
    async verifyEmail(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        const result = await this.teacherModel.findByIdAndUpdate(id, {
            emailVerified: true,
        }).exec();
        if (!result) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
    }
    async updateLastLogin(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
        }
        await this.teacherModel.findByIdAndUpdate(id, {
            lastLogin: new Date(),
        }).exec();
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map