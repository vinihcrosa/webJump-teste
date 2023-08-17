import { pinoLogger } from "../../../Logger/pino";
import { categoryRepository } from "../../../repositories/implementations/prisma";
import { CreateCategoryController } from "./createCategory.controller";
import { CreateCategoryUseCase } from "./createCategory.useCase";

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository, pinoLogger);
const createCategoryController = new CreateCategoryController(createCategoryUseCase, pinoLogger);

export { createCategoryController };