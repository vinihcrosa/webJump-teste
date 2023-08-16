import { categoryRepository } from "../../../repositories/implementations/prisma";
import { GetAllCategoriesController } from "./getAllCategories.controller";
import { GetAllCategoriesUseCase } from "./getAllCategories.useCase";

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
const getAllCategoriesController = new GetAllCategoriesController(getAllCategoriesUseCase);

export { getAllCategoriesController };