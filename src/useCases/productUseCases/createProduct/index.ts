import { pinoLogger } from "../../../Logger/pino";
import { productRepository } from "../../../repositories/implementations/prisma";
import { CreateProductUseCase } from "./createProduct.useCase.ts";
import { CreateProductController } from "./createUser.controller";

const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(
  createProductUseCase,
  pinoLogger
);

export { createProductController, createProductUseCase };