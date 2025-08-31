import { IsString, IsEmail, IsOptional, IsEnum, IsObject, MaxLength, IsUrl, IsPhoneNumber, IsArray, IsNumber, Min, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@/common/types';

export class CreateTeacherDto {
  @ApiProperty({ 
    description: 'Email преподавателя (уникальный в рамках компании)',
    example: 'teacher@example.com',
    format: 'email'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Пароль преподавателя (минимум 8 символов)',
    example: 'SecurePass123!',
    minLength: 8,
    format: 'password'
  })
  @IsString()
  password: string;

  @ApiProperty({ 
    description: 'Имя преподавателя',
    example: 'Анна',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ 
    description: 'Фамилия преподавателя',
    example: 'Петрова',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiPropertyOptional({ 
    description: 'URL аватара преподавателя',
    example: 'https://example.com/avatars/anna-petrova.jpg',
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

  @ApiProperty({ 
    description: 'ID компании, к которой привязан преподаватель',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  companyId: string;

  @ApiProperty({ 
    description: 'Специализация преподавателя',
    example: 'Фитнес-тренер',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  specialization: string;

  @ApiPropertyOptional({ 
    description: 'Навыки преподавателя',
    example: ['персональные тренировки', 'групповые занятия', 'йога', 'пилатес'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ 
    description: 'Сертификаты преподавателя',
    example: ['сертификат фитнес-тренера', 'сертификат инструктора по йоге'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certificates?: string[];

  @ApiPropertyOptional({ 
    description: 'Опыт работы в годах',
    example: 5,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experience?: number;

  @ApiPropertyOptional({ 
    description: 'Биография преподавателя',
    example: 'Опытный фитнес-тренер с 5-летним стажем работы. Специализируюсь на персональных тренировках и групповых занятиях.',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @ApiPropertyOptional({ 
    description: 'Языки, на которых преподает',
    example: ['русский', 'английский'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ 
    description: 'Расписание работы преподавателя',
    example: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' }
    }
  })
  @IsOptional()
  @IsObject()
  schedule?: Record<string, any>;

  @ApiPropertyOptional({ 
    description: 'Дополнительные данные профиля',
    example: {
      education: 'Киевский национальный университет физического воспитания и спорта',
      achievements: ['Победитель конкурса "Лучший тренер года 2023"'],
      socialLinks: {
        instagram: '@anna_fitness',
        linkedin: 'linkedin.com/in/annapetrova'
      }
    }
  })
  @IsOptional()
  @IsObject()
  profile?: Record<string, any>;
}
