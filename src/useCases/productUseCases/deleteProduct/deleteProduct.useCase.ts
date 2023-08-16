import { IProductRepository } from "../../../repositories/IProductRepository";

export class DeletyeProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(sku: string): Promise<void> {
    await this.productRepository.delete(sku);
  }
}