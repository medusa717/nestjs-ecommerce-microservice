import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ShippingDocument = Shipping & Document;
@Schema({ timestamps: true })
export class Shipping {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  orderId: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
