import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { User } from '../user/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../user/user.repository'
import { OrderRepository } from './order.repository'
import { ProductRepository } from '../product/product.repository'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { OrderStatusesEnum } from './constants/order-statuses.enum'
import { SetOrderInputsDto } from './dto/set-order-inputs.dto'
import { OrderInputRepository } from '../order-input/order-input.repository'
import { OrderExtraInputRepository } from '../order-extra-input/order-extra-input.repository'
import { AdminAlertsUpdate } from '../../admin-alerts/admin-alerts.update'
import { SetOrderExtraInputsDto } from './dto/set-order-extra-inputs.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,

    @InjectRepository(OrderInputRepository)
    private readonly orderInputRepository: OrderInputRepository,

    @InjectRepository(OrderExtraInputRepository)
    private readonly orderExtraInputRepository: OrderExtraInputRepository,

    private readonly adminAlertService: AdminAlertsUpdate
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    const item = await this.productRepository.findOne({ where: { id: createOrderDto.itemId } })
    if (!item) {
      throw new BadRequestException('Товар с таким ID не найден')
    }

    const orderPath = uuidv4()

    const newOrder = await this.orderRepository.create({
      user: user,
      product: item,
      path: orderPath,
    })
    const order = await this.orderRepository.save(newOrder)
    const crResponce = await this.getPaymentCrLink(item.price, orderPath)

    // @ts-ignore
    return crResponce.url
  }

  async getOrder(orderId: string) {
    return await this.orderRepository.findOne({ where: { path: orderId }, relations: ['product'] })
  }

  async successPayment(orderId: string) {
    const order = await this.orderRepository.findOne({ where: { path: orderId } })
    order.status = OrderStatusesEnum.WAIT_FOR_INPUT
    await this.orderRepository.save(order)
    return 'Done'
  }

  async setOrderInput(setInputOrderDto: SetOrderInputsDto) {
    const order = await this.orderRepository.findOne({
      where: { path: setInputOrderDto.path, status: OrderStatusesEnum.WAIT_FOR_INPUT },
      relations: ['product'],
    })
    order.email = setInputOrderDto.email
    order.status = OrderStatusesEnum.IN_EXECUTION

    let inputs = []
    for (let i = 0; i < setInputOrderDto.inputs.length; i++) {
      const input = await this.orderInputRepository.create({
        order: order,
        title: setInputOrderDto.inputs[i].title,
        value: setInputOrderDto.inputs[i].value,
      })
      inputs.push({
        title: setInputOrderDto.inputs[i].title,
        value: setInputOrderDto.inputs[i].value,
      })
      const savedInput = await this.orderInputRepository.save(input)
    }

    await this.adminAlertService.makeAlert({
      orderPath: order.path,
      price: String(order.product.price),
      product: order.product.title,
      category: order.product.category.title,
      inputs: inputs,
    })
    await this.orderRepository.save(order)
  }

  async setExtraCode(setOrderExtraDto: SetOrderExtraInputsDto) {
    const order = await this.orderRepository.findOne({
      where: { path: setOrderExtraDto.path, status: OrderStatusesEnum.WAIT_FOR_EXTRA_INPUT },
      relations: ['product', 'inputs'],
    })
    order.status = OrderStatusesEnum.IN_EXECUTION

    const extraInput = await this.orderExtraInputRepository.create({
      order: order,
      value: setOrderExtraDto.extra,
    })
    await this.orderExtraInputRepository.save(extraInput)
    order.extraInput = extraInput

    await this.orderRepository.save(order)

    let inputs = []
    for (let i = 0; i < order.inputs.length; i++) {
      inputs.push({
        title: order.inputs[i].title,
        value: order.inputs[i].value,
      })
    }

    await this.adminAlertService.makeAlertWithExtra({
      extra: setOrderExtraDto.extra,
      orderPath: order.path,
      price: String(order.product.price),
      product: order.product.title,
      category: order.product.category.title,
      inputs: inputs,
    })
  }

  private async getPaymentCrLink(sum: number, orderPath: string) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: 'https://api.crystalpay.ru/v1/',
        params: {
          s: 'Donut Game',
          n: '7b585636fc0f261417f240f07025c96fc7fd9e16',
          amount: sum,
          redirect: `https://donutgame.ru/order/${orderPath}`,
          callback: 'http://donutgame.ru:3000/api/order/webhookForCrPay',
          o: 'invoice-create',
          extra: orderPath,
        },
      }).then((data) => {
        console.log(data.data)
        // @ts-ignore
        if (data.data.auth != 'ok') {
          resolve(0)
        } else {
          resolve(data.data)
        }
      })
    })
  }
}
