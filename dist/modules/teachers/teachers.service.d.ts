import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { PaginatedResponse } from '@/common/types';
export declare class TeachersService {
    private teacherModel;
    constructor(teacherModel: Model<TeacherDocument>);
    create(createTeacherDto: CreateTeacherDto): Promise<Teacher>;
    findAll(query: QueryTeacherDto, userCompanyId?: string): Promise<PaginatedResponse<Teacher>>;
    findOne(id: string, userCompanyId?: string): Promise<Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto, userCompanyId?: string): Promise<Teacher>;
    remove(id: string, userCompanyId?: string): Promise<void>;
    findByCompany(companyId: string): Promise<Teacher[]>;
    findBySpecialization(specialization: string, companyId?: string): Promise<Teacher[]>;
    addCourse(teacherId: string, courseId: string, userCompanyId?: string): Promise<Teacher>;
    removeCourse(teacherId: string, courseId: string, userCompanyId?: string): Promise<Teacher>;
}
