import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type UserDocument = User & mongoose.Document

@Schema({timestamps: true})
export class User {
  @Prop({required: true})
  name: string

  @Prop({required: true})
  password: string

  @Prop({required: true})
  nickname: string

  @Prop({required: true, enum: ['rojo', 'azul', 'amarillo']})
  team: string

  @Prop()
  last_connection: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
