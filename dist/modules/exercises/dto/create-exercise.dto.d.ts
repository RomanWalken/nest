export declare class CreateExerciseDto {
    title: string;
    description?: string;
    videoUrl?: string;
    repetitions: number;
    explanation?: string;
    equipment?: string[];
    targetMuscles?: string[];
    duration?: number;
    sets?: number;
    restTime?: number;
    customUserId?: string;
    metadata?: Record<string, any>;
}
