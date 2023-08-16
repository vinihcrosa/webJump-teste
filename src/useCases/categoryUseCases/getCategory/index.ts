import { categoryRepository } from "../../../repositories/implementations/prisma";
import { GetCategoryController } from "./getCategory.controller";
import { GetCategoryUseCase } from "./getCategory.useCase";

const getCategoryUseCase = new GetCategoryUseCase(categoryRepository);
const getCategoryController = new GetCategoryController(getCategoryUseCase);

export { getCategoryController };