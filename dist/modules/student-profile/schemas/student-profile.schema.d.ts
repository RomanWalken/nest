import { Document, Types } from 'mongoose';
import { BodyMeasurements } from './body-measurements.schema';
import { FitnessGoals } from './fitness-goals.schema';
export type StudentProfileDocument = StudentProfile & Document;
export declare class StudentProfile {
    userId: Types.ObjectId;
    dateOfBirth?: Date;
    gender?: string;
    phone?: string;
    emergencyContact?: string;
    medicalConditions: string[];
    medications: string[];
    allergies: string[];
    doctorContact?: string;
    fitnessGoals: FitnessGoals;
    bodyMeasurements: BodyMeasurements[];
    currentMeasurements?: BodyMeasurements;
    isPublic: boolean;
    allowProgressSharing: boolean;
    receiveMotivationalMessages: boolean;
    hasCompletedInitialQuiz: boolean;
    quizCompletedAt?: Date;
    lastQuizUpdate?: Date;
    enrolledFitnessCourses: Types.ObjectId[];
    achievements: string[];
    trainerNotes?: string;
    lastUpdatedBy?: Types.ObjectId;
    metadata?: Record<string, any>;
}
export declare const StudentProfileSchema: import("mongoose").Schema<StudentProfile, import("mongoose").Model<StudentProfile, any, any, any, Document<unknown, any, StudentProfile, any, {}> & StudentProfile & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentProfile, Document<unknown, {}, import("mongoose").FlatRecord<StudentProfile>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<StudentProfile> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
