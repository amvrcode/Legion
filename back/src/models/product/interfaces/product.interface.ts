import { ICategory } from '../../category/interfaces/category.interface'
import { IProductInput } from '../../product-input/interfaces/product-input.interface'
import { IOrder } from '../../order/interfaces/order.interface'

export interface IProduct {
  title: string
  category: ICategory
  price: number
  description: string
  inputs: IProductInput[]
  img: string
  rate: number
  inOrders: IOrder[]
}
