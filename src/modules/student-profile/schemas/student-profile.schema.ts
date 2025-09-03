import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BodyMeasurements, BodyMeasurementsSchema } from './body-measurements.schema';
import { FitnessGoals, FitnessGoalsSchema } from './fitness-goals.schema';

export type StudentProfileDocument = StudentProfile & Document;

@Schema({ timestamps: true })
export class StudentProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId; // Связь с пользователем

  // Личная информация
  @Prop()
  dateOfBirth?: Date; // Дата рождения

  @Prop()
  gender?: string; // "male", "female", "other"

  @Prop()
  phone?: string; // Телефон

  @Prop()
  emergencyContact?: string; // Контакт для экстренных случаев

  // Медицинская информация
  @Prop({ type: [String], default: [] })
  medicalConditions: string[]; // Медицинские состояния

  @Prop({ type: [String], default: [] })
  medications: string[]; // Лекарства

  @Prop({ type: [String], default: [] })
  allergies: string[]; // Аллергии

  @Prop()
  doctorContact?: string; // Контакт врача

  // Цели фитнеса
  @Prop({ type: FitnessGoalsSchema, default: {} })
  fitnessGoals: FitnessGoals;

  // Измерения тела (история)
  @Prop({ type: [BodyMeasurementsSchema], default: [] })
  bodyMeasurements: BodyMeasurements[];

  // Текущие измерения (быстрый доступ)
  @Prop({ type: BodyMeasurementsSchema })
  currentMeasurements?: BodyMeasurements;

  // Настройки профиля
  @Prop({ default: true })
  isPublic: boolean; // Публичный ли профиль

  @Prop({ default: true })
  allowProgressSharing: boolean; // Разрешить делиться прогрессом

  @Prop({ default: true })
  receiveMotivationalMessages: boolean; // Получать мотивационные сообщения

  // Статус квиза
  @Prop({ default: false })
  hasCompletedInitialQuiz: boolean; // Завершен ли начальный квиз

  @Prop()
  quizCompletedAt?: Date; // Дата завершения квиза

  @Prop()
  lastQuizUpdate?: Date; // Дата последнего обновления квиза

  // Связи с курсами
  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  enrolledFitnessCourses: Types.ObjectId[]; // Записанные фитнес-курсы

  // Достижения
  @Prop({ type: [String], default: [] })
  achievements: string[]; // Достижения

  // Заметки тренера
  @Prop()
  trainerNotes?: string; // Заметки тренера

  @Prop({ type: Types.ObjectId, ref: 'User' })
  lastUpdatedBy?: Types.ObjectId; // Кто последний обновлял профиль

  // Метаданные
  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

export const StudentProfileSchema = SchemaFactory.createForClass(StudentProfile);

// Индексы
StudentProfileSchema.index({ userId: 1 }, { unique: true });
StudentProfileSchema.index({ 'fitnessGoals.primaryGoal': 1 });
StudentProfileSchema.index({ 'fitnessGoals.status': 1 });
StudentProfileSchema.index({ hasCompletedInitialQuiz: 1 });
StudentProfileSchema.index({ 'bodyMeasurements.date': -1 });
StudentProfileSchema.index({ enrolledFitnessCourses: 1 });
