import { beforeEach, describe, expect, it } from "vitest";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { UpdateProductUseCase } from "./updateProduct.useCase";
import { ProductRepositoryInMemory } from "../../../repositories/implementations/InMemory/ProductRepository";
import { Product } from "../../../entities/product.entity";

interface LocalTestContext {
  productRepository: IProductRepository;
  updateProductUseCase: UpdateProductUseCase;
}

describe("Update Product Use Case", () => {
  beforeEach<LocalTestContext>((context) =>  {
    context.productRepository = new ProductRepositoryInMemory();
    context.updateProductUseCase = new UpdateProductUseCase(context.productRepository);

    const product = new Product({
      sku: '123abc',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    context.productRepository.save(product);
  })

  it<LocalTestContext>("should be defined", async (context) => {
    expect(context.updateProductUseCase).toBeDefined();
  })

  it<LocalTestContext>("should be able to update a product", async (context) => {
    expect(() => context.updateProductUseCase.execute(
      '123abc',
    {
      name: 'Product Test Updated',
      description: 'Product Test Description Updated',
      price: 20,
      quantity: 20,
      category: ['test', 'test2'],
    })).not.toThrow();
  })

  it<LocalTestContext>("should not be able to update a product that does not exist", async (context) => {
    expect(() => context.updateProductUseCase.execute(
      '123abc2',
    {
      name: 'Product Test Updated',
      description: 'Product Test Description Updated',
      price: 20,
      quantity: 20,
      category: ['test', 'test2'],
    })).rejects.toThrow();
  })
})
