import { IsString, IsEmail, IsOptional, IsEnum, IsObject, MaxLength, IsUrl, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@/common/types';
import { IsStrongPassword } from '@/common/validators/password.validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Email пользователя (уникальный в рамках компании)',
    example: 'john.doe@example.com',
    format: 'email'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Пароль пользователя (минимум 8 символов, должен содержать заглавную букву, строчную букву, цифру и специальный символ)',
    example: 'SecurePass123!',
    minLength: 8,
    format: 'password'
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ 
    description: 'Имя пользователя',
    example: 'John',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ 
    description: 'Фамилия пользователя',
    example: 'Doe',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiPropertyOptional({ 
    description: 'URL аватара пользователя',
    example: 'https://example.com/avatars/john-doe.jpg',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;

  @ApiPropertyOptional({ 
    description: 'Номер телефона в международном формате',
    example: '+380501234567',
    format: 'phone'
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ 
    description: 'Роль пользователя в системе (student - базовый доступ, moderator - редактирование контента, admin - управление компанией, superadmin - системные права)',
    enum: UserRole,
    example: UserRole.STUDENT,
    default: UserRole.STUDENT
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ 
    description: 'Дополнительные данные профиля',
    example: {
      bio: 'Увлекаюсь фитнесом и здоровым образом жизни',
      dateOfBirth: '1990-05-15',
      location: 'Киев, Украина',
      interests: ['фитнес', 'йога', 'бег'],
      socialLinks: {
        instagram: '@john_doe_fitness',
        linkedin: 'linkedin.com/in/johndoe'
      }
    }
  })
  @IsOptional()
  @IsObject()
  profile?: Record<string, any>;
} 