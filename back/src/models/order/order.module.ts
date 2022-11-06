import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderRepository } from './order.repository'
import { UserRepository } from '../user/user.repository'
import { ProductRepository } from '../product/product.repository'
import { OrderInputRepository } from '../order-input/order-input.repository'
import { OrderExtraInputRepository } from '../order-extra-input/order-extra-input.repository'
import { AdminAlertsModule } from '../../admin-alerts/admin-alerts.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      UserRepository,
      ProductRepository,
      OrderInputRepository,
      OrderExtraInputRepository,
    ]),
    AdminAlertsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
