import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PaginationDto } from '@/common/types';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    create(createPurchaseDto: CreatePurchaseDto, req: any): Promise<import("./schemas/purchase.schema").Purchase>;
    findAll(paginationDto: PaginationDto, req: any): Promise<{
        data: import("./schemas/purchase.schema").Purchase[];
        meta: any;
    }>;
    findMyPurchases(req: any): Promise<import("./schemas/purchase.schema").Purchase[]>;
    findOne(id: string, req: any): Promise<import("./schemas/purchase.schema").Purchase>;
    update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<import("./schemas/purchase.schema").Purchase>;
    remove(id: string): Promise<void>;
}
