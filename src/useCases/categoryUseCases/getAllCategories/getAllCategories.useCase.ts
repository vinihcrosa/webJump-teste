import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(limit = 10): Promise<Category[]> {
    const categories = await this.categoryRepository.getAll(limit);

    return categories;
  }
}