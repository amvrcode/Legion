import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { GetByCategoryDto } from './dto/get-product-by-category.dto'
import { AdminGuard } from '../../core/guards/admin.guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get(':id')
  async getById(@Param() getById: GetByCategoryDto) {
    return await this.categoryService.getById(getById)
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategoryDto)
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryService.delete(deleteCategoryDto)
  }
}
