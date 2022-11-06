import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { ProductInput } from './entities/product-input.entity'
import { allProductInputGroupsForSerializing, ProductInputEntity } from './serializers/product-input.serializer'

@EntityRepository(ProductInput)
export class ProductInputRepository extends ModelRepository<ProductInput, ProductInputEntity> {
  override transform(model: ProductInput): ProductInputEntity {
    const transformOptions = {
      groups: allProductInputGroupsForSerializing,
    }

    return plainToClass(ProductInputEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: ProductInput[]): ProductInputEntity[] {
    return models.map((model) => this.transform(model))
  }
}
