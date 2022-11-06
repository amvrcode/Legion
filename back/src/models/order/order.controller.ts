import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UserFromReq } from '../../core/decorators/user-from-req.decorator'
import { User } from '../user/entities/user.entity'
import { AuthGuard } from '../../core/guards/auth.guard'
import { SetOrderInputsDto } from './dto/set-order-inputs.dto'
import { SetOrderExtraInputsDto } from './dto/set-order-extra-inputs.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createDeposit(@Body() createOrderDto: CreateOrderDto, @UserFromReq() user: User) {
    return await this.orderService.createOrder(createOrderDto, user)
  }

  @Post('setInputs')
  async setOrderInput(@Body() setOrderInput: SetOrderInputsDto) {
    return await this.orderService.setOrderInput(setOrderInput)
  }

  @Post('setExtraInput')
  async setExtraInput(@Body() setExtraCode: SetOrderExtraInputsDto) {
    return await this.orderService.setExtraCode(setExtraCode)
  }

  @Get('webhookForCrPay')
  async webhookForCrPay(@Query() data: any) {
    console.log(data)
    await this.orderService.successPayment(data.EXTRA)
    return 'Done'
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return await this.orderService.getOrder(orderId)
  }
}
