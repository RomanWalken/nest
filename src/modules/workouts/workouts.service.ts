import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(createWorkoutDto.courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    // Проверка уникальности order в рамках курса
    const existingWorkout = await this.workoutModel.findOne({
      courseId: createWorkoutDto.courseId,
      order: createWorkoutDto.order,
    });

    if (existingWorkout) {
      throw new BadRequestException(
        `Workout с порядковым номером ${createWorkoutDto.order} уже существует в этом курсе`,
      );
    }

    const workout = new this.workoutModel(createWorkoutDto);
    return workout.save();
  }

  async findAll(
    paginationDto: PaginationDto,
    courseId?: string,
    isFree?: boolean,
  ): Promise<{ data: Workout[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (courseId) {
      if (!Types.ObjectId.isValid(courseId)) {
        throw new BadRequestException('Невалидный ID курса');
      }
      filter.courseId = courseId;
    }

    if (isFree !== undefined) {
      filter.isFree = isFree;
    }

    const [data, total] = await Promise.all([
      this.workoutModel
        .find(filter)
        .populate('courseId', 'title slug')
        .populate('tariffs', 'name newPrice currency')
        .populate('exercises', 'title repetitions sets')
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.workoutModel.countDocuments(filter),
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

  async findOne(id: string): Promise<Workout> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID workout');
    }

    const workout = await this.workoutModel
      .findById(id)
      .populate('courseId', 'title slug')
      .populate('tariffs', 'name newPrice currency')
      .populate('exercises', 'title repetitions sets targetMuscles')
      .populate('customUserId', 'firstName lastName email')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID workout');
    }

    // Проверка уникальности order при обновлении
    if (updateWorkoutDto.order) {
      const existingWorkout = await this.workoutModel.findOne({
        _id: { $ne: id },
        courseId: updateWorkoutDto.courseId,
        order: updateWorkoutDto.order,
      });

      if (existingWorkout) {
        throw new BadRequestException(
          `Workout с порядковым номером ${updateWorkoutDto.order} уже существует в этом курсе`,
        );
      }
    }

    const workout = await this.workoutModel
      .findByIdAndUpdate(id, updateWorkoutDto, { new: true })
      .populate('courseId', 'title slug')
      .populate('tariffs', 'name newPrice currency')
      .populate('exercises', 'title repetitions sets')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Невалидный ID workout');
    }

    const result = await this.workoutModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Workout не найден');
    }
  }

  async findByCourse(courseId: string): Promise<Workout[]> {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Невалидный ID курса');
    }

    return this.workoutModel
      .find({ courseId })
      .populate('exercises', 'title repetitions sets targetMuscles')
      .sort({ order: 1 })
      .exec();
  }

  async findBySchedule(
    month: number,
    week: number,
    day: number,
    courseId?: string,
  ): Promise<Workout[]> {
    const filter: any = { month, week, day };
    
    if (courseId) {
      if (!Types.ObjectId.isValid(courseId)) {
        throw new BadRequestException('Невалидный ID курса');
      }
      filter.courseId = courseId;
    }

    return this.workoutModel
      .find(filter)
      .populate('courseId', 'title slug')
      .populate('exercises', 'title repetitions sets targetMuscles')
      .sort({ order: 1 })
      .exec();
  }

  async addExercise(workoutId: string, exerciseId: string): Promise<Workout> {
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID workout');
    }
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const workout = await this.workoutModel
      .findByIdAndUpdate(
        workoutId,
        { $addToSet: { exercises: exerciseId } },
        { new: true },
      )
      .populate('exercises', 'title repetitions sets targetMuscles')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }

  async removeExercise(workoutId: string, exerciseId: string): Promise<Workout> {
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID workout');
    }
    if (!Types.ObjectId.isValid(exerciseId)) {
      throw new BadRequestException('Невалидный ID упражнения');
    }

    const workout = await this.workoutModel
      .findByIdAndUpdate(
        workoutId,
        { $pull: { exercises: exerciseId } },
        { new: true },
      )
      .populate('exercises', 'title repetitions sets targetMuscles')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }

  async addTariff(workoutId: string, tariffId: string): Promise<Workout> {
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID workout');
    }
    if (!Types.ObjectId.isValid(tariffId)) {
      throw new BadRequestException('Невалидный ID тарифа');
    }

    const workout = await this.workoutModel
      .findByIdAndUpdate(
        workoutId,
        { $addToSet: { tariffs: tariffId } },
        { new: true },
      )
      .populate('tariffs', 'name newPrice currency')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }

  async removeTariff(workoutId: string, tariffId: string): Promise<Workout> {
    if (!Types.ObjectId.isValid(workoutId)) {
      throw new BadRequestException('Невалидный ID workout');
    }
    if (!Types.ObjectId.isValid(tariffId)) {
      throw new BadRequestException('Невалидный ID тарифа');
    }

    const workout = await this.workoutModel
      .findByIdAndUpdate(
        workoutId,
        { $pull: { tariffs: tariffId } },
        { new: true },
      )
      .populate('tariffs', 'name newPrice currency')
      .exec();

    if (!workout) {
      throw new NotFoundException('Workout не найден');
    }

    return workout;
  }
}
