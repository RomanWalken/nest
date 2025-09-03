import { UserCourseSettingsService } from './user-course-settings.service';
import { CreateUserCourseSettingsDto } from './dto/create-user-course-settings.dto';
import { UpdateUserCourseSettingsDto } from './dto/update-user-course-settings.dto';
import { PaginationDto } from '@/common/types';
export declare class UserCourseSettingsController {
    private readonly userCourseSettingsService;
    constructor(userCourseSettingsService: UserCourseSettingsService);
    create(createUserCourseSettingsDto: CreateUserCourseSettingsDto, req: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    findAll(paginationDto: PaginationDto, courseId?: string, userId?: string, isActive?: boolean): Promise<{
        data: import("./schemas/user-course-settings.schema").UserCourseSettings[];
        meta: any;
    }>;
    getMySettings(courseId: string, req: any): Promise<any>;
    findByCourse(courseId: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings[]>;
    findByUser(userId: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings[]>;
    findOne(id: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    update(id: string, updateUserCourseSettingsDto: UpdateUserCourseSettingsDto): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    remove(id: string): Promise<void>;
    addWorkoutOverride(id: string, workoutOverride: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    updateWorkoutOverride(id: string, workoutId: string, updateData: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    removeWorkoutOverride(id: string, workoutId: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    addExerciseOverride(id: string, exerciseOverride: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    updateExerciseOverride(id: string, exerciseId: string, updateData: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    removeExerciseOverride(id: string, exerciseId: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    addLessonOverride(id: string, lessonOverride: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    updateLessonOverride(id: string, lessonId: string, updateData: any): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
    removeLessonOverride(id: string, lessonId: string): Promise<import("./schemas/user-course-settings.schema").UserCourseSettings>;
}
