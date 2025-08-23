import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TariffDocument = Tariff & Document;

@Schema({ timestamps: true })
export class Tariff {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ required: true, min: 0, default: 0 })
  duration: number; // длительность в днях (0 = бессрочный доступ)

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Lesson', default: [] })
  lessonIds: Types.ObjectId[];

  @Prop({ type: Object, default: {} })
  features: Record<string, any>;
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);

// Индексы
TariffSchema.index({ courseId: 1 });
TariffSchema.index({ isActive: 1 });
TariffSchema.index({ price: 1 });
TariffSchema.index({ duration: 1 }); 