import { Document } from 'mongoose';
export type FitnessGoalsDocument = FitnessGoals & Document;
export declare class FitnessGoals {
    primaryGoal: string;
    secondaryGoals: string[];
    targetWeight?: number;
    targetBodyFat?: number;
    targetMuscleMass?: number;
    targetChest?: number;
    targetWaist?: number;
    targetHips?: number;
    targetDate?: Date;
    durationWeeks?: number;
    activityLevel: string;
    experienceLevel: string;
    limitations: string[];
    preferences: string[];
    availableEquipment: string[];
    maxWorkoutTime?: number;
    workoutsPerWeek?: number;
    motivation?: string;
    previousExperience?: string;
    currentChallenges?: string;
    status: string;
    completedAt?: Date;
    metadata?: Record<string, any>;
}
export declare const FitnessGoalsSchema: import("mongoose").Schema<FitnessGoals, import("mongoose").Model<FitnessGoals, any, any, any, Document<unknown, any, FitnessGoals, any, {}> & FitnessGoals & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FitnessGoals, Document<unknown, {}, import("mongoose").FlatRecord<FitnessGoals>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<FitnessGoals> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
