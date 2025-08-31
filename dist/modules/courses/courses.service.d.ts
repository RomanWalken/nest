import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto, CourseKind } from '@/common/types';
export declare class CoursesService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(createCourseDto: CreateCourseDto, authorId: string, companyId: string): Promise<Course>;
    findAll(paginationDto?: PaginationDto, companyId?: string, kind?: CourseKind): Promise<{
        data: Course[];
        meta: any;
    }>;
    findOne(id: string): Promise<Course>;
    findBySlug(slug: string, companyId: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<void>;
    findByCompany(companyId: string): Promise<Course[]>;
    findPublished(companyId?: string): Promise<Course[]>;
    findFitnessCourses(companyId?: string): Promise<Course[]>;
    findRegularCourses(companyId?: string): Promise<Course[]>;
    findByCategory(category: string, companyId?: string): Promise<Course[]>;
    addMealToCourse(courseId: string, mealId: string): Promise<Course>;
    removeMealFromCourse(courseId: string, mealId: string): Promise<Course>;
    addTeacherToCourse(courseId: string, teacherId: string): Promise<Course>;
    removeTeacherFromCourse(courseId: string, teacherId: string): Promise<Course>;
}
