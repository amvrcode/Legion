import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IProduct } from '../interfaces/product.interface'
import { ICategory } from '../../category/interfaces/category.interface'
import { IProductInput } from '../../product-input/interfaces/product-input.interface'
import { Category } from '../../category/entities/category.entity'
import { ProductInput } from '../../product-input/entities/product-input.entity'
import { IOrder } from '../../order/interfaces/order.interface'
import { Order } from '../../order/entities/order.entity'

@Entity({ name: 'products' })
export class Product implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'character varying' })
  title: string

  @ManyToOne(() => Category, (category) => category.products, { eager: true, onDelete: 'CASCADE' })
  category: Category

  @Column({ type: 'float' })
  price: number

  @Column({ type: 'text' })
  description: string

  @OneToMany(() => ProductInput, (productInput) => productInput.product, { eager: true, nullable: true })
  inputs: ProductInput[]

  @Column({ type: 'integer', default: 0 })
  rate: number

  @Column({ type: 'character varying' })
  img: string

  @OneToMany(() => Order, (order) => order.product, { nullable: true })
  inOrders: Order[]
}
