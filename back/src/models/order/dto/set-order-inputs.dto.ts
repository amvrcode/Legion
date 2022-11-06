import { IsArray, IsString} from 'class-validator'
import { Type } from 'class-transformer'

export class SetOrderInputsDto {
  @IsString()
  email: string

  @IsString()
  path: string

  @Type(() => SetOrderInputsInputDto)
  inputs: Array<SetOrderInputsInputDto>
}

export class SetOrderInputsInputDto {
  @IsString()
  title: string
  
  @IsString()
  value: string
}
