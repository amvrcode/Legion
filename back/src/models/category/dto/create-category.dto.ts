import { IsString, IsUrl } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  title: string

  @IsUrl()
  img: string
}
