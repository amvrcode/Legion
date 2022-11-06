import { IOrder } from '../../order/interfaces/order.interface'

export interface IUser {
  key: string
  balance: number
  isAdmin: boolean
  orders: IOrder[]
}
