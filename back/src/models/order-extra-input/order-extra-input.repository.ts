import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { OrderExtraInput } from './entities/order-extra-input.entity'
import {
  allOrderExtraInputGroupsForSerializing,
  OrderExtraInputEntity,
} from './serializers/order-extra-input.serializer'

@EntityRepository(OrderExtraInput)
export class OrderExtraInputRepository extends ModelRepository<OrderExtraInput, OrderExtraInputEntity> {
  override transform(model: OrderExtraInput): OrderExtraInputEntity {
    const transformOptions = {
      groups: allOrderExtraInputGroupsForSerializing,
    }

    return plainToClass(OrderExtraInputEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: OrderExtraInput[]): OrderExtraInputEntity[] {
    return models.map((model) => this.transform(model))
  }
}
