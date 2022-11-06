import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IQiwiConfigService } from './config.interface'

@Injectable()
export class QiwiConfigService implements IQiwiConfigService {
  constructor(private readonly configService: ConfigService) {
    console.log(this.host)
    console.log(this.key)
    console.log(this.adminPhone)
  }

  get host(): string {
    return String(this.configService.get<string>(`qiwi.host`))
  }

  get key(): string {
    return String(this.configService.get<string>(`qiwi.key`))
  }

  get adminPhone(): number {
    return Number(this.configService.get<string>(`qiwi.adminPhone`))
  }
}
