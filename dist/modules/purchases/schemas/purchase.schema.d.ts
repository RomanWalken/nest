import { Document, Types } from 'mongoose';
import { PaymentStatus, PaymentMethod } from '@/common/types';
export type PurchaseDocument = Purchase & Document;
export declare class Purchase {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    tariffId: Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    transactionId: string;
    accessExpiresAt: Date;
    metadata: Record<string, any>;
}
export declare const PurchaseSchema: import("mongoose").Schema<Purchase, import("mongoose").Model<Purchase, any, any, any, Document<unknown, any, Purchase, any, {}> & Purchase & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Purchase, Document<unknown, {}, import("mongoose").FlatRecord<Purchase>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Purchase> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
