import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { OrderInput } from './entities/order-input.entity'
import { allOrderInputGroupsForSerializing, OrderInputEntity } from './serializers/order-input.serializer'

@EntityRepository(OrderInput)
export class OrderInputRepository extends ModelRepository<OrderInput, OrderInputEntity> {
  override transform(model: OrderInput): OrderInputEntity {
    const transformOptions = {
      groups: allOrderInputGroupsForSerializing,
    }

    return plainToClass(OrderInputEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: OrderInput[]): OrderInputEntity[] {
    return models.map((model) => this.transform(model))
  }
}
