export declare class CreateTariffDto {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    duration: number;
    isActive?: boolean;
    courseId: string;
    lessonIds?: string[];
    features?: Record<string, any>;
}
