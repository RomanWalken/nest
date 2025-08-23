import { CourseType, DifficultyLevel } from '@/common/types';
export declare class CreateCourseDto {
    title: string;
    slug: string;
    description?: string;
    type: CourseType;
    thumbnail?: string;
    duration?: number;
    difficulty?: DifficultyLevel;
    isPublished?: boolean;
    isFeatured?: boolean;
    tags?: string[];
    metadata?: Record<string, any>;
}
