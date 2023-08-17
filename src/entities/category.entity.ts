export interface ICategory {
  id?: number
  name: string
}

export class Category {
  private props: ICategory;

  constructor(props: ICategory) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  set id(id: number) {
    this.props.id = id;
  }

  set name(name: string) {
    this.props.name = name;
  }
}
