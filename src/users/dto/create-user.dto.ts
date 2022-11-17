import {ApiProperty} from '@nestjs/swagger/dist'

export class CreateUserDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  password: string

  @ApiProperty()
  nickname: string

  @ApiProperty()
  team: string

  @ApiProperty()
  last_connection: Date
}
