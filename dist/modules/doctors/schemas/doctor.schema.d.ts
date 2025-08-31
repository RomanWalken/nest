import { Document, Types } from 'mongoose';
export type DoctorDocument = Doctor & Document;
export declare class Doctor {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    userFiles: string[];
    courseFiles: string[];
    metadata: Record<string, any>;
    isActive: boolean;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, Document<unknown, any, Doctor, any, {}> & Doctor & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, Document<unknown, {}, import("mongoose").FlatRecord<Doctor>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Doctor> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
