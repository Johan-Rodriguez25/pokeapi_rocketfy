import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  UseGuards
} from '@nestjs/common'
import {Response} from 'express'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import {CreateShippingDto} from './dto/create-shipping.dto'
import {UpdateShippingDto} from './dto/update-shipping.dto'
import {ShippingsService} from './shippings.service'
import {Shipping} from './schemas/shipping.schema'
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard'

@ApiBearerAuth()
@ApiTags('Shippings')
@Controller('/api/v1/shippings')
export class ShippingsController {
  constructor(private shippingsService: ShippingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({description: 'The shippings were returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const shippings = await this.shippingsService.findAll()
      let result = []

      for (let i = 0; i < shippings.length; i++) {
        let fecha: any = new Date(
          shippings[i].shipping_order.created_time * 1000
        )
        let startFecha: any = new Date(fecha.getFullYear(), 0, 1)
        let year: number = fecha.getFullYear()
        let days: number = Math.floor(
          (fecha - startFecha) / (24 * 60 * 60 * 1000)
        )
        let week: number = Math.ceil(days / 7)

        result.push({
          status_shipping: shippings[i].status,
          year: year,
          week: week,
          total_amount: shippings[i].shipping_order.total_amount
        })
      }

      return res.status(200).json(result)
    } catch (e) {
      res.status(e.status).json(e.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description: 'The shipping was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The shipping was not found'})
  async findOne(@Param('id') id: string): Promise<Shipping> {
    return this.shippingsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'The shipping was created successfully'})
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async create(
    @Body() createShippingDto: CreateShippingDto
  ): Promise<Shipping> {
    return this.shippingsService.create(createShippingDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: 'The shipping was updated successfully'})
  @ApiNotFoundResponse({description: 'The shipping not found'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  async Update(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto
  ): Promise<Shipping> {
    return this.shippingsService.update(id, updateShippingDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: 'The shipping was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The shipping was not found'})
  async remove(@Param('id') id: string): Promise<Shipping> {
    return this.shippingsService.remove(id)
  }
}
