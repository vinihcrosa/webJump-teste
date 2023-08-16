import { IProductRepository } from "../../../repositories/IProductRepository";

interface IProps {
  limit?: number;
}

export class GetAllProductsUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}
  
  async execute(props: IProps) {
    const products = await this.productRepository.findAll(props.limit);

    return products;
  }
}
