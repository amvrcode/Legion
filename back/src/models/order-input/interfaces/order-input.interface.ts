import { IOrder } from '../../order/interfaces/order.interface'

export interface IOrderInput {
  order: IOrder
  title: string
  value: string
}
