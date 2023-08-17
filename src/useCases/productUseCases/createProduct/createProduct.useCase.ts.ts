import { ILogger } from "../../../Logger/ILogger";
import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { CreateProductRequestDTO } from "./createProduct.dto";

export class CreateProductUseCase {
  constructor(
    private productsRepository: IProductRepository,
    private logger: ILogger
  ) {}
  async execute(data: CreateProductRequestDTO) {
    this.logger.info(
      'createProductUseCase',
      `Creating product ${data.name}`, 
      { data }
    );

    const productExists = await this.productsRepository.findBySku(data.sku);

    if (productExists) {
      this.logger.error(
        'createProductUseCase',
        `Product ${data.name} already exists`,
        {}
      )
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

    this.logger.info(
      'createProductUseCase',
      `Product ${data.name} created`,
      { product }
    )
  }
}