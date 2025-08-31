"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto, companyId) {
        const existingUser = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new common_1.ConflictException('Пользователь с таким email уже существует');
        }
        const userData = { ...createUserDto };
        if (companyId && mongoose_2.Types.ObjectId.isValid(companyId)) {
            userData.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        const user = new this.userModel(userData);
        return user.save();
    }
    async findAll(paginationDto = {}, companyId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (companyId) {
            filter.companyId = new mongoose_2.Types.ObjectId(companyId);
        }
        const [users, total] = await Promise.all([
            this.userModel
                .find(filter)
                .select('-password')
                .populate('companyId', 'name slug')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.userModel.countDocuments(filter),
        ]);
        return {
            data: users,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.userModel
            .findById(id)
            .select('-password')
            .populate('companyId', 'name slug')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async update(id, updateUserDto) {
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .select('-password')
            .populate('companyId', 'name slug')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async remove(id) {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
    }
    async updateLastLogin(id) {
        await this.userModel.findByIdAndUpdate(id, { lastLogin: new Date() }).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map