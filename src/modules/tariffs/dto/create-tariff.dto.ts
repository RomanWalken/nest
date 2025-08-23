import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsObject, Min, MaxLength, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTariffDto {
  @ApiProperty({ 
    description: 'Название тарифа',
    example: 'Базовый доступ на 30 дней',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ 
    description: 'Подробное описание тарифа и что в него входит',
    example: 'Доступ ко всем базовым урокам курса на 30 дней. Включает видео-уроки, материалы для скачивания и поддержку в чате.',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ 
    description: 'Цена тарифа',
    example: 29.99,
    minimum: 0,
    maximum: 9999.99
  })
  @IsNumber()
  @Min(0)
  @Max(9999.99)
  price: number;

  @ApiPropertyOptional({ 
    description: 'Валюта тарифа',
    example: 'USD',
    default: 'USD',
    enum: ['USD', 'EUR', 'UAH', 'RUB']
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ 
    description: 'Длительность тарифа в днях (0 = бессрочный доступ, максимальное значение - 10 лет)',
    example: 30,
    minimum: 0,
    maximum: 3650
  })
  @IsNumber()
  @Min(0)
  @Max(3650)
  duration: number;

  @ApiPropertyOptional({ 
    description: 'Активен ли тариф для покупки',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    description: 'ID курса, к которому относится тариф',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'ID уроков, доступных по данному тарифу',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  lessonIds?: string[];

  @ApiPropertyOptional({ 
    description: 'Дополнительные возможности и особенности тарифа',
    example: {
      includesCertificates: true,
      prioritySupport: false,
      groupChats: true,
      personalCoach: false,
      bonusMaterials: ['чек-листы', 'шаблоны', 'дополнительные видео']
    }
  })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;
} 