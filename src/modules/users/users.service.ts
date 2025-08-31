import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@/common/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto, companyId?: string): Promise<User> {
    // Проверяем уникальность email
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const userData: any = { ...createUserDto };
    
    // Добавляем companyId только если он передан и валиден
    if (companyId && Types.ObjectId.isValid(companyId)) {
      userData.companyId = new Types.ObjectId(companyId);
    }

    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(paginationDto: PaginationDto = {}, companyId?: string): Promise<{ data: User[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (companyId) {
      filter.companyId = new Types.ObjectId(companyId);
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

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .populate('companyId', 'name slug')
      .exec();

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .populate('companyId', 'name slug')
      .exec();

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { lastLogin: new Date() }).exec();
  }
} 