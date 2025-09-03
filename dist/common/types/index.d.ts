export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    MODERATOR = "moderator",
    ADMIN = "admin",
    SUPERADMIN = "superadmin"
}
export declare enum CourseKind {
    REGULAR = "regular",
    FITNESS = "fitness"
}
export declare enum CourseCategory {
    VIDEO = "video",
    COOKING = "cooking",
    PROGRAMMING = "programming",
    DESIGN = "design",
    BUSINESS = "business",
    LANGUAGE = "language",
    MUSIC = "music",
    ART = "art",
    FITNESS_TRAINING = "fitness_training",
    YOGA = "yoga",
    PILATES = "pilates",
    NUTRITION = "nutrition",
    WELLNESS = "wellness",
    CUSTOM = "custom"
}
export declare enum CoursePublicationStatus {
    DRAFT = "draft",
    COMING_SOON = "coming_soon",
    PUBLISHED = "published"
}
export declare enum LessonType {
    VIDEO = "video",
    TEXT = "text",
    PRESENTATION = "presentation",
    QUIZ = "quiz"
}
export declare enum DietaryCategory {
    VEGAN = "vegan",
    VEGETARIAN = "vegetarian",
    OMNIVORE = "omnivore",
    PESCATARIAN = "pescatarian",
    KETO = "keto",
    PALEO = "paleo",
    GLUTEN_FREE = "gluten_free",
    DAIRY_FREE = "dairy_free",
    LOW_CARB = "low_carb",
    HIGH_PROTEIN = "high_protein"
}
export declare enum TariffStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SOLD_OUT = "sold_out"
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
export declare enum PaymentProvider {
    STRIPE = "stripe",
    WAYFORPAY = "wayforpay"
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
export interface PaymentProviderConfig {
    stripe: {
        publishableKey: string;
        secretKey: string;
        webhookSecret: string;
    };
    wayforpay: {
        merchantAccount: string;
        merchantSecretKey: string;
        merchantDomainName: string;
    };
}
export interface StripePaymentData {
    paymentIntentId: string;
    customerId?: string;
    metadata?: Record<string, string>;
}
export interface WayForPayPaymentData {
    orderReference: string;
    transactionId?: string;
    merchantAccount: string;
    metadata?: Record<string, any>;
}
