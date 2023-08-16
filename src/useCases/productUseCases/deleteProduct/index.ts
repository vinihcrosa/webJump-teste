import { prismaClient } from "../../../modules/prismaClient";
import { ProductRepository } from "../../../repositories/implementations/prisma/ProductRepository";
import { DeleteProductController } from "./deleteProduct.controller";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";

const productRepository = new ProductRepository(prismaClient);

const deleteProductUseCase = new DeletyeProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(deleteProductUseCase);

export { deleteProductController, deleteProductUseCase };