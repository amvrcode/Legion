import { IsArray, IsNumber, IsObject, IsString, IsUrl } from 'class-validator'

export class UpdateProductDto {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsUrl()
  img: string

  @IsNumber()
  price: number

  @IsString()
  description: string
}
