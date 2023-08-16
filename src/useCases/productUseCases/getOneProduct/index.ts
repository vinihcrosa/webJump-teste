import { prismaClient } from "../../../modules/prismaClient";
import { ProductRepository } from "../../../repositories/implementations/prisma/ProductRepository";
import { GetOneProductController } from "./getOneProduct.controller";
import { GetOneProductUseCase } from "./getOneProduct.useCase";

const productRepository = new ProductRepository(prismaClient)

const getOneProductUseCase = new GetOneProductUseCase(productRepository)
const getOneProductController = new GetOneProductController(getOneProductUseCase)

export { getOneProductController, getOneProductUseCase }