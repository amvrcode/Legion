import { ModelEntity } from '../../../core/serializers/model.serializer'
import { IOrderInput } from '../interfaces/order-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'
import { OrderEntity } from '../../order/serializers/order.serializer'

export const defaultOrderInputGroupsForSerializing: string[] = []
export const extendedOrderInputGroupsForSerializing: string[] = [...defaultOrderInputGroupsForSerializing]
export const allOrderInputGroupsForSerializing: string[] = [...extendedOrderInputGroupsForSerializing]

export class OrderInputEntity extends ModelEntity implements IOrderInput {
  order: OrderEntity
  title: string
  value: string
}
