import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop({ unique: true })
  domain: string;

  @Prop({ type: Object, default: {} })
  settings: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

// Индексы
CompanySchema.index({ slug: 1 });
CompanySchema.index({ domain: 1 });
CompanySchema.index({ ownerId: 1 }); 