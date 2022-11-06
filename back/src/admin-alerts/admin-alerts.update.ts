import { Inject, Injectable } from '@nestjs/common'
import { Action, Ctx, InjectBot, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { IMakeAlert, IMakeAlertWirhExtra } from './interfaces'
import { ITelegramConfigService } from '../config/telegram/config.interface'
import { TelegramTextHelper } from './telegram-text'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user/user.repository'
import { OrderRepository } from '../models/order/order.repository'
import { OrderStatusesEnum } from '../models/order/constants/order-statuses.enum'
import { MailService } from '../misc/mailer/mail.service'

@Injectable()
@Update()
export class AdminAlertsUpdate {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @Inject(ITelegramConfigService) private readonly telegramConfigService: ITelegramConfigService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,

    private readonly mailService: MailService
  ) {}

  async makeAlert(makeAlert: IMakeAlert) {
    await this.bot.telegram.sendMessage(
      this.telegramConfigService.adminId,
      TelegramTextHelper.getAlertText(makeAlert.category, makeAlert.product, makeAlert.price, makeAlert.inputs),
      {
        // @ts-ignore
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Выполнено✅', callback_data: `done:${makeAlert.orderPath}` },
              { text: 'Вернуть деньги💸', callback_data: `moneyback:${makeAlert.orderPath}` },
            ],
            [{ text: 'Запросить экстра-код🕓', callback_data: `extra:${makeAlert.orderPath}` }],
          ],
        },
      }
    )
  }

  async makeAlertWithExtra(makeAlert: IMakeAlertWirhExtra) {
    await this.bot.telegram.sendMessage(
      this.telegramConfigService.adminId,
      TelegramTextHelper.getAlertTextWithExtra(
        makeAlert.category,
        makeAlert.product,
        makeAlert.price,
        makeAlert.inputs,
        makeAlert.extra
      ),
      {
        // @ts-ignore
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Выполнено✅', callback_data: `done:${makeAlert.orderPath}` },
              { text: 'Вернуть деньги💸', callback_data: `moneyback:${makeAlert.orderPath}` },
            ],
          ],
        },
      }
    )
  }

  @Action(RegExp('.*'))
  async getInline(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery.data
    const callbackDataType = callbackData.split(':')[0]
    const orderPath = callbackData.split(':')[1]

    if (callbackDataType == 'done') {
      const order = await this.orderRepository.findOne({
        where: { path: orderPath, status: OrderStatusesEnum.IN_EXECUTION },
      })
      order.status = OrderStatusesEnum.DONE
      await this.orderRepository.save(order)

      await ctx.reply('Заказ успешно выполнен😎')
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
    } else if (callbackDataType == 'moneyback') {
      const order = await this.orderRepository.findOne({
        where: { path: orderPath, status: OrderStatusesEnum.IN_EXECUTION },
        relations: ['user', 'product'],
      })
      order.status = OrderStatusesEnum.MONEYBACK
      await this.orderRepository.save(order)

      const user = await this.userRepository.findOne({ where: { id: order.user.id } })
      user.balance = user.balance + order.product.price
      await this.userRepository.save(user)

      await ctx.reply('Деньги начисленны пользователю на счёт')
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
    } else if (callbackDataType == 'extra') {
      const order = await this.orderRepository.findOne({
        where: { path: orderPath, status: OrderStatusesEnum.IN_EXECUTION },
        relations: ['user', 'product'],
      })
      order.status = OrderStatusesEnum.WAIT_FOR_EXTRA_INPUT
      await this.orderRepository.save(order)

      await this.mailService.sendTrackingNumber(
        order.email,
        'https://donutgame.ru/order/' + order.path
      )

      await ctx.reply('Письмо с ссылкой отправлено на почту')
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
    }
  }
}
