import { Category } from "../../../entities/category.entity";
import { CategoryRepository } from "../../../repositories/implementations/prisma/CategoryRepository";
import { UpdateCategoryDTO } from "./updateCategory.dto";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(updateCategoryDto: UpdateCategoryDTO, id: number) {
    const categoryEntity = new Category({
      name: updateCategoryDto.name, 
      id
    });

    const category = await this.categoryRepository.update(categoryEntity);

    return category;
  }
}