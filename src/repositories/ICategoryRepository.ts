import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
  create(category: Category): Promise<void>;

  getAll(limit: number): Promise<any>;
  getByName(name: string): Promise<Category | null>;

  update(category: Category): Promise<Category>;

  delete(name: string): Promise<void>;
}