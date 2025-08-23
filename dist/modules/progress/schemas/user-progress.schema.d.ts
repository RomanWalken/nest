import { Document, Types } from 'mongoose';
export type UserProgressDocument = UserProgress & Document;
export declare class UserProgress {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    completedLessons: Types.ObjectId[];
    progressPercentage: number;
    lastAccessedLesson: Types.ObjectId;
    startedAt: Date;
    completedAt: Date;
    metadata: Record<string, any>;
}
export declare const UserProgressSchema: import("mongoose").Schema<UserProgress, import("mongoose").Model<UserProgress, any, any, any, Document<unknown, any, UserProgress, any, {}> & UserProgress & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserProgress, Document<unknown, {}, import("mongoose").FlatRecord<UserProgress>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserProgress> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
