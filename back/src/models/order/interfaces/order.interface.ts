import { IUser } from '../../user/interfaces/user.interface'
import { IProduct } from '../../product/interfaces/product.interface'
import { IOrderInput } from '../../order-input/interfaces/order-input.interface'
import { IOrderExtraInput } from '../../order-extra-input/interfaces/order-extra-input.interface'
import { OrderStatusesEnum } from '../constants/order-statuses.enum'

export interface IOrder {
  user: IUser
  product: IProduct
  email: string
  status: OrderStatusesEnum
  inputs: IOrderInput[]
  extraInput: IOrderExtraInput
  path: string
  paymentData: string
}
