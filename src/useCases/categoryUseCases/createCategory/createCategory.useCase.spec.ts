import { beforeEach, describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "./createCategory.useCase";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { CategoryRepositoryInMemory } from "../../../repositories/implementations/InMemory/CategoryRepository";
import { Category } from "../../../entities/category.entity";

interface LocalTestContext {
  categoryRepository: ICategoryRepository
  createCategoryUseCase: CreateCategoryUseCase
}

describe("Create Category Use Case", () => {
  beforeEach<LocalTestContext>((context) => {
    context.categoryRepository = new CategoryRepositoryInMemory()
    context.createCategoryUseCase = new CreateCategoryUseCase(context.categoryRepository)

    const category = new Category({ 
      name: "Category Test",
    })

    context.categoryRepository.create(category)
  })

  it<LocalTestContext>("should be defined", async (context) => {
    expect(context.createCategoryUseCase).toBeDefined()
  })

  it<LocalTestContext>("should be able to create a new category", async (context) => {
    const category = new Category({ 
      name: "Category Test 2",
    })

    expect(() => context.createCategoryUseCase.execute(category))
      .not.toThrow()
  })

  it<LocalTestContext>("should not be able to create a new category with name exists", async (context) => {
    const category = new Category({ 
      name: "Category Test",
    })

    expect(() => context.createCategoryUseCase.execute(category))
      .rejects.toThrow()
  })
})