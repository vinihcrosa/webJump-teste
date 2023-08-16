import { Product } from "../entities/product.entity";

export interface IProductRepository {
  findByName(name: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(limit?: number): Promise<Product[]>;
  save(product: Product): Promise<void>;
}