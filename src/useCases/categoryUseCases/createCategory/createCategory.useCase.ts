import { ILogger } from "../../../Logger/ILogger";
import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { CreateCategoryDTO } from "./createCategory.dto";

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private logger: ILogger  
  ) {}

  async execute(data: CreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.getByName(data.name);

    if (categoryAlreadyExists) {
      this.logger.error(
        'createCategoryUseCase',
        `Category already exists: ${data.name}`,
        {}
      )
      throw new Error("Category already exists");
    }

    const category = new Category(data);

    this.logger.info(
      'createCategoryUseCase',
      `Category created: ${data.name}`,
      {category}
    )

    await this.categoryRepository.create(category);
  }
}