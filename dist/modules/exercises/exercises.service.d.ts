import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '@/common/types';
export declare class ExercisesService {
    private exerciseModel;
    constructor(exerciseModel: Model<ExerciseDocument>);
    create(createExerciseDto: CreateExerciseDto): Promise<Exercise>;
    findAll(paginationDto: PaginationDto, targetMuscles?: string[], equipment?: string[], customUserId?: string): Promise<{
        data: Exercise[];
        meta: any;
    }>;
    findOne(id: string): Promise<Exercise>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise>;
    remove(id: string): Promise<void>;
    findByTargetMuscles(targetMuscles: string[]): Promise<Exercise[]>;
    findByEquipment(equipmentIds: string[]): Promise<Exercise[]>;
    findByCustomUser(customUserId: string): Promise<Exercise[]>;
    addEquipment(exerciseId: string, equipmentId: string): Promise<Exercise>;
    removeEquipment(exerciseId: string, equipmentId: string): Promise<Exercise>;
    addTargetMuscle(exerciseId: string, muscle: string): Promise<Exercise>;
    removeTargetMuscle(exerciseId: string, muscle: string): Promise<Exercise>;
    getAvailableTargetMuscles(): Promise<string[]>;
}
