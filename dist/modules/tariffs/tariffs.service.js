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
exports.TariffsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tariff_schema_1 = require("./schemas/tariff.schema");
let TariffsService = class TariffsService {
    constructor(tariffModel) {
        this.tariffModel = tariffModel;
    }
    async create(createTariffDto) {
        const tariff = new this.tariffModel({
            ...createTariffDto,
            courseId: new mongoose_2.Types.ObjectId(createTariffDto.courseId),
            lessonIds: createTariffDto.lessonIds?.map(id => new mongoose_2.Types.ObjectId(id)) || [],
        });
        return tariff.save();
    }
    async findAll(paginationDto = {}, courseId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (courseId) {
            filter.courseId = new mongoose_2.Types.ObjectId(courseId);
        }
        const [tariffs, total] = await Promise.all([
            this.tariffModel
                .find(filter)
                .populate('courseId', 'title slug')
                .populate('lessonIds', 'title order')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.tariffModel.countDocuments(filter),
        ]);
        return {
            data: tariffs,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const tariff = await this.tariffModel
            .findById(id)
            .populate('courseId', 'title slug')
            .populate('lessonIds', 'title order')
            .exec();
        if (!tariff) {
            throw new common_1.NotFoundException('Тариф не найден');
        }
        return tariff;
    }
    async findByCourse(courseId) {
        return this.tariffModel
            .find({ courseId: new mongoose_2.Types.ObjectId(courseId), isActive: true })
            .populate('lessonIds', 'title order')
            .sort({ price: 1 })
            .exec();
    }
    async update(id, updateTariffDto) {
        const updateData = { ...updateTariffDto };
        if (updateTariffDto.courseId) {
            updateData.courseId = new mongoose_2.Types.ObjectId(updateTariffDto.courseId);
        }
        if (updateTariffDto.lessonIds) {
            updateData.lessonIds = updateTariffDto.lessonIds.map(id => new mongoose_2.Types.ObjectId(id));
        }
        const tariff = await this.tariffModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('courseId', 'title slug')
            .populate('lessonIds', 'title order')
            .exec();
        if (!tariff) {
            throw new common_1.NotFoundException('Тариф не найден');
        }
        return tariff;
    }
    async remove(id) {
        const result = await this.tariffModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Тариф не найден');
        }
    }
    async getActiveTariffs(courseId) {
        return this.tariffModel
            .find({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            isActive: true
        })
            .populate('lessonIds', 'title order')
            .sort({ price: 1 })
            .exec();
    }
};
exports.TariffsService = TariffsService;
exports.TariffsService = TariffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tariff_schema_1.Tariff.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TariffsService);
//# sourceMappingURL=tariffs.service.js.map