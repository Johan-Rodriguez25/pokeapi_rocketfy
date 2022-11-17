import {Injectable} from '@nestjs/common'
import {PokemonsRepository} from './pokemons.repository'

@Injectable()
export class PokemonsService {
  constructor(private readonly pokemonsRepository: PokemonsRepository) {}

  async findAll(offset: number, limit: number) {
    return this.pokemonsRepository.findAll(offset, limit)
  }

  async findOneByName(name: string) {
    return this.pokemonsRepository.findOneByName(name)
  }

  async findOneById(id: number) {
    return this.pokemonsRepository.findOneById(id)
  }
}
