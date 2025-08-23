import { Document, Types } from 'mongoose';
import { UserRole } from '@/common/types';
export type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
    role: UserRole;
    companyId: Types.ObjectId;
    isActive: boolean;
    emailVerified: boolean;
    authProviders: string[];
    lastLogin: Date;
    profile: Record<string, any>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
