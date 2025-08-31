export declare class CreateTeacherDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
    companyId: string;
    specialization: string;
    skills?: string[];
    certificates?: string[];
    experience?: number;
    bio?: string;
    languages?: string[];
    schedule?: Record<string, any>;
    profile?: Record<string, any>;
}
