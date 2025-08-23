import { Document, Types } from 'mongoose';
export type MealDocument = Meal & Document;
export declare class Meal {
    title: string;
    description: string;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    image: string;
    recipe: string;
    courseId: Types.ObjectId;
    ingredients: string[];
    metadata: Record<string, any>;
}
export declare const MealSchema: import("mongoose").Schema<Meal, import("mongoose").Model<Meal, any, any, any, Document<unknown, any, Meal, any, {}> & Meal & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meal, Document<unknown, {}, import("mongoose").FlatRecord<Meal>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Meal> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
