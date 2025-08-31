import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto, CourseKind } from '@/common/types';

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

    // Валидация специфичных полей в зависимости от вида курса
    if (createCourseDto.kind === CourseKind.FITNESS) {
      // Для фитнес-курсов проверяем, что meals и teachers могут быть указаны
      // Никаких ограничений на videoUrls и attachments больше нет
    } else if (createCourseDto.kind === CourseKind.REGULAR) {
      // Для обычных курсов проверяем, что meals и teachers не указаны
      if (createCourseDto.meals || createCourseDto.teachers || createCourseDto.workouts) {
        throw new BadRequestException('Обычные курсы не могут содержать meals, teachers и workouts');
      }
    }

    const course = new this.courseModel({
      ...createCourseDto,
      authorId: new Types.ObjectId(authorId),
      companyId: new Types.ObjectId(companyId),
    });

    return course.save();
  }

  async findAll(paginationDto: PaginationDto = {}, companyId?: string, kind?: CourseKind): Promise<{ data: Course[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  async findOne(id: string): Promise<Course> {
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
      throw new NotFoundException('Курс не найден');
    }

    return course;
  }

  async findBySlug(slug: string, companyId: string): Promise<Course> {
    const course = await this.courseModel
      .findOne({ slug, companyId: new Types.ObjectId(companyId) })
      .populate('authorId', 'firstName lastName email')
      .populate('companyId', 'name slug')
      .populate('meals', 'title calories')
      .populate('teachers', 'firstName lastName specialization')
      .populate('workouts', 'title duration')
      .populate('modules', 'title order')
      .exec();

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // Валидация специфичных полей при обновлении
    if (updateCourseDto.kind) {
      const currentCourse = await this.courseModel.findById(id);
      if (!currentCourse) {
        throw new NotFoundException('Курс не найден');
      }

      if (updateCourseDto.kind === CourseKind.FITNESS) {
        // Никаких ограничений на videoUrls и attachments больше нет
      } else if (updateCourseDto.kind === CourseKind.REGULAR) {
        if (updateCourseDto.meals || updateCourseDto.teachers || updateCourseDto.workouts) {
          throw new BadRequestException('Обычные курсы не могут содержать meals, teachers и workouts');
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
      .populate('meals', 'title calories')
      .populate('teachers', 'firstName lastName specialization')
      .populate('workouts', 'title duration')
      .populate('modules', 'title order')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findPublished(companyId?: string): Promise<Course[]> {
    const filter: any = { publicationStatus: 'published' };
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  // Новые методы для работы с фитнес-курсами
  async findFitnessCourses(companyId?: string): Promise<Course[]> {
    const filter: any = { kind: CourseKind.FITNESS, publicationStatus: 'published' };
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  async findRegularCourses(companyId?: string): Promise<Course[]> {
    const filter: any = { kind: CourseKind.REGULAR, publicationStatus: 'published' };
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
    }

    return this.courseModel
      .find(filter)
      .populate('authorId', 'firstName lastName email')
      .populate('modules', 'title order')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByCategory(category: string, companyId?: string): Promise<Course[]> {
    const filter: any = { category, publicationStatus: 'published' };
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  // Методы для управления связями в фитнес-курсах
  async addMealToCourse(courseId: string, mealId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.kind !== CourseKind.FITNESS) {
      throw new BadRequestException('Можно добавлять приемы пищи только к фитнес-курсам');
    }

    if (!course.meals.includes(new Types.ObjectId(mealId))) {
      course.meals.push(new Types.ObjectId(mealId));
      return course.save();
    }

    return course;
  }

  async removeMealFromCourse(courseId: string, mealId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.kind !== CourseKind.FITNESS) {
      throw new BadRequestException('Можно убирать приемы пищи только у фитнес-курсов');
    }

    course.meals = course.meals.filter(id => id.toString() !== mealId);
    return course.save();
  }

  async addTeacherToCourse(courseId: string, teacherId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.kind !== CourseKind.FITNESS) {
      throw new BadRequestException('Можно добавлять преподавателей только к фитнес-курсам');
    }

    if (!course.teachers.includes(new Types.ObjectId(teacherId))) {
      course.teachers.push(new Types.ObjectId(teacherId));
      return course.save();
    }

    return course;
  }

  async removeTeacherFromCourse(courseId: string, teacherId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.kind !== CourseKind.FITNESS) {
      throw new BadRequestException('Можно убирать преподавателей только у фитнес-курсов');
    }

    course.teachers = course.teachers.filter(id => id.toString() !== teacherId);
    return course.save();
  }
} 