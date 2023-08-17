import { beforeEach, describe, expect, it } from "vitest"
import { ICategoryRepository } from "../../../repositories/ICategoryRepository"
import { UpdateCategoryUseCase } from "./updateCategory.useCase"
import { CategoryRepositoryInMemory } from "../../../repositories/implementations/InMemory/CategoryRepository"
import { Category } from "../../../entities/category.entity"

interface LocalTestContext {
  categoryRepository: ICategoryRepository
  updateCategoryUseCase: UpdateCategoryUseCase
}

describe("Update Category Use Case", () => {
  beforeEach<LocalTestContext>((context) => {
    context.categoryRepository = new CategoryRepositoryInMemory()
    context.updateCategoryUseCase = new UpdateCategoryUseCase(context.categoryRepository)

    const category = new Category({ 
      name: "Category Test",
    })

    const category2 = new Category({ 
      name: "Category Test 2",
    })

    context.categoryRepository.create(category)
    context.categoryRepository.create(category2)
  })

  it<LocalTestContext>("should be defined", async (context)  => {
    expect(context.updateCategoryUseCase).toBeDefined()
  })

  it<LocalTestContext>("should be able to update a category", async (context)  => {
    const category = await context.categoryRepository.getByName("Category Test")

    const updatedCategory = new Category({
      id: category?.id,
      name: "Category Test Updated",
    })
    
    const result = await context.updateCategoryUseCase.execute(updatedCategory, 1)
    
    expect(category).toBeInstanceOf(Category)
    expect(result).toStrictEqual(updatedCategory)
  })

  it<LocalTestContext>("should not be able to update a category with a name that already exists", async (context)  => {
    const category = await context.categoryRepository.getByName("Category Test")

    const updatedCategory = new Category({
      id: category?.id,
      name: "Category Test 2",
    })
    
    expect(() => context.updateCategoryUseCase.execute(updatedCategory, 1)).rejects.toEqual(new Error("Category name already exists"))
  })

  it<LocalTestContext>("should not be able to update a category that does not exist", async (context)  => {
    const updatedCategory = new Category({
      id: 2,
      name: "Category Test Updated",
    })
    
    expect(() => context.updateCategoryUseCase.execute(updatedCategory, 10)).rejects.toEqual(new Error("Category not found"))
  })
})