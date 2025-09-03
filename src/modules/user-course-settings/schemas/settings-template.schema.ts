import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SettingsTemplateDocument = SettingsTemplate & Document;

@Schema({ timestamps: true })
export class SettingsTemplate {
  @Prop({ required: true })
  name: string; // "Начинающий", "Продвинутый", "Спортсмен"

  @Prop()
  description: string; // Описание шаблона

  @Prop({ required: true })
  category: string; // "fitness", "regular", "general"

  @Prop({ default: false })
  isDefault: boolean; // Является ли шаблоном по умолчанию

  @Prop({ default: true })
  isActive: boolean; // Активен ли шаблон

  // Настройки для тренировок
  @Prop({ type: Object, default: {} })
  workoutDefaults: {
    durationMultiplier: number; // Множитель длительности (0.5 = 50% от базовой)
    intensityLevel: string; // "low", "medium", "high"
    restTimeMultiplier: number; // Множитель времени отдыха
    enabledByDefault: boolean; // Включены ли тренировки по умолчанию
  };

  // Настройки для упражнений
  @Prop({ type: Object, default: {} })
  exerciseDefaults: {
    repetitionsMultiplier: number; // Множитель повторений
    setsMultiplier: number; // Множитель подходов
    restTimeMultiplier: number; // Множитель времени отдыха
    enabledByDefault: boolean; // Включены ли упражнения по умолчанию
  };

  // Настройки для уроков
  @Prop({ type: Object, default: {} })
  lessonDefaults: {
    unlockAll: boolean; // Разблокировать все уроки
    requiredByDefault: boolean; // Обязательны ли уроки по умолчанию
    customOrder: boolean; // Использовать персональный порядок
  };

  // Общие настройки курса
  @Prop({ type: Object, default: {} })
  courseDefaults: {
    difficulty: string; // "beginner", "intermediate", "advanced"
    pace: string; // "slow", "normal", "fast"
    notifications: boolean;
    reminders: boolean;
    weeklyGoal: string; // "3 тренировки в неделю"
  };

  // Метаданные
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId; // Кто создал шаблон

  @Prop({ type: [String], default: [] })
  tags: string[]; // Теги для поиска

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const SettingsTemplateSchema = SchemaFactory.createForClass(SettingsTemplate);

// Индексы
SettingsTemplateSchema.index({ name: 1 });
SettingsTemplateSchema.index({ category: 1 });
SettingsTemplateSchema.index({ isDefault: 1 });
SettingsTemplateSchema.index({ isActive: 1 });
SettingsTemplateSchema.index({ tags: 1 });
