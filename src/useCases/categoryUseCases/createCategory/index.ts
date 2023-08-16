import { categoryRepository } from "../../../repositories/implementations/prisma";
import { CreateCategoryController } from "./createCategory.controller";
import { CreateCategoryUseCase } from "./createCategory.useCase";

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };