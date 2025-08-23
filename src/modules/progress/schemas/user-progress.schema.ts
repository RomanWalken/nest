import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true })
export class UserProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Lesson', default: [] })
  completedLessons: Types.ObjectId[];

  @Prop({ min: 0, max: 100, default: 0 })
  progressPercentage: number;

  @Prop({ type: Types.ObjectId, ref: 'Lesson' })
  lastAccessedLesson: Types.ObjectId;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);

// Индексы
UserProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
UserProgressSchema.index({ userId: 1 });
UserProgressSchema.index({ courseId: 1 });
UserProgressSchema.index({ progressPercentage: 1 }); 