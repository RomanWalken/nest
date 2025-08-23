import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '@/common/types';
export declare class CompaniesService {
    private companyModel;
    constructor(companyModel: Model<CompanyDocument>);
    create(createCompanyDto: CreateCompanyDto, ownerId: string): Promise<Company>;
    findAll(paginationDto?: PaginationDto, companyId?: string): Promise<{
        data: Company[];
        meta: any;
    }>;
    findOne(id: string): Promise<Company>;
    findBySlug(slug: string): Promise<Company>;
    findByDomain(domain: string): Promise<Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    remove(id: string): Promise<void>;
    isOwner(companyId: string, userId: string): Promise<boolean>;
}
