import { CourseKind, CourseCategory, DifficultyLevel, CoursePublicationStatus } from '@/common/types';
export declare class CreateCourseDto {
    title: string;
    slug: string;
    description?: string;
    kind: CourseKind;
    category: CourseCategory;
    thumbnail?: string;
    duration?: number;
    difficulty?: DifficultyLevel;
    publicationStatus?: CoursePublicationStatus;
    isFeatured?: boolean;
    isPaid?: boolean;
    tags?: string[];
    metadata?: Record<string, any>;
    meals?: string[];
    teachers?: string[];
    workouts?: string[];
    hasMeals?: boolean;
    hasDoctor?: boolean;
    modules?: string[];
}
