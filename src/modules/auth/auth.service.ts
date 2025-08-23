import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Преобразуем Mongoose документ в простой объект
      const userObj = (user as any).toObject ? (user as any).toObject() : user;
      const { password, ...result } = userObj;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user._id, 
      role: user.role,
      companyId: user.companyId 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        companyId: user.companyId,
      },
    };
  }

  async register(createUserDto: any, companyId?: string) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Если companyId не передан, создаем временную компанию или используем дефолтную
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    }, companyId || 'default-company-id');
    
    return this.login(user);
  }
} 