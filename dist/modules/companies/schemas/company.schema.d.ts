import { Document, Types } from 'mongoose';
export type CompanyDocument = Company & Document;
export declare class Company {
    name: string;
    slug: string;
    description: string;
    logo: string;
    domain: string;
    settings: Record<string, any>;
    ownerId: Types.ObjectId;
    isActive: boolean;
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, Document<unknown, any, Company, any, {}> & Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, Document<unknown, {}, import("mongoose").FlatRecord<Company>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Company> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
