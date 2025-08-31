import { Document, Types } from 'mongoose';
import { CourseKind, CourseCategory, DifficultyLevel, CoursePublicationStatus } from '@/common/types';
export type CourseDocument = Course & Document;
export declare class Course {
    title: string;
    slug: string;
    description: string;
    kind: CourseKind;
    category: CourseCategory;
    thumbnail: string;
    duration: number;
    difficulty: DifficultyLevel;
    publicationStatus: CoursePublicationStatus;
    isFeatured: boolean;
    isPaid: boolean;
    companyId: Types.ObjectId;
    authorId: Types.ObjectId;
    tags: string[];
    metadata: Record<string, any>;
    meals: Types.ObjectId[];
    teachers: Types.ObjectId[];
    workouts: Types.ObjectId[];
    hasMeals: boolean;
    hasDoctor: boolean;
    modules: Types.ObjectId[];
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
