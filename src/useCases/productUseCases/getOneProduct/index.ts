import { pinoLogger } from "../../../Logger/pino";
import { productRepository } from "../../../repositories/implementations/prisma";
import { GetOneProductController } from "./getOneProduct.controller";
import { GetOneProductUseCase } from "./getOneProduct.useCase";

const getOneProductUseCase = new GetOneProductUseCase(productRepository, pinoLogger)
const getOneProductController = new GetOneProductController(getOneProductUseCase, pinoLogger)

export { getOneProductController, getOneProductUseCase }