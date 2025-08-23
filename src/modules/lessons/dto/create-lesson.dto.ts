import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject, MaxLength, Min, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ 
    description: 'Название урока',
    example: 'Базовые упражнения для начинающих',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ 
    description: 'Описание урока',
    example: 'В этом уроке вы изучите основные упражнения для развития силы и выносливости',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Текстовое содержимое урока',
    example: 'Добро пожаловать в урок по базовым упражнениям. Сегодня мы изучим...',
    maxLength: 10000
  })
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content?: string;

  @ApiPropertyOptional({ 
    description: 'URL видео урока',
    example: 'https://bunny.net/video/lesson-basic-exercises.mp4',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Продолжительность урока в минутах',
    example: 25,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @ApiProperty({ 
    description: 'Порядковый номер урока в модуле',
    example: 1,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ 
    description: 'Является ли урок бесплатным',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty({ 
    description: 'ID модуля, к которому относится урок',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  moduleId: string;

  @ApiPropertyOptional({ 
    description: 'Прикрепленные файлы к уроку',
    example: [
      {
        name: 'Руководство по упражнениям.pdf',
        url: 'https://uploadthings.io/files/guide.pdf',
        type: 'pdf'
      },
      {
        name: 'Чек-лист упражнений.docx',
        url: 'https://uploadthings.io/files/checklist.docx',
        type: 'document'
      }
    ]
  })
  @IsOptional()
  @IsArray()
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные урока',
    example: {
      difficulty: 'beginner',
      equipment: ['коврик', 'гантели'],
      targetMuscles: ['ноги', 'руки'],
      calories: 150,
      prerequisites: []
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 