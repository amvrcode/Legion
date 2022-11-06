import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { DeleteProductDto } from './dto/delete-product.dto'
import { AdminGuard } from '../../core/guards/admin.guard'
import { GetByCategoryDto } from '../category/dto/get-product-by-category.dto'
import { GetByIdDto } from './dto/get-by-id.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getAll()
  }

  @Get(':id')
  async getById(@Param() getById: GetByIdDto) {
    return await this.productService.getById(getById)
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(updateProductDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() deleteProductDto: DeleteProductDto) {
    return await this.productService.delete(deleteProductDto)
  }
}
