import { ILogger } from "../../../Logger/ILogger";
import { IProductRepository } from "../../../repositories/IProductRepository";

export class GetOneProductUseCase {
  constructor (
    private productRepository: IProductRepository,
    private logger: ILogger
  ) {}

  async execute(sku: string) {
    this.logger.info(
      'getOneProductUseCase', 
      `GetOneProductUseCase: Getting product with sku ${sku}`, 
      {}
    );
    return this.productRepository.findBySku(sku);
  }
}