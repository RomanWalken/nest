import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema({ timestamps: true })
export class Exercise {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  videoUrl: string; // Ссылка на видео упражнения

  @Prop({ required: true, min: 1 })
  repetitions: number; // Количество повторений

  @Prop()
  explanation: string; // Подробное объяснение выполнения

  @Prop({ type: [Types.ObjectId], ref: 'Equipment', default: [] })
  equipment: Types.ObjectId[]; // Необходимое оборудование

  @Prop({ type: [String], default: [] })
  targetMuscles: string[]; // Мускулы, над которыми ведется работа

  @Prop({ default: 0 })
  duration: number; // Продолжительность в секундах

  @Prop({ default: 1 })
  sets: number; // Количество подходов

  @Prop({ default: 0 })
  restTime: number; // Время отдыха между подходами в секундах

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  // Пользовательские настройки (для модераторов)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  customUserId?: Types.ObjectId; // ID пользователя, для которого настроено упражнение

  @Prop({ default: false })
  isCustom: boolean; // Является ли упражнение пользовательским
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

// Индексы
ExerciseSchema.index({ title: 1 });
ExerciseSchema.index({ targetMuscles: 1 });
ExerciseSchema.index({ equipment: 1 });
ExerciseSchema.index({ customUserId: 1 });
ExerciseSchema.index({ isCustom: 1 });
