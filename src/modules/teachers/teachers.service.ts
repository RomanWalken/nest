import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { PaginatedResponse } from '@/common/types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // Проверяем, существует ли уже преподаватель с таким email в компании
    const existingTeacher = await this.teacherModel.findOne({
      email: createTeacherDto.email,
      companyId: createTeacherDto.companyId,
    });

    if (existingTeacher) {
      throw new BadRequestException('Преподаватель с таким email уже существует в данной компании');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

    const createdTeacher = new this.teacherModel({
      ...createTeacherDto,
      password: hashedPassword,
      role: 'teacher',
    });

    return createdTeacher.save();
  }

  async findAll(query: QueryTeacherDto, userCompanyId?: string): Promise<PaginatedResponse<Teacher>> {
    const { page = 1, limit = 10, search, specialization, skills, companyId, isActive, languages } = query;
    const skip = (page - 1) * limit;

    // Строим фильтр
    const filter: any = {};

    // Если пользователь не админ, показываем только преподавателей его компании
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    } else if (companyId) {
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

  async findOne(id: string, userCompanyId?: string): Promise<Teacher> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Неверный формат ID');
    }

    const filter: any = { _id: id };
    
    // Если пользователь не админ, проверяем компанию
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    }

    const teacher = await this.teacherModel
      .findOne(filter)
      .populate('companyId', 'name')
      .populate('courses', 'title description')
      .exec();

    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto, userCompanyId?: string): Promise<Teacher> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Неверный формат ID');
    }

    const filter: any = { _id: id };
    
    // Если пользователь не админ, проверяем компанию
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    }

    const existingTeacher = await this.teacherModel.findOne(filter);
    if (!existingTeacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    // Если обновляется email, проверяем уникальность в рамках компании
    if (updateTeacherDto.email && updateTeacherDto.email !== existingTeacher.email) {
      const emailExists = await this.teacherModel.findOne({
        email: updateTeacherDto.email,
        companyId: existingTeacher.companyId,
        _id: { $ne: id },
      });

      if (emailExists) {
        throw new BadRequestException('Преподаватель с таким email уже существует в данной компании');
      }
    }

    // Если обновляется пароль, хешируем его
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

  async remove(id: string, userCompanyId?: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Неверный формат ID');
    }

    const filter: any = { _id: id };
    
    // Если пользователь не админ, проверяем компанию
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    }

    const result = await this.teacherModel.deleteOne(filter);
    
    if (result.deletedCount === 0) {
      throw new NotFoundException('Преподаватель не найден');
    }
  }

  async findByCompany(companyId: string): Promise<Teacher[]> {
    return this.teacherModel
      .find({ companyId, isActive: true })
      .select('firstName lastName specialization skills experience')
      .exec();
  }

  async findBySpecialization(specialization: string, companyId?: string): Promise<Teacher[]> {
    const filter: any = { 
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

  async addCourse(teacherId: string, courseId: string, userCompanyId?: string): Promise<Teacher> {
    if (!Types.ObjectId.isValid(teacherId) || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Неверный формат ID');
    }

    const filter: any = { _id: teacherId };
    
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    }

    const teacher = await this.teacherModel.findOne(filter);
    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    if (!teacher.courses.includes(new Types.ObjectId(courseId))) {
      teacher.courses.push(new Types.ObjectId(courseId));
      return teacher.save();
    }

    return teacher;
  }

  async removeCourse(teacherId: string, courseId: string, userCompanyId?: string): Promise<Teacher> {
    if (!Types.ObjectId.isValid(teacherId) || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Неверный формат ID');
    }

    const filter: any = { _id: teacherId };
    
    if (userCompanyId) {
      filter.companyId = userCompanyId;
    }

    const teacher = await this.teacherModel.findOne(filter);
    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    teacher.courses = teacher.courses.filter(id => id.toString() !== courseId);
    return teacher.save();
  }
}
