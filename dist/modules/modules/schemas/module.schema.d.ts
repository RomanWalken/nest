import { Document, Types } from 'mongoose';
export type ModuleDocument = Module & Document;
export declare class Module {
    title: string;
    description: string;
    order: number;
    isFree: boolean;
    courseId: Types.ObjectId;
    metadata: Record<string, any>;
}
export declare const ModuleSchema: import("mongoose").Schema<Module, import("mongoose").Model<Module, any, any, any, Document<unknown, any, Module, any, {}> & Module & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Module, Document<unknown, {}, import("mongoose").FlatRecord<Module>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Module> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
