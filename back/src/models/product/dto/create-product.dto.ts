import { IsArray, IsNumber, IsObject, IsString, IsUrl } from 'class-validator'

export class CreateProductDto {
  @IsString()
  title: string

  @IsNumber()
  categoryId: number

  @IsUrl()
  img: string

  @IsNumber()
  price: number

  @IsString()
  description: string

  @IsArray()
  inputs: Array<string>
}
