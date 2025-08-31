import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseKind } from '@/common/types';
import { PaginationDto } from '@/common/types';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto, req: any): Promise<import("./schemas/course.schema").Course>;
    findAll(paginationDto: PaginationDto, req: any, kind?: CourseKind): Promise<{
        data: import("./schemas/course.schema").Course[];
        meta: any;
    }>;
    findFitnessCourses(req: any): Promise<import("./schemas/course.schema").Course[]>;
    findRegularCourses(req: any): Promise<import("./schemas/course.schema").Course[]>;
    findByCategory(category: string, req: any): Promise<import("./schemas/course.schema").Course[]>;
    findPublished(req: any): Promise<import("./schemas/course.schema").Course[]>;
    findOne(id: string): Promise<import("./schemas/course.schema").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./schemas/course.schema").Course>;
    remove(id: string): Promise<void>;
    addMealToCourse(id: string, mealId: string): Promise<import("./schemas/course.schema").Course>;
    removeMealFromCourse(id: string, mealId: string): Promise<import("./schemas/course.schema").Course>;
    addTeacherToCourse(id: string, teacherId: string): Promise<import("./schemas/course.schema").Course>;
    removeTeacherFromCourse(id: string, teacherId: string): Promise<import("./schemas/course.schema").Course>;
}
