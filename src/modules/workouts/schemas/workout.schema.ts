import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({ timestamps: true })
export class Workout {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  duration: number; // в минутах

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: false })
  isFree: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Tariff', default: [] })
  tariffs: Types.ObjectId[]; // К каким тарифам привязан workout

  @Prop({ type: [Types.ObjectId], ref: 'Exercise', default: [] })
  exercises: Types.ObjectId[];

  // Расписание
  @Prop({ required: true })
  month: number; // Месяц (1-12)

  @Prop({ required: true })
  week: number; // Неделя в месяце (1-5)

  @Prop({ required: true })
  day: number; // День недели (1-7)

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  // Пользовательские настройки (для модераторов)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  customUserId?: Types.ObjectId; // ID пользователя, для которого настроен workout

  @Prop({ default: false })
  isCustom: boolean; // Является ли workout пользовательским
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);

// Индексы
WorkoutSchema.index({ courseId: 1 });
WorkoutSchema.index({ month: 1, week: 1, day: 1 });
WorkoutSchema.index({ isFree: 1 });
WorkoutSchema.index({ tariffs: 1 });
WorkoutSchema.index({ customUserId: 1 });
WorkoutSchema.index({ isCustom: 1 });
