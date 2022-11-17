import {Injectable} from '@nestjs/common'
import {HttpService} from '@nestjs/axios'
import {map} from 'rxjs'

@Injectable()
export class PokemonsRepository {
  constructor(private httpService: HttpService) {}
  urlApiBase: string = `https://pokeapi.co/api/v2`

  async findAll(offset: number, limit: number) {
    return await this.httpService
      .get(`${this.urlApiBase}/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(map((response) => response.data))
  }

  async findOneByName(name: string) {
    return await this.httpService
      .get(`${this.urlApiBase}/pokemon/${name}`)
      .pipe(map((response) => response.data))
  }

  async findOneById(id: number) {
    return await this.httpService
      .get(`${this.urlApiBase}/pokemon/${id}`)
      .pipe(map((response) => response.data))
  }
}
