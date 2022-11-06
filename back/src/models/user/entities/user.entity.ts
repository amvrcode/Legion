import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IUser } from '../interfaces/user.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { Order } from '../../order/entities/order.entity'

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'character varying' })
  key: string

  @Column({ type: 'float', default: 0 })
  balance: number

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders: Order[]
}
