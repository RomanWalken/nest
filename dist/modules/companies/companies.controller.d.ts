import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '@/common/types';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto, req: any): Promise<import("./schemas/company.schema").Company>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: import("./schemas/company.schema").Company[];
        meta: any;
    }>;
    findBySlug(slug: string): Promise<import("./schemas/company.schema").Company>;
    findByDomain(domain: string): Promise<import("./schemas/company.schema").Company>;
    findOne(id: string): Promise<import("./schemas/company.schema").Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<import("./schemas/company.schema").Company>;
    remove(id: string): Promise<void>;
}
