import { IsString, IsOptional, IsBoolean, IsNumber, IsObject, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ 
    description: 'Название модуля',
    example: 'Введение в фитнес',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ 
    description: 'Описание модуля',
    example: 'Базовые принципы фитнеса и здорового образа жизни',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ 
    description: 'Порядковый номер модуля в курсе',
    example: 1,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ 
    description: 'Является ли модуль бесплатным',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty({ 
    description: 'ID курса, к которому относится модуль',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные модуля',
    example: {
      estimatedDuration: 120,
      difficulty: 'beginner',
      prerequisites: [],
      learningObjectives: ['Понимание основ фитнеса', 'Базовые упражнения']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 