import { beforeEach, describe, expect, it } from "vitest";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";
import { ProductRepositoryInMemory } from "../../../repositories/implementations/InMemory/ProductRepository";
import { Product } from "../../../entities/product.entity";

interface LocalTestContext {
  productRepository: IProductRepository;
  deleteProductUseCase: DeletyeProductUseCase
}

describe('Delete Product UseCase', () => {
  beforeEach<LocalTestContext>(async (context) => {
    context.productRepository = new ProductRepositoryInMemory();
    context.deleteProductUseCase = new DeletyeProductUseCase(context.productRepository);

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

  it<LocalTestContext>('should be defined', (context) => {
    expect(context.deleteProductUseCase).toBeDefined()
  })

  it<LocalTestContext>('should be able to delete a product', async (context) => {
    expect(() => context.deleteProductUseCase.execute('123abc')).not.toThrow()
  })

  it<LocalTestContext>('should not be able to delete a product that does not exist', async (context) => {
    expect(() => context.deleteProductUseCase.execute('123abcd')).rejects.toThrowError()
  })
})