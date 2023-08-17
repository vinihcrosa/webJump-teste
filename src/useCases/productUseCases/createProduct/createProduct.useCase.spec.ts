import { beforeEach, describe, expect, it } from 'vitest'
import { ProductRepositoryInMemory } from '../../../repositories/implementations/InMemory/ProductRepository'
import { CreateProductUseCase } from './createProduct.useCase.ts'
import { Product } from '../../../entities/product.entity'
import { IProductRepository } from '../../../repositories/IProductRepository'

interface LocalTestContext {
  productRepository: IProductRepository
  createProductUseCase: CreateProductUseCase
}

describe('Create Product', () => {
  beforeEach<LocalTestContext>(async (context) => {
    context.productRepository = new ProductRepositoryInMemory()
    context.createProductUseCase = new CreateProductUseCase(context.productRepository)
    
    const product = new Product({
      sku: '123abc',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    await context.createProductUseCase.execute(product)
  })
  it<LocalTestContext>('should be defined', (context) => {
    expect(context.createProductUseCase).toBeDefined()
  })

  it<LocalTestContext>('should be able to create a new product', async (context) => {
    const product = new Product({
      sku: '123abcd',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    
    expect(() => context.createProductUseCase.execute(product)).not.toThrow()
  })

  it<LocalTestContext>('should not be able to create a new product with same sku', async (context) => {
    const product = new Product({
      sku: '123abc',
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      quantity: 10,
      category: ['test'],
    })

    await expect(context.createProductUseCase.execute(product)).rejects.toThrow('Product already exists')
  })
})