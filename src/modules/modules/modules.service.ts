import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Module as CourseModule, ModuleDocument } from './schemas/module.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(CourseModule.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<CourseModule> {
    const module = new this.moduleModel({
      ...createModuleDto,
      courseId: new Types.ObjectId(createModuleDto.courseId),
    });

    return module.save();
  }

  async findAll(paginationDto: PaginationDto = {}, courseId?: string): Promise<{ data: CourseModule[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    const [modules, total] = await Promise.all([
      this.moduleModel
        .find(filter)
        .populate('courseId', 'title slug')
        .skip(skip)
        .limit(limit)
        .sort({ order: 1 })
        .exec(),
      this.moduleModel.countDocuments(filter),
    ]);

    return {
      data: modules,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<CourseModule> {
    const module = await this.moduleModel
      .findById(id)
      .populate('courseId', 'title slug')
      .exec();

    if (!module) {
      throw new NotFoundException('Модуль не найден');
    }

    return module;
  }

  async findByCourse(courseId: string): Promise<CourseModule[]> {
    return this.moduleModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .sort({ order: 1 })
      .exec();
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<CourseModule> {
    const updateData: any = { ...updateModuleDto };
    
    if (updateModuleDto.courseId) {
      updateData.courseId = new Types.ObjectId(updateModuleDto.courseId);
    }

    const module = await this.moduleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('courseId', 'title slug')
      .exec();

    if (!module) {
      throw new NotFoundException('Модуль не найден');
    }

    return module;
  }

  async remove(id: string): Promise<void> {
    const result = await this.moduleModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Модуль не найден');
    }
  }

  async reorderModules(courseId: string, moduleIds: string[]): Promise<CourseModule[]> {
    const updatePromises = moduleIds.map((moduleId, index) =>
      this.moduleModel.findByIdAndUpdate(
        moduleId,
        { order: index + 1 },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    return this.findByCourse(courseId);
  }
} 