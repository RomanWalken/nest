import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Purchase, PurchaseDocument } from './schemas/purchase.schema';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PaginationDto, PaymentStatus } from '@/common/types';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto, userId: string): Promise<Purchase> {
    // Проверяем, не покупал ли пользователь уже этот курс
    const existingPurchase = await this.purchaseModel.findOne({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(createPurchaseDto.courseId),
      paymentStatus: PaymentStatus.COMPLETED,
    });

    if (existingPurchase) {
      // Проверяем, не истек ли доступ
      if (!existingPurchase.accessExpiresAt || existingPurchase.accessExpiresAt > new Date()) {
        throw new ConflictException('Пользователь уже имеет доступ к этому курсу');
      }
    }

    // Рассчитываем дату истечения доступа на основе тарифа
    let accessExpiresAt: Date | undefined;
    if (createPurchaseDto.tariffDuration && createPurchaseDto.tariffDuration > 0) {
      accessExpiresAt = new Date();
      accessExpiresAt.setDate(accessExpiresAt.getDate() + createPurchaseDto.tariffDuration);
    }

    const purchase = new this.purchaseModel({
      ...createPurchaseDto,
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(createPurchaseDto.courseId),
      tariffId: new Types.ObjectId(createPurchaseDto.tariffId),
      accessExpiresAt,
    });

    return purchase.save();
  }

  async findAll(paginationDto: PaginationDto = {}, userId?: string): Promise<{ data: Purchase[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (userId) {
      filter.userId = new Types.ObjectId(userId);
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

  async findOne(id: string): Promise<Purchase> {
    const purchase = await this.purchaseModel
      .findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug thumbnail')
      .populate('tariffId', 'name price currency duration')
      .exec();

    if (!purchase) {
      throw new NotFoundException('Покупка не найдена');
    }

    return purchase;
  }

  async findUserPurchases(userId: string): Promise<Purchase[]> {
    return this.purchaseModel
      .find({ 
        userId: new Types.ObjectId(userId),
        paymentStatus: PaymentStatus.COMPLETED
      })
      .populate('courseId', 'title slug thumbnail')
      .populate('tariffId', 'name price currency duration')
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    const updateData: any = { ...updatePurchaseDto };
    
    if (updatePurchaseDto.courseId) {
      updateData.courseId = new Types.ObjectId(updatePurchaseDto.courseId);
    }
    
    if (updatePurchaseDto.tariffId) {
      updateData.tariffId = new Types.ObjectId(updatePurchaseDto.tariffId);
    }

    const purchase = await this.purchaseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title slug thumbnail')
      .populate('tariffId', 'name price currency duration')
      .exec();

    if (!purchase) {
      throw new NotFoundException('Покупка не найдена');
    }

    return purchase;
  }

  async remove(id: string): Promise<void> {
    const result = await this.purchaseModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Покупка не найдена');
    }
  }

  async hasAccess(userId: string, courseId: string): Promise<boolean> {
    const purchase = await this.purchaseModel.findOne({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
      paymentStatus: PaymentStatus.COMPLETED,
    });

    if (!purchase) {
      return false;
    }

    // Проверяем, не истек ли доступ
    if (purchase.accessExpiresAt && purchase.accessExpiresAt <= new Date()) {
      return false;
    }

    return true;
  }

  async updatePaymentStatus(id: string, status: PaymentStatus, transactionId?: string): Promise<Purchase> {
    const updateData: any = { paymentStatus: status };
    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    return this.purchaseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
} 