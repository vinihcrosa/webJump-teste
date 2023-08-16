import { productRepository } from "../../../repositories/implementations/prisma";
import { UpdateProductController } from "./updateProduct.controller";
import { UpdateProductUseCase } from "./updateProduct.useCase";


const updateProductUseCase = new UpdateProductUseCase(productRepository);
const updateProductController = new UpdateProductController(updateProductUseCase);

export { updateProductUseCase, updateProductController };