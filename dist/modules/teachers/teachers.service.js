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
            companyId: createTeacherDto.companyId,
        });
        if (existingTeacher) {
            throw new common_1.BadRequestException('Преподаватель с таким email уже существует в данной компании');
        }
        const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);
        const createdTeacher = new this.teacherModel({
            ...createTeacherDto,
            password: hashedPassword,
            role: 'teacher',
        });
        return createdTeacher.save();
    }
    async findAll(query, userCompanyId) {
        const { page = 1, limit = 10, search, specialization, skills, companyId, isActive, languages } = query;
        const skip = (page - 1) * limit;
        const filter = {};
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        else if (companyId) {
            filter.companyId = companyId;
        }
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
                .populate('companyId', 'name')
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
    async findOne(id, userCompanyId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Неверный формат ID');
        }
        const filter = { _id: id };
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        const teacher = await this.teacherModel
            .findOne(filter)
            .populate('companyId', 'name')
            .populate('courses', 'title description')
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        return teacher;
    }
    async update(id, updateTeacherDto, userCompanyId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Неверный формат ID');
        }
        const filter = { _id: id };
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        const existingTeacher = await this.teacherModel.findOne(filter);
        if (!existingTeacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        if (updateTeacherDto.email && updateTeacherDto.email !== existingTeacher.email) {
            const emailExists = await this.teacherModel.findOne({
                email: updateTeacherDto.email,
                companyId: existingTeacher.companyId,
                _id: { $ne: id },
            });
            if (emailExists) {
                throw new common_1.BadRequestException('Преподаватель с таким email уже существует в данной компании');
            }
        }
        if (updateTeacherDto.password) {
            updateTeacherDto.password = await bcrypt.hash(updateTeacherDto.password, 10);
        }
        const updatedTeacher = await this.teacherModel
            .findByIdAndUpdate(id, updateTeacherDto, { new: true })
            .populate('companyId', 'name')
            .populate('courses', 'title')
            .exec();
        return updatedTeacher;
    }
    async remove(id, userCompanyId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Неверный формат ID');
        }
        const filter = { _id: id };
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        const result = await this.teacherModel.deleteOne(filter);
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
    }
    async findByCompany(companyId) {
        return this.teacherModel
            .find({ companyId, isActive: true })
            .select('firstName lastName specialization skills experience')
            .exec();
    }
    async findBySpecialization(specialization, companyId) {
        const filter = {
            specialization: { $regex: specialization, $options: 'i' },
            isActive: true
        };
        if (companyId) {
            filter.companyId = companyId;
        }
        return this.teacherModel
            .find(filter)
            .select('firstName lastName specialization skills experience bio')
            .exec();
    }
    async addCourse(teacherId, courseId, userCompanyId) {
        if (!mongoose_2.Types.ObjectId.isValid(teacherId) || !mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Неверный формат ID');
        }
        const filter = { _id: teacherId };
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        const teacher = await this.teacherModel.findOne(filter);
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        if (!teacher.courses.includes(new mongoose_2.Types.ObjectId(courseId))) {
            teacher.courses.push(new mongoose_2.Types.ObjectId(courseId));
            return teacher.save();
        }
        return teacher;
    }
    async removeCourse(teacherId, courseId, userCompanyId) {
        if (!mongoose_2.Types.ObjectId.isValid(teacherId) || !mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Неверный формат ID');
        }
        const filter = { _id: teacherId };
        if (userCompanyId) {
            filter.companyId = userCompanyId;
        }
        const teacher = await this.teacherModel.findOne(filter);
        if (!teacher) {
            throw new common_1.NotFoundException('Преподаватель не найден');
        }
        teacher.courses = teacher.courses.filter(id => id.toString() !== courseId);
        return teacher.save();
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map