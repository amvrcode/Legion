import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { Product } from './entities/product.entity'
import { allProductGroupsForSerializing, ProductEntity } from './serializers/product.serializer'

@EntityRepository(Product)
export class ProductRepository extends ModelRepository<Product, ProductEntity> {
  override transform(model: Product): ProductEntity {
    const transformOptions = {
      groups: allProductGroupsForSerializing,
    }

    return plainToClass(ProductEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: Product[]): ProductEntity[] {
    return models.map((model) => this.transform(model))
  }
}
