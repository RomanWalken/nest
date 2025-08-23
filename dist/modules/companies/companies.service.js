"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./schemas/company.schema");
let CompaniesService = class CompaniesService {
    constructor(companyModel) {
        this.companyModel = companyModel;
    }
    async create(createCompanyDto, ownerId) {
        const existingCompany = await this.companyModel.findOne({
            $or: [
                { slug: createCompanyDto.slug },
                { domain: createCompanyDto.domain }
            ]
        });
        if (existingCompany) {
            throw new common_1.ConflictException('Компания с таким slug или domain уже существует');
        }
        const company = new this.companyModel({
            ...createCompanyDto,
            ownerId: new mongoose_2.Types.ObjectId(ownerId),
        });
        return company.save();
    }
    async findAll(paginationDto = {}, companyId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (companyId) {
            filter._id = new mongoose_2.Types.ObjectId(companyId);
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
    async findOne(id) {
        const company = await this.companyModel
            .findById(id)
            .populate('ownerId', 'firstName lastName email')
            .exec();
        if (!company) {
            throw new common_1.NotFoundException('Компания не найдена');
        }
        return company;
    }
    async findBySlug(slug) {
        const company = await this.companyModel
            .findOne({ slug })
            .populate('ownerId', 'firstName lastName email')
            .exec();
        if (!company) {
            throw new common_1.NotFoundException('Компания не найдена');
        }
        return company;
    }
    async findByDomain(domain) {
        const company = await this.companyModel
            .findOne({ domain })
            .populate('ownerId', 'firstName lastName email')
            .exec();
        if (!company) {
            throw new common_1.NotFoundException('Компания не найдена');
        }
        return company;
    }
    async update(id, updateCompanyDto) {
        const company = await this.companyModel
            .findByIdAndUpdate(id, updateCompanyDto, { new: true })
            .populate('ownerId', 'firstName lastName email')
            .exec();
        if (!company) {
            throw new common_1.NotFoundException('Компания не найдена');
        }
        return company;
    }
    async remove(id) {
        const result = await this.companyModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Компания не найдена');
        }
    }
    async isOwner(companyId, userId) {
        const company = await this.companyModel.findById(companyId).exec();
        return company?.ownerId.toString() === userId;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map