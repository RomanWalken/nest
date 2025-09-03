import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BodyMeasurementsDocument = BodyMeasurements & Document;

@Schema({ timestamps: true })
export class BodyMeasurements {
  @Prop({ required: true })
  date: Date; // Дата измерения

  // Основные параметры
  @Prop({ min: 0 })
  weight?: number; // Вес в кг

  @Prop({ min: 0 })
  height?: number; // Рост в см

  @Prop({ min: 0 })
  bodyFat?: number; // Процент жира

  @Prop({ min: 0 })
  muscleMass?: number; // Мышечная масса в кг

  @Prop({ min: 0 })
  waterPercentage?: number; // Процент воды в организме

  // Обхваты
  @Prop({ min: 0 })
  chest?: number; // Обхват груди в см

  @Prop({ min: 0 })
  waist?: number; // Обхват талии в см

  @Prop({ min: 0 })
  hips?: number; // Обхват бедер в см

  @Prop({ min: 0 })
  biceps?: number; // Обхват бицепса в см

  @Prop({ min: 0 })
  thigh?: number; // Обхват бедра в см

  @Prop({ min: 0 })
  neck?: number; // Обхват шеи в см

  // Дополнительные параметры
  @Prop({ min: 0 })
  bmi?: number; // Индекс массы тела

  @Prop({ min: 0 })
  bmr?: number; // Базальный метаболизм

  @Prop({ min: 0 })
  tdee?: number; // Общий дневной расход энергии

  // Фото прогресса
  @Prop({ type: [String], default: [] })
  progressPhotos?: string[]; // URLs фотографий

  // Заметки
  @Prop()
  notes?: string; // Заметки к измерениям

  // Метаданные
  @Prop({ type: Object, default: {} })
  metadata?: Record<string, any>;
}

export const BodyMeasurementsSchema = SchemaFactory.createForClass(BodyMeasurements);

// Индексы
BodyMeasurementsSchema.index({ date: -1 });
BodyMeasurementsSchema.index({ weight: 1 });
BodyMeasurementsSchema.index({ bodyFat: 1 });
