import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserCourseSettingsDocument = UserCourseSettings & Document;

@Schema({ timestamps: true })
export class WorkoutOverride {
  @Prop({ type: Types.ObjectId, ref: 'Workout', required: true })
  workoutId: Types.ObjectId;

  @Prop()
  duration?: number; // Персональная длительность в минутах

  @Prop({ default: true })
  isEnabled: boolean; // Включена ли тренировка

  @Prop()
  customOrder?: number; // Персональный порядок

  @Prop({ type: Object })
  customSchedule?: { // Персональное расписание
    month: number;
    week: number;
    day: number;
  };

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

@Schema({ timestamps: true })
export class ExerciseOverride {
  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
  exerciseId: Types.ObjectId;

  @Prop()
  repetitions?: number; // Персональные повторения

  @Prop()
  sets?: number; // Персональные подходы

  @Prop()
  restTime?: number; // Персональное время отдыха в секундах

  @Prop({ default: true })
  isEnabled: boolean; // Включено ли упражнение

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

@Schema({ timestamps: true })
export class LessonOverride {
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: Types.ObjectId;

  @Prop({ default: false })
  isUnlocked: boolean; // Разблокирован ли урок

  @Prop()
  customOrder?: number; // Персональный порядок

  @Prop({ default: true })
  isRequired: boolean; // Обязателен ли урок

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

@Schema({ timestamps: true })
export class CourseSettings {
  @Prop()
  difficulty?: string; // Персональная сложность

  @Prop()
  pace?: string; // Темп прохождения (slow, normal, fast)

  @Prop({ default: true })
  notifications: boolean; // Уведомления

  @Prop({ default: true })
  reminders: boolean; // Напоминания

  @Prop()
  startDate?: Date; // Дата начала курса для студента

  @Prop()
  targetCompletionDate?: Date; // Целевая дата завершения

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

@Schema({ timestamps: true })
export class UserCourseSettings {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean; // Активен ли доступ

  // Переопределения для тренировок (для фитнес-курсов)
  @Prop({ type: [WorkoutOverride], default: [] })
  workoutOverrides: WorkoutOverride[];

  // Переопределения для упражнений
  @Prop({ type: [ExerciseOverride], default: [] })
  exerciseOverrides: ExerciseOverride[];

  // Переопределения для уроков (для обычных курсов)
  @Prop({ type: [LessonOverride], default: [] })
  lessonOverrides: LessonOverride[];

  // Общие настройки курса
  @Prop({ type: CourseSettings, default: {} })
  courseSettings: CourseSettings;

  // Метаданные
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId; // Кто создал настройки (тренер/модератор)

  @Prop()
  lastModified?: Date;

  @Prop()
  notes?: string; // Заметки тренера

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

export const UserCourseSettingsSchema = SchemaFactory.createForClass(UserCourseSettings);

// Индексы
UserCourseSettingsSchema.index({ userId: 1, courseId: 1 }, { unique: true });
UserCourseSettingsSchema.index({ userId: 1 });
UserCourseSettingsSchema.index({ courseId: 1 });
UserCourseSettingsSchema.index({ isActive: 1 });
UserCourseSettingsSchema.index({ createdBy: 1 });
UserCourseSettingsSchema.index({ 'workoutOverrides.workoutId': 1 });
UserCourseSettingsSchema.index({ 'exerciseOverrides.exerciseId': 1 });
UserCourseSettingsSchema.index({ 'lessonOverrides.lessonId': 1 });
