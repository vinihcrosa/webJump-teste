import { prismaClient } from "../../../modules/prismaClient";
import { ProductRepository } from "../../../repositories/implementations/prisma/ProductRepository";
import { UpdateProductController } from "./updateProduct.controller";
import { UpdateProductUseCase } from "./updateProduct.useCase";

const productRepository = new ProductRepository(prismaClient);

const updateProductUseCase = new UpdateProductUseCase(productRepository);
const updateProductController = new UpdateProductController(updateProductUseCase);

export { updateProductUseCase, updateProductController };