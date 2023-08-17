import { pinoLogger } from "../../../Logger/pino";
import { categoryRepository } from "../../../repositories/implementations/prisma";
import { GetAllCategoriesController } from "./getAllCategories.controller";
import { GetAllCategoriesUseCase } from "./getAllCategories.useCase";

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository, pinoLogger);
const getAllCategoriesController = new GetAllCategoriesController(getAllCategoriesUseCase, pinoLogger);

export { getAllCategoriesController };