import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IOrder } from '../../order/interfaces/order.interface'
import { IOrderExtraInput } from '../interfaces/order-extra-input.interface'
import { Order } from '../../order/entities/order.entity'

@Entity({ name: 'order-extra-inputs' })
export class OrderExtraInput implements IOrderExtraInput {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne(() => Order, (order) => order.extraInput)
  order: Order

  value: string
}
