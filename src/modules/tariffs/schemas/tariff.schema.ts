import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TariffStatus } from '@/common/types';

export type TariffDocument = Tariff & Document;

@Schema({ timestamps: true })
export class Tariff {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string; // URL изображения тарифа

  @Prop({ min: 0 })
  oldPrice?: number; // Старая цена (не обязательна)

  @Prop({ required: true, min: 0 })
  newPrice: number; // Новая цена (основная)

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ required: true, min: 0, default: 0 })
  duration: number; // длительность в днях (0 = бессрочный доступ)

  @Prop({ type: String, enum: TariffStatus, default: TariffStatus.ACTIVE })
  status: TariffStatus;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Lesson', default: [] })
  lessonIds: Types.ObjectId[]; // Для обычных курсов

  @Prop({ type: [Types.ObjectId], ref: 'Workout', default: [] })
  workoutIds: Types.ObjectId[]; // Для фитнес-курсов

  @Prop({ type: [String], default: [] })
  advantages: string[]; // Преимущества тарифа

  @Prop({ default: false })
  includesDoctor: boolean; // Включает ли тариф доктора

  @Prop({ type: Object, default: {} })
  features: Record<string, any>; // Дополнительные возможности
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);

// Индексы
TariffSchema.index({ courseId: 1 });
TariffSchema.index({ status: 1 });
TariffSchema.index({ newPrice: 1 });
TariffSchema.index({ duration: 1 });
TariffSchema.index({ lessonIds: 1 });
TariffSchema.index({ workoutIds: 1 }); 