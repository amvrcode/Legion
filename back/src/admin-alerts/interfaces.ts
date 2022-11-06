import { SetOrderInputsInputDto } from '../models/order/dto/set-order-inputs.dto'

export interface IMakeAlert {
  category: string
  orderPath: string
  product: string
  price: string
  inputs: SetOrderInputsInputDto[]
}

export interface IMakeAlertWirhExtra {
  category: string
  orderPath: string
  product: string
  price: string
  inputs: SetOrderInputsInputDto[]
  extra: string
}
