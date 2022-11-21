import {Injectable} from '@nestjs/common'
import {Shipping_ordersRepository} from './shipping_orders.repository'
import {Shipping_order} from './schemas/shipping_order.schema'
import {CreateShipping_orderDto} from './dto/create-shipping_order.dto'
import {UpdateShipping_orderDto} from './dto/update-shipping_order.dto'

@Injectable()
export class Shipping_ordersService {
  constructor(
    private readonly shipping_ordersRepository: Shipping_ordersRepository
  ) {}

  async findAll(): Promise<Shipping_order[]> {
    return this.shipping_ordersRepository.findAll()
  }

  async findOne(id: string): Promise<Shipping_order> {
    return this.shipping_ordersRepository.findOne(id)
  }

  async create(
    createShipping_orderDto: CreateShipping_orderDto
  ): Promise<Shipping_order> {
    return this.shipping_ordersRepository.create(createShipping_orderDto)
  }

  async update(
    id: string,
    updateShipping_orderDto: UpdateShipping_orderDto
  ): Promise<Shipping_order> {
    return this.shipping_ordersRepository.update(id, updateShipping_orderDto)
  }

  async remove(id: string): Promise<Shipping_order> {
    return this.shipping_ordersRepository.remove(id)
  }
}
