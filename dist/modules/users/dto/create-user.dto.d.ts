import { UserRole } from '@/common/types';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
    role?: UserRole;
    profile?: Record<string, any>;
}
