import { prismaClient } from "../../../modules/prismaClient";
import { CategoryRepository } from "./CategoryRepository";
import { ProductRepository } from "./ProductRepository";

const categoryRepository = new CategoryRepository(prismaClient);
const productRepository = new ProductRepository(prismaClient);

export { categoryRepository, productRepository };