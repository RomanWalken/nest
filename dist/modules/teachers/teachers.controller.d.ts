import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): Promise<import(".").Teacher>;
    findAll(query: QueryTeacherDto): Promise<import("@/common/types").PaginatedResponse<import(".").Teacher>>;
    findOne(id: string): Promise<import(".").Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<import(".").Teacher>;
    remove(id: string): Promise<void>;
    addCourse(id: string, courseId: string): Promise<import(".").Teacher>;
    removeCourse(id: string, courseId: string): Promise<import(".").Teacher>;
    updatePassword(id: string, newPassword: string): Promise<void>;
    verifyEmail(id: string): Promise<void>;
}
