import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tariff, TariffDocument } from './schemas/tariff.schema';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class TariffsService {
  constructor(
    @InjectModel(Tariff.name) private tariffModel: Model<TariffDocument>,
  ) {}

  async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    const tariff = new this.tariffModel({
      ...createTariffDto,
      courseId: new Types.ObjectId(createTariffDto.courseId),
      lessonIds: createTariffDto.lessonIds?.map(id => new Types.ObjectId(id)) || [],
    });

    return tariff.save();
  }

  async findAll(paginationDto: PaginationDto = {}, courseId?: string): Promise<{ data: Tariff[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (courseId) {
      filter.courseId = new Types.ObjectId(courseId);
    }

    const [tariffs, total] = await Promise.all([
      this.tariffModel
        .find(filter)
        .populate('courseId', 'title slug')
        .populate('lessonIds', 'title order')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.tariffModel.countDocuments(filter),
    ]);

    return {
      data: tariffs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Tariff> {
    const tariff = await this.tariffModel
      .findById(id)
      .populate('courseId', 'title slug')
      .populate('lessonIds', 'title order')
      .exec();

    if (!tariff) {
      throw new NotFoundException('Тариф не найден');
    }

    return tariff;
  }

  async findByCourse(courseId: string): Promise<Tariff[]> {
    return this.tariffModel
      .find({ courseId: new Types.ObjectId(courseId), isActive: true })
      .populate('lessonIds', 'title order')
      .sort({ price: 1 })
      .exec();
  }

  async update(id: string, updateTariffDto: UpdateTariffDto): Promise<Tariff> {
    const updateData: any = { ...updateTariffDto };
    
    if (updateTariffDto.courseId) {
      updateData.courseId = new Types.ObjectId(updateTariffDto.courseId);
    }
    
    if (updateTariffDto.lessonIds) {
      updateData.lessonIds = updateTariffDto.lessonIds.map(id => new Types.ObjectId(id));
    }

    const tariff = await this.tariffModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('courseId', 'title slug')
      .populate('lessonIds', 'title order')
      .exec();

    if (!tariff) {
      throw new NotFoundException('Тариф не найден');
    }

    return tariff;
  }

  async remove(id: string): Promise<void> {
    const result = await this.tariffModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Тариф не найден');
    }
  }

  async getActiveTariffs(courseId: string): Promise<Tariff[]> {
    return this.tariffModel
      .find({ 
        courseId: new Types.ObjectId(courseId), 
        isActive: true 
      })
      .populate('lessonIds', 'title order')
      .sort({ price: 1 })
      .exec();
  }
} 