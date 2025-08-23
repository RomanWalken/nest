import { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './schemas/purchase.schema';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PaginationDto, PaymentStatus } from '@/common/types';
export declare class PurchasesService {
    private purchaseModel;
    constructor(purchaseModel: Model<PurchaseDocument>);
    create(createPurchaseDto: CreatePurchaseDto, userId: string): Promise<Purchase>;
    findAll(paginationDto?: PaginationDto, userId?: string): Promise<{
        data: Purchase[];
        meta: any;
    }>;
    findOne(id: string): Promise<Purchase>;
    findUserPurchases(userId: string): Promise<Purchase[]>;
    update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase>;
    remove(id: string): Promise<void>;
    hasAccess(userId: string, courseId: string): Promise<boolean>;
    updatePaymentStatus(id: string, status: PaymentStatus, transactionId?: string): Promise<Purchase>;
}
