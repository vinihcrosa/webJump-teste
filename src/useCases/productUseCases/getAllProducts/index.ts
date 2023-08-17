import { pinoLogger } from "../../../Logger/pino";
import { productRepository } from "../../../repositories/implementations/prisma";
import { GetAllProductsController } from "./getAllProducts.controller";
import { GetAllProductsUseCase } from "./getAllProducts.useCase";

const getAllProductsUseCase = new GetAllProductsUseCase(productRepository, pinoLogger);
const getAllProductsController = new GetAllProductsController(getAllProductsUseCase, pinoLogger);

export { getAllProductsUseCase, getAllProductsController };