import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from '../../core/guards/auth.guard'
import { UserFromReq } from '../../core/decorators/user-from-req.decorator'
import { User } from './entities/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create() {
    return await this.userService.create()
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@UserFromReq() user: User) {
    return user
  }
}
