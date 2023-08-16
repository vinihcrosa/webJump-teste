import { Product } from "../../../entities/product.entity";
import { IProductRepository } from "../../IProductRepository";
import { PrismaClient } from '@prisma/client';

export class ProductRepository implements IProductRepository {
  constructor(
    private prismaClient: PrismaClient
  ) {}

    async findByName(name: string): Promise<Product | null> {
      const product = await this.prismaClient.product.findFirst({
        where: {
          name: name
        },
        include: {
          category: true
        }
      })
      
      if (!product) {
        return null;
      }

      const productEntity = new Product({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category.map(category => category.categoryName),
      });

      return productEntity;
    }

    async findBySku(sku: string): Promise<Product | null> {
      const product = await this.prismaClient.product.findUnique({
        where: {
          sku: sku
        },
        include: {
          category: true
        }
      })
      
      if (!product) {
        return null;
      }

      const productEntity = new Product({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category.map(category => category.categoryName),
      });

      return productEntity;
    }

    async save(product: Product): Promise<void> {

      const productExists = await this.findBySku(product.sku);
      if (productExists) {
        throw new Error('Produto já cadastrado');
      }
      try {
        const newProduct = await this.prismaClient.product.create({
          data: {
            name: product.name,
            sku: product.sku,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: {
              create: product.category.map(categoryName => {
                return {
                  category: {
                    connectOrCreate: {
                      where: {
                        name: categoryName
                      },
                      create: {
                        name: categoryName,
                        description: ''
                      }
                    }
                  }
                }
              })
            }
          }
        })

      } catch (error) {
        throw new Error('Erro ao salvar produto');
      }
    }

    async findAll(limit = 10): Promise<Product[]> {
      const products = await this.prismaClient.product.findMany({
        take: limit,
        include: {
          category: true
        }
      })

      const productsEntity = products.map(product => {
        return new Product({
          name: product.name,
          sku: product.sku,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category.map(category => category.categoryName),
        });
      });

      return productsEntity;
    }

    async update(product: Product): Promise<void> {
      const productExists = await this.findBySku(product.sku);
      if (!productExists) {
        throw new Error('Produto não encontrado');
      }

      try {
        const updatedProduct = await this.prismaClient.product.update({
          where: {
            sku: product.sku
          },
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: {
              create: product.category.map(categoryName => {
                return {
                  category: {
                    connectOrCreate: {
                      where: {
                        name: categoryName
                      },
                      create: {
                        name: categoryName,
                        description: ''
                      }
                    }
                  }
                }
              })
            }
          }
        })
      } catch (error) {
        throw new Error('Erro ao atualizar produto');
      }
    }

    async delete(sku: string): Promise<void> {
      const productExists = await this.findBySku(sku);
      if (!productExists) {
        throw new Error('Produto não encontrado');
      }

      try {
        await this.prismaClient.categoriesOnProduct.deleteMany({
          where: {
            productSku: sku
          }
        })
        const deletedProduct = await this.prismaClient.product.delete({
          where: {
            sku: sku
          },

        })
      } catch (error) {
        console.log(error);
        throw new Error('Erro ao deletar produto');
      }
    }
}