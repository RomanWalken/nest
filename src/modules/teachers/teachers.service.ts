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
    // Проверяем, существует ли уже преподаватель с таким email
    const existingTeacher = await this.teacherModel.findOne({
      email: createTeacherDto.email,
    });

    if (existingTeacher) {
      throw new BadRequestException('Преподаватель с таким email уже существует');
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

  async findAll(query: QueryTeacherDto): Promise<PaginatedResponse<Teacher>> {
    const { page = 1, limit = 10, search, specialization, skills, isActive, languages } = query;
    const skip = (page - 1) * limit;

    // Строим фильтр
    const filter: any = {};

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

  async findOne(id: string): Promise<Teacher> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    const teacher = await this.teacherModel
      .findById(id)
      .populate('courses', 'title')
      .exec();

    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    return teacher;
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    return this.teacherModel.findOne({ email }).exec();
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    // Если обновляется email, проверяем уникальность
    if (updateTeacherDto.email) {
      const existingTeacher = await this.teacherModel.findOne({
        email: updateTeacherDto.email,
        _id: { $ne: id },
      });

      if (existingTeacher) {
        throw new BadRequestException('Преподаватель с таким email уже существует');
      }
    }

    // Если обновляется пароль, хешируем его
    if (updateTeacherDto.password) {
      updateTeacherDto.password = await bcrypt.hash(updateTeacherDto.password, 10);
    }

    const updatedTeacher = await this.teacherModel
      .findByIdAndUpdate(id, updateTeacherDto, { new: true })
      .populate('courses', 'title')
      .exec();

    if (!updatedTeacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    return updatedTeacher;
  }

  async remove(id: string): Promise<void> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    const result = await this.teacherModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Преподаватель не найден');
    }
  }

  async addCourse(teacherId: string, courseId: string): Promise<Teacher> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(teacherId)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${teacherId}. ID должен быть 24-символьной hex строкой.`);
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}. ID должен быть 24-символьной hex строкой.`);
    }

    const teacher = await this.teacherModel.findById(teacherId).exec();
    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    // Проверяем, не добавлен ли уже курс
    if (teacher.courses.includes(new Types.ObjectId(courseId))) {
      throw new BadRequestException('Курс уже добавлен к преподавателю');
    }

    teacher.courses.push(new Types.ObjectId(courseId));
    return teacher.save();
  }

  async removeCourse(teacherId: string, courseId: string): Promise<Teacher> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(teacherId)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${teacherId}. ID должен быть 24-символьной hex строкой.`);
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}. ID должен быть 24-символьной hex строкой.`);
    }

    const teacher = await this.teacherModel.findById(teacherId).exec();
    if (!teacher) {
      throw new NotFoundException('Преподаватель не найден');
    }

    // Удаляем курс из списка
    teacher.courses = teacher.courses.filter(
      course => course.toString() !== courseId
    );

    return teacher.save();
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const result = await this.teacherModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    }).exec();

    if (!result) {
      throw new NotFoundException('Преподаватель не найден');
    }
  }

  async verifyEmail(id: string): Promise<void> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    const result = await this.teacherModel.findByIdAndUpdate(id, {
      emailVerified: true,
    }).exec();

    if (!result) {
      throw new NotFoundException('Преподаватель не найден');
    }
  }

  async updateLastLogin(id: string): Promise<void> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID преподавателя: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    await this.teacherModel.findByIdAndUpdate(id, {
      lastLogin: new Date(),
    }).exec();
  }
}
