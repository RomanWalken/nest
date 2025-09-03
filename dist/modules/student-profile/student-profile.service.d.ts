import { Model } from 'mongoose';
import { StudentProfile, StudentProfileDocument } from './schemas/student-profile.schema';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { AddBodyMeasurementsDto } from './dto/add-body-measurements.dto';
import { PaginationDto } from '@/common/types';
export declare class StudentProfileService {
    private studentProfileModel;
    constructor(studentProfileModel: Model<StudentProfileDocument>);
    create(createStudentProfileDto: CreateStudentProfileDto): Promise<StudentProfile>;
    findAll(paginationDto: PaginationDto, hasCompletedQuiz?: boolean, experienceLevel?: string, primaryGoal?: string): Promise<{
        data: StudentProfile[];
        meta: any;
    }>;
    findOne(id: string): Promise<StudentProfile>;
    findByUserId(userId: string): Promise<StudentProfile | null>;
    update(id: string, updateStudentProfileDto: UpdateStudentProfileDto): Promise<StudentProfile>;
    remove(id: string): Promise<void>;
    addBodyMeasurements(profileId: string, measurementsDto: AddBodyMeasurementsDto): Promise<StudentProfile>;
    getBodyMeasurementsHistory(profileId: string): Promise<any[]>;
    updateFitnessGoals(profileId: string, goalsUpdate: any): Promise<StudentProfile>;
    markQuizCompleted(profileId: string): Promise<StudentProfile>;
    addAchievement(profileId: string, achievement: string): Promise<StudentProfile>;
    enrollInFitnessCourse(profileId: string, courseId: string): Promise<StudentProfile>;
    unenrollFromFitnessCourse(profileId: string, courseId: string): Promise<StudentProfile>;
    getProgressStats(profileId: string): Promise<any>;
    getStudentsByGoal(primaryGoal: string): Promise<StudentProfile[]>;
    getStudentsByExperienceLevel(experienceLevel: string): Promise<StudentProfile[]>;
}
