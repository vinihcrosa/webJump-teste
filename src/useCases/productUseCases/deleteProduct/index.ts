import { productRepository } from "../../../repositories/implementations/prisma";
import { DeleteProductController } from "./deleteProduct.controller";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";

const deleteProductUseCase = new DeletyeProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(deleteProductUseCase);

export { deleteProductController, deleteProductUseCase };