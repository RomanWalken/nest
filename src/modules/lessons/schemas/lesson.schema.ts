import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string; // HTML/Markdown контент

  @Prop()
  videoUrl: string; // bunny.net URL

  @Prop({ default: 0 })
  duration: number; // в минутах

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: false })
  isFree: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  attachments: string[]; // uploadthings URLs

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// Индексы
LessonSchema.index({ moduleId: 1, order: 1 });
LessonSchema.index({ moduleId: 1 });
LessonSchema.index({ isFree: 1 }); 