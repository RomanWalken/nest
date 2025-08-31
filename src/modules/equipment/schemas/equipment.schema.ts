import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentDocument = Equipment & Document;

@Schema({ timestamps: true })
export class Equipment {
  @Prop({ required: true })
  name: string;

  @Prop()
  icon: string; // URL иконки

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);

// Индексы
EquipmentSchema.index({ name: 1 });
EquipmentSchema.index({ isActive: 1 });
