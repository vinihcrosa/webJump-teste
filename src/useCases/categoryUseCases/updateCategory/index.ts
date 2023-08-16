import { categoryRepository } from "../../../repositories/implementations/prisma";
import { UpdateCategoryUseCase } from "./updateCategory.useCase";
import { UpdateCategoryController } from "./updateCategoryController";

const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase)

export { updateCategoryController }