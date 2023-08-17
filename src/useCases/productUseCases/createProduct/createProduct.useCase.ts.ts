import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { CreateProductRequestDTO } from "./createProduct.dto";

export class CreateProductUseCase {
  constructor(
    private productsRepository: IProductRepository,
  ) {}
  async execute(data: CreateProductRequestDTO) {
    const productExists = await this.productsRepository.findBySku(data.sku);

    if (productExists) {
      throw new Error('Product already exists');
    }

    const product = new Product({
      name: data.name,
      sku: data.sku,
      price: data.price,
      description: data.description,
      quantity: data.quantity,
      category: data.category,
    });
    await this.productsRepository.save(product);
  }
}