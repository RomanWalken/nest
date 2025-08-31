import { Document, Types } from 'mongoose';
export type ExerciseDocument = Exercise & Document;
export declare class Exercise {
    title: string;
    description: string;
    videoUrl: string;
    repetitions: number;
    explanation: string;
    equipment: Types.ObjectId[];
    targetMuscles: string[];
    duration: number;
    sets: number;
    restTime: number;
    metadata: Record<string, any>;
    customUserId?: Types.ObjectId;
    isCustom: boolean;
}
export declare const ExerciseSchema: import("mongoose").Schema<Exercise, import("mongoose").Model<Exercise, any, any, any, Document<unknown, any, Exercise, any, {}> & Exercise & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercise, Document<unknown, {}, import("mongoose").FlatRecord<Exercise>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Exercise> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
