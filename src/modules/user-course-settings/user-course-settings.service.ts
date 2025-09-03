import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserCourseSettings, UserCourseSettingsDocument } from './schemas/user-course-settings.schema';
import { CreateUserCourseSettingsDto } from './dto/create-user-course-settings.dto';
import { UpdateUserCourseSettingsDto } from './dto/update-user-course-settings.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class UserCourseSettingsService {
  constructor(
    @InjectModel(UserCourseSettings.name) 
    private userCourseSettingsModel: Model<UserCourseSettingsDocument>,
  ) {}

  async create(createUserCourseSettingsDto: CreateUserCourseSettingsDto): Promise<UserCourseSettings> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(createUserCourseSettingsDto.userId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }
    if (!Types.ObjectId.isValid(createUserCourseSettingsDto.courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    // Проверка уникальности (один студент - один курс)
    const existing = await this.userCourseSettingsModel.findOne({
      userId: createUserCourseSettingsDto.userId,
      courseId: createUserCourseSettingsDto.courseId,
    });

    if (existing) {
      throw new BadRequestException('Настройки для этого студента и курса уже существуют');
    }

    const settings = new this.userCourseSettingsModel({
      ...createUserCourseSettingsDto,
      lastModified: new Date(),
    });
    
    return settings.save();
  }

  async findAll(
    paginationDto: PaginationDto,
    courseId?: string,
    userId?: string,
    isActive?: boolean,
  ): Promise<{ data: UserCourseSettings[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (courseId) {
      if (!Types.ObjectId.isValid(courseId)) {
        throw new BadRequestException('Невалидный ID курса');
      }
      filter.courseId = courseId;
    }

    if (userId) {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Невалидный ID пользователя');
      }
      filter.userId = userId;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    const [data, total] = await Promise.all([
      this.userCourseSettingsModel
        .find(filter)
        .populate('userId', 'firstName lastName email')
        .populate('courseId', 'title slug kind')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userCourseSettingsModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const settings = await this.userCourseSettingsModel
      .findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .populate('createdBy', 'firstName lastName email')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  async findByUserAndCourse(userId: string, courseId: string): Promise<UserCourseSettings | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    return this.userCourseSettingsModel
      .findOne({ userId, courseId })
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .populate('createdBy', 'firstName lastName email')
      .exec();
  }

  async update(id: string, updateUserCourseSettingsDto: UpdateUserCourseSettingsDto): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        id, 
        { 
          ...updateUserCourseSettingsDto, 
          lastModified: new Date() 
        }, 
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .populate('createdBy', 'firstName lastName email')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const result = await this.userCourseSettingsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Настройки не найдены');
    }
  }

  async findByCourse(courseId: string): Promise<UserCourseSettings[]> {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    return this.userCourseSettingsModel
      .find({ courseId })
      .populate('userId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByUser(userId: string): Promise<UserCourseSettings[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }

    return this.userCourseSettingsModel
      .find({ userId })
      .populate('courseId', 'title slug kind')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  // Методы для работы с переопределениями тренировок
  async addWorkoutOverride(
    settingsId: string, 
    workoutOverride: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $addToSet: { workoutOverrides: workoutOverride },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  async updateWorkoutOverride(
    settingsId: string,
    workoutId: string,
    updateData: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID тренировки');
    }

    const settings = await this.userCourseSettingsModel
      .findOneAndUpdate(
        { 
          _id: settingsId, 
          'workoutOverrides.workoutId': workoutId 
        },
        { 
          $set: { 
            'workoutOverrides.$': { ...updateData, workoutId },
            lastModified: new Date()
          }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки или переопределение тренировки не найдены');
    }

    return settings;
  }

  async removeWorkoutOverride(settingsId: string, workoutId: string): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID тренировки');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $pull: { workoutOverrides: { workoutId } },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  // Методы для работы с переопределениями упражнений
  async addExerciseOverride(
    settingsId: string, 
    exerciseOverride: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $addToSet: { exerciseOverrides: exerciseOverride },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  async updateExerciseOverride(
    settingsId: string,
    exerciseId: string,
    updateData: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const settings = await this.userCourseSettingsModel
      .findOneAndUpdate(
        { 
          _id: settingsId, 
          'exerciseOverrides.exerciseId': exerciseId 
        },
        { 
          $set: { 
            'exerciseOverrides.$': { ...updateData, exerciseId },
            lastModified: new Date()
          }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки или переопределение упражнения не найдены');
    }

    return settings;
  }

  async removeExerciseOverride(settingsId: string, exerciseId: string): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $pull: { exerciseOverrides: { exerciseId } },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  // Методы для работы с переопределениями уроков
  async addLessonOverride(
    settingsId: string, 
    lessonOverride: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $addToSet: { lessonOverrides: lessonOverride },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  async updateLessonOverride(
    settingsId: string,
    lessonId: string,
    updateData: any
  ): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new BadRequestException('Невалидный ID урока');
    }

    const settings = await this.userCourseSettingsModel
      .findOneAndUpdate(
        { 
          _id: settingsId, 
          'lessonOverrides.lessonId': lessonId 
        },
        { 
          $set: { 
            'lessonOverrides.$': { ...updateData, lessonId },
            lastModified: new Date()
          }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки или переопределение урока не найдены');
    }

    return settings;
  }

  async removeLessonOverride(settingsId: string, lessonId: string): Promise<UserCourseSettings> {
    if (!Types.ObjectId.isValid(settingsId)) {
      throw new BadRequestException('Невалидный ID настроек');
    }
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new BadRequestException('Невалидный ID урока');
    }

    const settings = await this.userCourseSettingsModel
      .findByIdAndUpdate(
        settingsId,
        { 
          $pull: { lessonOverrides: { lessonId } },
          lastModified: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug kind')
      .exec();

    if (!settings) {
      throw new NotFoundException('Настройки не найдены');
    }

    return settings;
  }

  // Метод для получения объединенных настроек (базовые + персональные)
  async getMergedSettings(userId: string, courseId: string): Promise<any> {
    const userSettings = await this.findByUserAndCourse(userId, courseId);
    
    // Если персональных настроек нет, возвращаем базовые настройки курса
    if (!userSettings) {
      return {
        hasPersonalSettings: false,
        settings: null
      };
    }

    return {
      hasPersonalSettings: true,
      settings: userSettings
    };
  }
}
