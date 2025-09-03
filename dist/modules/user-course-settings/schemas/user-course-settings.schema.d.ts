import { Document, Types } from 'mongoose';
export type UserCourseSettingsDocument = UserCourseSettings & Document;
export declare class WorkoutOverride {
    workoutId: Types.ObjectId;
    duration?: number;
    isEnabled: boolean;
    customOrder?: number;
    customSchedule?: {
        month: number;
        week: number;
        day: number;
    };
    metadata?: Record<string, any>;
}
export declare class ExerciseOverride {
    exerciseId: Types.ObjectId;
    repetitions?: number;
    sets?: number;
    restTime?: number;
    isEnabled: boolean;
    metadata?: Record<string, any>;
}
export declare class LessonOverride {
    lessonId: Types.ObjectId;
    isUnlocked: boolean;
    customOrder?: number;
    isRequired: boolean;
    metadata?: Record<string, any>;
}
export declare class CourseSettings {
    difficulty?: string;
    pace?: string;
    notifications: boolean;
    reminders: boolean;
    startDate?: Date;
    targetCompletionDate?: Date;
    metadata?: Record<string, any>;
}
export declare class UserCourseSettings {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    isActive: boolean;
    workoutOverrides: WorkoutOverride[];
    exerciseOverrides: ExerciseOverride[];
    lessonOverrides: LessonOverride[];
    courseSettings: CourseSettings;
    createdBy?: Types.ObjectId;
    lastModified?: Date;
    notes?: string;
    metadata?: Record<string, any>;
}
export declare const UserCourseSettingsSchema: import("mongoose").Schema<UserCourseSettings, import("mongoose").Model<UserCourseSettings, any, any, any, Document<unknown, any, UserCourseSettings, any, {}> & UserCourseSettings & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserCourseSettings, Document<unknown, {}, import("mongoose").FlatRecord<UserCourseSettings>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserCourseSettings> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
