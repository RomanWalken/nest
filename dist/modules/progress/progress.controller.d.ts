import { PaginationDto } from '@/common/types';
export declare class UserProgressController {
    constructor();
    create(createProgressDto: any, req: any): {
        message: string;
        data: any;
    };
    findAll(paginationDto: PaginationDto, req: any): {
        message: string;
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
    findOne(id: string, req: any): {
        message: string;
        data: {
            id: string;
            progressPercentage: number;
        };
    };
    update(id: string, updateProgressDto: any, req: any): {
        message: string;
        data: any;
    };
    remove(id: string): {
        message: string;
        data: {
            id: string;
        };
    };
}
