import { ModelEntity } from '../../../core/serializers/model.serializer'
import { ICategory } from '../../category/interfaces/category.interface'
import { IProductInput } from '../../product-input/interfaces/product-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { Expose } from 'class-transformer'
import { IProduct } from '../../product/interfaces/product.interface'
import { IUser } from '../interfaces/user.interface'
import { OrderEntity } from '../../order/serializers/order.serializer'

export const defaultUserGroupsForSerializing: string[] = []
export const extendedUserGroupsForSerializing: string[] = [...defaultUserGroupsForSerializing]
export const allUserGroupsForSerializing: string[] = [...extendedUserGroupsForSerializing]

export class UserEntity extends ModelEntity implements IUser {
  key: string
  balance: number
  isAdmin: boolean
  orders: OrderEntity[]
}
