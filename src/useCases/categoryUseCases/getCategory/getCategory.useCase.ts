import { ILogger } from "../../../Logger/ILogger";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

export class GetCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private logger: ILogger
  ) {}

  async execute(name: string) {
    this.logger.debug(
      'getCategoryUseCase',
      `Get category by name: ${name}`,
      {}
    )

    const category = await this.categoryRepository.getByName(name);

    this.logger.info(
      'getCategoryUseCase',
      `Category found: ${category}`,
      {}
    )

    return category;
  }
}