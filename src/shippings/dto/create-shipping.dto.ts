import {ApiProperty} from '@nestjs/swagger/dist'

export class CreateShippingDto {
  @ApiProperty()
  shipping_order: string

  @ApiProperty()
  status: string
}
