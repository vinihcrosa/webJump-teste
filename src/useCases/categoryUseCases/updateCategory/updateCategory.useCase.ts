import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { CategoryRepository } from "../../../repositories/implementations/prisma/CategoryRepository";
import { UpdateCategoryDTO } from "./updateCategory.dto";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(updateCategoryDto: UpdateCategoryDTO, id: number) {
    const categoryExists = await this.categoryRepository.getById(id);

    if (!categoryExists) {
      throw new Error('Category not found');
    }

    const categoryNameAlreadyExists = await this.categoryRepository.getByName(updateCategoryDto.name);

    if (categoryNameAlreadyExists) {
      throw new Error('Category name already exists');
    }

    const categoryEntity = new Category({
      name: updateCategoryDto.name, 
      id
    });

    const category = await this.categoryRepository.update(categoryEntity);

    return category;
  }
}