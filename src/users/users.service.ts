import {Injectable} from '@nestjs/common'
import {UsersRepository} from './users.repository'
import {User} from './schemas/user.schema'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll()
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: string): Promise<User> {
    return this.usersRepository.remove(id)
  }
}
