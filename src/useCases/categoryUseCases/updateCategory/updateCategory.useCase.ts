import { ILogger } from "../../../Logger/ILogger";
import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { CategoryRepository } from "../../../repositories/implementations/prisma/CategoryRepository";
import { UpdateCategoryDTO } from "./updateCategory.dto";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private logger: ILogger
  ) {}

  async execute(updateCategoryDto: UpdateCategoryDTO, id: number) {
    const categoryExists = await this.categoryRepository.getById(id);

    if (!categoryExists) {
      this.logger.error(
        'updateCategoryUseCase',
        `Category not found with id: ${id}`,
        {}
      )
      throw new Error('Category not found');
    }

    const categoryNameAlreadyExists = await this.categoryRepository.getByName(updateCategoryDto.name);

    if (categoryNameAlreadyExists) {
      this.logger.error(
        'updateCategoryUseCase',
        `Category name already exists: ${updateCategoryDto.name}`,
        {}
      )
      throw new Error('Category name already exists');
    }

    const categoryEntity = new Category({
      name: updateCategoryDto.name, 
      id
    });

    const category = await this.categoryRepository.update(categoryEntity);

    this.logger.info(
      'updateCategoryUseCase',
      `Category updated: ${category.name}`,
      {category}
    )

    return category;
  }
}