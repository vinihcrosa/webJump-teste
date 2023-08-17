import { IProductRepository } from "../../../repositories/IProductRepository";

export class DeletyeProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(sku: string): Promise<void> {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(sku);
  }
}