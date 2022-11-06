import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { Order } from './entities/order.entity'
import { allOrderGroupsForSerializing, OrderEntity } from './serializers/order.serializer'

@EntityRepository(Order)
export class OrderRepository extends ModelRepository<Order, OrderEntity> {
  override transform(model: Order): OrderEntity {
    const transformOptions = {
      groups: allOrderGroupsForSerializing,
    }

    return plainToClass(OrderEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: Order[]): OrderEntity[] {
    return models.map((model) => this.transform(model))
  }
}
