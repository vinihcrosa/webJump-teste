import { ILogger } from "../../../Logger/ILogger";
import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { UpdateProductDTO } from "./updateProduct.dto";

export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository, 
    private logger: ILogger
  ) {}

  async execute(sku: string, updateProductDTO: UpdateProductDTO) {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      this.logger.error(
        'updateProductUseCase',
        `product with sku ${sku} not found`,
        {}
      )
      throw new Error("Product not found");
    }

    product.update(updateProductDTO);

    this.logger.info(
      'updateProductUseCase',
      `product with sku ${sku} updated`,
      {product}
    )

    await this.productRepository.update(product);
  }
}