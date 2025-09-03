import { TariffStatus } from '@/common/types';
export declare class CreateTariffDto {
    name: string;
    description?: string;
    image?: string;
    oldPrice?: number;
    newPrice: number;
    currency?: string;
    duration: number;
    status?: TariffStatus;
    courseId: string;
    lessonIds?: string[];
    workoutIds?: string[];
    advantages?: string[];
    includesDoctor?: boolean;
    features?: Record<string, any>;
    stripePriceId?: string;
    stripeProductId?: string;
    wayforpayProductId?: string;
    externalId?: string;
    stripeMetadata?: Record<string, string>;
    wayforpayMetadata?: Record<string, any>;
}
