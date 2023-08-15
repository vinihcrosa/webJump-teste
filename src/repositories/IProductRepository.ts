import { Product } from "../entities/product.entity";

export interface IProductRepository {
  findByName(name: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
}