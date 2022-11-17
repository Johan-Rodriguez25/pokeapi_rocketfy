import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {User, UserDocument} from './schemas/user.schema'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true
    })
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id)
  }
}
