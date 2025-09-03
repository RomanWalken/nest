export declare class CreateWorkoutOverrideDto {
    workoutId: string;
    duration?: number;
    isEnabled?: boolean;
    customOrder?: number;
    customSchedule?: {
        month: number;
        week: number;
        day: number;
    };
    metadata?: Record<string, any>;
}
export declare class CreateExerciseOverrideDto {
    exerciseId: string;
    repetitions?: number;
    sets?: number;
    restTime?: number;
    isEnabled?: boolean;
    metadata?: Record<string, any>;
}
export declare class CreateLessonOverrideDto {
    lessonId: string;
    isUnlocked?: boolean;
    customOrder?: number;
    isRequired?: boolean;
    metadata?: Record<string, any>;
}
export declare class CreateCourseSettingsDto {
    difficulty?: string;
    pace?: string;
    notifications?: boolean;
    reminders?: boolean;
    startDate?: string;
    targetCompletionDate?: string;
    metadata?: Record<string, any>;
}
export declare class CreateUserCourseSettingsDto {
    userId: string;
    courseId: string;
    isActive?: boolean;
    workoutOverrides?: CreateWorkoutOverrideDto[];
    exerciseOverrides?: CreateExerciseOverrideDto[];
    lessonOverrides?: CreateLessonOverrideDto[];
    courseSettings?: CreateCourseSettingsDto;
    createdBy?: string;
    notes?: string;
    metadata?: Record<string, any>;
}
