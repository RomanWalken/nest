import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from '@/common/types';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    create(createWorkoutDto: CreateWorkoutDto): Promise<import("./schemas/workout.schema").Workout>;
    findAll(paginationDto: PaginationDto, courseId?: string, isFree?: boolean): Promise<{
        data: import("./schemas/workout.schema").Workout[];
        meta: any;
    }>;
    findByCourse(courseId: string): Promise<import("./schemas/workout.schema").Workout[]>;
    findBySchedule(month: number, week: number, day: number, courseId?: string): Promise<import("./schemas/workout.schema").Workout[]>;
    findOne(id: string): Promise<import("./schemas/workout.schema").Workout>;
    update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<import("./schemas/workout.schema").Workout>;
    remove(id: string): Promise<void>;
    addExercise(id: string, exerciseId: string): Promise<import("./schemas/workout.schema").Workout>;
    removeExercise(id: string, exerciseId: string): Promise<import("./schemas/workout.schema").Workout>;
    addTariff(id: string, tariffId: string): Promise<import("./schemas/workout.schema").Workout>;
    removeTariff(id: string, tariffId: string): Promise<import("./schemas/workout.schema").Workout>;
}
