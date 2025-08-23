export declare class CreateCompanyDto {
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    domain: string;
    settings?: Record<string, any>;
    isActive?: boolean;
}
