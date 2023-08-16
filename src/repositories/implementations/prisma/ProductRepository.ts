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

        console.log(newProduct);
      } catch (error) {
        console.log(error);
        throw new Error('Erro ao salvar produto');
      }
    }

    async findAll(limit = 10): Promise<Product[]> {
      console.log(limit);
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
}