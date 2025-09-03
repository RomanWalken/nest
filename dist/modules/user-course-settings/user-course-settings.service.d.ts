import { Model } from 'mongoose';
import { UserCourseSettings, UserCourseSettingsDocument } from './schemas/user-course-settings.schema';
import { CreateUserCourseSettingsDto } from './dto/create-user-course-settings.dto';
import { UpdateUserCourseSettingsDto } from './dto/update-user-course-settings.dto';
import { PaginationDto } from '@/common/types';
export declare class UserCourseSettingsService {
    private userCourseSettingsModel;
    constructor(userCourseSettingsModel: Model<UserCourseSettingsDocument>);
    create(createUserCourseSettingsDto: CreateUserCourseSettingsDto): Promise<UserCourseSettings>;
    findAll(paginationDto: PaginationDto, courseId?: string, userId?: string, isActive?: boolean): Promise<{
        data: UserCourseSettings[];
        meta: any;
    }>;
    findOne(id: string): Promise<UserCourseSettings>;
    findByUserAndCourse(userId: string, courseId: string): Promise<UserCourseSettings | null>;
    update(id: string, updateUserCourseSettingsDto: UpdateUserCourseSettingsDto): Promise<UserCourseSettings>;
    remove(id: string): Promise<void>;
    findByCourse(courseId: string): Promise<UserCourseSettings[]>;
    findByUser(userId: string): Promise<UserCourseSettings[]>;
    addWorkoutOverride(settingsId: string, workoutOverride: any): Promise<UserCourseSettings>;
    updateWorkoutOverride(settingsId: string, workoutId: string, updateData: any): Promise<UserCourseSettings>;
    removeWorkoutOverride(settingsId: string, workoutId: string): Promise<UserCourseSettings>;
    addExerciseOverride(settingsId: string, exerciseOverride: any): Promise<UserCourseSettings>;
    updateExerciseOverride(settingsId: string, exerciseId: string, updateData: any): Promise<UserCourseSettings>;
    removeExerciseOverride(settingsId: string, exerciseId: string): Promise<UserCourseSettings>;
    addLessonOverride(settingsId: string, lessonOverride: any): Promise<UserCourseSettings>;
    updateLessonOverride(settingsId: string, lessonId: string, updateData: any): Promise<UserCourseSettings>;
    removeLessonOverride(settingsId: string, lessonId: string): Promise<UserCourseSettings>;
    getMergedSettings(userId: string, courseId: string): Promise<any>;
}
