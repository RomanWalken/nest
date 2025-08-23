import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationDto } from '@/common/types';
export declare class LessonsService {
    private lessonModel;
    constructor(lessonModel: Model<LessonDocument>);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findAll(paginationDto?: PaginationDto, moduleId?: string): Promise<{
        data: Lesson[];
        meta: any;
    }>;
    findOne(id: string): Promise<Lesson>;
    findByModule(moduleId: string): Promise<Lesson[]>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: string): Promise<void>;
    reorderLessons(moduleId: string, lessonIds: string[]): Promise<Lesson[]>;
    getFreeContent(moduleId?: string): Promise<Lesson[]>;
}
