import { beforeEach, describe, expect, it } from "vitest"
import { ICategoryRepository } from "../../../repositories/ICategoryRepository"
import { GetAllCategoriesUseCase } from "./getAllCategories.useCase"
import { CategoryRepositoryInMemory } from "../../../repositories/implementations/InMemory/CategoryRepository"
import { Category } from "../../../entities/category.entity"

interface LocalTestContext {
  categoryRepository: ICategoryRepository
  getAllCategoriesUseCase: GetAllCategoriesUseCase
}

describe("Get all categories use case", () => {
  beforeEach<LocalTestContext>((context) => {
    context.categoryRepository = new CategoryRepositoryInMemory()
    context.getAllCategoriesUseCase = new GetAllCategoriesUseCase(context.categoryRepository)

    const category = new Category({ 
      name: "Category Test",
    })

    context.categoryRepository.create(category)
  })

  it<LocalTestContext>('should be defined', (context) => {
    expect(context.getAllCategoriesUseCase).toBeDefined()
  })

  it<LocalTestContext>('should be able to get all categories', async (context) => {
    const categories = await context.getAllCategoriesUseCase.execute()

    expect(categories).toHaveLength(1)
  })
})