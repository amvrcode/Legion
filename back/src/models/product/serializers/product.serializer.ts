import { ModelEntity } from '../../../core/serializers/model.serializer'
import { IProduct } from '../interfaces/product.interface'
import { ICategory } from '../../category/interfaces/category.interface'
import { IProductInput } from '../../product-input/interfaces/product-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { Expose } from 'class-transformer'
import { CategoryEntity } from '../../category/serializers/category.serializer'
import { ProductInputEntity } from '../../product-input/serializers/product-input.serializer'

export const defaultProductGroupsForSerializing: string[] = []
export const extendedProductGroupsForSerializing: string[] = [...defaultProductGroupsForSerializing]
export const allProductGroupsForSerializing: string[] = [...extendedProductGroupsForSerializing, 'product.inOrder']

export class ProductEntity extends ModelEntity implements IProduct {
  title: string
  category: CategoryEntity
  price: number
  description: string
  inputs: ProductInputEntity[]
  img: string
  rate: number

  @Expose({ groups: ['product.inOrder'] })
  inOrders: IOrder[]
}
