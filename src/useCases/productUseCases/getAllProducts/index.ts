import { productRepository } from "../../../repositories/implementations/prisma";
import { GetAllProductsController } from "./getAllProducts.controller";
import { GetAllProductsUseCase } from "./getAllProducts.useCase";

const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);

export { getAllProductsUseCase, getAllProductsController };