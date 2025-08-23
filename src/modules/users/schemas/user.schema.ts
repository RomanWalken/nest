import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '@/common/types';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
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

  @Prop({ type: String, enum: UserRole, default: UserRole.STUDENT })
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

  @Prop({ type: Object, default: {} })
  profile: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Индексы
UserSchema.index({ email: 1, companyId: 1 }, { unique: true });
UserSchema.index({ companyId: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// Виртуальное поле для полного имени
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Настройка для включения виртуальных полей при сериализации
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true }); 