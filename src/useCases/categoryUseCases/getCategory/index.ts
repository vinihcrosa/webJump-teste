import { pinoLogger } from "../../../Logger/pino";
import { categoryRepository } from "../../../repositories/implementations/prisma";
import { GetCategoryController } from "./getCategory.controller";
import { GetCategoryUseCase } from "./getCategory.useCase";

const getCategoryUseCase = new GetCategoryUseCase(categoryRepository, pinoLogger);
const getCategoryController = new GetCategoryController(getCategoryUseCase, pinoLogger);

export { getCategoryController };