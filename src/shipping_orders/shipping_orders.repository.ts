import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {
  Shipping_order,
  Shipping_orderDocument
} from './schemas/shipping_order.schema'
import {CreateShipping_orderDto} from './dto/create-shipping_order.dto'
import {UpdateShipping_orderDto} from './dto/update-shipping_order.dto'
import {create} from 'domain'

@Injectable()
export class Shipping_ordersRepository {
  constructor(
    @InjectModel(Shipping_order.name)
    private shipping_orderModel: Model<Shipping_orderDocument>
  ) {}

  async findAll(): Promise<Shipping_order[]> {
    return await this.shipping_orderModel.find()
  }

  async findOne(id: string): Promise<Shipping_order> {
    return await this.shipping_orderModel.findById(id)
  }

  async create(
    createShipping_orderDto: CreateShipping_orderDto
  ): Promise<Shipping_order> {
    let {created_time} = createShipping_orderDto

    created_time = new Date(created_time)

    const unixTime = Math.floor(created_time.getTime() / 1000)

    const data = {
      total_amount: createShipping_orderDto.total_amount,
      created_time: unixTime
    }

    return await new this.shipping_orderModel(data).save()
  }

  async update(
    id: string,
    updateShipping_orderDto: UpdateShipping_orderDto
  ): Promise<Shipping_order> {
    return await this.shipping_orderModel.findByIdAndUpdate(
      id,
      updateShipping_orderDto,
      {
        new: true
      }
    )
  }

  async remove(id: string): Promise<Shipping_order> {
    return await this.shipping_orderModel.findByIdAndDelete(id)
  }
}
