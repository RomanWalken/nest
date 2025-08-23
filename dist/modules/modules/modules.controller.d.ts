import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PaginationDto } from '@/common/types';
export declare class CourseModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    create(createModuleDto: CreateModuleDto, req: any): Promise<import("./schemas/module.schema").Module>;
    findAll(paginationDto: PaginationDto, courseId?: string): Promise<{
        data: import("./schemas/module.schema").Module[];
        meta: any;
    }>;
    findByCourse(courseId: string): Promise<import("./schemas/module.schema").Module[]>;
    findOne(id: string): Promise<import("./schemas/module.schema").Module>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<import("./schemas/module.schema").Module>;
    remove(id: string): Promise<void>;
}
