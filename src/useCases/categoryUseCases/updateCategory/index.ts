import { pinoLogger } from "../../../Logger/pino";
import { categoryRepository } from "../../../repositories/implementations/prisma";
import { UpdateCategoryUseCase } from "./updateCategory.useCase";
import { UpdateCategoryController } from "./updateCategoryController";

const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository, pinoLogger);
const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase, pinoLogger)

export { updateCategoryController }