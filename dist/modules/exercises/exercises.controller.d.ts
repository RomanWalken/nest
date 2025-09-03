import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '@/common/types';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    create(createExerciseDto: CreateExerciseDto): Promise<import("./schemas/exercise.schema").Exercise>;
    findAll(paginationDto: PaginationDto, targetMuscles?: string, equipment?: string, customUserId?: string): Promise<{
        data: import("./schemas/exercise.schema").Exercise[];
        meta: any;
    }>;
    getAvailableTargetMuscles(): Promise<string[]>;
    findByTargetMuscles(muscles: string): Promise<import("./schemas/exercise.schema").Exercise[]>;
    findByEquipment(equipmentIds: string): Promise<import("./schemas/exercise.schema").Exercise[]>;
    findByCustomUser(customUserId: string): Promise<import("./schemas/exercise.schema").Exercise[]>;
    findOne(id: string): Promise<import("./schemas/exercise.schema").Exercise>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<import("./schemas/exercise.schema").Exercise>;
    remove(id: string): Promise<void>;
    addEquipment(id: string, equipmentId: string): Promise<import("./schemas/exercise.schema").Exercise>;
    removeEquipment(id: string, equipmentId: string): Promise<import("./schemas/exercise.schema").Exercise>;
    addTargetMuscle(id: string, muscle: string): Promise<import("./schemas/exercise.schema").Exercise>;
    removeTargetMuscle(id: string, muscle: string): Promise<import("./schemas/exercise.schema").Exercise>;
}
