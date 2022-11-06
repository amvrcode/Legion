import { IsString } from 'class-validator'

export class SetOrderExtraInputsDto {
  @IsString()
  extra: string

  @IsString()
  path: string
}
