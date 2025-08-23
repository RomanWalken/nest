import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto, authorId: string, companyId: string): Promise<Course> {
    // Проверяем уникальность slug в рамках компании
    const existingCourse = await this.courseModel.findOne({
      slug: createCourseDto.slug,
      companyId: new Types.ObjectId(companyId),
    });

    if (existingCourse) {
      throw new ConflictException('Курс с таким slug уже существует в этой компании');
    }

    const course = new this.courseModel({
      ...createCourseDto,
      authorId: new Types.ObjectId(authorId),
      companyId: new Types.ObjectId(companyId),
    });

    return course.save();
  }

  async findAll(paginationDto: PaginationDto = {}, companyId?: string): Promise<{ data: Course[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel
      .findById(id)
      .populate('authorId', 'firstName lastName email')
      .populate('companyId', 'name slug')
      .exec();

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    return course;
  }

  async findBySlug(slug: string, companyId: string): Promise<Course> {
    const course = await this.courseModel
      .findOne({ slug, companyId: new Types.ObjectId(companyId) })
      .populate('authorId', 'firstName lastName email')
      .populate('companyId', 'name slug')
      .exec();

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .populate('authorId', 'firstName lastName email')
      .populate('companyId', 'name slug')
      .exec();

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    return course;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Курс не найден');
    }
  }

  async findByCompany(companyId: string): Promise<Course[]> {
    return this.courseModel
      .find({ companyId: new Types.ObjectId(companyId) })
      .populate('authorId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findPublished(companyId?: string): Promise<Course[]> {
    const filter: any = { isPublished: true };
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
    }

    return this.courseModel
      .find(filter)
      .populate('authorId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }
} 