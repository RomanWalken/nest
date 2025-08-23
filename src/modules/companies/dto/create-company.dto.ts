import { IsString, IsOptional, IsObject, IsBoolean, MaxLength, IsUrl, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ 
    description: 'Название компании',
    example: 'Fitness Academy Pro',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'URL-идентификатор компании (slug)',
    example: 'fitness-academy-pro',
    pattern: '^[a-z0-9-]+$',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug может содержать только строчные буквы, цифры и дефисы' })
  slug: string;

  @ApiPropertyOptional({ 
    description: 'Подробное описание компании',
    example: 'Ведущая платформа для онлайн-обучения фитнесу и здоровому образу жизни. Предоставляем качественные курсы от экспертов индустрии.',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'URL логотипа компании',
    example: 'https://example.com/logos/fitness-academy-logo.png',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  logo?: string;

  @ApiProperty({ 
    description: 'Домен компании для мультитенантности',
    example: 'fitness-academy.example.com',
    pattern: '^[a-zA-Z0-9.-]+$',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9.-]+$/, { message: 'Домен может содержать только буквы, цифры, точки и дефисы' })
  domain: string;

  @ApiPropertyOptional({ 
    description: 'Настройки платформы компании',
    example: {
      theme: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        logoPosition: 'left'
      },
      features: {
        enableChat: true,
        enableCertificates: true,
        enableProgressTracking: true,
        maxUsers: 1000,
        maxCourses: 50
      },
      branding: {
        companyName: 'Fitness Academy Pro',
        tagline: 'Ваш путь к здоровью начинается здесь',
        contactEmail: 'info@fitness-academy.com'
      }
    }
  })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiPropertyOptional({ 
    description: 'Статус активности компании (неактивные компании не могут создавать новые курсы и привлекать пользователей)',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 