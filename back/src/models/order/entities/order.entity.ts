import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IOrder } from '../interfaces/order.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { OrderStatusesEnum } from '../constants/order-statuses.enum'
import { IOrderInput } from '../../order-input/interfaces/order-input.interface'
import { IOrderExtraInput } from '../../order-extra-input/interfaces/order-extra-input.interface'
import { IUser } from '../../user/interfaces/user.interface'
import { Product } from '../../product/entities/product.entity'
import { User } from '../../user/entities/user.entity'
import { OrderInput } from '../../order-input/entities/order-input.entity'
import { OrderExtraInput } from '../../order-extra-input/entities/order-extra-input.entity'

@Entity({ name: 'orders' })
export class Order implements IOrder {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToOne(() => Product, (product) => product.inOrders)
  product: Product

  @Column({ type: 'character varying', nullable: true })
  email: string

  @Column({
    type: 'enum',
    enum: OrderStatusesEnum,
    default: OrderStatusesEnum.WAIT_FOR_PAY,
  })
  status: OrderStatusesEnum

  @OneToMany(() => OrderInput, (orderInput) => orderInput.order, { nullable: true })
  inputs: OrderInput[]

  @OneToOne(() => OrderExtraInput, (orderExtraInput) => orderExtraInput.order, { nullable: true })
  @JoinColumn()
  extraInput: OrderExtraInput

  @Column({ type: 'character varying' })
  path: string

  @Column({ type: 'character varying', nullable: true })
  paymentData: string
}
