import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { v4 as uuidv4 } from 'uuid'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    this.createAdmin()
  }

  async create() {
    const user = await this.userRepository.create({
      key: uuidv4(),
    })
    return this.userRepository.transform(await this.userRepository.save(user))
  }

  async createAdmin() {
    const candidate = await this.userRepository.findOne({ where: { isAdmin: true } })
    if (!candidate)
      await this.userRepository.save({ isAdmin: true, key: 'KNVDKNENIEOV3NKVDNKNLZLNvdljvdbvdbdL3K5NJ3B553BLJ53D' })
  }
}
