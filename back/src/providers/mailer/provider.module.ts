import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'donutgames.order@gmail.com',
          pass: 'xndyuuzkfvsjcilh',
        },
      },
      defaults: {
        from: `"No Reply" <donutgames.order@gmail.com>`,
      },
      template: {
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
})
export class MailerProviderModule {}
