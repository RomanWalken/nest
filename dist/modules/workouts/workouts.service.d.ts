import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from '@/common/types';
export declare class WorkoutsService {
    private workoutModel;
    constructor(workoutModel: Model<WorkoutDocument>);
    create(createWorkoutDto: CreateWorkoutDto): Promise<Workout>;
    findAll(paginationDto: PaginationDto, courseId?: string, isFree?: boolean): Promise<{
        data: Workout[];
        meta: any;
    }>;
    findOne(id: string): Promise<Workout>;
    update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout>;
    remove(id: string): Promise<void>;
    findByCourse(courseId: string): Promise<Workout[]>;
    findBySchedule(month: number, week: number, day: number, courseId?: string): Promise<Workout[]>;
    addExercise(workoutId: string, exerciseId: string): Promise<Workout>;
    removeExercise(workoutId: string, exerciseId: string): Promise<Workout>;
    addTariff(workoutId: string, tariffId: string): Promise<Workout>;
    removeTariff(workoutId: string, tariffId: string): Promise<Workout>;
}
