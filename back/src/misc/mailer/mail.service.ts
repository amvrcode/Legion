import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { raw } from 'express'
import { MailerService } from '@nestjs-modules/mailer'
import * as path from 'path'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTrackingNumber(email: string, url: string) {
    console.log(url)
    await this.mailerService
      .sendMail({
        template: path.join(__dirname, '../', '../', '../', './templates/sendUrlForExtraCode'),
        context: {
          url: url,
        },
        to: email,
        subject: 'Подтвердите экстра код',
        sender: 'donutgames.order@gmail.com',
      })
      .catch((e) => console.log(e))
  }
}
