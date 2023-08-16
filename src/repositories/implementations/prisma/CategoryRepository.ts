import { PrismaClient } from "@prisma/client";
import { Category } from "../../../entities/category.entity";
import { ICategoryRepository } from "../../ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  constructor(
    private prismaCient: PrismaClient,
  ) {}

  async create(category: Category): Promise<void> {
    await this.prismaCient.category.create({
      data: {
        name: category.name,
        description: category.description,
      }
    });
  }

  async getByName(name: string): Promise<Category | null> {
    const category = await this.prismaCient.category.findFirst({
      where: {
        name,
      }
    });

    if (!category) {
      return null;
    }

    const categoryEntity = new Category({
      name: category.name,
      description: category.description,
    });

    return categoryEntity;
  }

  async getAll(limit: number) {
    const categories = await this.prismaCient.category.findMany({
      take: limit,
    });

    const categoriesEntity = categories.map(category => new Category({
      name: category.name,
      description: category.description,
    }));

    return categoriesEntity;
  }

  async update (category: Category): Promise<Category> {

    const categoryUpdated = await this.prismaCient.category.update({
      where: {
        name: category.name,
      },
      data: {
        description: category.description,
      }
    });

    const categoryEntity = new Category({
      name: categoryUpdated.name,
      description: categoryUpdated.description,
    })

    return categoryEntity;
  }

  async delete (name: string): Promise<void> {
    await this.prismaCient.category.delete({
      where: {
        name,
      }
    });
  }
}