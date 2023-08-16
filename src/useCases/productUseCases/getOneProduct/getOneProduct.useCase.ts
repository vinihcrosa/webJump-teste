import { IProductRepository } from "../../../repositories/IProductRepository";

export class GetOneProductUseCase {
  constructor (
    private productRepository: IProductRepository
  ) {}

  async execute(sku: string) {
    return this.productRepository.findBySku(sku);
  }
}