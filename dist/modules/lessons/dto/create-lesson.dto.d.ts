import { LessonType } from '@/common/types';
export declare class CreateLessonDto {
    title: string;
    description?: string;
    content?: string;
    type: LessonType;
    videoUrl?: string;
    duration?: number;
    order: number;
    isFree?: boolean;
    moduleId: string;
    tariffs?: string[];
    attachments?: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    quizData?: Record<string, any>;
    presentationData?: Record<string, any>;
    metadata?: Record<string, any>;
}
