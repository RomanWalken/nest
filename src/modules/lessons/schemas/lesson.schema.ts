import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LessonType } from '@/common/types';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string; // HTML/Markdown контент

  @Prop({ type: String, enum: LessonType, required: true })
  type: LessonType;

  @Prop()
  videoUrl: string; // bunny.net URL (для видео уроков)

  @Prop({ default: 0 })
  duration: number; // в минутах

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: false })
  isFree: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Tariff', default: [] })
  tariffs: Types.ObjectId[]; // К каким тарифам привязан урок

  @Prop({ type: [String], default: [] })
  attachments: string[]; // uploadthings URLs

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  // Специфичные поля для разных типов уроков
  @Prop({ type: Object, default: {} })
  quizData?: Record<string, any>; // Для опросов

  @Prop({ type: Object, default: {} })
  presentationData?: Record<string, any>; // Для презентаций
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// Индексы
LessonSchema.index({ moduleId: 1, order: 1 });
LessonSchema.index({ moduleId: 1 });
LessonSchema.index({ isFree: 1 });
LessonSchema.index({ type: 1 });
LessonSchema.index({ tariffs: 1 }); 