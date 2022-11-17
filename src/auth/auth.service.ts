import {Injectable} from '@nestjs/common'
import {AuthRepository} from './auth.repository'
// import {Producto} from './schemas/producto.schema'
import {RegisterAuthDto} from './dto/register-auth.dto'
import {LoginAuthDto} from './dto/login-auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(userObject: RegisterAuthDto) {
    return this.authRepository.register(userObject)
  }

  async login(userObjectLogin: LoginAuthDto) {
    return this.authRepository.login(userObjectLogin)
  }
}
