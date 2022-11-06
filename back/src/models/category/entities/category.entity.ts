import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ICategory } from '../interfaces/category.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { Product } from '../../product/entities/product.entity'

@Entity({ name: 'categories' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'character varying' })
  title: string

  @Column({ type: 'character varying' })
  img: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
