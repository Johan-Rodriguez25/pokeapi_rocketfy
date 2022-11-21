import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import {CreateShipping_orderDto} from './dto/create-shipping_order.dto'
import {UpdateShipping_orderDto} from './dto/update-shipping_order.dto'
import {Shipping_ordersService} from './shipping_orders.service'
import {Shipping_order} from './schemas/shipping_order.schema'
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard'

@ApiBearerAuth()
@ApiTags('Shipping_orders')
@Controller('/api/v1/shipping_orders')
export class Shipping_ordersController {
  constructor(private shipping_ordersService: Shipping_ordersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'The shipping orders were returned successfully'
  })
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async findAll(): Promise<Shipping_order[]> {
    return this.shipping_ordersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description: 'The shipping order was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The shipping order was not found'})
  async findOne(@Param('id') id: string): Promise<Shipping_order> {
    return this.shipping_ordersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'The shipping order was created successfully'
  })
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  async create(
    @Body() createShipping_orderDto: CreateShipping_orderDto
  ): Promise<Shipping_order> {
    return this.shipping_ordersService.create(createShipping_orderDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: 'The shipping order was updated successfully'})
  @ApiNotFoundResponse({description: 'The shipping order not found'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiUnprocessableEntityResponse({description: 'Bad request'})
  async Update(
    @Param('id') id: string,
    @Body() updateShipping_orderDto: UpdateShipping_orderDto
  ): Promise<Shipping_order> {
    return this.shipping_ordersService.update(id, updateShipping_orderDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: 'The shipping order was returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized request'})
  @ApiNotFoundResponse({description: 'The shipping order was not found'})
  async remove(@Param('id') id: string): Promise<Shipping_order> {
    return this.shipping_ordersService.remove(id)
  }
}
