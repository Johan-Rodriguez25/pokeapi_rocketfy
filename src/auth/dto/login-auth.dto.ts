import {ApiProperty} from '@nestjs/swagger'
import {MaxLength, MinLength} from 'class-validator'

export class LoginAuthDto {
  @ApiProperty()
  nickname: string

  @MinLength(8)
  @MaxLength(16)
  @ApiProperty()
  password: string
}
