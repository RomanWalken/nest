export declare class CreateDoctorDto {
    userId: string;
    courseId: string;
    userFiles?: string[];
    courseFiles?: string[];
    isActive?: boolean;
    metadata?: Record<string, any>;
}
