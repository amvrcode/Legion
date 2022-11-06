import { Module } from '@nestjs/common'
import { AdminAlertsUpdate } from './admin-alerts.update'
import { TelegramConfigModule } from '../config/telegram/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderRepository } from '../models/order/order.repository'
import { UserRepository } from '../models/user/user.repository'
import { MailService } from '../misc/mailer/mail.service'

@Module({
  imports: [TelegramConfigModule, TypeOrmModule.forFeature([OrderRepository, UserRepository])],
  providers: [AdminAlertsUpdate, MailService],
  exports: [AdminAlertsUpdate],
})
export class AdminAlertsModule {}
