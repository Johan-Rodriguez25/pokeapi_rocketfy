import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import {Shipping_order} from 'src/shipping_orders/schemas/shipping_order.schema'

export type ShippingDocument = Shipping & mongoose.Document

@Schema({timestamps: true})
export class Shipping {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipping_order'
  })
  shipping_order: Shipping_order

  @Prop({required: true, enum: ['pending', 'transit', 'sent']})
  status: string
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping)
