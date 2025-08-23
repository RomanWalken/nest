export enum UserRole {
  STUDENT = 'student',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export enum CourseType {
  FITNESS = 'fitness',
  VIDEO = 'video',
  COOKING = 'cooking',
  CUSTOM = 'custom',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum PaymentMethod {
  WAYFORPAY = 'wayforpay',
  STRIPE = 'stripe',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

export interface ApiError {
  error: string;
  code: number;
  details?: any;
  timestamp: string;
} 