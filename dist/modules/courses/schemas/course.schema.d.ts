import { Document, Types } from 'mongoose';
import { CourseType, DifficultyLevel } from '@/common/types';
export type CourseDocument = Course & Document;
export declare class Course {
    title: string;
    slug: string;
    description: string;
    type: CourseType;
    thumbnail: string;
    duration: number;
    difficulty: DifficultyLevel;
    isPublished: boolean;
    isFeatured: boolean;
    companyId: Types.ObjectId;
    authorId: Types.ObjectId;
    tags: string[];
    metadata: Record<string, any>;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course, any, {}> & Course & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Course> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
