import { ModelEntity } from '../../../core/serializers/model.serializer'
import { ICategory } from '../../category/interfaces/category.interface'
import { IProductInput } from '../../product-input/interfaces/product-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { Expose } from 'class-transformer'
import { IProduct } from '../../product/interfaces/product.interface'
import { ProductEntity } from '../../product/serializers/product.serializer'

export const defaultProductInputGroupsForSerializing: string[] = []
export const extendedProductInputGroupsForSerializing: string[] = [...defaultProductInputGroupsForSerializing]
export const allProductInputGroupsForSerializing: string[] = [...extendedProductInputGroupsForSerializing]

export class ProductInputEntity extends ModelEntity implements IProductInput {
  product: ProductEntity
  title: string
}
