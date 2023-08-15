import { prismaClient } from "../../../modules/prismaClient";
import { ProductRepository } from "../../../repositories/implementations/prisma/ProductRepository";
import { CreateProductUseCase } from "./createProduct.useCase.ts";
import { CreateProductController } from "./createUser.controller";

const productRepository = new ProductRepository(prismaClient);

const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController, createProductUseCase };