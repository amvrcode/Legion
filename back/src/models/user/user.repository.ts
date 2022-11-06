import { EntityRepository } from 'typeorm'
import { plainToClass, classToPlain } from 'class-transformer'
import { ModelRepository } from '../model.repository'
import { User } from './entities/user.entity'
import { allUserGroupsForSerializing, UserEntity } from './serializers/user.serializer'

@EntityRepository(User)
export class UserRepository extends ModelRepository<User, UserEntity> {
  override transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroupsForSerializing,
    }

    return plainToClass(UserEntity, classToPlain(model, transformOptions), transformOptions)
  }

  override transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model))
  }
}
