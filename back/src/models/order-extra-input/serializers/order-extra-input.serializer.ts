import { ModelEntity } from '../../../core/serializers/model.serializer'
import { IOrderExtraInput } from '../interfaces/order-extra-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { OrderEntity } from '../../order/serializers/order.serializer'

export const defaultOrderExtraInputGroupsForSerializing: string[] = []
export const extendedOrderExtraInputGroupsForSerializing: string[] = [...defaultOrderExtraInputGroupsForSerializing]
export const allOrderExtraInputGroupsForSerializing: string[] = [...extendedOrderExtraInputGroupsForSerializing]

export class OrderExtraInputEntity extends ModelEntity implements IOrderExtraInput {
  order: OrderEntity
  value: string
}
