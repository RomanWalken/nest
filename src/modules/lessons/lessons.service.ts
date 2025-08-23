import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = new this.lessonModel({
      ...createLessonDto,
      moduleId: new Types.ObjectId(createLessonDto.moduleId),
    });

    return lesson.save();
  }

  async findAll(paginationDto: PaginationDto = {}, moduleId?: string): Promise<{ data: Lesson[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (moduleId) {
      filter.moduleId = new Types.ObjectId(moduleId);
    }

    const [lessons, total] = await Promise.all([
      this.lessonModel
        .find(filter)
        .populate('moduleId', 'title order')
        .skip(skip)
        .limit(limit)
        .sort({ order: 1 })
        .exec(),
      this.lessonModel.countDocuments(filter),
    ]);

    return {
      data: lessons,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel
      .findById(id)
      .populate('moduleId', 'title order')
      .exec();

    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }

    return lesson;
  }

  async findByModule(moduleId: string): Promise<Lesson[]> {
    return this.lessonModel
      .find({ moduleId: new Types.ObjectId(moduleId) })
      .sort({ order: 1 })
      .exec();
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const updateData: any = { ...updateLessonDto };
    
    if (updateLessonDto.moduleId) {
      updateData.moduleId = new Types.ObjectId(updateLessonDto.moduleId);
    }

    const lesson = await this.lessonModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('moduleId', 'title order')
      .exec();

    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }

    return lesson;
  }

  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Урок не найден');
    }
  }

  async reorderLessons(moduleId: string, lessonIds: string[]): Promise<Lesson[]> {
    const updatePromises = lessonIds.map((lessonId, index) =>
      this.lessonModel.findByIdAndUpdate(
        lessonId,
        { order: index + 1 },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    return this.findByModule(moduleId);
  }

  async getFreeContent(moduleId?: string): Promise<Lesson[]> {
    const filter: any = { isFree: true };
    if (moduleId) {
      filter.moduleId = new Types.ObjectId(moduleId);
    }

    return this.lessonModel
      .find(filter)
      .populate('moduleId', 'title order')
      .sort({ order: 1 })
      .exec();
  }
} 