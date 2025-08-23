export declare enum UserRole {
    STUDENT = "student",
    MODERATOR = "moderator",
    ADMIN = "admin",
    SUPERADMIN = "superadmin"
}
export declare enum CourseType {
    FITNESS = "fitness",
    VIDEO = "video",
    COOKING = "cooking",
    CUSTOM = "custom"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare enum PaymentMethod {
    WAYFORPAY = "wayforpay",
    STRIPE = "stripe"
}
export declare enum DifficultyLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
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
