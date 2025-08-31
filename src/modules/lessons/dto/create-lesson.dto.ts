import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, IsArray, IsObject, Min, MaxLength, IsUrl, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonType } from '@/common/types';

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

  @ApiProperty({ 
    description: 'Тип урока',
    enum: LessonType,
    example: LessonType.VIDEO
  })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiPropertyOptional({ 
    description: 'URL видео урока (только для видео уроков)',
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
  @IsMongoId()
  moduleId: string;

  @ApiPropertyOptional({ 
    description: 'ID тарифов, к которым привязан урок (если урок не бесплатный)',
    example: ['507f1f77bcf86cd799439012'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tariffs?: string[];

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
    description: 'Данные для опроса (только для уроков типа QUIZ)',
    example: {
      questions: [
        {
          question: 'Какое упражнение лучше всего подходит для начинающих?',
          options: ['Приседания', 'Отжимания', 'Планка'],
          correctAnswer: 2
        }
      ]
    }
  })
  @IsOptional()
  @IsObject()
  quizData?: Record<string, any>;

  @ApiPropertyOptional({ 
    description: 'Данные для презентации (только для уроков типа PRESENTATION)',
    example: {
      slides: [
        { title: 'Введение', content: 'Добро пожаловать в курс' },
        { title: 'Основы', content: 'Базовые принципы фитнеса' }
      ]
    }
  })
  @IsOptional()
  @IsObject()
  presentationData?: Record<string, any>;

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