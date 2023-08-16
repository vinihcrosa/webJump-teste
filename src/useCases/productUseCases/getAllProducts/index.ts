import { prismaClient } from "../../../modules/prismaClient";
import { ProductRepository } from "../../../repositories/implementations/prisma/ProductRepository";
import { GetAllProductsController } from "./getAllProducts.controller";
import { GetAllProductsUseCase } from "./getAllProducts.useCase";

const productRepository = new ProductRepository(prismaClient);

const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);

export { getAllProductsUseCase, getAllProductsController };