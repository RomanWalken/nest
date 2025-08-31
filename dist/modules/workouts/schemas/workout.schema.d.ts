import { Document, Types } from 'mongoose';
export type WorkoutDocument = Workout & Document;
export declare class Workout {
    title: string;
    description: string;
    duration: number;
    order: number;
    isFree: boolean;
    courseId: Types.ObjectId;
    tariffs: Types.ObjectId[];
    exercises: Types.ObjectId[];
    month: number;
    week: number;
    day: number;
    metadata: Record<string, any>;
    customUserId?: Types.ObjectId;
    isCustom: boolean;
}
export declare const WorkoutSchema: import("mongoose").Schema<Workout, import("mongoose").Model<Workout, any, any, any, Document<unknown, any, Workout, any, {}> & Workout & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workout, Document<unknown, {}, import("mongoose").FlatRecord<Workout>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Workout> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
