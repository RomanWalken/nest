import { Document, Types } from 'mongoose';
import { LessonType } from '@/common/types';
export type LessonDocument = Lesson & Document;
export declare class Lesson {
    title: string;
    description: string;
    content: string;
    type: LessonType;
    videoUrl: string;
    duration: number;
    order: number;
    isFree: boolean;
    moduleId: Types.ObjectId;
    tariffs: Types.ObjectId[];
    attachments: string[];
    metadata: Record<string, any>;
    quizData?: Record<string, any>;
    presentationData?: Record<string, any>;
}
export declare const LessonSchema: import("mongoose").Schema<Lesson, import("mongoose").Model<Lesson, any, any, any, Document<unknown, any, Lesson, any, {}> & Lesson & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lesson, Document<unknown, {}, import("mongoose").FlatRecord<Lesson>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Lesson> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
