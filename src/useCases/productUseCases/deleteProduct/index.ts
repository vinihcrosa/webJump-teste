import { pinoLogger } from "../../../Logger/pino";
import { productRepository } from "../../../repositories/implementations/prisma";
import { DeleteProductController } from "./deleteProduct.controller";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";

const deleteProductUseCase = new DeletyeProductUseCase(productRepository, pinoLogger);
const deleteProductController = new DeleteProductController(deleteProductUseCase, pinoLogger);

export { deleteProductController, deleteProductUseCase };