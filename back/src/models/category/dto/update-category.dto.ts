import { IsNumber, IsString, IsUrl } from 'class-validator'

export class UpdateCategoryDto {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsUrl()
  img: string
}
