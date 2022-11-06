import { ModelEntity } from '../../../core/serializers/model.serializer'
import { IOrder } from '../interfaces/order.interface'
import { IUser } from '../../user/interfaces/user.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { OrderStatusesEnum } from '../constants/order-statuses.enum'
import { IOrderInput } from '../../order-input/interfaces/order-input.interface'
import { IOrderExtraInput } from '../../order-extra-input/interfaces/order-extra-input.interface'
import { UserEntity } from '../../user/serializers/user.serializer'
import { ProductEntity } from '../../product/serializers/product.serializer'
import { OrderInputEntity } from '../../order-input/serializers/order-input.serializer'
import { OrderExtraInputEntity } from '../../order-extra-input/serializers/order-extra-input.serializer'

export const defaultOrderGroupsForSerializing: string[] = []
export const extendedOrderGroupsForSerializing: string[] = [...defaultOrderGroupsForSerializing]
export const allOrderGroupsForSerializing: string[] = [...extendedOrderGroupsForSerializing]

export class OrderEntity extends ModelEntity implements IOrder {
  user: UserEntity
  product: ProductEntity
  email: string
  status: OrderStatusesEnum
  inputs: OrderInputEntity[]
  extraInput: OrderExtraInputEntity
  path: string
  paymentData: string
}
