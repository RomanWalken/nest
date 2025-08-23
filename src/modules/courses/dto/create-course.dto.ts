import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, IsArray, IsObject, Min, MaxLength, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseType, DifficultyLevel } from '@/common/types';

export class CreateCourseDto {
  @ApiProperty({ 
    description: 'Название курса',
    example: 'Основы фитнеса для начинающих',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ 
    description: 'URL-идентификатор курса (slug)',
    example: 'osnovy-fitnesa-dlya-nachinayushchih',
    pattern: '^[a-z0-9-]+$'
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ 
    description: 'Подробное описание курса',
    example: 'Комплексный курс по фитнесу для людей, которые только начинают свой путь к здоровому образу жизни. Включает базовые упражнения, правильное питание и мотивацию.',
    maxLength: 2000
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ 
    description: 'Тип курса (fitness - фитнес, video - видео, cooking - кулинария, custom - пользовательский)',
    enum: CourseType,
    example: CourseType.FITNESS
  })
  @IsEnum(CourseType)
  type: CourseType;

  @ApiPropertyOptional({ 
    description: 'URL превью курса (изображение)',
    example: 'https://example.com/images/fitness-course-preview.jpg',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  thumbnail?: string;

  @ApiPropertyOptional({ 
    description: 'Общая продолжительность курса в минутах',
    example: 480,
    minimum: 0,
    maximum: 10000
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @ApiPropertyOptional({ 
    description: 'Уровень сложности курса (beginner - начинающий, intermediate - средний, advanced - продвинутый)',
    enum: DifficultyLevel,
    example: DifficultyLevel.BEGINNER,
    default: DifficultyLevel.BEGINNER
  })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @ApiPropertyOptional({ 
    description: 'Статус публикации курса. Неопубликованные курсы видны только авторам и модераторам',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ 
    description: 'Рекомендуемый курс. Рекомендуемые курсы отображаются в специальных разделах',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ 
    description: 'Теги для поиска и категоризации (максимум 20 тегов)',
    example: ['фитнес', 'здоровье', 'для начинающих', 'домашние тренировки'],
    type: [String],
    maxItems: 20
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные курса (целевая аудитория, оборудование, предварительные требования, цели)',
    example: {
      targetAudience: 'Мужчины и женщины 18-45 лет',
      equipment: ['коврик', 'гантели', 'резинки'],
      prerequisites: 'Базовое состояние здоровья',
      goals: ['похудение', 'увеличение силы', 'улучшение выносливости']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 