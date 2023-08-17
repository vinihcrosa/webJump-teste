import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository{
  private categories: Category[] = [];

  async create(category: Category): Promise<void> {
    const id = this.categories.length + 1;
    category.id = id;
    this.categories.push(category);
  }
  
  async getAll(limit = 10): Promise<Category[]> {
    return this.categories.slice(0, limit);
  }

  async getByName(name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);
    return category || null;
  }

  async update(category: Category): Promise<Category> {
    const index = this.categories.findIndex(category => category.id === category.id);
    this.categories[index] = category;
    return category;
  }

  async delete(name: string): Promise<void> {
    const index = this.categories.findIndex(category => category.name === name);
    this.categories.splice(index, 1);
  }
}