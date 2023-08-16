import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { UpdateProductDTO } from "./updateProduct.dto";

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(sku: string, updateProductDTO: UpdateProductDTO) {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new Error("Product not found");
    }

    product.update(updateProductDTO);

    await this.productRepository.update(product);
  }
}