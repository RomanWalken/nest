import { TariffsService } from './tariffs.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PaginationDto } from '@/common/types';
export declare class TariffsController {
    private readonly tariffsService;
    constructor(tariffsService: TariffsService);
    create(createTariffDto: CreateTariffDto, req: any): Promise<import("./schemas/tariff.schema").Tariff>;
    findAll(paginationDto: PaginationDto, courseId?: string): Promise<{
        data: import("./schemas/tariff.schema").Tariff[];
        meta: any;
    }>;
    findByCourse(courseId: string): Promise<import("./schemas/tariff.schema").Tariff[]>;
    findOne(id: string): Promise<import("./schemas/tariff.schema").Tariff>;
    update(id: string, updateTariffDto: UpdateTariffDto): Promise<import("./schemas/tariff.schema").Tariff>;
    remove(id: string): Promise<void>;
}
