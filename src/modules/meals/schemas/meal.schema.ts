import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealDocument = Meal & Document;

@Schema({ timestamps: true })
export class Meal {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ min: 0 })
  calories: number;

  @Prop({ min: 0 })
  proteins: number; // в граммах

  @Prop({ min: 0 })
  fats: number; // в граммах

  @Prop({ min: 0 })
  carbohydrates: number; // в граммах

  @Prop()
  image: string; // URL изображения

  @Prop()
  recipe: string; // рецепт приготовления

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  ingredients: string[];

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const MealSchema = SchemaFactory.createForClass(Meal);

// Индексы
MealSchema.index({ courseId: 1 });
MealSchema.index({ calories: 1 });
MealSchema.index({ proteins: 1 });
MealSchema.index({ fats: 1 });
MealSchema.index({ carbohydrates: 1 }); 