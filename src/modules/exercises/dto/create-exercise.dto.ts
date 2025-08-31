import { IsString, IsOptional, IsNumber, IsArray, IsObject, Min, MaxLength, IsUrl, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ 
    description: 'Название упражнения',
    example: 'Приседания с собственным весом',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ 
    description: 'Описание упражнения',
    example: 'Базовое упражнение для развития мышц ног',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'URL видео упражнения',
    example: 'https://bunny.net/video/squats.mp4',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl?: string;

  @ApiProperty({ 
    description: 'Количество повторений',
    example: 15,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  repetitions: number;

  @ApiPropertyOptional({ 
    description: 'Подробное объяснение выполнения упражнения',
    example: 'Встаньте прямо, ноги на ширине плеч...',
    maxLength: 2000
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  explanation?: string;

  @ApiPropertyOptional({ 
    description: 'ID необходимого оборудования',
    example: ['507f1f77bcf86cd799439011'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  equipment?: string[];

  @ApiPropertyOptional({ 
    description: 'Мускулы, над которыми ведется работа',
    example: ['квадрицепсы', 'ягодичные мышцы', 'икроножные мышцы'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetMuscles?: string[];

  @ApiPropertyOptional({ 
    description: 'Продолжительность упражнения в секундах',
    example: 30,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @ApiPropertyOptional({ 
    description: 'Количество подходов',
    example: 3,
    minimum: 1,
    default: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @ApiPropertyOptional({ 
    description: 'Время отдыха между подходами в секундах',
    example: 60,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  restTime?: number;

  @ApiPropertyOptional({ 
    description: 'ID пользователя, для которого настроено упражнение (для модераторов)',
    example: '507f1f77bcf86cd799439012'
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  customUserId?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные упражнения',
    example: {
      difficulty: 'beginner',
      calories: 50,
      tips: ['Держите спину прямой', 'Не отрывайте пятки от пола'],
      variations: ['с гантелями', 'на одной ноге']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
