export interface ICategory {
  name: string,
  description: string,
}

export class Category {
  private props: ICategory;

  constructor(props: ICategory) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  public updateDescription(description: string): void {
    this.props.description = description;
  }
}
