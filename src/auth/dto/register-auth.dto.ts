import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'
import {LoginAuthDto} from './login-auth.dto'

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @ApiProperty()
  team: string
}
