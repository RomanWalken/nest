import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject, IsMongoId, IsDateString, IsEnum, ValidateNested, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBodyMeasurementsDto {
  @ApiProperty({ 
    description: 'Дата измерения',
    example: '2024-01-15T00:00:00.000Z',
    format: 'date-time'
  })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ 
    description: 'Вес в кг',
    example: 70.5,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ 
    description: 'Рост в см',
    example: 175,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ 
    description: 'Процент жира',
    example: 15.5,
    minimum: 0,
    maximum: 100
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  bodyFat?: number;

  @ApiPropertyOptional({ 
    description: 'Мышечная масса в кг',
    example: 45.2,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  muscleMass?: number;

  @ApiPropertyOptional({ 
    description: 'Процент воды в организме',
    example: 60.5,
    minimum: 0,
    maximum: 100
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  waterPercentage?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват груди в см',
    example: 95,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  chest?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват талии в см',
    example: 80,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  waist?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват бедер в см',
    example: 100,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  hips?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват бицепса в см',
    example: 35,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  biceps?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват бедра в см',
    example: 55,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  thigh?: number;

  @ApiPropertyOptional({ 
    description: 'Обхват шеи в см',
    example: 38,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  neck?: number;

  @ApiPropertyOptional({ 
    description: 'Индекс массы тела',
    example: 22.5,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bmi?: number;

  @ApiPropertyOptional({ 
    description: 'Базальный метаболизм',
    example: 1600,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bmr?: number;

  @ApiPropertyOptional({ 
    description: 'Общий дневной расход энергии',
    example: 2200,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tdee?: number;

  @ApiPropertyOptional({ 
    description: 'URLs фотографий прогресса',
    example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  progressPhotos?: string[];

  @ApiPropertyOptional({ 
    description: 'Заметки к измерениям',
    example: 'Измерения после тренировки',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      measurementDevice: 'smart_scale',
      timeOfDay: 'morning'
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateFitnessGoalsDto {
  @ApiProperty({ 
    description: 'Основная цель',
    example: 'weight_loss',
    enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'general_fitness']
  })
  @IsString()
  @IsEnum(['weight_loss', 'muscle_gain', 'endurance', 'strength', 'general_fitness'])
  primaryGoal: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные цели',
    example: ['improve_posture', 'increase_flexibility'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondaryGoals?: string[];

  @ApiPropertyOptional({ 
    description: 'Целевой вес в кг',
    example: 65,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetWeight?: number;

  @ApiPropertyOptional({ 
    description: 'Целевой процент жира',
    example: 12,
    minimum: 0,
    maximum: 100
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  targetBodyFat?: number;

  @ApiPropertyOptional({ 
    description: 'Целевая мышечная масса в кг',
    example: 50,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetMuscleMass?: number;

  @ApiPropertyOptional({ 
    description: 'Целевой обхват груди в см',
    example: 100,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetChest?: number;

  @ApiPropertyOptional({ 
    description: 'Целевой обхват талии в см',
    example: 75,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetWaist?: number;

  @ApiPropertyOptional({ 
    description: 'Целевой обхват бедер в см',
    example: 95,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetHips?: number;

  @ApiPropertyOptional({ 
    description: 'Целевая дата достижения',
    example: '2024-06-15T00:00:00.000Z',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @ApiPropertyOptional({ 
    description: 'Продолжительность в неделях',
    example: 12,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  durationWeeks?: number;

  @ApiProperty({ 
    description: 'Уровень активности',
    example: 'moderate',
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
  })
  @IsString()
  @IsEnum(['sedentary', 'light', 'moderate', 'active', 'very_active'])
  activityLevel: string;

  @ApiProperty({ 
    description: 'Уровень опыта тренировок',
    example: 'beginner',
    enum: ['beginner', 'intermediate', 'advanced']
  })
  @IsString()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  experienceLevel: string;

  @ApiPropertyOptional({ 
    description: 'Ограничения',
    example: ['back_injury', 'time_constraints'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  limitations?: string[];

  @ApiPropertyOptional({ 
    description: 'Предпочтения',
    example: ['home_workouts', 'cardio'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];

  @ApiPropertyOptional({ 
    description: 'Доступное оборудование',
    example: ['dumbbells', 'yoga_mat'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableEquipment?: string[];

  @ApiPropertyOptional({ 
    description: 'Максимальное время тренировки в минутах',
    example: 45,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxWorkoutTime?: number;

  @ApiPropertyOptional({ 
    description: 'Количество тренировок в неделю',
    example: 3,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  workoutsPerWeek?: number;

  @ApiPropertyOptional({ 
    description: 'Мотивация студента',
    example: 'Хочу чувствовать себя более энергичным и здоровым',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  motivation?: string;

  @ApiPropertyOptional({ 
    description: 'Предыдущий опыт',
    example: 'Занимался в спортзале 2 года назад',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  previousExperience?: string;

  @ApiPropertyOptional({ 
    description: 'Текущие вызовы',
    example: 'Не хватает времени на тренировки',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  currentChallenges?: string;

  @ApiPropertyOptional({ 
    description: 'Статус целей',
    example: 'active',
    enum: ['active', 'paused', 'completed', 'cancelled'],
    default: 'active'
  })
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'paused', 'completed', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      priority: 'high',
      difficulty: 'medium'
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateStudentProfileDto {
  @ApiProperty({ 
    description: 'ID пользователя',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  userId: string;

  @ApiPropertyOptional({ 
    description: 'Дата рождения',
    example: '1990-05-15T00:00:00.000Z',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ 
    description: 'Пол',
    example: 'male',
    enum: ['male', 'female', 'other']
  })
  @IsOptional()
  @IsString()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ 
    description: 'Телефон',
    example: '+380501234567',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ 
    description: 'Контакт для экстренных случаев',
    example: '+380501234568',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({ 
    description: 'Медицинские состояния',
    example: ['diabetes', 'hypertension'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalConditions?: string[];

  @ApiPropertyOptional({ 
    description: 'Лекарства',
    example: ['insulin', 'metformin'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medications?: string[];

  @ApiPropertyOptional({ 
    description: 'Аллергии',
    example: ['peanuts', 'shellfish'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @ApiPropertyOptional({ 
    description: 'Контакт врача',
    example: 'Dr. Smith, +380501234569',
    maxLength: 200
  })
  @IsOptional()
  @IsString()
  doctorContact?: string;

  @ApiProperty({ 
    description: 'Цели фитнеса',
    type: CreateFitnessGoalsDto
  })
  @ValidateNested()
  @Type(() => CreateFitnessGoalsDto)
  fitnessGoals: CreateFitnessGoalsDto;

  @ApiPropertyOptional({ 
    description: 'Текущие измерения тела',
    type: CreateBodyMeasurementsDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBodyMeasurementsDto)
  currentMeasurements?: CreateBodyMeasurementsDto;

  @ApiPropertyOptional({ 
    description: 'Публичный ли профиль',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ 
    description: 'Разрешить делиться прогрессом',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  allowProgressSharing?: boolean;

  @ApiPropertyOptional({ 
    description: 'Получать мотивационные сообщения',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  receiveMotivationalMessages?: boolean;

  @ApiPropertyOptional({ 
    description: 'Завершен ли начальный квиз',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  hasCompletedInitialQuiz?: boolean;

  @ApiPropertyOptional({ 
    description: 'Заметки тренера',
    example: 'Студент мотивирован, нужна поддержка в начале',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  trainerNotes?: string;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      source: 'initial_quiz',
      version: '1.0'
    }
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
