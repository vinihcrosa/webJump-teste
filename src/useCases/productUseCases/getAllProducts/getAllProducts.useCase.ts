import { ILogger } from "../../../Logger/ILogger";
import { IProductRepository } from "../../../repositories/IProductRepository";

interface IProps {
  limit?: number;
}

export class GetAllProductsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private logger: ILogger
  ) {}
  
  async execute(props: IProps) {
    const products = await this.productRepository.findAll(props.limit);

    this.logger.info(
      "getAllProductsUseCase",  
      "Products found", 
      products
    );

    return products;
  }
}
