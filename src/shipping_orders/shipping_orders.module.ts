import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {
  Shipping_order,
  Shipping_orderSchema
} from './schemas/shipping_order.schema'
import {Shipping_ordersController} from './shipping_orders.controller'
import {Shipping_ordersService} from './shipping_orders.service'
import {Shipping_ordersRepository} from './shipping_orders.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipping_order.name,
        schema: Shipping_orderSchema
      }
    ])
  ],
  controllers: [Shipping_ordersController],
  providers: [Shipping_ordersService, Shipping_ordersRepository]
})
export class Shipping_ordersModule {}
