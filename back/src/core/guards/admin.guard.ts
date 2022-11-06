import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../../models/user/user.repository'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userKey = request.headers.authorization
    const user = await this.userRepository.findOne({
      where: {
        key: userKey,
      },
    })
    if (user?.isAdmin == true) {
      request.user = user
      return true
    }
    return false
  }
}
