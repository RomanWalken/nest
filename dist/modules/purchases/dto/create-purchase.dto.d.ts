import { PaymentMethod } from '@/common/types';
export declare class CreatePurchaseDto {
    courseId: string;
    tariffId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    tariffDuration?: number;
    transactionId?: string;
}
