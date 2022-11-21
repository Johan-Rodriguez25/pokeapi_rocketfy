import {Injectable} from '@nestjs/common'
import {ShippingsRepository} from './shippings.repository'
import {Shipping} from './schemas/shipping.schema'
import {CreateShippingDto} from './dto/create-shipping.dto'
import {UpdateShippingDto} from './dto/update-shipping.dto'

@Injectable()
export class ShippingsService {
  constructor(private readonly shippingsRepository: ShippingsRepository) {}

  async findAll(): Promise<Shipping[]> {
    return this.shippingsRepository.findAll()
  }

  async findOne(id: string): Promise<Shipping> {
    return this.shippingsRepository.findOne(id)
  }

  async create(createShippingDto: CreateShippingDto): Promise<Shipping> {
    return this.shippingsRepository.create(createShippingDto)
  }

  async update(
    id: string,
    updateShippingDto: UpdateShippingDto
  ): Promise<Shipping> {
    return this.shippingsRepository.update(id, updateShippingDto)
  }

  async remove(id: string): Promise<Shipping> {
    return this.shippingsRepository.remove(id)
  }
}
