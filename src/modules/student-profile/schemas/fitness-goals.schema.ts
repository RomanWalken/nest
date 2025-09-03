import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FitnessGoalsDocument = FitnessGoals & Document;

@Schema({ timestamps: true })
export class FitnessGoals {
  @Prop({ required: true })
  primaryGoal: string; // Основная цель: "weight_loss", "muscle_gain", "endurance", "strength", "general_fitness"

  @Prop({ type: [String], default: [] })
  secondaryGoals: string[]; // Дополнительные цели

  // Целевые параметры
  @Prop({ min: 0 })
  targetWeight?: number; // Целевой вес в кг

  @Prop({ min: 0 })
  targetBodyFat?: number; // Целевой процент жира

  @Prop({ min: 0 })
  targetMuscleMass?: number; // Целевая мышечная масса в кг

  // Целевые обхваты
  @Prop({ min: 0 })
  targetChest?: number; // Целевой обхват груди

  @Prop({ min: 0 })
  targetWaist?: number; // Целевой обхват талии

  @Prop({ min: 0 })
  targetHips?: number; // Целевой обхват бедер

  // Временные рамки
  @Prop()
  targetDate?: Date; // Целевая дата достижения

  @Prop({ min: 1 })
  durationWeeks?: number; // Продолжительность в неделях

  // Уровень активности
  @Prop({ required: true })
  activityLevel: string; // "sedentary", "light", "moderate", "active", "very_active"

  // Опыт тренировок
  @Prop({ required: true })
  experienceLevel: string; // "beginner", "intermediate", "advanced"

  // Ограничения и предпочтения
  @Prop({ type: [String], default: [] })
  limitations: string[]; // Ограничения: "back_injury", "knee_problems", "time_constraints"

  @Prop({ type: [String], default: [] })
  preferences: string[]; // Предпочтения: "home_workouts", "gym_workouts", "cardio", "strength"

  // Доступное оборудование
  @Prop({ type: [String], default: [] })
  availableEquipment: string[]; // "dumbbells", "barbell", "resistance_bands", "yoga_mat"

  // Временные ограничения
  @Prop({ min: 0 })
  maxWorkoutTime?: number; // Максимальное время тренировки в минутах

  @Prop({ min: 1 })
  workoutsPerWeek?: number; // Количество тренировок в неделю

  // Дополнительная информация
  @Prop()
  motivation?: string; // Мотивация студента

  @Prop()
  previousExperience?: string; // Предыдущий опыт

  @Prop()
  currentChallenges?: string; // Текущие вызовы

  // Статус целей
  @Prop({ default: 'active' })
  status: string; // "active", "paused", "completed", "cancelled"

  @Prop()
  completedAt?: Date; // Дата завершения

  // Метаданные
  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

export const FitnessGoalsSchema = SchemaFactory.createForClass(FitnessGoals);

// Индексы
FitnessGoalsSchema.index({ primaryGoal: 1 });
FitnessGoalsSchema.index({ status: 1 });
FitnessGoalsSchema.index({ targetDate: 1 });
FitnessGoalsSchema.index({ experienceLevel: 1 });
