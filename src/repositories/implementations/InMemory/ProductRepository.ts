import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../IProductRepository";

export class ProductRepositoryInMemory implements IProductRepository{
  private products: Product[] = [];
  
  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = this.products.find(product => product.sku === sku);
    return product || null;
  }

  async findAll(limit = 10): Promise<Product[]> {
    return this.products.slice(0, limit); 
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.sku === product.sku);
    this.products[index] = product;
  }

  async delete(sku: string): Promise<void> {
    const index = this.products.findIndex(p => p.sku === sku);
    this.products.splice(index, 1);
  }
}