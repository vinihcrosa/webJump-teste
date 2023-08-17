import { Product } from "../entities/product.entity";

export interface IProductRepository {
  save(product: Product): Promise<void>;

  findBySku(sku: string): Promise<Product | null>;
  findAll(limit?: number): Promise<Product[]>;

  update(product: Product): Promise<void>;

  delete(sku: string): Promise<void>;
}