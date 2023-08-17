import { ILogger } from "../../../Logger/ILogger";
import { IProductRepository } from "../../../repositories/IProductRepository";

export class DeletyeProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private logger: ILogger
  ) {}

  async execute(sku: string): Promise<void> {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      this.logger.error(
        'deleteProductUseCase',
        `Product not found with sku ${sku}`,
        {}
      );
      throw new Error('Product not found');
    }

    await this.productRepository.delete(sku);
    this.logger.info(
      'deleteProductUseCase',
      `Product deleted with sku ${sku}`,
      {}
    )
  }
}