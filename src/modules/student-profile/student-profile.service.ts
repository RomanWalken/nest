import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StudentProfile, StudentProfileDocument } from './schemas/student-profile.schema';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { AddBodyMeasurementsDto } from './dto/add-body-measurements.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class StudentProfileService {
  constructor(
    @InjectModel(StudentProfile.name) 
    private studentProfileModel: Model<StudentProfileDocument>,
  ) {}

  async create(createStudentProfileDto: CreateStudentProfileDto): Promise<StudentProfile> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(createStudentProfileDto.userId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }

    // Проверка уникальности (один профиль на пользователя)
    const existing = await this.studentProfileModel.findOne({
      userId: createStudentProfileDto.userId,
    });

    if (existing) {
      throw new BadRequestException('Профиль для этого пользователя уже существует');
    }

    const profile = new this.studentProfileModel({
      ...createStudentProfileDto,
      hasCompletedInitialQuiz: true,
      quizCompletedAt: new Date(),
    });
    
    return profile.save();
  }

  async findAll(
    paginationDto: PaginationDto,
    hasCompletedQuiz?: boolean,
    experienceLevel?: string,
    primaryGoal?: string,
  ): Promise<{ data: StudentProfile[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (hasCompletedQuiz !== undefined) {
      filter.hasCompletedInitialQuiz = hasCompletedQuiz;
    }

    if (experienceLevel) {
      filter['fitnessGoals.experienceLevel'] = experienceLevel;
    }

    if (primaryGoal) {
      filter['fitnessGoals.primaryGoal'] = primaryGoal;
    }

    const [data, total] = await Promise.all([
      this.studentProfileModel
        .find(filter)
        .populate('userId', 'firstName lastName email')
        .populate('lastUpdatedBy', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.studentProfileModel.countDocuments(filter),
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

  async findOne(id: string): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('lastUpdatedBy', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async findByUserId(userId: string): Promise<StudentProfile | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }

    return this.studentProfileModel
      .findOne({ userId })
      .populate('userId', 'firstName lastName email')
      .populate('lastUpdatedBy', 'firstName lastName email')
      .exec();
  }

  async update(id: string, updateStudentProfileDto: UpdateStudentProfileDto): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        id, 
        { 
          ...updateStudentProfileDto,
          lastQuizUpdate: new Date()
        }, 
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .populate('lastUpdatedBy', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const result = await this.studentProfileModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Профиль не найден');
    }
  }

  // Методы для работы с измерениями тела
  async addBodyMeasurements(
    profileId: string, 
    measurementsDto: AddBodyMeasurementsDto
  ): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          $push: { bodyMeasurements: measurementsDto },
          $set: { currentMeasurements: measurementsDto },
          lastUpdatedBy: measurementsDto.metadata?.updatedBy
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async getBodyMeasurementsHistory(profileId: string): Promise<any[]> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findById(profileId)
      .select('bodyMeasurements')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile.bodyMeasurements.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async updateFitnessGoals(
    profileId: string, 
    goalsUpdate: any
  ): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          $set: { 
            'fitnessGoals': { ...goalsUpdate },
            lastQuizUpdate: new Date()
          }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async markQuizCompleted(profileId: string): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          hasCompletedInitialQuiz: true,
          quizCompletedAt: new Date(),
          lastQuizUpdate: new Date()
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async addAchievement(profileId: string, achievement: string): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          $addToSet: { achievements: achievement }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async enrollInFitnessCourse(profileId: string, courseId: string): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          $addToSet: { enrolledFitnessCourses: courseId }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async unenrollFromFitnessCourse(profileId: string, courseId: string): Promise<StudentProfile> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    const profile = await this.studentProfileModel
      .findByIdAndUpdate(
        profileId,
        { 
          $pull: { enrolledFitnessCourses: courseId }
        },
        { new: true }
      )
      .populate('userId', 'firstName lastName email')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  // Методы для аналитики
  async getProgressStats(profileId: string): Promise<any> {
    if (!Types.ObjectId.isValid(profileId)) {
      throw new BadRequestException('Невалидный ID профиля');
    }

    const profile = await this.studentProfileModel
      .findById(profileId)
      .select('bodyMeasurements fitnessGoals currentMeasurements')
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    const measurements = profile.bodyMeasurements.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (measurements.length < 2) {
      return {
        hasProgress: false,
        message: 'Недостаточно данных для анализа прогресса'
      };
    }

    const first = measurements[0];
    const last = measurements[measurements.length - 1];

    return {
      hasProgress: true,
      period: {
        start: first.date,
        end: last.date,
        days: Math.ceil((new Date(last.date).getTime() - new Date(first.date).getTime()) / (1000 * 60 * 60 * 24))
      },
      weight: {
        start: first.weight,
        current: last.weight,
        change: last.weight - first.weight,
        changePercent: first.weight ? ((last.weight - first.weight) / first.weight * 100).toFixed(2) : 0
      },
      bodyFat: {
        start: first.bodyFat,
        current: last.bodyFat,
        change: last.bodyFat - first.bodyFat,
        changePercent: first.bodyFat ? ((last.bodyFat - first.bodyFat) / first.bodyFat * 100).toFixed(2) : 0
      },
      muscleMass: {
        start: first.muscleMass,
        current: last.muscleMass,
        change: last.muscleMass - first.muscleMass,
        changePercent: first.muscleMass ? ((last.muscleMass - first.muscleMass) / first.muscleMass * 100).toFixed(2) : 0
      },
      measurements: {
        chest: { start: first.chest, current: last.chest, change: last.chest - first.chest },
        waist: { start: first.waist, current: last.waist, change: last.waist - first.waist },
        hips: { start: first.hips, current: last.hips, change: last.hips - first.hips },
        biceps: { start: first.biceps, current: last.biceps, change: last.biceps - first.biceps },
        thigh: { start: first.thigh, current: last.thigh, change: last.thigh - first.thigh }
      }
    };
  }

  async getStudentsByGoal(primaryGoal: string): Promise<StudentProfile[]> {
    return this.studentProfileModel
      .find({ 'fitnessGoals.primaryGoal': primaryGoal })
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getStudentsByExperienceLevel(experienceLevel: string): Promise<StudentProfile[]> {
    return this.studentProfileModel
      .find({ 'fitnessGoals.experienceLevel': experienceLevel })
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }
}
