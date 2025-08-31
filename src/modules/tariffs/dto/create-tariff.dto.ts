import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsObject, Min, MaxLength, Max, IsMongoId, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TariffStatus } from '@/common/types';

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

  @ApiPropertyOptional({ 
    description: 'URL изображения тарифа',
    example: 'https://uploadthings.io/images/basic-tariff.jpg',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({ 
    description: 'Старая цена тарифа (для отображения скидки)',
    example: 49.99,
    minimum: 0,
    maximum: 9999.99
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9999.99)
  oldPrice?: number;

  @ApiProperty({ 
    description: 'Новая цена тарифа (основная цена для оплаты)',
    example: 29.99,
    minimum: 0,
    maximum: 9999.99
  })
  @IsNumber()
  @Min(0)
  @Max(9999.99)
  newPrice: number;

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
    description: 'Статус тарифа',
    enum: TariffStatus,
    example: TariffStatus.ACTIVE,
    default: TariffStatus.ACTIVE
  })
  @IsOptional()
  @IsString()
  status?: TariffStatus;

  @ApiProperty({ 
    description: 'ID курса, к которому относится тариф',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'ID уроков, доступных по данному тарифу (для обычных курсов)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  lessonIds?: string[];

  @ApiPropertyOptional({ 
    description: 'ID тренировок, доступных по данному тарифу (для фитнес-курсов)',
    example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  workoutIds?: string[];

  @ApiPropertyOptional({ 
    description: 'Преимущества тарифа',
    example: ['Доступ ко всем урокам', 'Сертификат по окончании', 'Поддержка в чате'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  advantages?: string[];

  @ApiPropertyOptional({ 
    description: 'Включает ли тариф доктора',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  includesDoctor?: boolean;

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