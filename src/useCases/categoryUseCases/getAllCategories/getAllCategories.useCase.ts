import { ILogger } from "../../../Logger/ILogger";
import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

export class GetAllCategoriesUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private logger: ILogger
  ) {}

  async execute(limit = 10): Promise<Category[]> {
    const categories = await this.categoryRepository.getAll(limit);

    this.logger.info(
      'getAllCategoriesUsecase',
      `get all categories`, 
      {}
    );

    return categories;
  }
}