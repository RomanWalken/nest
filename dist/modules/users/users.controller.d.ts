import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@/common/types';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: any): Promise<import("./schemas/user.schema").User>;
    findAll(paginationDto: PaginationDto, req: any): Promise<{
        data: import("./schemas/user.schema").User[];
        meta: any;
    }>;
    findOne(id: string, req: any): Promise<import("./schemas/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
    remove(id: string): Promise<void>;
}
