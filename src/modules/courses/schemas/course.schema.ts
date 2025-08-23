import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseType, DifficultyLevel } from '@/common/types';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: CourseType, required: true })
  type: CourseType;

  @Prop()
  thumbnail: string;

  @Prop({ default: 0 })
  duration: number; // в минутах

  @Prop({ type: String, enum: DifficultyLevel, default: DifficultyLevel.BEGINNER })
  difficulty: DifficultyLevel;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Индексы
CourseSchema.index({ slug: 1, companyId: 1 }, { unique: true });
CourseSchema.index({ companyId: 1 });
CourseSchema.index({ authorId: 1 });
CourseSchema.index({ type: 1 });
CourseSchema.index({ isPublished: 1 });
CourseSchema.index({ isFeatured: 1 });
CourseSchema.index({ tags: 1 }); 