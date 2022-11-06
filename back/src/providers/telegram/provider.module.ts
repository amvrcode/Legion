import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { TelegramConfigModule } from '../../config/telegram/config.module'
import { ITelegramConfigService } from '../../config/telegram/config.interface'
import { session } from 'telegraf'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [TelegramConfigModule],
      inject: [ITelegramConfigService],
      useFactory: async (telegramConfigService: ITelegramConfigService) => ({
        token: telegramConfigService.key,
        middlewares: [session()],
      }),
    }),
  ],
  exports: [TelegrafModule],
})
export class NestjsTelegrafProviderModule {}
