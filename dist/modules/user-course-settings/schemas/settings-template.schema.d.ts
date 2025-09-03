import { Document, Types } from 'mongoose';
export type SettingsTemplateDocument = SettingsTemplate & Document;
export declare class SettingsTemplate {
    name: string;
    description: string;
    category: string;
    isDefault: boolean;
    isActive: boolean;
    workoutDefaults: {
        durationMultiplier: number;
        intensityLevel: string;
        restTimeMultiplier: number;
        enabledByDefault: boolean;
    };
    exerciseDefaults: {
        repetitionsMultiplier: number;
        setsMultiplier: number;
        restTimeMultiplier: number;
        enabledByDefault: boolean;
    };
    lessonDefaults: {
        unlockAll: boolean;
        requiredByDefault: boolean;
        customOrder: boolean;
    };
    courseDefaults: {
        difficulty: string;
        pace: string;
        notifications: boolean;
        reminders: boolean;
        weeklyGoal: string;
    };
    createdBy?: Types.ObjectId;
    tags: string[];
    metadata: Record<string, any>;
}
export declare const SettingsTemplateSchema: import("mongoose").Schema<SettingsTemplate, import("mongoose").Model<SettingsTemplate, any, any, any, Document<unknown, any, SettingsTemplate, any, {}> & SettingsTemplate & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SettingsTemplate, Document<unknown, {}, import("mongoose").FlatRecord<SettingsTemplate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SettingsTemplate> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
