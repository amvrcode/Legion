import { ModelEntity } from '../../../core/serializers/model.serializer'
import { ICategory } from '../interfaces/category.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { ProductEntity } from '../../product/serializers/product.serializer'

export const defaultCategoryGroupsForSerializing: string[] = []
export const extendedCategoryGroupsForSerializing: string[] = [...defaultCategoryGroupsForSerializing]
export const allCategoryGroupsForSerializing: string[] = [...extendedCategoryGroupsForSerializing]

export class CategoryEntity extends ModelEntity implements ICategory {
  title: string

  img: string

  products: ProductEntity[]
}
