import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationDto } from '@/common/types';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto, req: any): Promise<import("./schemas/lesson.schema").Lesson>;
    findAll(paginationDto: PaginationDto, moduleId?: string): Promise<{
        data: import("./schemas/lesson.schema").Lesson[];
        meta: any;
    }>;
    findByModule(moduleId: string): Promise<import("./schemas/lesson.schema").Lesson[]>;
    getFreeContent(moduleId?: string): Promise<import("./schemas/lesson.schema").Lesson[]>;
    findOne(id: string): Promise<import("./schemas/lesson.schema").Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<import("./schemas/lesson.schema").Lesson>;
    remove(id: string): Promise<void>;
}
