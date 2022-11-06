import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IOrderInput } from '../interfaces/order-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { Order } from '../../order/entities/order.entity'

@Entity({ name: 'order-inputs' })
export class OrderInput implements IOrderInput {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Order, (order) => order.inputs)
  order: Order

  @Column({ type: 'character varying' })
  title: string

  @Column({ type: 'character varying' })
  value: string
}
