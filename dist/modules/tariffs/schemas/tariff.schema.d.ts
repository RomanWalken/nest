import { Document, Types } from 'mongoose';
export type TariffDocument = Tariff & Document;
export declare class Tariff {
    name: string;
    description: string;
    price: number;
    currency: string;
    duration: number;
    isActive: boolean;
    courseId: Types.ObjectId;
    lessonIds: Types.ObjectId[];
    features: Record<string, any>;
}
export declare const TariffSchema: import("mongoose").Schema<Tariff, import("mongoose").Model<Tariff, any, any, any, Document<unknown, any, Tariff, any, {}> & Tariff & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tariff, Document<unknown, {}, import("mongoose").FlatRecord<Tariff>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Tariff> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
