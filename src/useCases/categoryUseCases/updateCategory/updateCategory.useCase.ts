import { Category } from "../../../entities/category.entity";
import { CategoryRepository } from "../../../repositories/implementations/prisma/CategoryRepository";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(name: string, id: number) {
    const categoryEntity = new Category({
      name, 
      id
    });

    const category = await this.categoryRepository.update(categoryEntity);

    return category;
  }
}