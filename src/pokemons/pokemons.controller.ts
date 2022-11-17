import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query
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
import {PokemonsService} from './pokemons.service'
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard'

@ApiBearerAuth()
@ApiTags('Pokemons')
@Controller('/api/v1/pokemons')
export class PokemonsController {
  constructor(private pokemonsService: PokemonsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({description: 'The pokemons were returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return this.pokemonsService.findAll(offset, limit)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  @ApiOkResponse({
    description: 'The pokemon was returned successfully'
  })
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The pokemon was not found'})
  async findOneByName(@Param('name') name: string) {
    return this.pokemonsService.findOneByName(name)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description: 'The pokemon was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The pokemon was not found'})
  async findOneById(@Param('id') id: number) {
    return this.pokemonsService.findOneById(id)
  }
}
