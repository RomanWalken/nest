import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentStatus, PaymentMethod } from '@/common/types';

export type PurchaseDocument = Purchase & Document;

@Schema({ timestamps: true })
export class Purchase {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tariff', required: true })
  tariffId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: String, enum: PaymentMethod, required: true })
  paymentMethod: PaymentMethod;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Prop()
  transactionId: string;

  @Prop()
  accessExpiresAt: Date; // null для бессрочного доступа

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);

// Индексы
PurchaseSchema.index({ userId: 1, courseId: 1 });
PurchaseSchema.index({ userId: 1 });
PurchaseSchema.index({ courseId: 1 });
PurchaseSchema.index({ tariffId: 1 });
PurchaseSchema.index({ paymentStatus: 1 });
PurchaseSchema.index({ accessExpiresAt: 1 });
PurchaseSchema.index({ transactionId: 1 }); 