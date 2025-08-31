import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '@/common/types';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  phone: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.TEACHER })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ type: [String], default: [] })
  authProviders: string[];

  @Prop()
  lastLogin: Date;

  // Специфичные для преподавателя поля
  @Prop({ required: true })
  specialization: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: [String], default: [] })
  certificates: string[];

  @Prop()
  experience: number; // в годах

  @Prop()
  bio: string;

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop({ type: Object, default: {} })
  schedule: Record<string, any>;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  courses: Types.ObjectId[];

  @Prop({ type: Object, default: {} })
  profile: Record<string, any>;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

// Индексы
TeacherSchema.index({ email: 1 }, { unique: true });
TeacherSchema.index({ companyId: 1 });
TeacherSchema.index({ role: 1 });
TeacherSchema.index({ isActive: 1 });
TeacherSchema.index({ specialization: 1 });
TeacherSchema.index({ skills: 1 });

// Виртуальное поле для полного имени
TeacherSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Настройка для включения виртуальных полей при сериализации
TeacherSchema.set('toJSON', { virtuals: true });
TeacherSchema.set('toObject', { virtuals: true });
