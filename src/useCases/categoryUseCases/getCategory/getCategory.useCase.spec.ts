import { beforeEach, describe, expect, it } from "vitest"
import { ICategoryRepository } from "../../../repositories/ICategoryRepository"
import { GetCategoryUseCase } from "./getCategory.useCase"
import { CategoryRepositoryInMemory } from "../../../repositories/implementations/InMemory/CategoryRepository"
import { Category } from "../../../entities/category.entity"

interface LocalTestContext {
  categoryRepository: ICategoryRepository
  getCategoryUseCase: GetCategoryUseCase
}

describe("Get category use case", () => {
  beforeEach<LocalTestContext>((context) => {
    context.categoryRepository = new CategoryRepositoryInMemory()
    context.getCategoryUseCase = new GetCategoryUseCase(context.categoryRepository)

    const category = new Category({ 
      name: "Category Test",
    })

    context.categoryRepository.create(category)
  })

  it<LocalTestContext>("should be defined", (context) => {
    expect(context.getCategoryUseCase).toBeDefined()
  })

  it<LocalTestContext>("should be able to get a category", async (context) => {
    const category = await context.getCategoryUseCase.execute("Category Test")

    expect(category).toBeInstanceOf(Category)
    expect(category?.name).toBe("Category Test")
  })

  it<LocalTestContext>("should not be able to get a category that does not exist", async (context) => {
    const category = await context.getCategoryUseCase.execute("Category Test 2")

    expect(category).toBeNull()
  })
})