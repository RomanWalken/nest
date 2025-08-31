import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): Promise<import(".").Teacher>;
    findAll(query: QueryTeacherDto, req: any): Promise<import("@/common/types").PaginatedResponse<import(".").Teacher>>;
    findByCompany(companyId: string): Promise<import(".").Teacher[]>;
    findBySpecialization(specialization: string, companyId?: string): Promise<import(".").Teacher[]>;
    findOne(id: string, req: any): Promise<import(".").Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto, req: any): Promise<import(".").Teacher>;
    remove(id: string, req: any): Promise<void>;
    addCourse(id: string, courseId: string, req: any): Promise<import(".").Teacher>;
    removeCourse(id: string, courseId: string, req: any): Promise<import(".").Teacher>;
}
