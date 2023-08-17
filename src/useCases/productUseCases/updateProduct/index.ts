import { pinoLogger } from "../../../Logger/pino";
import { productRepository } from "../../../repositories/implementations/prisma";
import { UpdateProductController } from "./updateProduct.controller";
import { UpdateProductUseCase } from "./updateProduct.useCase";


const updateProductUseCase = new UpdateProductUseCase(productRepository, pinoLogger);
const updateProductController = new UpdateProductController(updateProductUseCase, pinoLogger);

export { updateProductUseCase, updateProductController };