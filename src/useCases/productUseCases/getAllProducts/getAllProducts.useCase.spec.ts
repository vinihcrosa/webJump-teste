import { beforeEach, describe, expect, it } from "vitest"
import { IProductRepository } from "../../../repositories/IProductRepository"
import { GetAllProductsUseCase } from "./getAllProducts.useCase"
import { Product } from "../../../entities/product.entity"
import { ProductRepositoryInMemory } from "../../../repositories/implementations/InMemory/ProductRepository"

interface LocalTestContext {
  productRepository: IProductRepository
  getAllProductsUseCase: GetAllProductsUseCase
}

describe('Get all products use case', test => {
  beforeEach<LocalTestContext>(async (context) => {
    context.productRepository = new ProductRepositoryInMemory()
    context.getAllProductsUseCase = new GetAllProductsUseCase(context.productRepository)
    
    const product = new Product({
      sku: '123abc',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    await context.productRepository.save(product)
  })

  it<LocalTestContext>('shoud be defined', (context) => {
    expect(context.getAllProductsUseCase).toBeDefined()
  })

  it<LocalTestContext>('should be able to get all products', async (context) => {
    const products = await context.getAllProductsUseCase.execute({})

    expect(products).toHaveLength(1)
  })
})
