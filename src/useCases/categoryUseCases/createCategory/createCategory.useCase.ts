import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { CreateCategoryDTO } from "./createCategory.dto";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.getByName(data.name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    const category = new Category(data);

    await this.categoryRepository.create(category);
  }
}