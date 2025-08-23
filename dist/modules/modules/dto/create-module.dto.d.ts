export declare class CreateModuleDto {
    title: string;
    description?: string;
    order: number;
    isFree?: boolean;
    courseId: string;
    metadata?: Record<string, any>;
}
