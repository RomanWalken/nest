import { IsString, IsOptional, IsNumber, IsArray, IsObject, MaxLength, Min, IsUrl, IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DietaryCategory } from '@/common/types';

export class CreateMealDto {
  @ApiProperty({ 
    description: 'Название плана питания',
    example: 'Завтрак для похудения',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ 
    description: 'Описание плана питания',
    example: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ 
    description: 'Калорийность блюда',
    example: 350,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({ 
    description: 'Содержание белков в граммах',
    example: 25,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  proteins: number;

  @ApiProperty({ 
    description: 'Содержание жиров в граммах',
    example: 12,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  fats: number;

  @ApiProperty({ 
    description: 'Содержание углеводов в граммах',
    example: 45,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @ApiPropertyOptional({ 
    description: 'Содержание клетчатки в граммах',
    example: 8,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fiber?: number;

  @ApiPropertyOptional({ 
    description: 'Содержание сахара в граммах',
    example: 15,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sugar?: number;

  @ApiPropertyOptional({ 
    description: 'Содержание натрия в миллиграммах',
    example: 450,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sodium?: number;

  @ApiPropertyOptional({ 
    description: 'URL изображения блюда',
    example: 'https://uploadthings.io/images/breakfast-bowl.jpg',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({ 
    description: 'Рецепт приготовления',
    example: '1. Смешайте овсянку с молоком...',
    maxLength: 5000
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  recipe?: string;

  @ApiPropertyOptional({ 
    description: 'Время приготовления в минутах',
    example: 15,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  preparationTime?: number;

  @ApiPropertyOptional({ 
    description: 'Сложность приготовления',
    example: 'easy',
    enum: ['easy', 'medium', 'hard']
  })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiPropertyOptional({ 
    description: 'Список ингредиентов',
    example: [
      { name: 'Овсянка', amount: 50, unit: 'г' },
      { name: 'Молоко', amount: 200, unit: 'мл' },
      { name: 'Банан', amount: 1, unit: 'шт' }
    ]
  })
  @IsOptional()
  @IsArray()
  ingredients?: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;

  @ApiPropertyOptional({ 
    description: 'Диетические ограничения',
    example: ['vegetarian', 'gluten-free'],
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'low-carb', 'high-protein']
  })
  @IsOptional()
  @IsArray()
  dietaryRestrictions?: string[];

  @ApiProperty({ 
    description: 'Категория питания',
    enum: DietaryCategory,
    example: DietaryCategory.VEGETARIAN
  })
  @IsEnum(DietaryCategory)
  dietaryCategory: DietaryCategory;

  @ApiProperty({ 
    description: 'ID курса, к которому относится план питания',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'ID тарифов, к которым привязан meal',
    example: ['507f1f77bcf86cd799439012'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tariffs?: string[];

  @ApiPropertyOptional({ 
    description: 'ID пользователя, для которого настроен meal (для модераторов)',
    example: '507f1f77bcf86cd799439013'
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  customUserId?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      mealType: 'breakfast',
      season: 'all',
      cuisine: 'international',
      tags: ['healthy', 'quick', 'budget-friendly']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 