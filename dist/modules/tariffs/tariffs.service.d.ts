import { Model } from 'mongoose';
import { Tariff, TariffDocument } from './schemas/tariff.schema';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PaginationDto } from '@/common/types';
export declare class TariffsService {
    private tariffModel;
    constructor(tariffModel: Model<TariffDocument>);
    create(createTariffDto: CreateTariffDto): Promise<Tariff>;
    findAll(paginationDto?: PaginationDto, courseId?: string): Promise<{
        data: Tariff[];
        meta: any;
    }>;
    findOne(id: string): Promise<Tariff>;
    findByCourse(courseId: string): Promise<Tariff[]>;
    update(id: string, updateTariffDto: UpdateTariffDto): Promise<Tariff>;
    remove(id: string): Promise<void>;
    getActiveTariffs(courseId: string): Promise<Tariff[]>;
}
