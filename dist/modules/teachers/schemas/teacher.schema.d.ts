import { Document, Types } from 'mongoose';
import { UserRole } from '@/common/types';
export type TeacherDocument = Teacher & Document;
export declare class Teacher {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
    role: UserRole;
    isActive: boolean;
    emailVerified: boolean;
    authProviders: string[];
    lastLogin: Date;
    specialization: string;
    skills: string[];
    certificates: string[];
    experience: number;
    bio: string;
    languages: string[];
    schedule: Record<string, any>;
    courses: Types.ObjectId[];
    profile: Record<string, any>;
}
export declare const TeacherSchema: import("mongoose").Schema<Teacher, import("mongoose").Model<Teacher, any, any, any, Document<unknown, any, Teacher, any, {}> & Teacher & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Teacher, Document<unknown, {}, import("mongoose").FlatRecord<Teacher>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Teacher> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
