import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '@/common/types';
export declare class CoursesService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(createCourseDto: CreateCourseDto, authorId: string, companyId: string): Promise<Course>;
    findAll(paginationDto?: PaginationDto, companyId?: string): Promise<{
        data: Course[];
        meta: any;
    }>;
    findOne(id: string): Promise<Course>;
    findBySlug(slug: string, companyId: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<void>;
    findByCompany(companyId: string): Promise<Course[]>;
    findPublished(companyId?: string): Promise<Course[]>;
}
