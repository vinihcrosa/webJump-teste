import { beforeEach, describe, expect, it } from "vitest"
import { IProductRepository } from "../../../repositories/IProductRepository"
import { GetOneProductUseCase } from "./getOneProduct.useCase"
import { ProductRepositoryInMemory } from "../../../repositories/implementations/InMemory/ProductRepository"
import { Product } from "../../../entities/product.entity"

interface LocalTestContext {
  productRepository: IProductRepository
  getOneProductUseCase: GetOneProductUseCase
}

describe("GetOneProductUseCase", () => {
  beforeEach<LocalTestContext>(async (context) => {
    context.productRepository = new ProductRepositoryInMemory();
    context.getOneProductUseCase = new GetOneProductUseCase(context.productRepository);

    const product = new Product({
      sku: '123abc',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    await context.productRepository.save(product);
  })

  it<LocalTestContext>("should be defined", async (context) => {
    expect(context.getOneProductUseCase).toBeDefined();
  })

  it<LocalTestContext>("should be able to get one product", async (context) => {
    const product = await context.getOneProductUseCase.execute('123abc');

    expect(product).toBeInstanceOf(Product);
    expect(product?.sku).toBe('123abc');
  })

  it<LocalTestContext>("should not be able to get one product with invalid sku", async (context) => {
    const product = await context.getOneProductUseCase.execute('123');

    expect(product).toBeNull();
  })
})