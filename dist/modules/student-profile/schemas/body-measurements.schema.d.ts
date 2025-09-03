import { Document } from 'mongoose';
export type BodyMeasurementsDocument = BodyMeasurements & Document;
export declare class BodyMeasurements {
    date: Date;
    weight?: number;
    height?: number;
    bodyFat?: number;
    muscleMass?: number;
    waterPercentage?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thigh?: number;
    neck?: number;
    bmi?: number;
    bmr?: number;
    tdee?: number;
    progressPhotos?: string[];
    notes?: string;
    metadata?: Record<string, any>;
}
export declare const BodyMeasurementsSchema: import("mongoose").Schema<BodyMeasurements, import("mongoose").Model<BodyMeasurements, any, any, any, Document<unknown, any, BodyMeasurements, any, {}> & BodyMeasurements & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BodyMeasurements, Document<unknown, {}, import("mongoose").FlatRecord<BodyMeasurements>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BodyMeasurements> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
