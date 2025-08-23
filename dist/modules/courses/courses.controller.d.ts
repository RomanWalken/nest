import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '@/common/types';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto, req: any): Promise<import("./schemas/course.schema").Course>;
    findAll(paginationDto: PaginationDto, req: any): Promise<{
        data: import("./schemas/course.schema").Course[];
        meta: any;
    }>;
    findPublished(req: any): Promise<import("./schemas/course.schema").Course[]>;
    findOne(id: string): Promise<import("./schemas/course.schema").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./schemas/course.schema").Course>;
    remove(id: string): Promise<void>;
}
