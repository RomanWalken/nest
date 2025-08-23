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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const purchase_schema_1 = require("./schemas/purchase.schema");
const types_1 = require("../../common/types");
let PurchasesService = class PurchasesService {
    constructor(purchaseModel) {
        this.purchaseModel = purchaseModel;
    }
    async create(createPurchaseDto, userId) {
        const existingPurchase = await this.purchaseModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            courseId: new mongoose_2.Types.ObjectId(createPurchaseDto.courseId),
            paymentStatus: types_1.PaymentStatus.COMPLETED,
        });
        if (existingPurchase) {
            if (!existingPurchase.accessExpiresAt || existingPurchase.accessExpiresAt > new Date()) {
                throw new common_1.ConflictException('Пользователь уже имеет доступ к этому курсу');
            }
        }
        let accessExpiresAt;
        if (createPurchaseDto.tariffDuration && createPurchaseDto.tariffDuration > 0) {
            accessExpiresAt = new Date();
            accessExpiresAt.setDate(accessExpiresAt.getDate() + createPurchaseDto.tariffDuration);
        }
        const purchase = new this.purchaseModel({
            ...createPurchaseDto,
            userId: new mongoose_2.Types.ObjectId(userId),
            courseId: new mongoose_2.Types.ObjectId(createPurchaseDto.courseId),
            tariffId: new mongoose_2.Types.ObjectId(createPurchaseDto.tariffId),
            accessExpiresAt,
        });
        return purchase.save();
    }
    async findAll(paginationDto = {}, userId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (userId) {
            filter.userId = new mongoose_2.Types.ObjectId(userId);
        }
        const [purchases, total] = await Promise.all([
            this.purchaseModel
                .find(filter)
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title slug thumbnail')
                .populate('tariffId', 'name price currency duration')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.purchaseModel.countDocuments(filter),
        ]);
        return {
            data: purchases,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const purchase = await this.purchaseModel
            .findById(id)
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug thumbnail')
            .populate('tariffId', 'name price currency duration')
            .exec();
        if (!purchase) {
            throw new common_1.NotFoundException('Покупка не найдена');
        }
        return purchase;
    }
    async findUserPurchases(userId) {
        return this.purchaseModel
            .find({
            userId: new mongoose_2.Types.ObjectId(userId),
            paymentStatus: types_1.PaymentStatus.COMPLETED
        })
            .populate('courseId', 'title slug thumbnail')
            .populate('tariffId', 'name price currency duration')
            .sort({ createdAt: -1 })
            .exec();
    }
    async update(id, updatePurchaseDto) {
        const updateData = { ...updatePurchaseDto };
        if (updatePurchaseDto.courseId) {
            updateData.courseId = new mongoose_2.Types.ObjectId(updatePurchaseDto.courseId);
        }
        if (updatePurchaseDto.tariffId) {
            updateData.tariffId = new mongoose_2.Types.ObjectId(updatePurchaseDto.tariffId);
        }
        const purchase = await this.purchaseModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug thumbnail')
            .populate('tariffId', 'name price currency duration')
            .exec();
        if (!purchase) {
            throw new common_1.NotFoundException('Покупка не найдена');
        }
        return purchase;
    }
    async remove(id) {
        const result = await this.purchaseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Покупка не найдена');
        }
    }
    async hasAccess(userId, courseId) {
        const purchase = await this.purchaseModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            courseId: new mongoose_2.Types.ObjectId(courseId),
            paymentStatus: types_1.PaymentStatus.COMPLETED,
        });
        if (!purchase) {
            return false;
        }
        if (purchase.accessExpiresAt && purchase.accessExpiresAt <= new Date()) {
            return false;
        }
        return true;
    }
    async updatePaymentStatus(id, status, transactionId) {
        const updateData = { paymentStatus: status };
        if (transactionId) {
            updateData.transactionId = transactionId;
        }
        return this.purchaseModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(purchase_schema_1.Purchase.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map