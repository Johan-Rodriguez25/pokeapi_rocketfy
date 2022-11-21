import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Shipping, ShippingSchema} from './schemas/shipping.schema'
import {ShippingsController} from './shippings.controller'
import {ShippingsService} from './shippings.service'
import {ShippingsRepository} from './shippings.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipping.name,
        schema: ShippingSchema
      }
    ])
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService, ShippingsRepository]
})
export class ShippingsModule {}
