export declare class CreateLessonDto {
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number;
    order: number;
    isFree?: boolean;
    moduleId: string;
    attachments?: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    metadata?: Record<string, any>;
}
