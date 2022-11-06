import { IsNumber, IsString, IsUrl } from 'class-validator'

export class DeleteCategoryDto {
  @IsNumber()
  id: number
}
