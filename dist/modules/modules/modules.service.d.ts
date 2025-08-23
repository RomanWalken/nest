import { Model } from 'mongoose';
import { Module as CourseModule, ModuleDocument } from './schemas/module.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PaginationDto } from '@/common/types';
export declare class ModulesService {
    private moduleModel;
    constructor(moduleModel: Model<ModuleDocument>);
    create(createModuleDto: CreateModuleDto): Promise<CourseModule>;
    findAll(paginationDto?: PaginationDto, courseId?: string): Promise<{
        data: CourseModule[];
        meta: any;
    }>;
    findOne(id: string): Promise<CourseModule>;
    findByCourse(courseId: string): Promise<CourseModule[]>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<CourseModule>;
    remove(id: string): Promise<void>;
    reorderModules(courseId: string, moduleIds: string[]): Promise<CourseModule[]>;
}
