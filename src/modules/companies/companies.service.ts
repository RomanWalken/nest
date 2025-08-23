import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, ownerId: string): Promise<Company> {
    // Проверяем уникальность slug и domain
    const existingCompany = await this.companyModel.findOne({
      $or: [
        { slug: createCompanyDto.slug },
        { domain: createCompanyDto.domain }
      ]
    });

    if (existingCompany) {
      throw new ConflictException('Компания с таким slug или domain уже существует');
    }

    const company = new this.companyModel({
      ...createCompanyDto,
      ownerId: new Types.ObjectId(ownerId),
    });

    return company.save();
  }

  async findAll(paginationDto: PaginationDto = {}, companyId?: string): Promise<{ data: Company[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (companyId) {
      filter._id = new Types.ObjectId(companyId);
    }

    const [companies, total] = await Promise.all([
      this.companyModel
        .find(filter)
        .populate('ownerId', 'firstName lastName email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.companyModel.countDocuments(filter),
    ]);

    return {
      data: companies,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel
      .findById(id)
      .populate('ownerId', 'firstName lastName email')
      .exec();

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    return company;
  }

  async findBySlug(slug: string): Promise<Company> {
    const company = await this.companyModel
      .findOne({ slug })
      .populate('ownerId', 'firstName lastName email')
      .exec();

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    return company;
  }

  async findByDomain(domain: string): Promise<Company> {
    const company = await this.companyModel
      .findOne({ domain })
      .populate('ownerId', 'firstName lastName email')
      .exec();

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .populate('ownerId', 'firstName lastName email')
      .exec();

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    return company;
  }

  async remove(id: string): Promise<void> {
    const result = await this.companyModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Компания не найдена');
    }
  }

  async isOwner(companyId: string, userId: string): Promise<boolean> {
    const company = await this.companyModel.findById(companyId).exec();
    return company?.ownerId.toString() === userId;
  }
} 