import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Type, Transform} from 'class-transformer'
import * as mongoose from 'mongoose'

export type Shipping_orderDocument = Shipping_order & mongoose.Document

@Schema()
export class Shipping_order {
  @Prop({required: true})
  total_amount: number

  @Prop({required: true})
  @Type(() => Date)
  @Transform((value) => value.valueOf(), {toPlainOnly: true})
  created_time: number
}

export const Shipping_orderSchema = SchemaFactory.createForClass(Shipping_order)
