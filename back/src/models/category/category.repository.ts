import { DeepPartial, EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { Category } from './entities/category.entity'
import { ModelRepository } from '../model.repository'
import { allCategoryGroupsForSerializing, CategoryEntity } from './serializers/category.serializer'

@EntityRepository(Category)
export class CategoryRepository extends ModelRepository<Category, CategoryEntity> {
  override transform(model: Category): CategoryEntity {
    const transformOptions = {
      groups: allCategoryGroupsForSerializing,
    }

    return plainToClass(CategoryEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: Category[]): CategoryEntity[] {
    return models.map((model) => this.transform(model))
  }

  async getAll(): Promise<CategoryEntity[]> {
    return this.transformMany(await this.find())
  }

  override async createEntity(inputs: DeepPartial<Category>): Promise<CategoryEntity | never> {
    const candidate = await this.findOne({ where: { title: inputs.title } })
    if (candidate) throw Error('Категория с таким названием уже создана')
    const category = await this.save(inputs)
    return this.transform(category)
  }

  override async updateEntity(inputs: DeepPartial<Category>): Promise<CategoryEntity | never> {
    const candidate = await this.findOne({ where: { id: inputs.id } })
    if (!candidate) throw Error('Категория с таким ID не найдена')
    const category = await this.save({
      id: candidate.id,
      ...inputs,
    })
    return this.transform(category)
  }

  async deleteEntity(inputs: DeepPartial<Category>): Promise<void | never> {
    const candidate = await this.findOne({ where: { id: inputs.id } })
    if (!candidate) throw Error('Категория с таким ID не найдена')
    await this.delete(candidate.id)
  }
}
