import { PaginationDto } from '@/common/types';
export declare class QueryTeacherDto implements PaginationDto {
    page?: number;
    limit?: number;
    search?: string;
    specialization?: string;
    skills?: string[];
    isActive?: boolean;
    languages?: string[];
}
