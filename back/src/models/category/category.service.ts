import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryRepository } from './category.repository'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { GetByCategoryDto } from './dto/get-product-by-category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async getAll() {
    const categories = await this.categoryRepository.getAll()
    return categories
  }

  async getById(getByIdDto: GetByCategoryDto) {
    return this.categoryRepository.transform(
      await this.categoryRepository.findOne({ where: { id: getByIdDto.id }, relations: ['products'] })
    )
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.createEntity(createCategoryDto)
      return category
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message)
      }
    }
  }

  async delete(deleteCategoryDto: DeleteCategoryDto) {
    try {
      return await this.categoryRepository.deleteEntity(deleteCategoryDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.updateEntity(updateCategoryDto)
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message)
      }
    }
  }
}
