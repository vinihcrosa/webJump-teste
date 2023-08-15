export interface IProduct {
  name: string;
  sku: string;
  price: number;
  description: string;
  quantity: number;
  category: string[];
}

export class Product {
  private props: IProduct;

  constructor(props: IProduct) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get sku(): string {
    return this.props.sku;
  }

  get price(): number {
    return this.props.price;
  }

  get description(): string {
    return this.props.description;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get category(): string[] {
    return this.props.category;
  }

  public update(props: Partial<IProduct>): void {
    this.props = { ...this.props, ...props };
  }
}