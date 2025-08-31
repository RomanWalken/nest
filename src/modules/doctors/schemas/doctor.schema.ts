import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  // Файлы, загруженные пользователем
  @Prop({ type: [String], default: [] })
  userFiles: string[]; // uploadthings URLs

  // Файлы, загруженные представителем курса
  @Prop({ type: [String], default: [] })
  courseFiles: string[]; // uploadthings URLs

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop({ default: false })
  isActive: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);

// Индексы
DoctorSchema.index({ userId: 1, courseId: 1 }, { unique: true });
DoctorSchema.index({ userId: 1 });
DoctorSchema.index({ courseId: 1 });
DoctorSchema.index({ isActive: 1 });
