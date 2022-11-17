import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {UsersService} from './users.service'
import {User} from './schemas/user.schema'
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({description: 'The users were returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description: 'The user was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The user was not found'})
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'The user was created successfully'})
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: 'The user was updated successfully'})
  @ApiNotFoundResponse({description: 'The user not found'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  async Update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: 'The user was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The user was not found'})
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id)
  }
}
