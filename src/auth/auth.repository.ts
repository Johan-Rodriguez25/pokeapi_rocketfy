import {Injectable, HttpException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {User, UserDocument} from 'src/users/schemas/user.schema'
import {RegisterAuthDto} from './dto/register-auth.dto'
import {hash, compare} from 'bcrypt'
import {LoginAuthDto} from './dto/login-auth.dto'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    const {password} = userObject
    const plainToHash = await hash(password, 10)

    userObject = {...userObject, password: plainToHash}

    return this.userModel.create(userObject)
  }

  async login(userObjectLogin: LoginAuthDto) {
    const {nickname, password} = userObjectLogin
    const findUser = await this.userModel.findOne({nickname})

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

    const checkPassword = await compare(password, findUser.password)

    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403)

    const payload = {
      id: findUser._id,
      name: findUser.name
    }
    const token = await this.jwtService.sign(payload)

    const data = {
      user: findUser,
      token
    }

    return data
  }
}
