import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {User, UserSchema} from 'src/users/schemas/user.schema'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from './jwt.strategy'
import {AuthRepository} from './auth.repository'
import {jwtConstants} from './jwt.constants'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '20h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy]
})
export class AuthModule {}
