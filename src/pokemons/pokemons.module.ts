import {Module} from '@nestjs/common'
import {HttpModule} from '@nestjs/axios'
import {PokemonsController} from './pokemons.controller'
import {PokemonsRepository} from './pokemons.repository'
import {PokemonsService} from './pokemons.service'

@Module({
  imports: [HttpModule],
  controllers: [PokemonsController],
  providers: [PokemonsService, PokemonsRepository]
})
export class PokemonsModule {}
