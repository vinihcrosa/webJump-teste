import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

export class GetCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(name: string) {
    const category = await this.categoryRepository.getByName(name);

    return category;
  }
}