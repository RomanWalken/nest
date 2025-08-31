import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseKind, CourseCategory, DifficultyLevel, CoursePublicationStatus } from '@/common/types';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: CourseKind, required: true })
  kind: CourseKind;

  @Prop({ type: String, enum: CourseCategory, required: true })
  category: CourseCategory;

  @Prop()
  thumbnail: string;

  @Prop({ default: 0 })
  duration: number; // в минутах

  @Prop({ type: String, enum: DifficultyLevel, default: DifficultyLevel.BEGINNER })
  difficulty: DifficultyLevel;

  @Prop({ type: String, enum: CoursePublicationStatus, default: CoursePublicationStatus.DRAFT })
  publicationStatus: CoursePublicationStatus;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isPaid: boolean; // Платный или бесплатный курс

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  // Специфичные для фитнес-курсов поля
  @Prop({ type: [Types.ObjectId], ref: 'Meal', default: [] })
  meals: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Teacher', default: [] })
  teachers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Workout', default: [] })
  workouts: Types.ObjectId[];

  @Prop({ default: false })
  hasMeals: boolean; // Будет ли у курса meals

  @Prop({ default: false })
  hasDoctor: boolean; // Будет ли у курса доктор

  // Специфичные для обычных курсов поля
  @Prop({ type: [Types.ObjectId], ref: 'Module', default: [] })
  modules: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Индексы
CourseSchema.index({ slug: 1, companyId: 1 }, { unique: true });
CourseSchema.index({ companyId: 1 });
CourseSchema.index({ authorId: 1 });
CourseSchema.index({ kind: 1 });
CourseSchema.index({ category: 1 });
CourseSchema.index({ publicationStatus: 1 });
CourseSchema.index({ isPaid: 1 });
CourseSchema.index({ isFeatured: 1 });
CourseSchema.index({ tags: 1 });

// Виртуальное поле для проверки типа курса
CourseSchema.virtual('isFitnessCourse').get(function() {
  return this.kind === CourseKind.FITNESS;
});

CourseSchema.virtual('isRegularCourse').get(function() {
  return this.kind === CourseKind.REGULAR;
});

// Настройка для включения виртуальных полей при сериализации
CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true }); 