import { Module } from '@nestjs/common'
import { TelegramConfigModule } from './config/telegram/config.module'
import { QiwiConfigModule } from './config/qiwi/config.module'
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module'
import { MailerProviderModule } from './providers/mailer/provider.module'
import { NestjsTelegrafProviderModule } from './providers/telegram/provider.module'
import { CategoryModule } from './models/category/category.module'
import { ProductModule } from './models/product/product.module'
import { UserModule } from './models/user/user.module'
import { OrderModule } from './models/order/order.module'
import { AdminAlertsModule } from './admin-alerts/admin-alerts.module'

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    MailerProviderModule,
    NestjsTelegrafProviderModule,
    CategoryModule,
    ProductModule,
    UserModule,
    OrderModule,
    AdminAlertsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}