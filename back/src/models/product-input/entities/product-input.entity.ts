import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IProductInput } from '../interfaces/product-input.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { Product } from '../../product/entities/product.entity'

@Entity({ name: 'product-inputs' })
export class ProductInput implements IProductInput {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Product, (product) => product.inputs, { onDelete: 'CASCADE' })
  product: Product

  @Column({ type: 'character varying' })
  title: string
}
