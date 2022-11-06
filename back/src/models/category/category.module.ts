import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { CategoryRepository } from './category.repository'
import { UserRepository } from '../user/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, UserRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
