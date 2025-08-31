import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject, Min, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ 
    description: 'Название тренировки',
    example: 'Кардио тренировка для начинающих',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ 
    description: 'Описание тренировки',
    example: 'Интенсивная кардио тренировка для сжигания жира',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Продолжительность тренировки в минутах',
    example: 45,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @ApiProperty({ 
    description: 'Порядковый номер тренировки',
    example: 1,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ 
    description: 'Является ли тренировка бесплатной',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty({ 
    description: 'ID курса, к которому относится тренировка',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'ID тарифов, к которым привязана тренировка',
    example: ['507f1f77bcf86cd799439012'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tariffs?: string[];

  @ApiPropertyOptional({ 
    description: 'ID упражнений в тренировке',
    example: ['507f1f77bcf86cd799439013'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  exercises?: string[];

  @ApiProperty({ 
    description: 'Месяц (1-12)',
    example: 1,
    minimum: 1,
    maximum: 12
  })
  @IsNumber()
  @Min(1)
  month: number;

  @ApiProperty({ 
    description: 'Неделя в месяце (1-5)',
    example: 1,
    minimum: 1,
    maximum: 5
  })
  @IsNumber()
  @Min(1)
  week: number;

  @ApiProperty({ 
    description: 'День недели (1-7)',
    example: 1,
    minimum: 1,
    maximum: 7
  })
  @IsNumber()
  @Min(1)
  day: number;

  @ApiPropertyOptional({ 
    description: 'ID пользователя, для которого настроена тренировка (для модераторов)',
    example: '507f1f77bcf86cd799439014'
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  customUserId?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные тренировки',
    example: {
      difficulty: 'beginner',
      targetMuscles: ['ноги', 'руки', 'корпус'],
      calories: 300,
      equipment: ['коврик', 'гантели']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
