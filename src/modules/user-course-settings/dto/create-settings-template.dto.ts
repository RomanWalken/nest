import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject, IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSettingsTemplateDto {
  @ApiProperty({ 
    description: 'Название шаблона',
    example: 'Начинающий спортсмен',
    maxLength: 100
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({ 
    description: 'Описание шаблона',
    example: 'Шаблон для начинающих спортсменов с пониженной интенсивностью',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Категория шаблона',
    example: 'fitness',
    enum: ['fitness', 'regular', 'general']
  })
  @IsString()
  @IsEnum(['fitness', 'regular', 'general'])
  category: string;

  @ApiPropertyOptional({ 
    description: 'Является ли шаблоном по умолчанию',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional({ 
    description: 'Активен ли шаблон',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Настройки по умолчанию для тренировок',
    example: {
      durationMultiplier: 0.7,
      intensityLevel: 'low',
      restTimeMultiplier: 1.2,
      enabledByDefault: true
    }
  })
  @IsOptional()
  @IsObject()
  workoutDefaults?: {
    durationMultiplier: number;
    intensityLevel: string;
    restTimeMultiplier: number;
    enabledByDefault: boolean;
  };

  @ApiPropertyOptional({ 
    description: 'Настройки по умолчанию для упражнений',
    example: {
      repetitionsMultiplier: 0.8,
      setsMultiplier: 0.9,
      restTimeMultiplier: 1.3,
      enabledByDefault: true
    }
  })
  @IsOptional()
  @IsObject()
  exerciseDefaults?: {
    repetitionsMultiplier: number;
    setsMultiplier: number;
    restTimeMultiplier: number;
    enabledByDefault: boolean;
  };

  @ApiPropertyOptional({ 
    description: 'Настройки по умолчанию для уроков',
    example: {
      unlockAll: false,
      requiredByDefault: true,
      customOrder: false
    }
  })
  @IsOptional()
  @IsObject()
  lessonDefaults?: {
    unlockAll: boolean;
    requiredByDefault: boolean;
    customOrder: boolean;
  };

  @ApiPropertyOptional({ 
    description: 'Общие настройки курса по умолчанию',
    example: {
      difficulty: 'beginner',
      pace: 'slow',
      notifications: true,
      reminders: true,
      weeklyGoal: '2 тренировки в неделю'
    }
  })
  @IsOptional()
  @IsObject()
  courseDefaults?: {
    difficulty: string;
    pace: string;
    notifications: boolean;
    reminders: boolean;
    weeklyGoal: string;
  };

  @ApiPropertyOptional({ 
    description: 'ID пользователя, который создал шаблон',
    example: '507f1f77bcf86cd799439011'
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  createdBy?: string;

  @ApiPropertyOptional({ 
    description: 'Теги для поиска шаблона',
    example: ['начинающий', 'фитнес', 'низкая интенсивность'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные шаблона',
    example: {
      targetAudience: 'новички',
      estimatedDuration: '3 месяца',
      prerequisites: ['базовая физическая подготовка']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
