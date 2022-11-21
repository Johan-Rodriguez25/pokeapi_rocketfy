import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Shipping, ShippingDocument} from './schemas/shipping.schema'
import {CreateShippingDto} from './dto/create-shipping.dto'
import {UpdateShippingDto} from './dto/update-shipping.dto'

@Injectable()
export class ShippingsRepository {
  constructor(
    @InjectModel(Shipping.name)
    private shippingModel: Model<ShippingDocument>
  ) {}

  async findAll(): Promise<Shipping[]> {
    return await this.shippingModel.find().populate('shipping_order', {
      total_amount: 1,
      created_time: 1,
      _id: 0
    })
  }

  async findOne(id: string): Promise<Shipping> {
    return await this.shippingModel.findById(id).populate('Shipping_order', {
      total_amount: 1,
      created_time: 1,
      _id: 0
    })
  }

  async create(createShippingDto: CreateShippingDto): Promise<Shipping> {
    return await new this.shippingModel(createShippingDto).save()
  }

  async update(
    id: string,
    updateShippingDto: UpdateShippingDto
  ): Promise<Shipping> {
    return await this.shippingModel.findByIdAndUpdate(id, updateShippingDto, {
      new: true
    })
  }

  async remove(id: string): Promise<Shipping> {
    return await this.shippingModel.findByIdAndDelete(id)
  }
}
