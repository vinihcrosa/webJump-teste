import { productRepository } from "../../../repositories/implementations/prisma";
import { GetOneProductController } from "./getOneProduct.controller";
import { GetOneProductUseCase } from "./getOneProduct.useCase";

const getOneProductUseCase = new GetOneProductUseCase(productRepository)
const getOneProductController = new GetOneProductController(getOneProductUseCase)

export { getOneProductController, getOneProductUseCase }