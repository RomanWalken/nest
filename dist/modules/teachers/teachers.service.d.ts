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
    findAll(query: QueryTeacherDto): Promise<PaginatedResponse<Teacher>>;
    findOne(id: string): Promise<Teacher>;
    findByEmail(email: string): Promise<Teacher | null>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher>;
    remove(id: string): Promise<void>;
    addCourse(teacherId: string, courseId: string): Promise<Teacher>;
    removeCourse(teacherId: string, courseId: string): Promise<Teacher>;
    updatePassword(id: string, newPassword: string): Promise<void>;
    verifyEmail(id: string): Promise<void>;
    updateLastLogin(id: string): Promise<void>;
}
