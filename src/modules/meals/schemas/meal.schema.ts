import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DietaryCategory } from '@/common/types';

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

  @Prop({ type: String, enum: DietaryCategory, required: true })
  dietaryCategory: DietaryCategory;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Tariff', default: [] })
  tariffs: Types.ObjectId[]; // К каким тарифам привязан meal

  @Prop({ type: [String], default: [] })
  ingredients: string[];

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  // Пользовательские настройки (для модераторов)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  customUserId?: Types.ObjectId; // ID пользователя, для которого настроен meal

  @Prop({ default: false })
  isCustom: boolean; // Является ли meal пользовательским
}

export const MealSchema = SchemaFactory.createForClass(Meal);

// Индексы
MealSchema.index({ courseId: 1 });
MealSchema.index({ dietaryCategory: 1 });
MealSchema.index({ calories: 1 });
MealSchema.index({ proteins: 1 });
MealSchema.index({ fats: 1 });
MealSchema.index({ carbohydrates: 1 });
MealSchema.index({ tariffs: 1 });
MealSchema.index({ customUserId: 1 });
MealSchema.index({ isCustom: 1 }); 