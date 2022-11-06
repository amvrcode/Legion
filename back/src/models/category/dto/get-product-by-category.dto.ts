import { IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetByCategoryDto {
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  id: number
}
