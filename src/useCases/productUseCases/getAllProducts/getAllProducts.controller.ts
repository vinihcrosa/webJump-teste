import { Request, Response } from "express";
import { GetAllProductsUseCase } from "./getAllProducts.useCase";
import { ILogger } from "../../../Logger/ILogger";

export class GetAllProductsController {
  constructor (
    private getAllProductsUseCase: GetAllProductsUseCase,
    private logger: ILogger
  ) {}

  async handle(request: Request, response: Response) {
    this.logger.debug(
      'getAllProductsController',
      'handle',
      {
        query: request.query
      }
    )
    
    const { limit } = request.query

    try {
      const products = await this.getAllProductsUseCase.execute({
        limit: limit? Number(limit) : 10
      })

      this.logger.info(
        'getAllProductsController',
        `Getting ${products.length} products.`,
        {}
      )

      return response.status(200).json(products)
    } catch (error) {
      this.logger.error(
        'getAllProductsController',
        'Error while getting products.',
        {error}
      )

      let message = 'Unexpected error.'
      if(error instanceof Error)
        message = error.message
      
      return response.status(400).send({
        message
      })
    }
  }
}