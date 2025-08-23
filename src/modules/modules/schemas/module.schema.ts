import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ModuleDocument = Module & Document;

@Schema({ timestamps: true })
export class Module {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: false })
  isFree: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);

// Индексы
ModuleSchema.index({ courseId: 1, order: 1 });
ModuleSchema.index({ courseId: 1 });
ModuleSchema.index({ isFree: 1 }); 