import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { AddBodyMeasurementsDto } from './dto/add-body-measurements.dto';
import { PaginationDto } from '@/common/types';
export declare class StudentProfileController {
    private readonly studentProfileService;
    constructor(studentProfileService: StudentProfileService);
    create(createStudentProfileDto: CreateStudentProfileDto, req: any): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    findAll(paginationDto: PaginationDto, hasCompletedQuiz?: boolean, experienceLevel?: string, primaryGoal?: string): Promise<{
        data: import("./schemas/student-profile.schema").StudentProfile[];
        meta: any;
    }>;
    getMyProfile(req: any): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    getStudentsByGoal(goal: string): Promise<import("./schemas/student-profile.schema").StudentProfile[]>;
    getStudentsByExperienceLevel(level: string): Promise<import("./schemas/student-profile.schema").StudentProfile[]>;
    findOne(id: string): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    update(id: string, updateStudentProfileDto: UpdateStudentProfileDto, req: any): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    remove(id: string): Promise<void>;
    addBodyMeasurements(id: string, measurementsDto: AddBodyMeasurementsDto, req: any): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    getBodyMeasurementsHistory(id: string): Promise<any[]>;
    getProgressStats(id: string): Promise<any>;
    updateFitnessGoals(id: string, goalsUpdate: any): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    markQuizCompleted(id: string): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    addAchievement(id: string, body: {
        achievement: string;
    }): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    enrollInFitnessCourse(id: string, courseId: string): Promise<import("./schemas/student-profile.schema").StudentProfile>;
    unenrollFromFitnessCourse(id: string, courseId: string): Promise<import("./schemas/student-profile.schema").StudentProfile>;
}
