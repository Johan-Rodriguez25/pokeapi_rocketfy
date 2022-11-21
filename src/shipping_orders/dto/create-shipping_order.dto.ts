import {ApiProperty} from '@nestjs/swagger/dist'

export class CreateShipping_orderDto {
  @ApiProperty()
  total_amount: number

  @ApiProperty()
  created_time: Date
}
