import { SetOrderInputsInputDto } from '../models/order/dto/set-order-inputs.dto'

export class TelegramTextHelper {
  static getAlertText(category, product, price, inputs: SetOrderInputsInputDto[]) {
    let text = `Новый заказ на ${price}р💸 \n${category} - ${product} \n\nВведённые данные:\n`
    for (let i = 0; i < inputs.length; i++) {
      text = text + `${inputs[i].title} - ${inputs[i].value} \n`
    }
    return text
  }

  static getAlertTextWithExtra(category, product, price, inputs: SetOrderInputsInputDto[], extra) {
    let text = `Новый заказ на ${price}р💸 \n${category} - ${product} \n\nВведённые данные:\n`
    for (let i = 0; i < inputs.length; i++) {
      text = text + `${inputs[i].title} - ${inputs[i].value} \n`
    }
    text = text + '\nЭкстра-код: ' + extra
    return text
  }
}
