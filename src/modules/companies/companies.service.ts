import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, ownerId: string): Promise<Company> {
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
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

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
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

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
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }

    const result = await this.companyModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Компания не найдена');
    }
  }

  async isOwner(companyId: string, userId: string): Promise<boolean> {
    // Валидация ObjectId
    if (!Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException(`Невалидный ID компании: ${companyId}. ID должен быть 24-символьной hex строкой.`);
    }

    const company = await this.companyModel.findById(companyId).exec();
    return company?.ownerId.toString() === userId;
  }
} 