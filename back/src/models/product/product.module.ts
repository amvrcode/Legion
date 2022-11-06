import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { ProductInputRepository } from '../product-input/product-input.repository'
import { CategoryRepository } from '../category/category.repository'
import { UserRepository } from '../user/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, ProductInputRepository, CategoryRepository, UserRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
