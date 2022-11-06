import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'

export class CreateOrderDto {
  @IsNumber()
  itemId: number
}
