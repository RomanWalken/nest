export declare class CreateWorkoutDto {
    title: string;
    description?: string;
    duration?: number;
    order: number;
    isFree?: boolean;
    courseId: string;
    tariffs?: string[];
    exercises?: string[];
    month: number;
    week: number;
    day: number;
    customUserId?: string;
    metadata?: Record<string, any>;
}
