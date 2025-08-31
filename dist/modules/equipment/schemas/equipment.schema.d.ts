import { Document } from 'mongoose';
export type EquipmentDocument = Equipment & Document;
export declare class Equipment {
    name: string;
    icon: string;
    description: string;
    isActive: boolean;
}
export declare const EquipmentSchema: import("mongoose").Schema<Equipment, import("mongoose").Model<Equipment, any, any, any, Document<unknown, any, Equipment, any, {}> & Equipment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Equipment, Document<unknown, {}, import("mongoose").FlatRecord<Equipment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Equipment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
