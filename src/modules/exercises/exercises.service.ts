import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = new this.exerciseModel(createExerciseDto);
    return exercise.save();
  }

  async findAll(
    paginationDto: PaginationDto,
    targetMuscles?: string[],
    equipment?: string[],
    customUserId?: string,
  ): Promise<{ data: Exercise[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (targetMuscles && targetMuscles.length > 0) {
      filter.targetMuscles = { $in: targetMuscles };
    }

    if (equipment && equipment.length > 0) {
      if (!equipment.every(id => Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Невалидный ID оборудования');
      }
      filter.equipment = { $in: equipment };
    }

    if (customUserId) {
      if (!Types.ObjectId.isValid(customUserId)) {
        throw new BadRequestException('Невалидный ID пользователя');
      }
      filter.customUserId = customUserId;
    }

    const [data, total] = await Promise.all([
      this.exerciseModel
        .find(filter)
        .populate('equipment', 'name type')
        .populate('customUserId', 'firstName lastName email')
        .sort({ title: 1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.exerciseModel.countDocuments(filter),
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

  async findOne(id: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const exercise = await this.exerciseModel
      .findById(id)
      .populate('equipment', 'name type description')
      .populate('customUserId', 'firstName lastName email')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const exercise = await this.exerciseModel
      .findByIdAndUpdate(id, updateExerciseDto, { new: true })
      .populate('equipment', 'name type')
      .populate('customUserId', 'firstName lastName email')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const result = await this.exerciseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Упражнение не найдено');
    }
  }

  async findByTargetMuscles(targetMuscles: string[]): Promise<Exercise[]> {
    return this.exerciseModel
      .find({ targetMuscles: { $in: targetMuscles } })
      .populate('equipment', 'name type')
      .sort({ title: 1 })
      .exec();
  }

  async findByEquipment(equipmentIds: string[]): Promise<Exercise[]> {
    if (!equipmentIds.every(id => Types.ObjectId.isValid(id))) {
      throw new BadRequestException('Невалидный ID оборудования');
    }

    return this.exerciseModel
      .find({ equipment: { $in: equipmentIds } })
      .populate('equipment', 'name type')
      .sort({ title: 1 })
      .exec();
  }

  async findByCustomUser(customUserId: string): Promise<Exercise[]> {
    if (!Types.ObjectId.isValid(customUserId)) {
      throw new BadRequestException('Невалидный ID пользователя');
    }

    return this.exerciseModel
      .find({ customUserId })
      .populate('equipment', 'name type')
      .populate('customUserId', 'firstName lastName email')
      .sort({ title: 1 })
      .exec();
  }

  async addEquipment(exerciseId: string, equipmentId: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }
    if (!Types.ObjectId.isValid(equipmentId)) {
      throw new BadRequestException('Невалидный ID оборудования');
    }

    const exercise = await this.exerciseModel
      .findByIdAndUpdate(
        exerciseId,
        { $addToSet: { equipment: equipmentId } },
        { new: true },
      )
      .populate('equipment', 'name type')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async removeEquipment(exerciseId: string, equipmentId: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }
    if (!Types.ObjectId.isValid(equipmentId)) {
      throw new BadRequestException('Невалидный ID оборудования');
    }

    const exercise = await this.exerciseModel
      .findByIdAndUpdate(
        exerciseId,
        { $pull: { equipment: equipmentId } },
        { new: true },
      )
      .populate('equipment', 'name type')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async addTargetMuscle(exerciseId: string, muscle: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const exercise = await this.exerciseModel
      .findByIdAndUpdate(
        exerciseId,
        { $addToSet: { targetMuscles: muscle } },
        { new: true },
      )
      .populate('equipment', 'name type')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async removeTargetMuscle(exerciseId: string, muscle: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const exercise = await this.exerciseModel
      .findByIdAndUpdate(
        exerciseId,
        { $pull: { targetMuscles: muscle } },
        { new: true },
      )
      .populate('equipment', 'name type')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return exercise;
  }

  async getAvailableTargetMuscles(): Promise<string[]> {
    const result = await this.exerciseModel.distinct('targetMuscles');
    return result.filter(muscle => muscle && muscle.trim() !== '');
  }
}
