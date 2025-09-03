import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject, IsMongoId, IsDateString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateWorkoutOverrideDto {
  @ApiProperty({ 
    description: 'ID тренировки',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  workoutId: string;

  @ApiPropertyOptional({ 
    description: 'Персональная длительность тренировки в минутах',
    example: 30,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({ 
    description: 'Включена ли тренировка',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @ApiPropertyOptional({ 
    description: 'Персональный порядок тренировки',
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  customOrder?: number;

  @ApiPropertyOptional({ 
    description: 'Персональное расписание тренировки',
    example: {
      month: 1,
      week: 1,
      day: 1
    }
  })
  @IsOptional()
  @IsObject()
  customSchedule?: {
    month: number;
    week: number;
    day: number;
  };

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные тренировки',
    example: {
      notes: 'Увеличить интенсивность',
      modifications: ['добавить разминку', 'убрать кардио']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateExerciseOverrideDto {
  @ApiProperty({ 
    description: 'ID упражнения',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  exerciseId: string;

  @ApiPropertyOptional({ 
    description: 'Персональные повторения',
    example: 10,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  repetitions?: number;

  @ApiPropertyOptional({ 
    description: 'Персональные подходы',
    example: 2,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  sets?: number;

  @ApiPropertyOptional({ 
    description: 'Персональное время отдыха в секундах',
    example: 45,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  restTime?: number;

  @ApiPropertyOptional({ 
    description: 'Включено ли упражнение',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные упражнения',
    example: {
      notes: 'Уменьшить нагрузку',
      alternatives: ['упрощенная версия', 'с поддержкой']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateLessonOverrideDto {
  @ApiProperty({ 
    description: 'ID урока',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  lessonId: string;

  @ApiPropertyOptional({ 
    description: 'Разблокирован ли урок',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isUnlocked?: boolean;

  @ApiPropertyOptional({ 
    description: 'Персональный порядок урока',
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsNumber()
  customOrder?: number;

  @ApiPropertyOptional({ 
    description: 'Обязателен ли урок',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные урока',
    example: {
      notes: 'Пропустить до изучения основ',
      prerequisites: ['урок 1', 'урок 2']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateCourseSettingsDto {
  @ApiPropertyOptional({ 
    description: 'Персональная сложность курса',
    example: 'beginner',
    enum: ['beginner', 'intermediate', 'advanced']
  })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiPropertyOptional({ 
    description: 'Темп прохождения курса',
    example: 'normal',
    enum: ['slow', 'normal', 'fast']
  })
  @IsOptional()
  @IsString()
  pace?: string;

  @ApiPropertyOptional({ 
    description: 'Включить уведомления',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  notifications?: boolean;

  @ApiPropertyOptional({ 
    description: 'Включить напоминания',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  reminders?: boolean;

  @ApiPropertyOptional({ 
    description: 'Дата начала курса для студента',
    example: '2024-01-15T00:00:00.000Z',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ 
    description: 'Целевая дата завершения курса',
    example: '2024-03-15T00:00:00.000Z',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  targetCompletionDate?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные настройки курса',
    example: {
      weeklyGoal: '3 тренировки в неделю',
      preferredTime: 'утро',
      equipment: ['гантели', 'коврик']
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateUserCourseSettingsDto {
  @ApiProperty({ 
    description: 'ID пользователя (студента)',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  userId: string;

  @ApiProperty({ 
    description: 'ID курса',
    example: '507f1f77bcf86cd799439012'
  })
  @IsString()
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'Активен ли доступ к курсу',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Переопределения для тренировок (для фитнес-курсов)',
    type: [CreateWorkoutOverrideDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutOverrideDto)
  workoutOverrides?: CreateWorkoutOverrideDto[];

  @ApiPropertyOptional({ 
    description: 'Переопределения для упражнений',
    type: [CreateExerciseOverrideDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseOverrideDto)
  exerciseOverrides?: CreateExerciseOverrideDto[];

  @ApiPropertyOptional({ 
    description: 'Переопределения для уроков (для обычных курсов)',
    type: [CreateLessonOverrideDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonOverrideDto)
  lessonOverrides?: CreateLessonOverrideDto[];

  @ApiPropertyOptional({ 
    description: 'Общие настройки курса',
    type: CreateCourseSettingsDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCourseSettingsDto)
  courseSettings?: CreateCourseSettingsDto;

  @ApiPropertyOptional({ 
    description: 'ID пользователя, который создал настройки (тренер/модератор)',
    example: '507f1f77bcf86cd799439013'
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  createdBy?: string;

  @ApiPropertyOptional({ 
    description: 'Заметки тренера о настройках',
    example: 'Студент начинающий, нужна адаптация под его уровень',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      source: 'manual',
      template: 'beginner',
      lastReview: '2024-01-15T10:30:00.000Z'
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
