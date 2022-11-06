import { IProduct } from '../../product/interfaces/product.interface'

export interface ICategory {
  title: string
  img: string
  products: IProduct[]
}
