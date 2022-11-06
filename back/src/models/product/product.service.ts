import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { ProductInputRepository } from '../product-input/product-input.repository'
import { CategoryRepository } from '../category/category.repository'
import { DeleteProductDto } from './dto/delete-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { GetByIdDto } from './dto/get-by-id.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,

    @InjectRepository(ProductInputRepository)
    private readonly productInputRepository: ProductInputRepository,

    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async getAll() {
    return this.productRepository.transformMany(await this.productRepository.find())
  }

  async getById(getByIdDto: GetByIdDto) {
    const item = await this.productRepository.findOne({ where: { id: getByIdDto.id } })
    item.rate = item.rate + 1
    await this.productRepository.save(item)
    return this.productRepository.transform(item)
  }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({ where: { id: createProductDto.categoryId } })
    if (!category) throw new BadRequestException('Категории с таким ID не существует')

    const candidate = await this.productRepository.findOne({
      where: { title: createProductDto.title, category: category },
    })
    if (candidate) throw new BadRequestException('Товар с таким названием в этой категории уже существует')

    const product = await this.productRepository.create({
      title: createProductDto.title,
      description: createProductDto.description,
      img: createProductDto.img,
      price: createProductDto.price,
      category: category,
    })
    await this.productRepository.save(product)

    for (let i = 0; i < createProductDto.inputs.length; i++) {
      const input = await this.productInputRepository.create({ product: product, title: createProductDto.inputs[i] })
      const inputEntity = await this.productInputRepository.save(input)
      //product.inputs.push(inputEntity)
    }

    return await this.productRepository.save(product)
  }

  async delete(deleteDto: DeleteProductDto) {
    const candidate = await this.productRepository.findOne({ where: { id: deleteDto.id } })
    if (!candidate) throw new BadRequestException('Товара с таким ID не найдено')
    await this.productRepository.delete(deleteDto.id)
  }

  async update(updateDto: UpdateProductDto) {
    const candidate = await this.productRepository.findOne({ where: { id: updateDto.id } })
    if (!candidate) throw new BadRequestException('Товара с таким ID не найдено')
    return this.productRepository.transform(
      await this.productRepository.save({
        ...candidate,
        ...updateDto,
      })
    )
  }
}
