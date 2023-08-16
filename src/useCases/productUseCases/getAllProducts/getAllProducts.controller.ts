import { Request, Response } from "express";
import { GetAllProductsUseCase } from "./getAllProducts.useCase";

export class GetAllProductsController {
  constructor (
    private getAllProductsUseCase: GetAllProductsUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { limit } = request.query

    try {
      const products = await this.getAllProductsUseCase.execute({
        limit: limit? Number(limit) : 10
      })

      return response.status(200).json(products)
    } catch (error) {
      console.log(error)
      let message = 'Unexpected error.'
      if(error instanceof Error)
        message = error.message
      
      return response.status(400).send({
        message
      })
    }
  }
}